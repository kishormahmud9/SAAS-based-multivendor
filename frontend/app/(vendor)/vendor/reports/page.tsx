"use client"
import { BarChart3, TrendingUp, PieChart, Calendar, Download } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <BarChart3 className="text-blue-600" size={32} />
                        Reports & Analytics
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">In-depth analysis of your store's performance, traffic and sales trends.</p>
                </div>
                <button className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-black text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2">
                    <Download size={18} /> Export Full Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Sales Velocity", value: "+18.4%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Conversion Rate", value: "3.2%", icon: PieChart, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Active Shoppers", value: "1,240", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-6`}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-20 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center text-blue-600 animate-pulse">
                    <BarChart3 size={48} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Generating Your Analytics...</h3>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto">We're crunching the numbers for your latest sales. Your full performance dashboard will be ready in a moment.</p>
                </div>
            </div>
        </div>
    )
}
