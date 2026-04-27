"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Search,
    Filter,
    Plus,
    MoreVertical,
    Edit,
    Trash2,
    Copy,
    Eye,
    ChevronLeft,
    ChevronRight,
    Package,
    AlertCircle,
    ArrowUpDown,
    Download,
    CheckSquare,
    Square,
    X
} from "lucide-react"

const MOCK_PRODUCTS = [
    { id: 1, name: "Wireless Headphones", sku: "WH-100", category: "Electronics", price: "$120.00", stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" },
    { id: 2, name: "Smart Watch Pro", sku: "SW-PRO", category: "Electronics", price: "$89.99", stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" },
    { id: 3, name: "LED Desk Lamp", sku: "LED-DL", category: "Home", price: "$35.00", stock: 0, status: "Out of Stock", image: "https://images.unsplash.com/photo-1534073828943-f801091bb270?w=100&h=100&fit=crop" },
    { id: 4, name: "Mechanical Keyboard", sku: "MK-700", category: "Computing", price: "$150.00", stock: 28, status: "Draft", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop" },
    { id: 5, name: "Yoga Mat Premium", sku: "YM-PREM", category: "Fitness", price: "$45.00", stock: 105, status: "Active", image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=100&h=100&fit=crop" },
]

export default function ProductListPage() {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([])

    const toggleSelect = (id: number) => {
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
                        <Package className="text-blue-600" size={32} />
                        Products Inventory
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage, filter and track your product listings across categories.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                        <Download size={18} />
                        Export
                    </button>
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
                        placeholder="Search products by name, SKU or category..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                        <Filter size={18} />
                        Filters
                    </button>
                    <button className="flex-1 md:flex-none px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                        <ArrowUpDown size={18} />
                        Sort
                    </button>
                </div>
            </div>

            {/* Bulk Actions (Conditional) */}
            {selectedProducts.length > 0 && (
                <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-4">
                        <CheckSquare size={20} />
                        <span className="text-sm font-black uppercase tracking-widest">{selectedProducts.length} Products Selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-black transition-all">Bulk Edit</button>
                        <button className="px-4 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-xs font-black transition-all">Delete Selected</button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg" onClick={() => setSelectedProducts([])}>
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-6 py-5 w-12">
                                    <button onClick={() => setSelectedProducts(selectedProducts.length === MOCK_PRODUCTS.length ? [] : MOCK_PRODUCTS.map(p => p.id))}>
                                        {selectedProducts.length === MOCK_PRODUCTS.length ? <CheckSquare className="text-blue-600" size={20} /> : <Square className="text-gray-300" size={20} />}
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
                            {MOCK_PRODUCTS.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-6 py-4">
                                        <button onClick={() => toggleSelect(product.id)}>
                                            {selectedProducts.includes(product.id) ? <CheckSquare className="text-blue-600" size={20} /> : <Square className="text-gray-300 group-hover:text-gray-400" size={20} />}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 border border-gray-200 dark:border-gray-700">
                                                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{product.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-black text-blue-600">{product.price}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-black ${product.stock === 0 ? "text-red-500" : product.stock < 15 ? "text-orange-500" : "text-gray-700 dark:text-gray-300"}`}>
                                                {product.stock}
                                            </span>
                                            {product.stock === 0 && <AlertCircle size={14} className="text-red-500" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${product.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                product.status === 'Draft' ? 'bg-gray-100 text-gray-500 dark:bg-gray-800' :
                                                    'bg-red-50 text-red-500 dark:bg-red-900/20'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                                                <Edit size={16} />
                                            </button>
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100">
                                                <Copy size={16} />
                                            </button>
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400">Showing 1 to 5 of 248 products</p>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30" disabled>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex items-center gap-1">
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white text-xs font-black shadow-lg shadow-blue-500/20">1</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-500 transition-colors">2</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-500 transition-colors">3</button>
                            <span className="px-2 text-gray-300">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-bold text-gray-500 transition-colors">48</button>
                        </div>
                        <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
