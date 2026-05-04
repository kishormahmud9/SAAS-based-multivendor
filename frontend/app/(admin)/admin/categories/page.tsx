"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
    ChevronLeft, 
    Plus, 
    Search, 
    Edit, 
    Trash2, 
    FolderTree, 
    Image as ImageIcon,
    MoreVertical,
    Loader2,
    CheckCircle,
    XCircle,
    ExternalLink,
    Filter,
    ChevronDown,
    ChevronRight,
    ArrowUpDown,
    CheckSquare,
    Square
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"
import Image from "next/image"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [isActiveFilter, setIsActiveFilter] = useState<string>("all")
    const [parentIdFilter, setParentIdFilter] = useState<string>("all")
    const [flatCategories, setFlatCategories] = useState<any[]>([])
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    // Modal States
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
    const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchFlatCategories()
    }, [])

    useEffect(() => {
        fetchCategories()
    }, [page, search, isActiveFilter, parentIdFilter])

    const fetchFlatCategories = async () => {
        try {
            const res = await adminService.getCategoryFlat()
            if (res.success) {
                setFlatCategories(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch flat categories")
        }
    }

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                search,
                ...(isActiveFilter !== "all" && { isActive: isActiveFilter }),
                ...(parentIdFilter !== "all" && { parentId: parentIdFilter })
            }).toString()
            const res = await adminService.getCategories(params)
            if (res.success) {
                setCategories(res.data)
                setTotal(res.meta.total)
            }
        } catch (error) {
            toast.error("Failed to fetch categories")
        } finally {
            setLoading(false)
        }
    }

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await adminService.updateCategory(id, { isActive: !currentStatus })
            if (res.success) {
                toast.success("Status updated")
                setCategories(categories.map(c => c.id === id ? { ...c, isActive: !currentStatus } : c))
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status")
        }
    }

    const handleDelete = (id: string) => {
        setCategoryToDelete(id)
    }

    const confirmDelete = async () => {
        if (!categoryToDelete) return
        
        setIsDeleting(true)
        try {
            const res = await adminService.deleteCategory(categoryToDelete)
            if (res.success) {
                toast.success("Category deleted")
                setCategoryToDelete(null)
                fetchCategories()
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
            await adminService.bulkUpdateCategoryStatus(selectedIds, isActive)
            toast.success("Bulk status updated")
            setSelectedIds([])
            fetchCategories()
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
            await adminService.bulkDeleteCategories(selectedIds)
            toast.success("Bulk delete completed")
            setSelectedIds([])
            setIsBulkDeleteModalOpen(false)
            fetchCategories()
        } catch (error) {
            toast.error("Bulk delete failed")
        } finally {
            setIsDeleting(false)
        }
    }

    const toggleSelectAll = () => {
        if (selectedIds.length === categories.length) {
            setSelectedIds([])
        } else {
            setSelectedIds(categories.map(c => c.id))
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
                        <FolderTree className="text-orange-500" size={32} />
                        Category Architecture
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage hierarchical store categories and sub-categories.</p>
                </div>
                <Link 
                    href="/admin/categories/create"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                    <Plus size={18} />
                    New Category
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <select 
                        value={parentIdFilter}
                        onChange={(e) => setParentIdFilter(e.target.value)}
                        className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="all">All Parent</option>
                        <option value="null">Root Only</option>
                        {flatCategories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

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
                        <button onClick={() => handleBulkStatus(true)} className="px-4 py-2 bg-white dark:bg-gray-900 text-emerald-600 rounded-xl text-xs font-black shadow-sm border border-emerald-100">Activate</button>
                        <button onClick={() => handleBulkStatus(false)} className="px-4 py-2 bg-white dark:bg-gray-900 text-amber-600 rounded-xl text-xs font-black shadow-sm border border-amber-100">Deactivate</button>
                        <button onClick={handleBulkDelete} className="px-4 py-2 bg-white dark:bg-gray-900 text-rose-600 rounded-xl text-xs font-black shadow-sm border border-rose-100">Delete</button>
                    </div>
                </div>
            )}

            {/* Categories Table */}
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
                                            {selectedIds.length === categories.length && categories.length > 0 ? <CheckSquare className="text-orange-500" size={20} /> : <Square className="text-gray-300" size={20} />}
                                        </button>
                                    </th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Parent</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Products</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {categories.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <p className="text-gray-500 font-bold">No categories found.</p>
                                        </td>
                                    </tr>
                                ) : categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => toggleSelect(category.id)}>
                                                {selectedIds.includes(category.id) ? <CheckSquare className="text-orange-500" size={20} /> : <Square className="text-gray-300 group-hover:text-gray-400" size={20} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 relative">
                                                    <Image 
                                                        src={getImageUrl(category.image)} 
                                                        alt={category.name}
                                                        fill
                                                        unoptimized
                                                        className="object-cover" 
                                                    />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{category.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{category.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-[10px] font-black text-orange-600 uppercase tracking-widest rounded-lg border border-orange-100 dark:border-orange-800/30">
                                                #{category.sortOrder}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {category.parent ? (
                                                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-[10px] font-black text-blue-600 uppercase tracking-widest rounded-lg">
                                                    {category.parent.name}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Root</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-black text-gray-700 dark:text-gray-300">
                                                {category._count?.products || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => handleToggleStatus(category.id, category.isActive)}
                                                className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                                                    category.isActive 
                                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                                    : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                                }`}
                                            >
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/categories/edit/${category.id}`} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-orange-500 rounded-xl transition-all">
                                                    <Edit size={16} />
                                                </Link>
                                                <button onClick={() => handleDelete(category.id)} className="p-2 bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-500 rounded-xl transition-all">
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

            {/* Pagination (Simplified) */}
            {total > 10 && (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 disabled:opacity-50">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-black text-gray-500">Page {page}</span>
                    <button onClick={() => setPage(p => p + 1)} disabled={categories.length < 10} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 disabled:opacity-50">
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modals */}
            <ConfirmModal
                isOpen={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone and will fail if products or sub-categories are linked."
                confirmText="Delete Now"
                isLoading={isDeleting}
            />

            <ConfirmModal
                isOpen={isBulkDeleteModalOpen}
                onClose={() => setIsBulkDeleteModalOpen(false)}
                onConfirm={confirmBulkDelete}
                title="Bulk Delete"
                message={`Are you sure you want to delete ${selectedIds.length} categories? Categories with active products or sub-categories will be skipped for safety.`}
                confirmText="Delete Selected"
                isLoading={isDeleting}
            />
        </div>
    )
}
