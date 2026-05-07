"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
    ChevronLeft, 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    Award,
    Loader2,
    CheckSquare,
    Square,
    Package,
    ChevronRight,
    Image as ImageIcon
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"
import Image from "next/image"
import ConfirmModal from "@/components/ui/ConfirmModal"
import DynamicPagination from "@/components/admin/DynamicPagination"

export default function AdminBrandsPage() {
    const [brands, setBrands] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [isActiveFilter, setIsActiveFilter] = useState<string>("all")
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(10)
    const totalPages = Math.ceil(total / limit)

    // Modal States
    const [brandToDelete, setBrandToDelete] = useState<string | null>(null)
    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchBrands()
    }, [page, limit, search, isActiveFilter])

    const fetchBrands = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                search,
                ...(isActiveFilter !== "all" && { isActive: isActiveFilter })
            }).toString()
            const res = await adminService.getBrands(params)
            if (res.success) {
                setBrands(res.data)
                setTotal(res.meta.total)
            }
        } catch (error) {
            toast.error("Failed to fetch brands")
        } finally {
            setLoading(false)
        }
    }

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await adminService.updateBrand(id, { isActive: !currentStatus })
            if (res.success) {
                toast.success("Status updated")
                setBrands(brands.map(b => b.id === id ? { ...b, isActive: !currentStatus } : b))
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status")
        }
    }

    const handleDelete = (id: string) => {
        setBrandToDelete(id)
    }

    const confirmDelete = async () => {
        if (!brandToDelete) return
        
        setIsDeleting(true)
        try {
            const res = await adminService.deleteBrand(brandToDelete)
            if (res.success) {
                toast.success("Brand deleted")
                setBrandToDelete(null)
                fetchBrands()
            }
        } catch (error: any) {
            toast.error(error.message || "Delete failed")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleBulkStatus = async (isActive: boolean) => {
        if (!selectedIds.length) return
        try {
            await adminService.bulkUpdateBrandStatus(selectedIds, isActive)
            toast.success("Bulk status updated")
            setSelectedIds([])
            fetchBrands()
        } catch (error) {
            toast.error("Bulk update failed")
        }
    }

    const handleBulkDelete = () => {
        if (!selectedIds.length) return
        setIsBulkDeleteModalOpen(true)
    }

    const confirmBulkDelete = async () => {
        setIsDeleting(true)
        try {
            await adminService.bulkDeleteBrands(selectedIds)
            toast.success("Bulk delete completed")
            setSelectedIds([])
            setIsBulkDeleteModalOpen(false)
            fetchBrands()
        } catch (error) {
            toast.error("Bulk delete failed")
        } finally {
            setIsDeleting(false)
        }
    }

    const toggleSelectAll = () => {
        if (selectedIds.length === brands.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(brands.map(b => b.id))
        }
    }

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id))
        } else {
            setSelectedIds([...selectedIds, id])
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Award className="text-orange-500" size={32} />
                        Brand Hub
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage global brands and their market presence.</p>
                </div>
                <Link 
                    href="/admin/brands/create"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                    <Plus size={18} />
                    New Brand
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search brands by name or slug..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                    />
                </div>
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

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-100 dark:border-orange-800 flex items-center justify-between animate-in slide-in-from-top-2">
                    <span className="text-sm font-black text-orange-600 ml-2">{selectedIds.length} items selected</span>
                    <div className="flex items-center gap-2">
                        <button onClick={() => handleBulkStatus(true)} className="px-4 py-2 bg-white dark:bg-gray-900 text-emerald-600 rounded-xl text-xs font-black shadow-sm border border-emerald-100 transition-colors hover:bg-emerald-50">Activate</button>
                        <button onClick={() => handleBulkStatus(false)} className="px-4 py-2 bg-white dark:bg-gray-900 text-amber-600 rounded-xl text-xs font-black shadow-sm border border-amber-100 transition-colors hover:bg-amber-50">Deactivate</button>
                        <button onClick={handleBulkDelete} className="px-4 py-2 bg-white dark:bg-gray-900 text-rose-600 rounded-xl text-xs font-black shadow-sm border border-rose-100 transition-colors hover:bg-rose-50">Delete</button>
                    </div>
                </div>
            )}

            {/* Brands Table */}
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
                                    <th className="px-6 py-5 w-12 text-center">
                                        <button onClick={toggleSelectAll}>
                                            {selectedIds.length === brands.length && brands.length > 0 ? <CheckSquare className="text-orange-500" size={20} /> : <Square className="text-gray-300" size={20} />}
                                        </button>
                                    </th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Brand Info</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Products</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {brands.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-20 text-center">
                                            <p className="text-gray-500 font-bold">No brands found.</p>
                                        </td>
                                    </tr>
                                ) : brands.map((brand) => (
                                    <tr key={brand.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => toggleSelect(brand.id)}>
                                                {selectedIds.includes(brand.id) ? <CheckSquare className="text-orange-500" size={20} /> : <Square className="text-gray-300 group-hover:text-gray-400" size={20} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 flex items-center justify-center relative">
                                                    {brand.logo ? (
                                                        <Image 
                                                            src={getImageUrl(brand.logo)} 
                                                            alt={brand.name}
                                                            fill
                                                            unoptimized
                                                            className="object-contain p-2" 
                                                        />
                                                    ) : (
                                                        <div className="text-sm font-black text-gray-300 uppercase">{brand.name[0]}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{brand.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{brand.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Package className="text-gray-300" size={16} />
                                                <span className="text-sm font-black text-gray-700 dark:text-gray-300">
                                                    {brand._count?.products || 0}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => handleToggleStatus(brand.id, brand.isActive)}
                                                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                                    brand.isActive 
                                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                                }`}
                                            >
                                                {brand.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/brands/edit/${brand.id}`} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-orange-500 rounded-xl transition-all">
                                                    <Edit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(brand.id)} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-500 rounded-xl transition-all">
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

            {/* Pagination */}
            {total > 0 && (
                <DynamicPagination
                    page={page}
                    totalPages={totalPages}
                    limit={limit}
                    totalItems={total}
                    onPageChange={setPage}
                    onLimitChange={(l) => {
                        setLimit(l)
                        setPage(1)
                    }}
                />
            )}

            {/* Delete Confirmation Modals */}
            <ConfirmModal
                isOpen={!!brandToDelete}
                onClose={() => setBrandToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Brand"
                message="Are you sure you want to delete this brand? This action cannot be undone and will fail if products are linked."
                confirmText="Delete Now"
                isLoading={isDeleting}
            />

            <ConfirmModal
                isOpen={isBulkDeleteModalOpen}
                onClose={() => setIsBulkDeleteModalOpen(false)}
                onConfirm={confirmBulkDelete}
                title="Bulk Delete Brands"
                message={`Are you sure you want to delete ${selectedIds.length} brands? Brands with active products will be skipped for safety.`}
                confirmText="Delete Selected"
                isLoading={isDeleting}
            />
        </div>
    )
}
