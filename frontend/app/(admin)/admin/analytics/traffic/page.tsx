"use client"

import {
    BarChart3,
    Users,
    Eye,
    MousePointerClick,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Globe,
    Monitor,
    Smartphone,
    Tablet
} from "lucide-react"

const trafficSources = [
    { label: "Organic Search", value: 42, color: "bg-blue-500", textColor: "text-blue-600 dark:text-blue-400" },
    { label: "Direct", value: 28, color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400" },
    { label: "Social Media", value: 18, color: "bg-fuchsia-500", textColor: "text-fuchsia-600 dark:text-fuchsia-400" },
    { label: "Referral", value: 8, color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400" },
    { label: "Email Campaign", value: 4, color: "bg-orange-500", textColor: "text-orange-600 dark:text-orange-400" },
]

const topPages = [
    { page: "/products/wireless-headphones", views: 4821, change: 12 },
    { page: "/categories/electronics", views: 3204, change: -3 },
    { page: "/products/smart-watch-pro", views: 2987, change: 28 },
    { page: "/", views: 2541, change: 5 },
    { page: "/products/noise-cancelling-buds", views: 1893, change: 44 },
    { page: "/categories/fashion", views: 1480, change: -8 },
    { page: "/products/led-desk-lamp", views: 1205, change: 19 },
]

const countries = [
    { country: "Bangladesh 🇧🇩", visits: "32,140", share: 66 },
    { country: "India 🇮🇳", visits: "7,820", share: 16 },
    { country: "United States 🇺🇸", visits: "3,904", share: 8 },
    { country: "United Kingdom 🇬🇧", visits: "2,405", share: 5 },
    { country: "Others 🌍", visits: "2,022", share: 5 },
]

const weeklyData = [
    { day: "Mon", visitors: 5820, orders: 42 },
    { day: "Tue", visitors: 6740, orders: 58 },
    { day: "Wed", visitors: 7210, orders: 63 },
    { day: "Thu", visitors: 6890, orders: 54 },
    { day: "Fri", visitors: 8340, orders: 79 },
    { day: "Sat", visitors: 9120, orders: 95 },
    { day: "Sun", visitors: 7640, orders: 71 },
]

const maxVisitors = Math.max(...weeklyData.map(d => d.visitors))

export default function TrafficAnalyticsPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 flex items-center gap-3">
                    <BarChart3 className="text-violet-600 dark:text-violet-400 w-9 h-9 shrink-0" />
                    Traffic & Analytics
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1.5">
                    Monitor visitor behaviour, traffic sources, and page performance.
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                    { label: "Total Visitors", value: "48,291", sub: "+12% vs last month", icon: Users, gradient: "from-blue-500 to-blue-700", glow: "bg-blue-400" },
                    { label: "Page Views", value: "182,640", sub: "+8% vs last month", icon: Eye, gradient: "from-violet-500 to-fuchsia-500", glow: "bg-violet-400" },
                    { label: "Conversion Rate", value: "3.42%", sub: "+0.8pts vs last month", icon: MousePointerClick, gradient: "from-emerald-500 to-teal-600", glow: "bg-emerald-400" },
                    { label: "Avg. Session", value: "4m 12s", sub: "-14s vs last month", icon: Clock, gradient: "from-amber-500 to-orange-500", glow: "bg-amber-400" },
                ].map(card => {
                    const Icon = card.icon
                    return (
                        <div key={card.label} className="relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                            <div className={`absolute -right-8 -top-8 w-28 h-28 ${card.glow} rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity`} />
                            <div className="relative z-10 flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
                                    <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{card.value}</p>
                                    <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                                </div>
                                <div className={`w-11 h-11 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Weekly Bar Chart */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-gray-900 dark:text-white">Weekly Visitors</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">Last 7 days</span>
                </div>
                <div className="flex items-end gap-3 h-40">
                    {weeklyData.map(d => (
                        <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                            <div className="w-full flex flex-col items-center justify-end" style={{ height: "120px" }}>
                                <div
                                    className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t-lg group-hover:from-violet-500 group-hover:to-fuchsia-400 transition-all duration-300 relative"
                                    style={{ height: `${Math.round((d.visitors / maxVisitors) * 100)}%`, minHeight: "8px" }}
                                >
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {d.visitors.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{d.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sources + Top Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6">Traffic Sources</h3>
                    <div className="space-y-4">
                        {trafficSources.map(src => (
                            <div key={src.label}>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">{src.label}</span>
                                    <span className={`font-bold ${src.textColor}`}>{src.value}%</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${src.color} rounded-full transition-all duration-700`} style={{ width: `${src.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Pages */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6">Top Pages</h3>
                    <div className="space-y-2">
                        {topPages.map((page, i) => (
                            <div key={page.page} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <span className="text-xs font-bold text-gray-400 w-5 text-center">{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{page.page}</p>
                                    <p className="text-xs text-gray-400">{page.views.toLocaleString()} views</p>
                                </div>
                                <div className={`flex items-center gap-0.5 text-xs font-bold ${page.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                                    {page.change >= 0
                                        ? <ArrowUpRight className="w-3 h-3" />
                                        : <ArrowDownRight className="w-3 h-3" />
                                    }
                                    {Math.abs(page.change)}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Device + Geography */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6">Device Breakdown</h3>
                    <div className="space-y-5">
                        {[
                            { label: "Mobile", value: 58, icon: Smartphone, color: "bg-blue-500", text: "text-blue-600 dark:text-blue-400" },
                            { label: "Desktop", value: 34, icon: Monitor, color: "bg-violet-500", text: "text-violet-600 dark:text-violet-400" },
                            { label: "Tablet", value: 8, icon: Tablet, color: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
                        ].map(d => {
                            const Icon = d.icon
                            return (
                                <div key={d.label} className="flex items-center gap-4">
                                    <Icon className={`w-5 h-5 ${d.text} shrink-0`} />
                                    <div className="flex-1">
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-gray-600 dark:text-gray-400">{d.label}</span>
                                            <span className={`font-bold ${d.text}`}>{d.value}%</span>
                                        </div>
                                        <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                            <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.value}%` }} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-500" /> Top Countries
                    </h3>
                    <div className="space-y-4">
                        {countries.map(c => (
                            <div key={c.country} className="flex items-center gap-3">
                                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{c.country}</span>
                                <div className="w-28 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.share}%` }} />
                                </div>
                                <span className="text-xs font-bold text-gray-900 dark:text-white w-14 text-right">{c.visits}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
