"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Box, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import ProductForm from "@/components/admin/ProductForm"

export default function AdminEditProductPage() {
    const router = useRouter()
    const params = useParams()
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params?.id) {
            fetchProduct()
        }
    }, [params?.id])

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const res = await adminService.getProductById(params.id as string)
            if (res.success) {
                setProduct(res.data)
            } else {
                toast.error("Product not found")
                router.push("/admin/products")
            }
        } catch (error) {
            toast.error("Failed to load product")
            router.push("/admin/products")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 size={48} className="animate-spin text-orange-500" />
                <p className="text-gray-500 font-bold animate-pulse">Retrieving product catalog...</p>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <Link 
                    href="/admin/products"
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-orange-500 transition-all shadow-sm group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                        <Box size={12} />
                        Catalogue Editor
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white truncate max-w-md">Edit: {product?.name}</h1>
                </div>
            </div>

            <ProductForm 
                initialData={product}
                isEdit={true}
                onSuccess={() => router.push("/admin/products")} 
                onCancel={() => router.back()} 
            />
        </div>
    )
}
