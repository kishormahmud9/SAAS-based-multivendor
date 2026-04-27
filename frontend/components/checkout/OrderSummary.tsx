"use client"

import Image from "next/image"
import { useState } from "react"
import { Tag, Loader2, X, CheckCircle } from "lucide-react"

interface CartItem {
    id: string
    quantity: number
    product: {
        name: string
        price: string
        salePrice: string | null
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

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a valid coupon code")
            return
        }

        setCouponError("")
        setIsApplying(true)

        // Simulate API call for applying a coupon
        setTimeout(() => {
            if (couponCode.toUpperCase() === "WELCOME20") {
                setAppliedCoupon({ code: "WELCOME20", discountAmount: 20 })
                // Clear input after applying
                setCouponCode("")
            } else if (couponCode.toUpperCase() === "SAVE10") {
                setAppliedCoupon({ code: "SAVE10", discountAmount: subtotal * 0.1 })
                setCouponCode("")
            } else {
                setCouponError("Invalid or expired coupon code")
            }
            setIsApplying(false)
        }, 1200)
    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null)
        setCouponCode("")
        setCouponError("")
    }

    const finalTotal = appliedCoupon ? total - appliedCoupon.discountAmount : total

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            </div>

            <div className="p-6 space-y-6">
                {showItems && (
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                        src={item.product.images[0] || "/placeholder.png"}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-gray-900 text-white text-xs px-1.5 py-0.5 rounded-tl-md font-medium">
                                        x{item.quantity}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                        {item.product.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        ${parseFloat(item.product.salePrice || item.product.price).toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                    ${(parseFloat(item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showItems && <div className="border-t border-gray-200" />}

                {/* Coupon Section */}
                <div>
                    {!appliedCoupon ? (
                        <div>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Tag size={16} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Add Coupon / Voucher"
                                        value={couponCode}
                                        onChange={(e) => {
                                            setCouponCode(e.target.value)
                                            if (couponError) setCouponError("")
                                        }}
                                        className="pl-10 w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all uppercase"
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponCode.trim() || isApplying}
                                    className="px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 w-[90px] justify-center"
                                >
                                    {isApplying ? <Loader2 size={16} className="animate-spin" /> : "Apply"}
                                </button>
                            </div>
                            {couponError && (
                                <p className="mt-2 text-sm text-red-600">{couponError}</p>
                            )}
                            <p className="mt-2 text-xs text-gray-500">
                                Try <span className="font-bold text-gray-700">WELCOME20</span> or <span className="font-bold text-gray-700">SAVE10</span>
                            </p>
                        </div>
                    ) : (
                        <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-600" />
                                <div>
                                    <p className="text-sm font-bold text-green-800 uppercase">{appliedCoupon.code}</p>
                                    <p className="text-xs text-green-600 font-medium">Coupon applied successfully</p>
                                </div>
                            </div>
                            <button
                                onClick={handleRemoveCoupon}
                                className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-md transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200" />

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax (Estimated)</span>
                        <span>$0.00</span>
                    </div>
                    {appliedCoupon && (
                        <div className="flex justify-between text-green-600 font-medium">
                            <span>Discount ({appliedCoupon.code})</span>
                            <span>-${appliedCoupon.discountAmount.toFixed(2)}</span>
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-end">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-orange-600">
                            ${Math.max(0, finalTotal).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
