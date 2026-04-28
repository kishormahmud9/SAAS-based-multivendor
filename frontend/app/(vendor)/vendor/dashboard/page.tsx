"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Package,
    ShoppingBag,
    CheckCircle,
    Clock,
    TrendingUp,
    Wallet,
    AlertTriangle,
    Star,
    Plus,
    ArrowUpRight,
    Activity,
    CreditCard,
    BarChart3,
    PieChart,
    MousePointer2,
    Target,
    Zap,
    Loader2
} from "lucide-react"
import { vendorService } from "@/src/services/vendor.service"

export default function VendorDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const data = await vendorService.getStats()
            if (data.success) {
                setStats(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch stats")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        )
    }

    const summaryCards = [
        { title: "Monthly Revenue", value: `$${stats?.totalRevenue || 0}`, icon: TrendingUp, gradient: "from-blue-600 to-indigo-600", trend: "+12.5%" },
        { title: "Active Orders", value: stats?.totalOrders || 0, icon: ShoppingBag, gradient: "from-emerald-600 to-teal-600", trend: "Normal" },
        { title: "Wallet Balance", value: `$${stats?.walletBalance || 0}`, icon: Wallet, gradient: "from-amber-600 to-orange-600", trend: "Ready" },
        { title: "Total Products", value: stats?.totalProducts || 0, icon: Package, gradient: "from-fuchsia-600 to-pink-600", trend: "Catalog" },
    ]

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                        Vendor Performance
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1.5 font-medium">
                        Comprehensive overview of your store's health and sales metrics.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm">
                        <Clock size={18} className="text-blue-500" />
                        Live Reports
                    </button>
                    <Link href="/vendor/products/add" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105">
                        <Plus size={18} />
                        Add Product
                    </Link>
                </div>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryCards.map(stat => (
                    <div key={stat.title} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.title}</p>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                                <span className="text-[10px] font-bold text-emerald-500">{stat.trend}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Placeholder for real charts using stats data in future */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Revenue Growth</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                        <p className="text-gray-400 font-bold">Chart integration pending real sales history</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Category Share</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                        <p className="text-gray-400 font-bold">Chart integration pending</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
