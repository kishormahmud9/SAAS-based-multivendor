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
    ArrowUpDown,
    Download,
    CheckSquare,
    Square,
    X,
    Loader2
} from "lucide-react"
import { vendorService } from "@/src/services/vendor.service"
import { toast } from "react-hot-toast"

export default function ProductListPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [pagination, setPagination] = useState<any>(null)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchProducts()
    }, [page, search])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await vendorService.getProducts({ page, limit: 10, search })
            if (res.success) {
                setProducts(res.data)
                setPagination(res.pagination)
            }
        } catch (error) {
            toast.error("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    const toggleSelect = (id: string) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(p => p !== id))
        } else {
            setSelectedProducts([...selectedProducts, id])
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return
        try {
            const res = await vendorService.deleteProduct(id)
            if (res.success) {
                toast.success("Product deleted")
                fetchProducts()
            }
        } catch (error) {
            toast.error("Delete failed")
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Package className="text-blue-600" size={32} />
                        Products Inventory
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage and track your product listings.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link href="/vendor/products/add" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                        <Plus size={18} />
                        Add Product
                    </Link>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-6 py-5 w-12">
                                        <button onClick={() => setSelectedProducts(selectedProducts.length === products.length ? [] : products.map(p => p.id))}>
                                            {selectedProducts.length === products.length && products.length > 0 ? <CheckSquare className="text-blue-600" size={20} /> : <Square className="text-gray-300" size={20} />}
                                        </button>
                                    </th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Product Info</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Category</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Stock</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                        <td className="px-6 py-4">
                                            <button onClick={() => toggleSelect(product.id)}>
                                                {selectedProducts.includes(product.id) ? <CheckSquare className="text-blue-600" size={20} /> : <Square className="text-gray-300 group-hover:text-gray-400" size={20} />}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
                                                    <img src={product.images?.[0] || "/placeholder.png"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{product.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">SKU: {product.sku || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-blue-600">${product.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-black ${product.stock === 0 ? "text-red-500" : product.stock < 15 ? "text-orange-500" : "text-gray-700 dark:text-gray-300"}`}>
                                                    {product.stock}
                                                </span>
                                                {product.stock === 0 && <AlertCircle size={14} className="text-red-500" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${product.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                    product.status === 'DRAFT' ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' :
                                                        'bg-red-50 text-red-500 dark:bg-red-900/20'
                                                }`}>
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/vendor/products/edit/${product.id}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                                                    <Edit size={16} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(product.id)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
                                                >
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

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-400">Showing {products.length} of {pagination.totalCount} products</p>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="text-sm font-bold text-gray-600 px-4">Page {page} of {pagination.totalPages}</span>
                            <button 
                                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                disabled={page === pagination.totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}
