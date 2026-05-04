"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ShoppingCart, ArrowRight } from "lucide-react"
import { useAuth } from "@/lib/contexts/AuthContext"

interface CartSummaryProps {
    subtotal: number
    itemCount: number
    onCheckout?: () => void
}

export default function CartSummary({ subtotal, itemCount, onCheckout }: CartSummaryProps) {
    const { isAuthenticated } = useAuth()
    const searchParams = useSearchParams()
    
    const shipping: number = 0 // Free shipping for now
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + shipping + tax

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/40 p-5 sm:p-6 sticky top-24 border border-gray-100 overflow-hidden">
            {/* Decorative Background Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-full -mr-10 -mt-10 blur-2xl opacity-50" />
            
            <div className="relative z-10">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                        <ShoppingCart size={14} />
                    </span>
                    Order Summary
                </h2>
    
                {/* Summary Items */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-xs font-medium">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                        <span className="text-base font-bold text-gray-900">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-xs font-medium">Shipping</span>
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-black bg-green-50 text-green-700 uppercase tracking-wider border border-green-100">
                            {shipping === 0 ? 'Free' : `৳${shipping.toFixed(2)}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        <span className="text-xs font-medium">Estimated Tax</span>
                        <span className="text-base font-bold text-gray-900">৳{tax.toFixed(2)}</span>
                    </div>
                </div>
    
                {/* Total */}
                <div className="flex justify-between items-end mb-6">
                    <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</span>
                        <p className="text-[10px] text-gray-400 font-medium">(Incl. all taxes)</p>
                    </div>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400 tracking-tighter">
                        ৳{total.toFixed(2)}
                    </span>
                </div>
    
                {/* Checkout Button */}
                <div className="space-y-3">
                    <Link
                        href={isAuthenticated ? "/checkout" : "/login?redirect=/checkout"}
                        className="group relative w-full h-14 bg-gray-900 text-white rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden hover:shadow-xl hover:shadow-orange-200/50 active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Proceed to Checkout</span>
                        <ArrowRight size={20} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    </Link>
    
                    <Link
                        href="/shop"
                        className="w-full h-12 border border-gray-100 text-gray-500 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-gray-50 hover:border-gray-200 transition-all"
                    >
                        Continue Shopping
                    </Link>
                </div>
    
                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 gap-3">
                    {[
                        { text: "Secure SSL checkout", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                        { text: "Free global shipping", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" }
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <div className="w-5 h-5 rounded-md bg-gray-50 flex items-center justify-center text-green-500">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={badge.icon} />
                                </svg>
                            </div>
                            {badge.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
