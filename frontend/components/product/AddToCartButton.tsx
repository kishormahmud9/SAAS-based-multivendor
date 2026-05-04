"use client"

import { useState } from "react"
import { ShoppingCart, Loader2, Check } from "lucide-react"
import { toast } from "react-hot-toast"
import { useCart } from "@/lib/contexts/CartContext"

interface AddToCartButtonProps {
    productId: string
    productName: string
    quantity: number
    stock: number
    price: number
    salePrice?: number | null
    image?: string
    slug?: string
    disabled?: boolean
}

export default function AddToCartButton({
    productId,
    productName,
    quantity,
    stock,
    price,
    salePrice,
    image,
    slug,
    disabled = false,
}: AddToCartButtonProps) {
    const { addItem } = useCart()
    const [loading, setLoading] = useState(false)
    const [added, setAdded] = useState(false)

    const handleAddToCart = async () => {
        setLoading(true)
        try {
            const productData = {
                id: productId,
                name: productName,
                price: price,
                salePrice: salePrice || null,
                images: image ? [image] : [],
                slug: slug || "",
                stock: stock
            }

            await addItem(productId, quantity, productData)
            
            setAdded(true)
            toast.success(`${productName} added to cart!`)
            setTimeout(() => setAdded(false), 2000)
        } catch (error) {
            // Error toast is handled in CartContext
        } finally {
            setLoading(false)
        }
    }

    const isDisabled = disabled || stock === 0 || loading

    return (
        <button
            onClick={handleAddToCart}
            disabled={isDisabled}
            className={`
                w-full py-3.5 px-6 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2.5
                ${added
                    ? "bg-emerald-600 text-white"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-sm active:scale-[0.98]
            `}
        >
            {loading ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                </>
            ) : added ? (
                <>
                    <Check size={16} />
                    Added to Bag
                </>
            ) : (
                <>
                    <ShoppingCart size={16} />
                    Add to Bag
                </>
            )}
        </button>
    )
}
