"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
    Sliders, 
    Plus, 
    Trash2, 
    Settings, 
    Loader2, 
    ChevronLeft,
    ChevronRight,
    Search,
    Edit,
    CheckSquare,
    Square,
    AlertCircle,
    Activity
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function AdminAttributesPage() {
    const [attributes, setAttributes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    // Modals
    const [attrToDelete, setAttrToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchAttributes()
    }, [page, search])

    const fetchAttributes = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                search,
            }).toString()
            const res = await adminService.getAttributes(params)
            if (res.success) {
                setAttributes(res.data)
                setTotal(res.meta.total)
            }
        } catch (error) {
            toast.error("Failed to fetch attributes")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (id: string) => {
        setAttrToDelete(id)
    }

    const confirmDelete = async () => {
        if (!attrToDelete) return
        setIsDeleting(true)
        try {
            const res = await adminService.deleteAttribute(attrToDelete)
            if (res.success) {
                toast.success("Attribute deleted successfully")
                setAttrToDelete(null)
                fetchAttributes()
            }
        } catch (error: any) {
            toast.error(error.message || "Delete failed")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const res = await adminService.updateAttribute(id, { isActive: !currentStatus })
            if (res.success) {
                toast.success("Status updated")
                setAttributes(attributes.map(a => a.id === id ? { ...a, isActive: !currentStatus } : a))
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status")
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Sliders className="text-orange-500" size={32} />
                        Global Attributes
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage reusable product properties for variants and filtering.</p>
                </div>
                <Link 
                    href="/admin/product-attributes/create"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                    <Plus size={18} />
                    New Attribute
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search attributes by name or slug..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-6">
                {loading ? (
                    <div className="flex items-center justify-center h-64 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : attributes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-center">
                        <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300 mb-4">
                            <Sliders size={40} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">No Attributes Found</h3>
                        <p className="text-sm text-gray-500 mt-2">Start by creating your first global product attribute.</p>
                        <Link 
                            href="/admin/product-attributes/create"
                            className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all"
                        >
                            Create Attribute
                        </Link>
                    </div>
                ) : (
                    attributes.map((attr) => (
                        <div key={attr.id} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-orange-500/30 transition-all">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-orange-500 border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <Settings size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white">{attr.name}</h3>
                                            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${attr.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                {attr.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                                            {attr.type} Display • {attr.slug}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex-1 flex flex-wrap gap-2">
                                    {attr.values?.map((v: any) => (
                                        <span key={v.id} className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                                            {v.value}
                                        </span>
                                    ))}
                                    {attr.values?.length === 0 && (
                                        <span className="text-xs text-gray-400 font-medium italic">No values defined</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => handleToggleStatus(attr.id, attr.isActive)}
                                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attr.isActive ? 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100' : 'bg-rose-50 text-rose-500 hover:bg-rose-100'}`}
                                        title={attr.isActive ? "Deactivate" : "Activate"}
                                    >
                                        <Activity size={18} />
                                    </button>
                                    <Link 
                                        href={`/admin/product-attributes/edit/${attr.id}`}
                                        className="w-10 h-10 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(attr.id)}
                                        className="w-10 h-10 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {total > 10 && (
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 disabled:opacity-50">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-black text-gray-500">Page {page}</span>
                    <button onClick={() => setPage(p => p + 1)} disabled={attributes.length < 10} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 disabled:opacity-50">
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            <ConfirmModal
                isOpen={!!attrToDelete}
                onClose={() => setAttrToDelete(null)}
                onConfirm={confirmDelete}
                title="Delete Attribute"
                message="Are you sure you want to delete this attribute? This will remove it from all products and cannot be undone."
                confirmText="Delete Now"
                isLoading={isDeleting}
            />
        </div>
    )
}
