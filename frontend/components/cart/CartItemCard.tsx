"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"
import { toast } from "react-hot-toast"
import ConfirmModal from "../ui/ConfirmModal"
import { getImageUrl } from "@/src/lib/image-utils"

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

interface CartItemCardProps {
    item: any // Use any to bypass strict type check for now or import unified type
    onUpdate: (itemId: string, quantity: number) => Promise<void>
    onRemove: (itemId: string) => Promise<void>
}

export default function CartItemCard({ item, onUpdate, onRemove }: CartItemCardProps) {
    const [updating, setUpdating] = useState(false)
    const [removing, setRemoving] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    const currentPrice = item.product.salePrice ?? item.product.price
    const itemTotal = Number(currentPrice) * item.quantity

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > item.product.stock) return
        if (newQuantity === item.quantity) return

        setUpdating(true)
        try {
            await onUpdate(item.id, newQuantity)
        } catch (error) {
            toast.error("Failed to update quantity")
        } finally {
            setUpdating(false)
        }
    }

    const handleRemove = async () => {
        setIsConfirmModalOpen(false)
        setRemoving(true)
        try {
            await onRemove(item.id)
            toast.success("Item removed from cart")
        } catch (error) {
            toast.error("Failed to remove item")
            setRemoving(false)
        }
    }

    return (
        <div className={`group relative bg-white rounded-2xl p-3 sm:p-4 transition-all duration-300 ${removing ? 'opacity-50 grayscale' : 'hover:shadow-xl hover:shadow-orange-100/30 border border-gray-100 hover:border-orange-200'}`}>
            {/* Unique Decorative Element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-50 to-transparent rounded-tr-2xl -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                {/* Image Section */}
                <div className="relative flex-shrink-0">
                    <Link href={`/product/${item.product.slug}`} className="block">
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
                            <Image
                                src={getImageUrl(item.product.images[0])}
                                alt={item.product.name}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </Link>
                    {item.product.salePrice && (
                        <div className="absolute -top-1 -left-1 bg-orange-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-lg uppercase tracking-wider">
                            Sale
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5">
                            <Link
                                href={`/product/${item.product.slug}`}
                                className="text-base sm:text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-1"
                            >
                                {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700">
                                    {item.product.category?.name || "Uncategorized"}
                                </span>
                                {item.product.brand && (
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        by {item.product.brand.name}
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsConfirmModalOpen(true)}
                            disabled={removing}
                            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all duration-200"
                            aria-label="Remove item"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                    <div className="mt-auto pt-3 flex flex-wrap items-end justify-between gap-3">
                        <div className="flex flex-col gap-2">
                            {/* Price Display */}
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-xl font-black text-gray-900">
                                    ৳{Number(currentPrice).toFixed(2)}
                                </span>
                                {item.product.salePrice && (
                                    <span className="text-[11px] text-gray-400 line-through font-medium">
                                        ৳{Number(item.product.price).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center bg-gray-50 rounded-xl p-0.5 border border-gray-100 shadow-sm">
                                    <button
                                        onClick={() => handleQuantityChange(item.quantity - 1)}
                                        disabled={updating || item.quantity <= 1}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:text-orange-600 shadow-sm hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                                    >
                                        <Minus size={12} />
                                    </button>

                                    <span className="w-8 text-center font-bold text-gray-800 text-sm">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => handleQuantityChange(item.quantity + 1)}
                                        disabled={updating || item.quantity >= item.product.stock}
                                        className="w-7 h-7 rounded-lg flex items-center justify-center bg-white text-gray-600 hover:text-orange-600 shadow-sm hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                                
                                {item.product.stock < 10 && (
                                    <span className="text-[9px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                                        Low Stock
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Subtotal Section */}
                        <div className="text-right">
                            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.15em] mb-0.5">Subtotal</p>
                            <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tighter">
                                ৳{itemTotal.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleRemove}
                title="Remove Item"
                message={`Are you sure you want to remove ${item.product.name} from your cart?`}
                confirmText="Remove"
                variant="danger"
            />
        </div>
    )
}
