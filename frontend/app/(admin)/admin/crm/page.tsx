"use client"

import { useState } from "react"
import {
    HeartHandshake,
    Users,
    TrendingUp,
    Star,
    MessageSquare,
    Mail,
    Phone,
    Filter,
    Search,
    MoreHorizontal,
    ChevronRight,
    ArrowUpRight,
    BadgeCheck,
    Clock,
    ShoppingBag,
    AlertCircle,
    UserPlus,
    Repeat2,
    Frown,
    Smile,
    Meh,
    Crown,
    Send
} from "lucide-react"

// ─── Static Data ─────────────────────────────────────────────────────────────
const customers = [
    { id: 1, name: "Rahim Uddin", email: "rahim@gmail.com", phone: "+880 1711-234567", orders: 14, spent: 18400, status: "vip", sentiment: "positive", lastActive: "2 hrs ago", avatar: "RU" },
    { id: 2, name: "Fatema Begum", email: "fatema@gmail.com", phone: "+880 1812-345678", orders: 7, spent: 8200, status: "loyal", sentiment: "positive", lastActive: "1 day ago", avatar: "FB" },
    { id: 3, name: "Karim Hossain", email: "karim@yahoo.com", phone: "+880 1913-456789", orders: 3, spent: 3100, status: "new", sentiment: "neutral", lastActive: "3 days ago", avatar: "KH" },
    { id: 4, name: "Nasrin Akter", email: "nasrin@gmail.com", phone: "+880 1612-567890", orders: 1, spent: 950, status: "at-risk", sentiment: "negative", lastActive: "14 days ago", avatar: "NA" },
    { id: 5, name: "Sohel Rana", email: "sohel@outlook.com", phone: "+880 1511-678901", orders: 9, spent: 12100, status: "loyal", sentiment: "positive", lastActive: "5 hrs ago", avatar: "SR" },
    { id: 6, name: "Tania Islam", email: "tania@gmail.com", phone: "+880 1711-789012", orders: 2, spent: 2200, status: "new", sentiment: "neutral", lastActive: "6 days ago", avatar: "TI" },
]

const segments = [
    { label: "VIP Customers", count: 38, icon: Crown, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30", border: "border-amber-200 dark:border-amber-800", desc: "Spent > ৳15,000 lifetime" },
    { label: "Loyal Regulars", count: 124, icon: Repeat2, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-800", desc: "5+ orders, active 30 days" },
    { label: "At-Risk", count: 56, icon: AlertCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/30", border: "border-red-200 dark:border-red-800", desc: "No purchase in 14+ days" },
    { label: "New Customers", count: 89, icon: UserPlus, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/30", border: "border-emerald-200 dark:border-emerald-800", desc: "Joined in last 30 days" },
]

const activityFeed = [
    { id: 1, type: "order", customer: "Rahim Uddin", message: "placed a new order of ৳2,850", time: "2 min ago", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
    { id: 2, type: "review", customer: "Sohel Rana", message: "posted a 5-star review on Wireless Headphones", time: "18 min ago", icon: Star, color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30" },
    { id: 3, type: "ticket", customer: "Nasrin Akter", message: "opened a support ticket — Return Request", time: "1 hr ago", icon: MessageSquare, color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30" },
    { id: 4, type: "signup", customer: "Tania Islam", message: "created a new account", time: "3 hrs ago", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    { id: 5, type: "order", customer: "Fatema Begum", message: "completed purchase of ৳1,200", time: "5 hrs ago", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        vip: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
        loyal: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        new: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
        "at-risk": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
    }
    const icons: Record<string, React.ElementType> = { vip: Crown, loyal: Repeat2, new: UserPlus, "at-risk": AlertCircle }
    const Icon = icons[status]
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status]}`}>
            {Icon && <Icon className="w-3 h-3" />}
            {status === "at-risk" ? "At Risk" : status}
        </span>
    )
}

function SentimentIcon({ s }: { s: string }) {
    if (s === "positive") return <Smile className="w-4 h-4 text-emerald-500" />
    if (s === "negative") return <Frown className="w-4 h-4 text-red-500" />
    return <Meh className="w-4 h-4 text-amber-500" />
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function CRMPage() {
    const [search, setSearch] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [composing, setComposing] = useState(false)
    const [emailSubject, setEmailSubject] = useState("")
    const [emailBody, setEmailBody] = useState("")

    const filtered = customers.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
        const matchStatus = filterStatus === "all" || c.status === filterStatus
        return matchSearch && matchStatus
    })

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-300 flex items-center gap-3">
                        <HeartHandshake className="text-blue-600 dark:text-blue-400 w-8 h-8 shrink-0" />
                        CRM Console
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm md:text-base">
                        Manage customer relationships, segments, and communications.
                    </p>
                </div>
                <button
                    onClick={() => setComposing(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all shrink-0"
                >
                    <Mail className="w-4 h-4" /> Broadcast Email
                </button>
            </div>

            {/* ── Stats Row ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Customers", value: "1,284", sub: "+24 this week", icon: Users, gradient: "from-blue-500 to-blue-700", glow: "bg-blue-400" },
                    { label: "Avg. Lifetime Value", value: "৳9,620", sub: "Per customer", icon: TrendingUp, gradient: "from-emerald-500 to-teal-600", glow: "bg-emerald-400" },
                    { label: "Satisfaction Score", value: "4.7 / 5", sub: "Based on 342 reviews", icon: Star, gradient: "from-amber-500 to-orange-500", glow: "bg-amber-400" },
                    { label: "Open Tickets", value: "18", sub: "3 high priority", icon: MessageSquare, gradient: "from-red-500 to-rose-600", glow: "bg-red-400" },
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

            {/* ── Segments ── */}
            <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">Customer Segments</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {segments.map(seg => {
                        const Icon = seg.icon
                        return (
                            <div key={seg.label} className={`bg-white dark:bg-gray-900 rounded-2xl border ${seg.border} p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group`}>
                                <div className={`w-11 h-11 ${seg.bg} rounded-xl flex items-center justify-center mb-3`}>
                                    <Icon className={`w-5 h-5 ${seg.color}`} />
                                </div>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{seg.count}</p>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{seg.label}</p>
                                <p className="text-xs text-gray-400 mt-1">{seg.desc}</p>
                                <div className={`flex items-center gap-1 mt-3 text-xs font-semibold ${seg.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    View segment <ChevronRight className="w-3 h-3" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ── Main Content: Customer Table + Activity Feed ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Customer Table */}
                <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search customers..."
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                            <select
                                value={filterStatus}
                                onChange={e => setFilterStatus(e.target.value)}
                                className="py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="vip">VIP</option>
                                <option value="loyal">Loyal</option>
                                <option value="new">New</option>
                                <option value="at-risk">At Risk</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Orders</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Spent</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Mood</th>
                                    <th className="px-5 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                {filtered.map(c => (
                                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                                    {c.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{c.name}</p>
                                                    <p className="text-xs text-gray-400">{c.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 hidden md:table-cell">
                                            <span className="font-semibold text-gray-900 dark:text-white">{c.orders}</span>
                                        </td>
                                        <td className="px-5 py-3.5 hidden sm:table-cell">
                                            <span className="font-semibold text-gray-900 dark:text-white">৳{c.spent.toLocaleString()}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <StatusBadge status={c.status} />
                                        </td>
                                        <td className="px-5 py-3.5 hidden lg:table-cell">
                                            <SentimentIcon s={c.sentiment} />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400" title="Send email">
                                                    <Mail className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500" title="Call">
                                                    <Phone className="w-3.5 h-3.5" />
                                                </button>
                                                <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500" title="More">
                                                    <MoreHorizontal className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-gray-400">No customers found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <p className="text-xs text-gray-400">Showing {filtered.length} of {customers.length} customers</p>
                        <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline">
                            View all <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-bold text-gray-900 dark:text-white">Live Activity</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Real-time customer events</p>
                    </div>
                    <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {activityFeed.map(item => {
                            const Icon = item.icon
                            return (
                                <div key={item.id} className="flex items-start gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                    <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                        <Icon className={`w-4 h-4 ${item.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900 dark:text-white leading-snug">
                                            <span className="font-semibold">{item.customer}</span>{" "}
                                            <span className="text-gray-500 dark:text-gray-400">{item.message}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3" /> {item.time}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800">
                        <button className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">View all activity →</button>
                    </div>
                </div>
            </div>

            {/* ── Satisfaction Overview ── */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5">Sentiment Overview</h2>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: "Positive", value: 68, icon: Smile, color: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                        { label: "Neutral", value: 22, icon: Meh, color: "text-amber-600 dark:text-amber-400", bar: "bg-amber-500", bg: "bg-amber-50 dark:bg-amber-900/30" },
                        { label: "Negative", value: 10, icon: Frown, color: "text-red-600 dark:text-red-400", bar: "bg-red-500", bg: "bg-red-50 dark:bg-red-900/30" },
                    ].map(item => {
                        const Icon = item.icon
                        return (
                            <div key={item.label} className="text-center">
                                <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mx-auto mb-2`}>
                                    <Icon className={`w-6 h-6 ${item.color}`} />
                                </div>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{item.value}%</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.label}</p>
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.bar} rounded-full transition-all duration-700`} style={{ width: `${item.value}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* ── Broadcast Email Modal ── */}
            {composing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg flex items-center gap-2">
                                <Mail className="w-5 h-5 text-blue-600" /> Broadcast Email
                            </h3>
                            <button onClick={() => setComposing(false)} className="text-gray-400 hover:text-gray-600 p-1">✕</button>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Target Segment</label>
                            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>All Customers (1,284)</option>
                                <option>VIP Customers (38)</option>
                                <option>At-Risk Customers (56)</option>
                                <option>New Customers (89)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Subject</label>
                            <input
                                type="text"
                                value={emailSubject}
                                onChange={e => setEmailSubject(e.target.value)}
                                placeholder="e.g. Exclusive offer just for you!"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Message</label>
                            <textarea
                                rows={4}
                                value={emailBody}
                                onChange={e => setEmailBody(e.target.value)}
                                placeholder="Write your message here..."
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setComposing(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Cancel
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all">
                                <Send className="w-4 h-4" /> Send Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
