"use client"

import { useState, useEffect } from "react"
import { 
    ShoppingBag, 
    CheckCircle, 
    XCircle, 
    Clock, 
    ArrowRight 
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
    // Mock data for UI design
    const [stats, setStats] = useState({
        totalOrders: 12,
        completed: 8,
        cancelled: 1,
        processing: 3
    })

    return (
        <div className="p-6 md:p-10 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard Overview</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's a brief summary of your activity.</p>
                </div>
                <Link 
                    href="/shop" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all shadow-lg"
                >
                    Continue Shopping
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-orange-50 dark:bg-orange-500/5 p-8 rounded-3xl border border-orange-100/50 dark:border-orange-500/10 shadow-sm">
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Total Orders</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-black text-gray-950 dark:text-white">{stats.totalOrders}</h3>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                            <ShoppingBag className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-500/5 p-8 rounded-3xl border border-orange-100/50 dark:border-orange-500/10 shadow-sm">
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">In Progress</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-black text-gray-950 dark:text-white">{stats.processing}</h3>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                            <Clock className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-500/5 p-8 rounded-3xl border border-orange-100/50 dark:border-orange-500/10 shadow-sm">
                    <p className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Completed</p>
                    <div className="flex items-end justify-between">
                        <h3 className="text-4xl font-black text-gray-950 dark:text-white">{stats.completed}</h3>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                            <CheckCircle className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-950 dark:text-white">Recent Orders</h2>
                    <Link href="/orders" className="text-orange-600 dark:text-orange-400 text-sm font-bold hover:underline flex items-center gap-1">
                        View History <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={32} className="text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-8 font-medium">
                        No recent orders found. Start exploring our latest collections to find something you love.
                    </p>
                    <Link 
                        href="/shop" 
                        className="px-8 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full font-bold hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-all"
                    >
                        Explore Shop
                    </Link>
                </div>
            </div>
        </div>
    )
}
