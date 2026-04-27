"use client"

import { useState } from "react"
import {
    RefreshCw,
    Search,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    Clock,
    MoreHorizontal,
    Eye,
    MessageSquare,
    DollarSign,
    Package,
    ArrowRight,
    TrendingUp,
    AlertCircle
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface ReturnRequest {
    id: string
    orderId: string
    customer: string
    items: number
    amount: number
    reason: string
    status: "pending" | "approved" | "refunded" | "rejected"
    date: string
}

const mockReturns: ReturnRequest[] = [
    { id: "RET-101", orderId: "ORD-9921", customer: "Ariful Islam", items: 2, amount: 4500, reason: "Defective item", status: "pending", date: "2024-03-24" },
    { id: "RET-102", orderId: "ORD-9845", customer: "Sadia Rahman", items: 1, amount: 1200, reason: "Wrong size", status: "approved", date: "2024-03-22" },
    { id: "RET-103", orderId: "ORD-9712", customer: "Kamal Hossain", items: 3, amount: 8900, reason: "Not as described", status: "refunded", date: "2024-03-18" },
    { id: "RET-104", orderId: "ORD-9654", customer: "Nusrat Jahan", items: 1, amount: 2500, reason: "Changed mind", status: "rejected", date: "2024-03-15" },
    { id: "RET-105", orderId: "ORD-9532", customer: "Tanvir Ahmed", items: 2, amount: 6700, reason: "Damaged on arrival", status: "pending", date: "2024-03-23" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function ReturnsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [returns, setReturns] = useState(mockReturns)

    const filteredReturns = returns.filter(r => 
        r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
                            <RefreshCw size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Returns & Refunds
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage customer return requests and process refunds efficiently.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <MessageSquare size={18} />
                        <span>Return Policy</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-rose-500/25 transition-all active:scale-95 group">
                        <Plus size={20} />
                        <span>Manual Refund</span>
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { label: "Pending Returns", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/30" },
                    { label: "Refunded Total", value: "৳84,500", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                    { label: "Return Rate", value: "2.4%", icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/30" },
                    { label: "Open Disputes", value: "3", icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30" },
                ].map(stat => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                    <Icon size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 capitalize">{stat.label}</p>
                                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by Order ID or Customer name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-gray-400"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowUpDown size={18} />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Returns List Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Return Request</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Customer info</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Reason</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Refund</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredReturns.map((ret) => (
                                <tr key={ret.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-rose-500">
                                                <Package size={20} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 dark:text-white mb-0.5">{ret.id}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order: {ret.orderId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="font-bold text-gray-900 dark:text-white">{ret.customer}</p>
                                        <p className="text-xs text-gray-400">{ret.date}</p>
                                    </td>
                                    <td className="px-6 py-6 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        {ret.reason}
                                    </td>
                                    <td className="px-6 py-6 text-emerald-600 dark:text-emerald-400 font-black">
                                        ৳{ret.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-6">
                                        {ret.status === "pending" ? (
                                            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-xs bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full w-fit border border-amber-200/50 dark:border-amber-800/50">
                                                <Clock size={12} /> Pending
                                            </div>
                                        ) : ret.status === "approved" ? (
                                            <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit border border-blue-200/50 dark:border-blue-800/50">
                                                <CheckCircle2 size={12} /> Approved
                                            </div>
                                        ) : ret.status === "refunded" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit border border-emerald-200/50 dark:border-emerald-800/50">
                                                <DollarSign size={12} /> Refunded
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-bold text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                                                <XCircle size={12} /> Rejected
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all" title="View Request">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-all" title="Approve">
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Refund Policy Banner */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 opacity-10">
                    <RefreshCw size={240} className="text-white" />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-rose-600/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/30">
                        <AlertCircle size={32} className="text-rose-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1">Return Processing Reminder</h3>
                        <p className="text-gray-400 text-lg">Process pending requests within <span className="text-white font-bold">24 hours</span> to maintain a high customer satisfaction rating.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    <span>View Guidelines</span>
                    <ArrowRight size={20} />
                </button>
            </div>

        </div>
    )
}

function Plus({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
    )
}
