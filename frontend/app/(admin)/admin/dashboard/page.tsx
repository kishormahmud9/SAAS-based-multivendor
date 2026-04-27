"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    Package,
    Tag,
    Award,
    ShoppingCart,
    TrendingUp,
    BarChart3,
    HeartHandshake,
    Bot,
    ArrowUpRight,
    Zap,
    Users,
    Store,
    Wallet,
    Ticket,
    RefreshCw,
    Activity,
    ArrowDownRight,
    ChevronRight,
    Clock
} from "lucide-react"

interface Stats {
    products: number
    categories: number
    brands: number
    orders: number
    vendors: number
    pendingVendors: number
    withdrawals: number
    tickets: number
    revenue: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ 
        products: 0, 
        categories: 0, 
        brands: 0, 
        orders: 0,
        vendors: 154,
        pendingVendors: 12,
        withdrawals: 8,
        tickets: 24,
        revenue: 84200
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pRes, cRes, bRes, oRes] = await Promise.all([
                    fetch("/api/admin/products?limit=1"),
                    fetch("/api/categories"),
                    fetch("/api/brands"),
                    fetch("/api/admin/orders?limit=1"),
                ])
                const [p, c, b, o] = await Promise.all([pRes.json(), cRes.json(), bRes.json(), oRes.json()])
                setStats(prev => ({
                    ...prev,
                    products: p.pagination?.totalCount || 0,
                    categories: c.data?.length || 0,
                    brands: b.data?.length || 0,
                    orders: o.pagination?.totalCount || 0,
                }))
            } catch { /* silent */ } finally { setLoading(false) }
        }
        fetchStats()
    }, [])

    const mainStats = [
        { title: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, change: "+12.5%", up: true, icon: TrendingUp, gradient: "from-emerald-500 to-emerald-600", link: "/admin/finance/revenue" },
        { title: "Total Vendors", value: stats.vendors, change: "+4", up: true, icon: Store, gradient: "from-blue-500 to-blue-600", link: "/admin/vendors/manage" },
        { title: "Active Customers", value: "1,240", change: "+18%", up: true, icon: Users, gradient: "from-purple-500 to-purple-600", link: "/admin/users" },
        { title: "Total Orders", value: stats.orders, change: "+5.2%", up: true, icon: ShoppingCart, gradient: "from-orange-500 to-orange-600", link: "/admin/orders" },
    ]

    const alertStats = [
        { title: "Pending Vendors", value: stats.pendingVendors, icon: Store, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20", link: "/admin/vendors/manage" },
        { title: "Withdraw Pending", value: stats.withdrawals, icon: Wallet, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20", link: "/admin/withdrawals" },
        { title: "Open Tickets", value: stats.tickets, icon: Ticket, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", link: "/admin/support/tickets" },
        { title: "Refund Requests", value: "5", icon: RefreshCw, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", link: "/admin/refunds" },
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
                                {loading ? (
                                    <div className="h-10 w-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse mt-2" />
                                ) : (
                                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">
                                        {card.value}
                                    </p>
                                )}
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

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Activity Chart (2 cols) */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Growth Analytics</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Platform activity last 30 days</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600">Sales</button>
                             <button className="px-4 py-2 bg-transparent rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors">Vendors</button>
                        </div>
                    </div>
                    
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                         {[40, 65, 45, 90, 55, 75, 45, 80, 60, 95, 70, 85].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group">
                                <div 
                                    className="w-full max-w-[20px] bg-blue-600/10 dark:bg-blue-600/5 rounded-t-lg relative group-hover:bg-blue-600/20 transition-all cursor-pointer"
                                    style={{ height: '200px' }}
                                >
                                    <div 
                                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-700 to-blue-400 rounded-t-lg shadow-lg shadow-blue-500/20 group-hover:scale-y-105 transition-transform origin-bottom"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                            </div>
                         ))}
                    </div>
                </div>

                {/* Latest Activity Feed */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Live Stream</h3>
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></div>
                    </div>
                    <div className="flex-1 space-y-6">
                        {[
                            { user: "Elite Electronics", act: "Requested $450 payout", time: "2m", icon: Wallet, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/30" },
                            { user: "John Customer", act: "Purchased iPhone 15 Pro", time: "15m", icon: ShoppingCart, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                            { user: "Urban Vogue", act: "New product listed: Summer Silk", time: "1h", icon: Package, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/30" },
                            { user: "Support Agent", act: "Closed ticket #8821", time: "2h", icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/30" },
                        ].map((act, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className={`w-10 h-10 ${act.bg} ${act.color} rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform`}>
                                    <act.icon size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-black text-gray-900 dark:text-white truncate">{act.user}</p>
                                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-0.5">{act.act}</p>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase shrink-0">{act.time}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors">Full Audit Trail</button>
                </div>
            </div>

            {/* Bottom Section: Top Vendors & Latest Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Vendors */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/20">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Elite Vendors</h3>
                        <Link href="/admin/vendors/manage" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</Link>
                    </div>
                    <div className="p-2 divide-y divide-gray-50 dark:divide-gray-800">
                        {[
                            { name: "Elite Electronics", sales: "$42,500", rating: 4.9, logo: "E" },
                            { name: "Urban Vogue", sales: "$38,200", rating: 4.8, logo: "U" },
                            { name: "Comfort Living", sales: "$29,400", rating: 4.7, logo: "C" },
                        ].map((v, i) => (
                            <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all rounded-3xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-blue-600/20">
                                        {v.logo}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 dark:text-white">{v.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Growth +12%</span>
                                            <span className="text-gray-300 dark:text-gray-700">•</span>
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">★ {v.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-gray-900 dark:text-white">{v.sales}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Volume</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Latest Orders */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/20">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                             <Clock className="text-blue-600" size={20} />
                             Urgent Orders
                        </h3>
                        <Link href="/admin/orders" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Full Orders Hub</Link>
                    </div>
                    <div className="p-2 divide-y divide-gray-50 dark:divide-gray-800">
                        {[
                            { id: "#8821", store: "Elite Electronics", amount: "$120", status: "PENDING" },
                            { id: "#8820", store: "Urban Vogue", amount: "$840", status: "PROCESSING" },
                            { id: "#8819", store: "Tech Gadgets", amount: "$2,100", status: "SHIPPED" },
                        ].map((o, i) => (
                            <div key={i} className="flex items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all rounded-3xl group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-2xl flex items-center justify-center font-black group-hover:text-blue-600 transition-colors">
                                        {o.id}
                                    </div>
                                    <div>
                                        <p className="font-black text-gray-900 dark:text-white">{o.store}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">2 items • Credit Card</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <p className="text-lg font-black text-gray-900 dark:text-white">{o.amount}</p>
                                        <span className={`text-[8px] font-black uppercase tracking-widest ${
                                            o.status === 'SHIPPED' ? 'text-emerald-500' :
                                            o.status === 'PROCESSING' ? 'text-blue-500' : 'text-orange-500'
                                        }`}>{o.status}</span>
                                    </div>
                                    <ChevronRight className="text-gray-200 group-hover:text-blue-600 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function CheckCircle(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
