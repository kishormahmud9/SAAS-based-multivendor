"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { toast } from "react-hot-toast"
import { useAuth } from "@/lib/contexts/AuthContext"
import { useRouter } from "next/navigation"

interface WishlistButtonProps {
    productId: string
    productName: string
    initialInWishlist?: boolean
}

export default function WishlistButton({
    productId,
    productName,
    initialInWishlist = false
}: WishlistButtonProps) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const [inWishlist, setInWishlist] = useState(initialInWishlist)
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        if (!isAuthenticated) {
            localStorage.setItem("pendingAction", JSON.stringify({
                type: "ADD_WISHLIST",
                payload: { productId, productName }
            }));
            
            toast.error("Please login to add to wishlist");
            router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
        }

        setLoading(true)
        try {
            if (inWishlist) {
                // Remove from wishlist - need to get wishlist item ID first
                const response = await fetch("/api/wishlist", {
                    credentials: "include",
                })
                const data = await response.json()

                if (data.success) {
                    const item = data.data.find((w: any) => w.productId === productId)
                    if (item) {
                        const deleteRes = await fetch(`/api/wishlist/${item.id}`, {
                            method: "DELETE",
                            credentials: "include",
                        })
                        const deleteData = await deleteRes.json()

                        if (deleteData.success) {
                            setInWishlist(false)
                            toast.success("Removed from wishlist")
                        }
                    }
                }
            } else {
                // Add to wishlist
                const response = await fetch("/api/wishlist", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ productId }),
                })
                const data = await response.json()

                if (data.success) {
                    setInWishlist(true)
                    toast.success(`${productName} added to wishlist!`)
                } else {
                    toast.error(data.error || "Failed to add to wishlist")
                }
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`
                transition-all
                ${inWishlist
                    ? "text-red-600"
                    : "text-gray-400 hover:text-red-600"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart
                size={24}
                className={inWishlist ? "fill-current" : ""}
            />
        </button>
    )
}
