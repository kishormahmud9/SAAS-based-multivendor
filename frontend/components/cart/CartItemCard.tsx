"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus } from "lucide-react"
import { toast } from "react-hot-toast"
import ConfirmModal from "../ui/ConfirmModal"

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
    onUpdate: (productId: string, quantity: number) => Promise<void>
    onRemove: (productId: string) => Promise<void>
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
            await onUpdate(item.productId, newQuantity)
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
            await onRemove(item.productId)
            toast.success("Item removed from cart")
        } catch (error) {
            toast.error("Failed to remove item")
            setRemoving(false)
        }
    }

    return (
        <div className={`bg-white rounded-xl shadow-md p-4 md:p-6 transition-all ${removing ? 'opacity-50' : 'hover:shadow-lg border border-transparent hover:border-orange-100'}`}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Product Image & Title Row (Mobile) / Left Column (Desktop) */}
                <div className="flex gap-4 sm:block flex-shrink-0">
                    <Link href={`/product/${item.product.slug}`} className="flex-shrink-0">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-100">
                            <Image
                                src={item.product.images[0] || "/placeholder.png"}
                                alt={item.product.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                    </Link>
                    
                    {/* Mobile Only: Title & Info next to image */}
                    <div className="sm:hidden flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <Link
                                href={`/product/${item.product.slug}`}
                                className="font-bold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2 leading-tight"
                            >
                                {item.product.name}
                            </Link>
                            <button
                                onClick={() => setIsConfirmModalOpen(true)}
                                disabled={removing}
                                className="text-gray-400 hover:text-red-500 p-1.5 bg-gray-50 rounded-lg transition-colors flex-shrink-0"
                                aria-label="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                            {item.product.category?.name || "Uncategorized"}
                            {item.product.brand && ` • ${item.product.brand.name}`}
                        </p>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col justify-between">
                    {/* Desktop Only: Title Row */}
                    <div className="hidden sm:flex justify-between items-start gap-4 mb-2">
                        <div className="min-w-0">
                            <Link
                                href={`/product/${item.product.slug}`}
                                className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors truncate block"
                            >
                                {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-600">
                                {item.product.category?.name || "Uncategorized"}
                                {item.product.brand && ` • ${item.product.brand.name}`}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsConfirmModalOpen(true)}
                            disabled={removing}
                            className="text-gray-400 hover:text-red-500 p-2 bg-gray-50 hover:bg-red-50 rounded-xl transition-all"
                            aria-label="Remove item"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Pricing & Controls Row */}
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        {/* Unit Price & Quantity */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-orange-600">
                                    ${Number(currentPrice).toFixed(2)}
                                </span>
                                {item.product.salePrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        ${Number(item.product.price).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center p-1 bg-gray-50 rounded-xl border border-gray-100">
                                    <button
                                        onClick={() => handleQuantityChange(item.quantity - 1)}
                                        disabled={updating || item.quantity <= 1}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-orange-600 hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Minus size={14} />
                                    </button>

                                    <span className="w-8 text-center font-bold text-gray-700">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => handleQuantityChange(item.quantity + 1)}
                                        disabled={updating || item.quantity >= item.product.stock}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white hover:text-orange-600 hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                                
                                {item.product.stock < 10 && (
                                    <span className="text-[10px] sm:text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full uppercase tracking-tighter sm:tracking-normal">
                                        Only {item.product.stock} Left
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Line Subtotal */}
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-0.5">Subtotal</p>
                            <p className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                                ${itemTotal.toFixed(2)}
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
                message="Are you sure you want to remove this item from your cart?"
                confirmText="Remove"
                variant="danger"
            />
        </div>
    )
}
