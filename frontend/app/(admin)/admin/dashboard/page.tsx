"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    ShoppingCart,
    TrendingUp,
    ArrowUpRight,
    Users,
    Store,
    Wallet,
    Ticket,
    RefreshCw,
    Activity,
    ArrowDownRight,
    ChevronRight,
    Clock,
    Loader2
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const data = await adminService.getStats()
            if (data.success) {
                setStats(data.data)
            }
        } catch (error) {
            console.error("Failed to fetch admin stats")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
        )
    }

    const mainStats = [
        { title: "Total Revenue", value: `$${stats?.totalRevenue || 0}`, change: "+12.5%", up: true, icon: TrendingUp, gradient: "from-emerald-500 to-emerald-600", link: "/admin/finance/revenue" },
        { title: "Total Vendors", value: stats?.totalVendors || 0, change: "+4", up: true, icon: Store, gradient: "from-blue-500 to-blue-600", link: "/admin/vendors/manage" },
        { title: "Total Users", value: stats?.totalUsers || 0, change: "+18%", up: true, icon: Users, gradient: "from-purple-500 to-purple-600", link: "/admin/users" },
        { title: "Total Orders", value: stats?.totalOrders || 0, change: "+5.2%", up: true, icon: ShoppingCart, gradient: "from-orange-500 to-orange-600", link: "/admin/orders" },
    ]

    const alertStats = [
        { title: "Pending Vendors", value: stats?.pendingVendors || 0, icon: Store, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20", link: "/admin/vendors/manage" },
        { title: "Withdraw Pending", value: stats?.pendingWithdrawals || 0, icon: Wallet, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20", link: "/admin/withdrawals" },
        { title: "Open Tickets", value: stats?.openTickets || 0, icon: Ticket, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", link: "/admin/support/tickets" },
        { title: "Refund Requests", value: stats?.refundRequests || 0, icon: RefreshCw, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", link: "/admin/refunds" },
    ]

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header with quick summary */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                        System Overview
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        Command center for your multivendor marketplace operations.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex flex-col items-end px-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Marketplace Status</span>
                        <span className="text-xs font-black text-emerald-500 uppercase tracking-widest mt-1 leading-none flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            Operational
                        </span>
                    </div>
                    <div className="w-px h-8 bg-gray-100 dark:bg-gray-800"></div>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-all">
                        <Activity size={20} />
                    </button>
                </div>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {mainStats.map((card) => {
                    const Icon = card.icon
                    return (
                        <Link
                            key={card.title}
                            href={card.link}
                            className="group bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon size={28} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${card.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                                        {card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {card.change}
                                    </div>
                                </div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    {card.title}
                                </p>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                                    {card.value}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Alert/Action Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {alertStats.map((card) => (
                    <Link key={card.title} href={card.link} className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 hover:shadow-lg transition-all group">
                        <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <card.icon size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{card.title}</p>
                            <p className="text-lg font-black text-gray-900 dark:text-white mt-1 leading-none">{card.value}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Platform Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Platform Activity</h3>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl">
                        <p className="text-gray-400 font-bold">Activity chart integration pending</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">System Health</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                             <div className="flex items-center gap-3">
                                <Activity className="text-emerald-500" size={20} />
                                <span className="text-sm font-bold text-gray-900 dark:text-white">API Response</span>
                             </div>
                             <span className="text-xs font-black text-emerald-500">24ms</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                             <div className="flex items-center gap-3">
                                <Clock className="text-blue-500" size={20} />
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Uptime</span>
                             </div>
                             <span className="text-xs font-black text-blue-500">99.9%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
