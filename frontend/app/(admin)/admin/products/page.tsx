"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Package,
    AlertCircle,
    Download,
    CheckSquare,
    Square,
    Loader2,
    Eye,
    FolderTree,
    Award,
    MoreHorizontal
} from "lucide-react"
import Image from "next/image"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { getImageUrl } from "@/src/lib/image-utils"

export default function AdminProductListPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [status, setStatus] = useState("")
    const [meta, setMeta] = useState<any>(null)
    const [summary, setSummary] = useState<any>(null)
    const [categories, setCategories] = useState<any[]>([])
    const [brands, setBrands] = useState<any[]>([])
    
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchInitialData()
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [page, search, category, brand, status])

    const fetchInitialData = async () => {
        try {
            const [catRes, brandRes] = await Promise.all([
                adminService.getCategories(),
                adminService.getBrands()
            ])
            if (catRes.success) setCategories(catRes.data)
            if (brandRes.success) setBrands(brandRes.data)
        } catch (error) {
            console.error("Failed to fetch filter data", error)
        }
    }

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                search: search,
                category: category,
                brand: brand,
                status: status
            }).toString()
            const res = await adminService.getProducts(params)
            if (res.success) {
                setProducts(res.data)
                setMeta(res.meta)
                setSummary(res.summary)
            }
        } catch (error) {
            toast.error("Failed to fetch products")
        } finally {
            setLoading(false)
        }
    }

    const handleSearchChange = (val: string) => {
        setSearch(val)
        setPage(1) // Reset to first page on search
    }

    const openDeleteModal = (id: string) => {
        setProductToDelete(id)
        setIsDeleteModalOpen(true)
    }

    const confirmDelete = async () => {
        if (!productToDelete) return
        setIsDeleting(true)
        try {
            const res = await adminService.deleteProduct(productToDelete)
            if (res.success) {
                toast.success("Product deleted successfully")
                fetchProducts()
            }
        } catch (error) {
            toast.error("Delete failed")
        } finally {
            setIsDeleting(false)
            setIsDeleteModalOpen(false)
            setProductToDelete(null)
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
                    { label: "Total Products", value: summary?.total || 0, icon: Package, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Active Items", value: summary?.active || 0, icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Drafts", value: summary?.draft || 0, icon: Edit, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
                    { label: "Low Stock", value: summary?.lowStock || 0, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
                        <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
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
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, SKU or slug..."
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm font-medium"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select 
                            className="flex-1 md:w-40 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <select 
                            className="flex-1 md:w-40 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            value={brand}
                            onChange={(e) => { setBrand(e.target.value); setPage(1); }}
                        >
                            <option value="">All Brands</option>
                            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                        <select 
                            className="flex-1 md:w-40 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            value={status}
                            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                        >
                            <option value="">All Status</option>
                            <option value="ACTIVE">Active</option>
                            <option value="DRAFT">Draft</option>
                            <option value="INACTIVE">Inactive</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : (
                    <>
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
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Stock</th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Status</th>
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
                                                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700 flex items-center justify-center relative group-hover:border-orange-200 transition-all">
                                                            {product.images && product.images.length > 0 ? (
                                                                <Image 
                                                                    src={getImageUrl(product.images[0])} 
                                                                    alt={product.name} 
                                                                    fill
                                                                    unoptimized
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                                    onError={(e) => {
                                                                        (e.target as any).style.display = 'none';
                                                                        (e.target as any).nextSibling.style.display = 'flex';
                                                                    }}
                                                                />
                                                            ) : null}
                                                            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 text-gray-400 font-black text-xl ${product.images && product.images.length > 0 ? 'hidden' : 'flex'}`}>
                                                                {product.name.charAt(0).toUpperCase()}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-gray-900 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">{product.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">SKU: {product.sku || 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                                            <FolderTree size={12} className="text-orange-400" />
                                                            {product.category?.name || 'Uncategorized'}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
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
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <span className={`text-sm font-black ${product.stock === 0 ? "text-rose-500" : product.stock < 10 ? "text-orange-500" : "text-gray-700 dark:text-gray-300"}`}>
                                                            {product.stock}
                                                        </span>
                                                        {product.stock < 10 && <AlertCircle size={12} className={product.stock === 0 ? "text-rose-500" : "text-orange-500"} />}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                        product.status === 'ACTIVE' || product.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                        product.status === 'DRAFT' ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' :
                                                        'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                                    }`}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link 
                                                            href={`/admin/products/${product.id}/view`} 
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all border border-transparent hover:border-blue-100"
                                                            title="Quick View"
                                                        >
                                                            <Eye size={16} />
                                                        </Link>
                                                        <Link 
                                                            href={`/admin/products/edit/${product.id}`} 
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 transition-all border border-transparent hover:border-orange-100"
                                                            title="Edit Product"
                                                        >
                                                            <Edit size={16} />
                                                        </Link>
                                                        <button 
                                                            onClick={() => openDeleteModal(product.id)}
                                                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all border border-transparent hover:border-rose-100"
                                                            title="Delete Product"
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

                        {/* Pagination */}
                        {meta && meta.totalPage > 1 && (
                            <div className="px-6 py-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                <p className="text-xs font-bold text-gray-500">
                                    Showing <span className="text-gray-900 dark:text-white">{(meta.page - 1) * meta.limit + 1}</span> to <span className="text-gray-900 dark:text-white">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="text-gray-900 dark:text-white">{meta.total}</span> products
                                </p>
                                <div className="flex items-center gap-2">
                                    <button 
                                        disabled={meta.page === 1}
                                        onClick={() => setPage(meta.page - 1)}
                                        className="px-4 py-2 text-xs font-black bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-100 transition-all border border-gray-100 dark:border-gray-700"
                                    >
                                        Previous
                                    </button>
                                    {[...Array(meta.totalPage)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-black transition-all ${meta.page === i + 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button 
                                        disabled={meta.page === meta.totalPage}
                                        onClick={() => setPage(meta.page + 1)}
                                        className="px-4 py-2 text-xs font-black bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl disabled:opacity-50 hover:bg-gray-100 transition-all border border-gray-100 dark:border-gray-700"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action will move it to the archive and it will no longer be visible to customers."
                confirmText="Yes, Delete"
                variant="danger"
                isLoading={isDeleting}
            />
        </div>
    )
}
