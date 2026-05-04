"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
    ChevronLeft, 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Image as ImageIcon,
    Loader2,
    CheckCircle,
    XCircle,
    ChevronRight,
    Layout
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"
import Image from "next/image"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function AdminBannersPage() {
    const [banners, setBanners] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isActiveFilter, setIsActiveFilter] = useState<string>("all")
    const [bannerToDelete, setBannerToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchBanners()
    }, [isActiveFilter])

    const fetchBanners = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                ...(isActiveFilter !== "all" && { isActive: isActiveFilter })
            }).toString()
            const res = await adminService.getBanners(params)
            if (res.success) {
                setBanners(res.data)
            }
        } catch (error) {
            toast.error("Failed to fetch banners")
        } finally {
            setLoading(false)
        }
    }

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await adminService.updateBanner(id, { isActive: !currentStatus })
            if (res.success) {
                toast.success("Status updated")
                setBanners(banners.map(b => b.id === id ? { ...b, isActive: !currentStatus } : b))
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status")
        }
    }

    const handleDelete = (id: string) => {
        setBannerToDelete(id)
    }

    const confirmDelete = async () => {
        if (!bannerToDelete) return
        
        setIsDeleting(true)
        try {
            const res = await adminService.deleteBanner(bannerToDelete)
            if (res.success) {
                toast.success("Banner deleted")
                setBannerToDelete(null)
                fetchBanners()
            }
        } catch (error: any) {
            toast.error(error.message || "Delete failed")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Layout className="text-orange-500" size={32} />
                        Home Banners
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage homepage carousel sliders and promotional banners.</p>
                </div>
                <Link 
                    href="/admin/marketing/banners/create"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                    <Plus size={18} />
                    New Banner
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select 
                        value={isActiveFilter}
                        onChange={(e) => setIsActiveFilter(e.target.value)}
                        className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="true">Active Only</option>
                        <option value="false">Inactive Only</option>
                    </select>
                </div>
            </div>

            {/* Banners Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Banner</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {banners.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <p className="text-gray-500 font-bold">No banners found.</p>
                                        </td>
                                    </tr>
                                ) : banners.map((banner) => (
                                    <tr key={banner.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-24 h-12 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 relative">
                                                    <Image 
                                                        src={getImageUrl(banner.image)} 
                                                        alt={banner.title}
                                                        fill
                                                        unoptimized
                                                        className="object-cover" 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{banner.title}</p>
                                                    {banner.link && <p className="text-[10px] text-gray-400 font-bold truncate max-w-[200px]">{banner.link}</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-[10px] font-black text-blue-600 uppercase tracking-widest rounded-lg">
                                                {banner.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-gray-700 dark:text-gray-300">
                                            {banner.order}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => handleToggleStatus(banner.id, banner.isActive)}
                                                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                                    banner.isActive 
                                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                                }`}
                                            >
                                                {banner.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/marketing/banners/edit/${banner.id}`} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-orange-500 rounded-xl transition-all">
                                                    <Edit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(banner.id)} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-500 rounded-xl transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={!!bannerToDelete}
                onClose={() => setBannerToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Banner"
                message="Are you sure you want to delete this banner? This action cannot be undone."
                confirmText="Delete Now"
                isLoading={isDeleting}
            />
        </div>
    )
}
