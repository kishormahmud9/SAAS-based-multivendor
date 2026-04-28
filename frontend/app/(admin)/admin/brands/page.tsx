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
    XCircle,
    Package
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function AdminBrandsPage() {
    const [brands, setBrands] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [newBrand, setNewBrand] = useState({ name: "", slug: "", logo: "", isActive: true })

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = async () => {
        setLoading(true)
        try {
            const res = await adminService.getBrands()
            if (res.success) {
                setBrands(res.data)
            }
        } catch (error) {
            toast.error("Failed to fetch brands")
        } finally {
            setLoading(false)
        }
    }

    const handleAddBrand = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await adminService.createBrand(newBrand)
            if (res.success) {
                toast.success("Brand created")
                setIsAddModalOpen(false)
                setNewBrand({ name: "", slug: "", logo: "", isActive: true })
                fetchBrands()
            }
        } catch (error) {
            toast.error("Failed to create brand")
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure? This will affect products associated with this brand.")) return
        try {
            const res = await adminService.deleteBrand(id)
            if (res.success) {
                toast.success("Brand deleted")
                fetchBrands()
            }
        } catch (error) {
            toast.error("Delete failed")
        }
    }

    const filteredBrands = brands.filter(b => 
        b.name.toLowerCase().includes(search.toLowerCase()) || 
        b.slug.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Award className="text-orange-500" size={32} />
                        Brand Management
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage the global brands available in your marketplace.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                    <Plus size={18} />
                    Register Brand
                </button>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search brands..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Brands Table Style */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Brand Info</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Slug</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Products</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredBrands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 font-bold border border-gray-100 dark:border-gray-700">
                                                {brand.name[0]}
                                            </div>
                                            <span className="text-sm font-black text-gray-900 dark:text-white">{brand.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-sm font-medium text-gray-500">{brand.slug}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 dark:text-gray-400">
                                            <Package size={14} className="text-gray-400" />
                                            {brand._count?.products || 0}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${brand.isActive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/20'}`}>
                                            {brand.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-orange-500 transition-all">
                                                <Edit size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(brand.id)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-500 transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-8 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Register Brand</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                                <XCircle size={24} className="text-gray-400" />
                            </button>
                        </div>
                        <form onSubmit={handleAddBrand} className="space-y-6">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Brand Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={newBrand.name}
                                    onChange={(e) => setNewBrand({...newBrand, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white font-bold"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-[1.02]"
                            >
                                Save Brand
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
