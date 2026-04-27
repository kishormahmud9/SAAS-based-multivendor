"use client"

import { useState } from "react"
import {
    Boxes,
    Search,
    Filter,
    ArrowUpDown,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    TrendingDown,
    TrendingUp,
    Package,
    ArrowRight,
    RefreshCcw,
    History,
    MoreVertical,
    Plus,
    Minus,
    BarChart3,
    LocateFixed
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface StockItem {
    id: string
    name: string
    sku: string
    category: string
    currentStock: number
    minStock: number
    status: "in-stock" | "low-stock" | "out-of-stock"
    lastUpdated: string
    warehouse: string
}

const mockStock: StockItem[] = [
    { id: "1", name: "Classic Leather Loafers", sku: "FW-LOAF-V33", category: "Footwear", currentStock: 48, minStock: 10, status: "in-stock", lastUpdated: "2 hours ago", warehouse: "Main WH" },
    { id: "2", name: "Ultraboost Running Shoes", sku: "FW-UB-7WA", category: "Footwear", currentStock: 8, minStock: 15, status: "low-stock", lastUpdated: "5 hours ago", warehouse: "Main WH" },
    { id: "3", name: "Wireless Pro Headphones", sku: "EL-HP-92J", category: "Electronics", currentStock: 0, minStock: 5, status: "out-of-stock", lastUpdated: "1 day ago", warehouse: "Tech Zone" },
    { id: "4", name: "Gym Duffel Bag", sku: "SP-BAG-LC4", category: "Sports", currentStock: 36, minStock: 8, status: "in-stock", lastUpdated: "30 mins ago", warehouse: "East Coast" },
    { id: "5", name: "Carbon Fiber Tennis Racket", sku: "SP-TEN-1P1", category: "Sports", currentStock: 4, minStock: 10, status: "low-stock", lastUpdated: "12 hours ago", warehouse: "Main WH" },
    { id: "6", name: "Stainless Steel Water Bottle", sku: "HK-WAT-6SE", category: "Home & Kitchen", currentStock: 124, minStock: 20, status: "in-stock", lastUpdated: "45 mins ago", warehouse: "Main WH" },
    { id: "7", name: "Eco-Friendly Yoga Mat", sku: "SP-YOG-B6U", category: "Sports", currentStock: 15, minStock: 20, status: "low-stock", lastUpdated: "6 hours ago", warehouse: "East Coast" }
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function StockManagerPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [stockItems, setStockItems] = useState(mockStock)

    const filteredItems = stockItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const lowStockCount = stockItems.filter(item => item.status === "low-stock").length
    const outOfStockCount = stockItems.filter(item => item.status === "out-of-stock").length

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Boxes size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Stock Manager
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Real-time inventory tracking, low stock alerts, and multi-warehouse management.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <History size={18} />
                        <span className="hidden sm:inline">Stock Logs</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all active:scale-95 group">
                        <Plus size={20} />
                        <span>Update Batch</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Total Inventory", value: "256", icon: Package, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30", sub: "Items in catatog" },
                    { label: "Low Stock Alert", value: lowStockCount.toString(), icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/30", sub: "Require attention" },
                    { label: "Out of Stock", value: outOfStockCount.toString(), icon: XCircle, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/30", sub: "Zero inventory" },
                    { label: "Total Valuation", value: "৳4.2M", icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30", sub: "Asset value" },
                ].map(stat => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                    <Icon size={24} />
                                </div>
                                <div className="text-gray-400">
                                    <TrendingUp size={16} className="text-emerald-500 mb-1" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">+12%</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                                <p className="text-sm font-bold text-gray-400 capitalize">{stat.label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by SKU or Product name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <select className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-emerald-500 transition-all border-none">
                        <option>All Warehouses</option>
                        <option>Main WH</option>
                        <option>East Coast</option>
                        <option>Tech Zone</option>
                    </select>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Stock List Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Product Details</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Warehouse</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">Stock Level</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-right">Inventory Adjust</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                                                <Package size={22} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 dark:text-white leading-tight mb-0.5">{item.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SKU: {item.sku}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-sm text-gray-600 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <LocateFixed size={14} className="text-gray-400" />
                                            {item.warehouse}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-2 font-black text-lg text-gray-900 dark:text-white">
                                                {item.currentStock}
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">units</span>
                                            </div>
                                            <div className="w-24 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full rounded-full ${item.status === 'in-stock' ? 'bg-emerald-500' : item.status === 'low-stock' ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${Math.min(100, (item.currentStock / (item.minStock * 2)) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        {item.status === "in-stock" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
                                                <CheckCircle2 size={14} />
                                                <span>In Stock</span>
                                            </div>
                                        ) : item.status === "low-stock" ? (
                                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-sm bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full w-fit">
                                                <AlertTriangle size={14} />
                                                <span>Low Stock</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-bold text-sm bg-red-50 dark:bg-red-900/10 px-3 py-1 rounded-full w-fit">
                                                <XCircle size={14} />
                                                <span>Out of Stock</span>
                                            </div>
                                        )}
                                        <p className="text-[10px] text-gray-400 font-bold mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">Updated {item.lastUpdated}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-emerald-100 hover:text-emerald-600 dark:hover:bg-emerald-900/30 transition-all">
                                                <Plus size={18} />
                                            </button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 transition-all">
                                                <Minus size={18} />
                                            </button>
                                            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reorder Recommendation Box */}
            <div className="bg-gradient-to-tr from-gray-900 to-gray-800 dark:from-black dark:to-gray-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Boxes size={120} />
                </div>
                <div className="relative z-10 space-y-2 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-amber-500/30">
                        <AlertTriangle size={14} />
                        Priority Reorder
                    </div>
                    <h3 className="text-2xl font-black">Refill Request for Footwear</h3>
                    <p className="text-gray-400 max-w-lg">Based on sales velocity, <span className="text-white font-bold">12 items</span> in the Footwear category are predicted to be out of stock within next 5 days.</p>
                </div>
                <button className="relative z-10 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-3 active:scale-95 shadow-xl">
                    <ArrowRight size={20} />
                    <span>Generate PO</span>
                </button>
            </div>

        </div>
    )
}
