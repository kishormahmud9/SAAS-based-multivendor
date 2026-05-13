"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { toast } from "react-hot-toast"
import { cartService } from "@/src/services/cart.service"

export interface CartItem {
    id: string
    productId: string
    variantId: string | null
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
    const { isAuthenticated } = useAuth()
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
                setCartItems([])
            }
        } else {
            setCartItems([])
        }
    }, [])

    // Fetch cart from DB (Authenticated)
    const fetchDBCart = useCallback(async () => {
        try {
            const data = await cartService.getCart()
            if (data.success) {
                setCartItems(data.data?.items || [])
            }
        } catch (error) {
            console.error("Failed to fetch DB cart", error)
        }
    }, [])

    // Sync Guest Cart into DB
    const syncCart = useCallback(async (guestItems: CartItem[]) => {
        try {
            const itemsToSync = guestItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))

            const data = await cartService.syncCart(itemsToSync)
            
            if (data.success) {
                localStorage.removeItem(LOCAL_STORAGE_KEY)
                fetchDBCart()
            }
        } catch (error) {
            console.error("Sync failed", error)
        }
    }, [fetchDBCart])

    // Initial load and sync on auth change
    useEffect(() => {
        const handleAuthSync = async () => {
            setLoading(true)
            if (isAuthenticated) {
                const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY)
                if (savedCart) {
                    const guestItems = JSON.parse(savedCart)
                    if (guestItems.length > 0) {
                        await syncCart(guestItems)
                    } else {
                        await fetchDBCart()
                    }
                } else {
                    await fetchDBCart()
                }
            } else {
                loadGuestCart()
            }
            setLoading(false)
        }

        handleAuthSync()
    }, [isAuthenticated, fetchDBCart, loadGuestCart, syncCart])

    const addItem = async (productId: string, quantity: number, productData?: any) => {
        if (isAuthenticated) {
            try {
                const data = await cartService.addToCart(productId, quantity)
                if (data.success) {
                    setCartItems(data.data.items)
                }
            } catch (error: any) {
                toast.error(error || "Failed to add to cart")
                throw error
            }
        } else {
            // Guest Logic
            if (!productData) {
                toast.error("Product data missing")
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

    const removeItem = async (itemId: string) => {
        if (isAuthenticated) {
            try {
                const data = await cartService.removeFromCart(itemId)
                if (data.success) {
                    setCartItems(data.data.items)
                }
            } catch (error) {
                toast.error("Failed to remove item")
            }
        } else {
            setCartItems(prev => {
                const newItems = prev.filter(item => item.id !== itemId)
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems))
                return newItems
            })
        }
    }

    const updateQuantity = async (itemId: string, quantity: number) => {
        if (isAuthenticated) {
            try {
                const data = await cartService.updateQuantity(itemId, quantity)
                if (data.success) {
                    setCartItems(data.data.items)
                }
            } catch (error) {
                toast.error("Failed to update quantity")
            }
        } else {
            setCartItems(prev => {
                const newItems = prev.map(item => 
                    item.id === itemId ? { ...item, quantity } : item
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
