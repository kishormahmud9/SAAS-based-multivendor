"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import BrandForm from "@/components/admin/BrandForm"
import { ChevronLeft, Award, Loader2 } from "lucide-react"
import Link from "next/link"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function EditBrandPage() {
    const params = useParams()
    const router = useRouter()
    const [brand, setBrand] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            fetchBrand()
        }
    }, [params.id])

    const fetchBrand = async () => {
        try {
            const res = await adminService.getBrandById(params.id as string)
            if (res.success) {
                setBrand(res.data)
            }
        } catch (error) {
            toast.error("Failed to load brand data")
            router.push("/admin/brands")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <Loader2 className="animate-spin text-orange-500" size={40} />
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Loading brand profile...</p>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link 
                    href="/admin/brands"
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-orange-500 transition-all shadow-sm group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                        <Award size={12} />
                        Brand Hub
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Edit Brand: <span className="text-orange-500">{brand?.name}</span></h1>
                </div>
            </div>

            <div>
                <BrandForm initialData={brand} isEdit={true} />
            </div>
        </div>
    )
}
