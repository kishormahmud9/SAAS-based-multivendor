"use client"

import Image from "next/image"
import { useState } from "react"
import { Tag, Loader2, X, CheckCircle, ShieldCheck, Info } from "lucide-react"
import { checkoutService } from "@/src/services/checkout.service"
import { getImageUrl } from "@/src/lib/image-utils"

interface CartItem {
    id: string
    quantity: number
    product: {
        name: string
        price: number
        salePrice: number | null
        images: string[]
    }
}

interface OrderSummaryProps {
    items: CartItem[]
    subtotal: number
    shipping?: number
    total: number
    showItems?: boolean
}

export default function OrderSummary({
    items,
    subtotal,
    shipping = 0,
    total,
    showItems = true
}: OrderSummaryProps) {
    const [couponCode, setCouponCode] = useState("")
    const [isApplying, setIsApplying] = useState(false)
    const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, discountAmount: number } | null>(null)
    const [couponError, setCouponError] = useState("")

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a valid coupon code")
            return
        }

        setCouponError("")
        setIsApplying(true)

        try {
            const data = await checkoutService.validateCoupon(couponCode.toUpperCase())
            if (data.success) {
                setAppliedCoupon({ 
                    code: data.data.code, 
                    discountAmount: data.data.discountAmount 
                })
                setCouponCode("")
            } else {
                setCouponError(data.message || "Invalid or expired coupon code")
            }
        } catch (error: any) {
            setCouponError(error || "Failed to validate coupon")
        } finally {
            setIsApplying(false)
        }
    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null)
        setCouponCode("")
        setCouponError("")
    }

    const finalTotal = appliedCoupon ? total - appliedCoupon.discountAmount : total

    return (
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
            </div>

            <div className="p-6 space-y-6">
                {showItems && (
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                    <Image
                                        src={getImageUrl(item.product.images[0])}
                                        alt={item.product.name}
                                        fill
                                        unoptimized={true}
                                        className="object-cover"
                                    />
                                    <div className="absolute top-1 right-1 bg-gray-900/80 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        x{item.quantity}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <h4 className="text-sm font-bold text-gray-900 truncate mb-1 group-hover:text-orange-600 transition-colors">
                                        {item.product.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 font-medium">
                                        Unit: ৳{Number(item.product.salePrice || item.product.price).toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-sm font-bold text-gray-900 flex items-center">
                                    ৳{(Number(item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="border-t border-gray-100 pt-6" />

                {/* Coupon Section */}
                <div>
                    {!appliedCoupon ? (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Tag size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Promo Code"
                                        value={couponCode}
                                        onChange={(e) => {
                                            setCouponCode(e.target.value)
                                            if (couponError) setCouponError("")
                                        }}
                                        className="pl-10 w-full h-11 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all uppercase placeholder:text-gray-400"
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode.trim() || isApplying}
                                    className="px-6 h-11 bg-gray-900 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isApplying ? <Loader2 size={18} className="animate-spin" /> : "Apply"}
                                </button>
                            </div>
                            {couponError && (
                                <p className="text-[11px] font-medium text-red-500 flex items-center gap-1 ml-1">
                                    <Info size={12} /> {couponError}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-green-900 uppercase tracking-wider">{appliedCoupon.code}</p>
                                    <p className="text-[11px] text-green-600 font-bold">-{appliedCoupon.discountAmount} BDT Discount Applied</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemoveCoupon}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-red-100"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-4 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Subtotal</span>
                        <span className="text-sm font-bold text-gray-900">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500">Shipping Fee</span>
                        <span className="text-sm font-bold text-gray-900">
                            {shipping === 0 ? (
                                <span className="text-green-600 font-bold uppercase text-[10px] tracking-wider bg-green-50 px-2 py-1 rounded-full">Free</span>
                            ) : (
                                `৳${shipping.toFixed(2)}`
                            )}
                        </span>
                    </div>
                    {appliedCoupon && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Discount</span>
                            <span className="text-sm font-bold text-green-600">-৳{appliedCoupon.discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                    
                    <div className="border-t border-dashed border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">Total</span>
                            <div className="text-right">
                                <span className="text-2xl font-black text-gray-900">
                                    ৳{Math.max(0, finalTotal).toFixed(2)}
                                </span>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Inclusive of all taxes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-center gap-3 border border-gray-100 mt-4">
                    <ShieldCheck size={20} className="text-green-600" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">100% Secure Checkout</span>
                </div>
            </div>
        </div>
    )
}
