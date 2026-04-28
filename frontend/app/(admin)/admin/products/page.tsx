"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Copy,
    ChevronLeft,
    ChevronRight,
    Package,
    AlertCircle,
    Download,
    CheckSquare,
    Square,
    Loader2,
    Eye,
    Tag,
    FolderTree,
    Award
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function AdminProductListPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchProducts()
    }, [page, search])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                search: search
            }).toString()
            const res = await adminService.getProducts(params)
            if (res.success) {
                setProducts(res.data)
            }
        } catch (error) {
            toast.error("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product? This will soft-delete the item.")) return
        try {
            const res = await adminService.deleteProduct(id)
            if (res.success) {
                toast.success("Product deleted successfully")
                fetchProducts()
            }
        } catch (error) {
            toast.error("Delete failed")
        }
    }

    const toggleSelect = (id: string) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(p => p !== id))
        } else {
            setSelectedProducts([...selectedProducts, id])
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Package className="text-orange-500" size={32} />
                        Marketplace Inventory
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage all products across the platform, including system and vendor items.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2">
                        <Download size={18} /> Export CSV
                    </button>
                    <Link href="/admin/products/create" className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                        <Plus size={18} />
                        Add New Product
                    </Link>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Active Items", value: products.filter(p => p.status === 'ACTIVE').length, icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Drafts", value: products.filter(p => p.status === 'DRAFT').length, icon: Edit, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
                    { label: "Low Stock", value: products.filter(p => p.stock < 10).length, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, SKU or slug..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                        <Filter size={18} /> Filters
                    </button>
                </div>
            </div>

            {/* Products Table */}
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
                                    <th className="px-6 py-5 w-12">
                                        <button onClick={() => setSelectedProducts(selectedProducts.length === products.length ? [] : products.map(p => p.id))}>
                                            {selectedProducts.length === products.length && products.length > 0 ? <CheckSquare className="text-orange-500" size={20} /> : <Square className="text-gray-300" size={20} />}
                                        </button>
                                    </th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Info</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category & Brand</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Pricing</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300">
                                                    <Package size={32} />
                                                </div>
                                                <p className="text-gray-500 font-bold">No products found</p>
                                                <Link href="/admin/products/create" className="text-orange-500 text-sm font-black hover:underline">Add your first product</Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                            <td className="px-6 py-4">
                                                <button onClick={() => toggleSelect(product.id)}>
                                                    {selectedProducts.includes(product.id) ? <CheckSquare className="text-orange-500" size={20} /> : <Square className="text-gray-300 group-hover:text-gray-400" size={20} />}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
                                                        <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{product.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">SKU: {product.sku || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                        <FolderTree size={12} className="text-orange-400" />
                                                        {product.category?.name || 'Uncategorized'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                                        <Award size={12} className="text-blue-400" />
                                                        {product.brand?.name || 'Generic'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white">${product.price}</p>
                                                    {product.salePrice && (
                                                        <p className="text-[10px] text-emerald-500 font-bold">On Sale: ${product.salePrice}</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-black ${product.stock === 0 ? "text-rose-500" : product.stock < 10 ? "text-orange-500" : "text-gray-700 dark:text-gray-300"}`}>
                                                        {product.stock}
                                                    </span>
                                                    {product.stock < 10 && <AlertCircle size={14} className={product.stock === 0 ? "text-rose-500" : "text-orange-500"} />}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                    product.status === 'ACTIVE' || product.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                    product.status === 'DRAFT' ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' :
                                                    'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                                }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link href={`/product/${product.slug}`} target="_blank" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100">
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link href={`/admin/products/edit/${product.id}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-orange-600 transition-all border border-transparent hover:border-orange-100">
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(product.id)}
                                                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
