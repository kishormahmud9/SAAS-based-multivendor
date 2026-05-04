"use client"

import { useState, useEffect } from "react"
import BannerModal from "@/components/admin/modals/BannerModal"
import { toast } from "react-hot-toast"
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { getImageUrl } from "@/src/lib/image-utils"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function BannersPage() {
    const [banners, setBanners] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBanner, setSelectedBanner] = useState<any>(null)
    const [bannerToDelete, setBannerToDelete] = useState<string | null>(null)

    const fetchBanners = async () => {
        try {
            const res = await adminService.getBanners()
            if (res.success) {
                setBanners(res.data)
            }
        } catch (error) {
            toast.error("Failed to load banners")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBanners()
    }, [])

    const handleAdd = () => {
        setSelectedBanner(null)
        setIsModalOpen(true)
    }

    const handleEdit = (banner: any) => {
        setSelectedBanner(banner)
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        setBannerToDelete(null)
        try {
            const res = await adminService.deleteBanner(id)
            if (res.success) {
                toast.success("Banner deleted")
                fetchBanners()
            }
        } catch (error) {
            toast.error("Delete failed")
        }
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
                <div>
                     <h1 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                        <ImageIcon size={24} className="text-blue-900" />
                        Home Carousel Banners
                     </h1>
                     <p className="text-sm text-gray-500 dark:text-gray-400">Manage the main hero sliders for your home page.</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="bg-blue-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95"
                >
                    <Plus size={18} />
                    Add New Slide
                </button>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Preview</th>
                            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Title</th>
                            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Link</th>
                            <th className="p-4 text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {loading ? (
                            <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-medium">Loading slides...</td></tr>
                        ) : banners.length === 0 ? (
                            <tr><td colSpan={5} className="p-12 text-center text-gray-400 font-medium tracking-tight">No slides found. Create your first hero banner now.</td></tr>
                        ) : (
                            banners.map((banner) => (
                                <tr key={banner.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800 transition-colors group">
                                    <td className="p-4">
                                        <div className="w-16 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                                            {banner.backgroundType === "IMAGE" && banner.image && !banner.image.includes("bg-") ? (
                                                <img src={getImageUrl(banner.image)} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center text-[8px] text-white/70 font-bold ${banner.image || 'bg-gray-200 dark:bg-gray-800'}`}>
                                                    {banner.backgroundType === "SOLID" ? "COLOR" : banner.backgroundType}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900 dark:text-white">{banner.title}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${banner.backgroundType === 'IMAGE' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {banner.backgroundType}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm font-medium text-gray-400 truncate max-w-[150px] italic">{banner.link}</td>
                                    <td className="p-4 text-sm">
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(banner)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={16} /></button>
                                            <button onClick={() => setBannerToDelete(banner.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <BannerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchBanners}
                initialData={selectedBanner}
            />

            <ConfirmModal
                isOpen={!!bannerToDelete}
                onClose={() => setBannerToDelete(null)}
                onConfirm={() => bannerToDelete && handleDelete(bannerToDelete)}
                title="Delete Slide"
                message="Are you sure you want to delete this slide?"
                confirmText="Delete"
                variant="danger"
            />
        </div>
    );
}
