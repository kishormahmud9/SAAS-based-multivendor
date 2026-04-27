"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { toast } from "react-hot-toast"

interface WishlistItem {
    id: string
    productId: string
    product: {
        id: string
        name: string
        slug: string
        price: string
        salePrice: string | null
        images: string[]
        stock: number
        category: { name: string }
        brand: { name: string } | null
    }
}

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchWishlist()
    }, [])

    const fetchWishlist = async () => {
        try {
            const response = await fetch("/api/wishlist", {
                credentials: "include",
            })
            const data = await response.json()

            if (data.success) {
                setWishlist(data.data)
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error)
            toast.error("Failed to load wishlist")
        } finally {
            setLoading(false)
        }
    }

    const handleRemove = async (id: string) => {
        try {
            const response = await fetch(`/api/wishlist/${id}`, {
                method: "DELETE",
                credentials: "include",
            })
            const data = await response.json()

            if (data.success) {
                setWishlist(wishlist.filter(item => item.id !== id))
                toast.success("Removed from wishlist")
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("Failed to remove item")
        }
    }

    const handleMoveToCart = async (productId: string, productName: string) => {
        try {
            const response = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, quantity: 1 }),
            })
            const data = await response.json()

            if (data.success) {
                toast.success(`${productName} added to cart!`)
            } else {
                toast.error(data.error)
            }
        } catch (error) {
            toast.error("Failed to add to cart")
        }
    }

    if (loading) {
        return (
            <div className="p-6 md:p-10 space-y-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const isEmpty = wishlist.length === 0

    if (isEmpty) {
        return (
            <div className="p-6 md:p-10">
                <div className="max-w-md mx-auto text-center py-20">
                    <div className="w-32 h-32 mx-auto mb-6 text-gray-200 dark:text-gray-800">
                        <Heart size={128} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Favorites are Empty</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Save your favorite items for later! They will appear here.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all shadow-lg"
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-10 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Favorites</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved in your favorites.
                </p>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map(item => {
                    const currentPrice = item.product.salePrice || item.product.price
                    const inStock = item.product.stock > 0

                    return (
                        <div key={item.id} className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden group shadow-sm flex flex-col">
                            {/* Product Image */}
                            <Link href={`/product/${item.product.slug}`} className="block relative aspect-square overflow-hidden">
                                <Image
                                    src={item.product.images[0] || "/placeholder.png"}
                                    alt={item.product.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {!inStock && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
                                        <span className="bg-white text-gray-900 px-3 py-1 rounded-lg font-bold text-xs uppercase tracking-wider">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                            </Link>

                            {/* Product Info */}
                            <div className="p-4 flex flex-col flex-1">
                                <Link
                                    href={`/product/${item.product.slug}`}
                                    className="font-bold text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors block mb-1 truncate"
                                >
                                    {item.product.name}
                                </Link>
                                <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">
                                    {item.product.category.name}
                                </p>

                                {/* Price */}
                                <div className="flex items-center gap-2 mb-4 mt-auto">
                                    <span className="text-lg font-bold text-orange-600">
                                        ${parseFloat(currentPrice).toFixed(2)}
                                    </span>
                                    {item.product.salePrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            ${parseFloat(item.product.price).toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {inStock && (
                                        <button
                                            onClick={() => handleMoveToCart(item.productId, item.product.name)}
                                            className="flex-1 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-xs transition-all hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart size={14} />
                                            Add
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className="p-2.5 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-500 hover:border-red-100 dark:hover:border-red-900/30 rounded-xl transition-all"
                                        aria-label="Remove from favorites"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
