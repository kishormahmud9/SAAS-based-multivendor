"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/lib/contexts/CartContext"
import CartItemCard from "@/components/cart/CartItemCard"
import CartSummary from "@/components/cart/CartSummary"

interface CartItem {
    id: string
    productId: string
    quantity: number
    product: {
        id: string
        name: string
        slug: string
        price: number
        salePrice: number | null
        images: string[]
        stock: number
        category?: { name: string }
        brand?: { name: string } | null
    }
}

export default function CartPage() {
    const { cartItems, loading, subtotal, itemCount, updateQuantity, removeItem } = useCart()

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse space-y-6">
                        <div className="h-10 bg-gray-200 rounded w-1/4" />
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                                ))}
                            </div>
                            <div className="h-96 bg-gray-200 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const isEmpty = cartItems.length === 0

    if (isEmpty) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
                            <ShoppingCart size={128} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
                        <p className="text-gray-600 mb-8">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onUpdate={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div>
                        <CartSummary
                            subtotal={subtotal}
                            itemCount={itemCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
