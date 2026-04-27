"use client"
import { Boxes, Package, AlertTriangle, TrendingUp, Filter, Search, Edit } from "lucide-react"

export default function InventoryPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Boxes className="text-emerald-600" size={32} />
                        Inventory Manager
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Real-time stock tracking, low stock alerts and restock management.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-500/20">Stock Audit</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Items", value: "8,420", icon: Package, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Low Stock", value: "15", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Out of Stock", value: "8", icon: TrendingUp, color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search by SKU or Name..." className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                    <button className="px-5 py-3 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-500 flex items-center gap-2"><Filter size={18} /> Filter Stock</button>
                </div>
                <div className="p-12 text-center">
                    <Boxes className="w-16 h-16 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">Inventory List</h3>
                    <p className="text-sm text-gray-500 mt-2">Loading your inventory items from the warehouse...</p>
                </div>
            </div>
        </div>
    )
}
