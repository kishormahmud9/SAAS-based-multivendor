"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "react-hot-toast"

export interface CartItem {
    id: string
    productId: string
    quantity: number
    product: {
        id: string
        name: string
        price: number
        salePrice: number | null
        images: string[]
        slug: string
        stock: number
    }
}

interface CartContextType {
    cartItems: CartItem[]
    loading: boolean
    itemCount: number
    subtotal: number
    addItem: (productId: string, quantity: number, productData?: any) => Promise<void>
    removeItem: (productId: string) => Promise<void>
    updateQuantity: (productId: string, quantity: number) => Promise<void>
    refreshCart: () => Promise<void>
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const LOCAL_STORAGE_KEY = "readymart_guest_cart"

export function CartProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated } = useAuth()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    // Calculate derived values
    const itemCount = cartItems.length
    const subtotal = cartItems.reduce((sum, item) => {
        const price = item.product.salePrice || item.product.price
        return sum + Number(price) * item.quantity
    }, 0)

    // Load cart from LocalStorage (Guest)
    const loadGuestCart = useCallback(() => {
        const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse guest cart", e)
                setCartItems([])
            }
        } else {
            setCartItems([])
        }
    }, [])

    // Fetch cart from DB (Authenticated)
    const fetchDBCart = useCallback(async () => {
        try {
            const res = await fetch("/api/cart", { credentials: "include" })
            const data = await res.json()
            if (data.success) {
                setCartItems(data.data.items || [])
            }
        } catch (error) {
            console.error("Failed to fetch DB cart", error)
        }
    }, [])

    // Merge Guest Cart into DB
    const mergeCart = useCallback(async (guestItems: CartItem[]) => {
        try {
            const itemsToMerge = guestItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))

            const res = await fetch("/api/cart/merge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: itemsToMerge }),
                credentials: "include"
            })
            const data = await res.json()
            
            if (data.success) {
                localStorage.removeItem(LOCAL_STORAGE_KEY)
                fetchDBCart()
            }
        } catch (error) {
            console.error("Merge failed", error)
        }
    }, [fetchDBCart])

    // Initial load and sync on auth change
    useEffect(() => {
        const handleAuthSync = async () => {
            setLoading(true)
            if (isAuthenticated) {
                // If transitioning to Auth, check for guest items to merge
                const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY)
                if (savedCart) {
                    const guestItems = JSON.parse(savedCart)
                    if (guestItems.length > 0) {
                        await mergeCart(guestItems)
                    } else {
                        await fetchDBCart()
                    }
                } else {
                    await fetchDBCart()
                }
            } else {
                // Not authenticated, load guest cart
                loadGuestCart()
            }
            setLoading(false)
        }

        handleAuthSync()
    }, [isAuthenticated, fetchDBCart, loadGuestCart, mergeCart])

    const addItem = async (productId: string, quantity: number, productData?: any) => {
        if (isAuthenticated) {
            try {
                const res = await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, quantity }),
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    setCartItems(data.data.items)
                } else {
                    throw new Error(data.error)
                }
            } catch (error: any) {
                toast.error(error.message || "Failed to add to cart")
                throw error
            }
        } else {
            // Guest Logic
            if (!productData) {
                toast.error("Product data missing for guest add")
                return
            }

            setCartItems(prev => {
                const existing = prev.find(item => item.productId === productId)
                let newItems
                if (existing) {
                    newItems = prev.map(item => 
                        item.productId === productId 
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                } else {
                    newItems = [...prev, {
                        id: `guest-${Date.now()}`,
                        productId,
                        quantity,
                        product: productData
                    }]
                }
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems))
                return newItems
            })
        }
    }

    const removeItem = async (productId: string) => {
        if (isAuthenticated) {
            try {
                const res = await fetch(`/api/cart?productId=${productId}`, {
                    method: "DELETE",
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    setCartItems(data.data.items)
                }
            } catch (error) {
                console.error("Failed to remove item", error)
                toast.error("Failed to remove item")
            }
        } else {
            setCartItems(prev => {
                const newItems = prev.filter(item => item.productId !== productId)
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems))
                return newItems
            })
        }
    }

    const updateQuantity = async (productId: string, quantity: number) => {
        if (isAuthenticated) {
            try {
                const res = await fetch("/api/cart", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, quantity }),
                    credentials: "include"
                })
                const data = await res.json()
                if (data.success) {
                    setCartItems(data.data.items)
                }
            } catch (error) {
                console.error("Failed to update quantity", error)
                toast.error("Failed to update quantity")
            }
        } else {
            setCartItems(prev => {
                const newItems = prev.map(item => 
                    item.productId === productId ? { ...item, quantity } : item
                )
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems))
                return newItems
            })
        }
    }

    const refreshCart = async () => {
        if (isAuthenticated) await fetchDBCart()
        else loadGuestCart()
    }

    const clearCart = () => {
        setCartItems([])
        if (!isAuthenticated) localStorage.removeItem(LOCAL_STORAGE_KEY)
    }

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            loading, 
            itemCount, 
            subtotal, 
            addItem, 
            removeItem, 
            updateQuantity,
            refreshCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
