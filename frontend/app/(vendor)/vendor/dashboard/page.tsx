"use client"

import { useState } from "react"
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
    Ticket,
    ArrowUpRight,
    TrendingDown,
    Zap,
    Users,
    MessageSquare,
    Eye,
    ChevronRight,
    FileText,
    XCircle,
    RotateCcw,
    DollarSign,
    Target,
    BarChart3,
    MousePointer2,
    PieChart,
    Activity,
    CreditCard
} from "lucide-react"

// Mock Data for expanded widgets
const WIDGETS = [
    { title: "Total Products", value: "248", icon: Package, gradient: "from-blue-500 to-blue-700", sub: "All time listed", group: "Inventory" },
    { title: "Active Products", value: "212", icon: CheckCircle, gradient: "from-emerald-500 to-emerald-700", sub: "Currently visible", group: "Inventory" },
    { title: "Draft Products", value: "28", icon: FileText, gradient: "from-gray-500 to-gray-700", sub: "Not published", group: "Inventory" },
    { title: "Out of Stock", value: "8", icon: AlertTriangle, gradient: "from-rose-500 to-rose-700", sub: "Immediate action", group: "Inventory" },
    
    { title: "Total Orders", value: "1,482", icon: ShoppingBag, gradient: "from-indigo-500 to-indigo-700", sub: "All time orders", group: "Sales" },
    { title: "Pending Orders", value: "12", icon: Clock, gradient: "from-amber-500 to-amber-700", sub: "Awaiting confirm", group: "Sales" },
    { title: "Processing", value: "45", icon: Activity, gradient: "from-blue-400 to-blue-600", sub: "In fulfillment", group: "Sales" },
    { title: "Completed", value: "1,390", icon: CheckCircle, gradient: "from-emerald-400 to-emerald-600", sub: "Successfully delivered", group: "Sales" },
    { title: "Cancelled", value: "18", icon: XCircle, gradient: "from-rose-400 to-rose-600", sub: "Failed orders", group: "Sales" },
    { title: "Returned", value: "17", icon: RotateCcw, gradient: "from-orange-400 to-orange-600", sub: "Refund requested", group: "Sales" },

    { title: "Monthly Revenue", value: "$42,500", icon: TrendingUp, gradient: "from-fuchsia-500 to-fuchsia-700", sub: "This month", group: "Finance" },
    { title: "Today Revenue", value: "$1,840", icon: DollarSign, gradient: "from-violet-500 to-violet-700", sub: "Real-time today", group: "Finance" },
    { title: "Wallet Balance", value: "$8,230", icon: Wallet, gradient: "from-blue-600 to-blue-800", sub: "Available now", group: "Finance" },
    { title: "Pending Withdraw", value: "$1,200", icon: CreditCard, gradient: "from-amber-600 to-amber-800", sub: "In processing", group: "Finance" },

    { title: "Total Customers", value: "892", icon: Users, gradient: "from-cyan-500 to-cyan-700", sub: "Unique shoppers", group: "Audience" },
    { title: "Total Reviews", value: "524", icon: MessageSquare, gradient: "from-purple-500 to-purple-700", sub: "Customer feedback", group: "Audience" },
    { title: "Average Rating", value: "4.8/5", icon: Star, gradient: "from-orange-500 to-orange-700", sub: "Store quality", group: "Audience" },
    { title: "Low Stock Alert", value: "15", icon: AlertTriangle, gradient: "from-red-500 to-red-700", sub: "Needs restock", group: "Inventory" },
]

const WEEKLY_SALES = [
    { day: "Mon", sales: 1200, orders: 42 },
    { day: "Tue", sales: 1900, orders: 58 },
    { day: "Wed", sales: 1500, orders: 35 },
    { day: "Thu", sales: 2200, orders: 62 },
    { day: "Fri", sales: 3100, orders: 85 },
    { day: "Sat", sales: 3800, orders: 98 },
    { day: "Sun", sales: 2900, orders: 71 },
]

const CATEGORY_SALES = [
    { name: "Electronics", value: 45, color: "bg-blue-500" },
    { name: "Fashion", value: 25, color: "bg-fuchsia-500" },
    { name: "Home & Kitchen", value: 15, color: "bg-emerald-500" },
    { name: "Accessories", value: 10, color: "bg-amber-500" },
    { name: "Others", value: 5, color: "bg-gray-400" },
]

const TRAFFIC_SOURCES = [
    { source: "Direct", value: 40, color: "bg-indigo-500" },
    { source: "Search", value: 30, color: "bg-sky-500" },
    { source: "Social", value: 20, color: "bg-rose-500" },
    { source: "Referral", value: 10, color: "bg-emerald-500" },
]

const maxSales = Math.max(...WEEKLY_SALES.map(d => d.sales))

export default function VendorDashboard() {
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
                {[
                    { title: "Monthly Revenue", value: "$42,500", icon: TrendingUp, gradient: "from-blue-600 to-indigo-600", trend: "+12.5%" },
                    { title: "Active Orders", value: "57", icon: ShoppingBag, gradient: "from-emerald-600 to-teal-600", trend: "Normal" },
                    { title: "Wallet Balance", value: "$8,230", icon: Wallet, gradient: "from-amber-600 to-orange-600", trend: "Ready" },
                    { title: "Avg. Rating", value: "4.8", icon: Star, gradient: "from-fuchsia-600 to-pink-600", trend: "Top Tier" },
                ].map(stat => (
                    <div key={stat.title} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
                        <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.title}</p>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                                <span className="text-[10px] font-bold text-emerald-500">{stat.trend} from last month</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Widgets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {WIDGETS.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title} className="group bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-50 dark:border-gray-800/50 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                                <Icon size={20} />
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate">{stat.title}</p>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white mt-0.5">{stat.value}</h3>
                            <p className="text-[9px] text-gray-500 mt-1 font-medium">{stat.sub}</p>
                        </div>
                    )
                })}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Sales Trend Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <BarChart3 className="text-blue-500" size={24} />
                                Sales & Orders Trend
                            </h3>
                            <p className="text-sm text-gray-500 font-medium mt-1">Weekly performance comparison</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                                <span className="text-xs font-bold text-gray-500">Revenue</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-indigo-300"></div>
                                <span className="text-xs font-bold text-gray-500">Orders</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-4 h-64">
                        {WEEKLY_SALES.map((d) => (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full relative flex flex-col items-center justify-end h-52">
                                    {/* Order Bar (Small) */}
                                    <div 
                                        className="w-1/2 absolute left-1/2 -translate-x-1/2 z-10 bg-indigo-300/50 dark:bg-indigo-300/20 rounded-t-lg transition-all duration-500"
                                        style={{ height: `${Math.round((d.orders / 100) * 100)}%` }}
                                    ></div>
                                    {/* Sales Bar (Primary) */}
                                    <div 
                                        className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-xl group-hover:from-blue-500 group-hover:to-indigo-300 transition-all duration-500 relative"
                                        style={{ height: `${Math.round((d.sales / maxSales) * 100)}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl whitespace-nowrap">
                                            ${d.sales} ({d.orders} ord)
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm font-black text-gray-400 dark:text-gray-500">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category & Traffic Breakdown */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <PieChart className="text-fuchsia-500" size={20} />
                            Category Share
                        </h3>
                        <div className="space-y-4">
                            {CATEGORY_SALES.map(cat => (
                                <div key={cat.name}>
                                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                                        <span className="text-gray-500">{cat.name}</span>
                                        <span className="text-gray-900 dark:text-white">{cat.value}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${cat.color} rounded-full transition-all duration-1000`} style={{ width: `${cat.value}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <MousePointer2 className="text-emerald-500" size={20} />
                            Traffic Sources
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {TRAFFIC_SOURCES.map(ts => (
                                <div key={ts.source} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{ts.source}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <h4 className="text-xl font-black text-gray-900 dark:text-white">{ts.value}%</h4>
                                        <div className={`w-2 h-2 rounded-full ${ts.color} animate-pulse`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Sections: Top Products & Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Target className="text-orange-500" size={24} />
                        Top Selling Products
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: "Wireless Headphones", sales: 420, growth: "+12%", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop" },
                            { name: "Smart Watch Pro", sales: 310, growth: "+8%", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop" },
                            { name: "LED Desk Lamp", sales: 150, growth: "+24%", image: "https://images.unsplash.com/photo-1534073828943-f801091bb270?w=100&h=100&fit=crop" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-black text-gray-900 dark:text-white truncate">{item.name}</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-gray-500 font-bold">{item.sales} sold</span>
                                        <span className="text-[10px] text-emerald-500 font-black">{item.growth} growth</span>
                                    </div>
                                </div>
                                <ArrowUpRight className="text-gray-300 group-hover:text-blue-500 transition-colors" size={18} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <Zap className="text-blue-500/20 w-32 h-32 rotate-12" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Revenue Growth</h3>
                        <p className="text-gray-500 font-medium mt-2 max-w-md">Your store revenue has grown by 24% compared to last quarter. You're in the top 5% of vendors this month!</p>
                        
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {[
                                { label: "This Month", value: "$42.5k", trend: "+12%" },
                                { label: "Last Month", value: "$38.2k", trend: "+15%" },
                                { label: "Average", value: "$35.0k", trend: "Steady" },
                                { label: "Goal", value: "$50.0k", trend: "85%" },
                            ].map(m => (
                                <div key={m.label}>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.label}</p>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{m.value}</h4>
                                    <p className="text-[10px] text-emerald-500 font-bold mt-1">{m.trend}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex items-center gap-4">
                            <Link href="/vendor/reports" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/30 transition-all">
                                View Full Analytics
                            </Link>
                            <button className="px-6 py-3 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl text-sm font-black hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                                Export Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Notifications Quick View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Recent Orders Activity</h3>
                    <div className="space-y-4">
                        {[
                            { id: "#ORD-9923", customer: "Sarah Connor", status: "Completed", amount: "$120.00", time: "2 mins ago" },
                            { id: "#ORD-9922", customer: "John Doe", status: "Pending", amount: "$45.50", time: "15 mins ago" },
                            { id: "#ORD-9921", customer: "Mike Ross", status: "Processing", amount: "$210.00", time: "1 hour ago" },
                        ].map(order => (
                            <div key={order.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 group hover:bg-white dark:hover:bg-gray-800 transition-all border border-transparent hover:border-blue-500/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black text-xs">
                                        {order.id.slice(-2)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-gray-900 dark:text-white">{order.customer}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{order.id} • {order.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-gray-900 dark:text-white">{order.amount}</p>
                                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>

                 <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
                    <div className="space-y-4">
                        {[
                            { customer: "Alice Brown", rating: 5, comment: "Amazing quality headphones! Highly recommended.", time: "1 hour ago" },
                            { customer: "Bob Wilson", rating: 4, comment: "The watch is great, but delivery was a bit slow.", time: "4 hours ago" },
                        ].map((review, i) => (
                            <div key={i} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 group hover:border-orange-500/30 transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 text-[10px] font-black">
                                            {review.customer[0]}
                                        </div>
                                        <span className="text-xs font-black text-gray-900 dark:text-white">{review.customer}</span>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} size={10} className={j < review.rating ? "text-orange-400 fill-orange-400" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium italic">"{review.comment}"</p>
                                <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">{review.time}</p>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

        </div>
    )
}
