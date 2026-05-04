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
        <div className="min-h-screen bg-[#fcfcfd] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50/50 to-transparent -z-0" />
            <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 -z-0" />
            <div className="absolute top-20 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40 -z-0" />

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                            <ShoppingCart size={12} />
                            Your Selection
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">
                            Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">Cart.</span>
                        </h1>
                        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                            Review your items and proceed to checkout.
                            <span className="w-1 h-1 rounded-full bg-orange-400" />
                            <span className="text-gray-900 font-bold">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
                        </p>
                    </div>
                    
                    <Link 
                        href="/shop" 
                        className="group flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold text-sm transition-all"
                    >
                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-gray-900 transition-all">
                            <ArrowLeft size={14} />
                        </div>
                        Back to Shopping
                    </Link>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <CartItemCard
                                    key={item.id}
                                    item={item}
                                    onUpdate={updateQuantity}
                                    onRemove={removeItem}
                                />
                            ))}
                        </div>

                        {/* Additional Info / Note */}
                        <div className="p-6 rounded-3xl bg-gray-50 border border-dashed border-gray-200">
                            <p className="text-sm text-gray-500 leading-relaxed">
                                <span className="font-bold text-gray-900 uppercase text-[10px] tracking-widest block mb-1">Shopping Note:</span>
                                Items in your cart are not reserved until checkout is completed. Stock levels may change while you shop. Free shipping is applied to all orders above ৳100.
                            </p>
                        </div>
                    </div>

                    {/* Cart Summary Sidebar */}
                    <div className="lg:col-span-4">
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
