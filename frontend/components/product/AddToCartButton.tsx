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
            // Prepare product data for guest cart
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
                w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3
                ${added
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl
            `}
        >
            {loading ? (
                <>
                    <Loader2 size={24} className="animate-spin" />
                    Adding to Cart...
                </>
            ) : added ? (
                <>
                    <Check size={24} />
                    Added to Cart
                </>
            ) : (
                <>
                    <ShoppingCart size={24} />
                    Add to Cart
                </>
            )}
        </button>
    )
}
