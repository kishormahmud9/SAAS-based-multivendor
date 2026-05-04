"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Edit3, Loader2 } from "lucide-react"
import BannerForm from "@/components/admin/BannerForm"
import { adminService } from "@/src/services/admin.service"
import { useParams } from "next/navigation"

export default function AdminEditBannerPage() {
    const { id } = useParams()
    const [banner, setBanner] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchBanner()
        }
    }, [id])

    const fetchBanner = async () => {
        try {
            const res = await adminService.getBannerById(id as string)
            if (res.success) {
                setBanner(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch banner")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
        )
    }

    if (!banner) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 font-bold">Banner not found.</p>
                <Link href="/admin/marketing/banners" className="text-orange-600 hover:underline mt-4 inline-block font-black uppercase tracking-widest text-xs">Back to Banners</Link>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6">
                <Link href="/admin/marketing/banners" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-sm group">
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Edit3 className="text-orange-500" size={32} />
                        Edit Home Banner
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Update banner details and promotion link.</p>
                </div>
            </div>

            <BannerForm initialData={banner} isEdit />
        </div>
    )
}
