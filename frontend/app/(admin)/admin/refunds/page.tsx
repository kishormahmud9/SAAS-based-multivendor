"use client"

import { useState } from "react"
import { RefreshCw, Search, Filter, CheckCircle2, XCircle, Clock, DollarSign, Package, User, MoreHorizontal, Eye, MessageCircle } from "lucide-react"

interface RefundRequest {
    id: string
    orderId: string
    customer: string
    amount: number
    reason: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSING'
    date: string
}

const mockRefunds: RefundRequest[] = [
    { id: "REF-101", orderId: "ORD-8821", customer: "Alice Johnson", amount: 120.00, reason: "Product damaged on arrival", status: 'PENDING', date: "2024-03-24" },
    { id: "REF-100", orderId: "ORD-8815", customer: "Bob Smith", amount: 45.50, reason: "Wrong size delivered", status: 'APPROVED', date: "2024-03-23" },
    { id: "REF-099", orderId: "ORD-8790", customer: "Charlie Brown", amount: 210.00, reason: "Changed mind", status: 'REJECTED', date: "2024-03-22" },
]

export default function RefundRequestsPage() {
    const [refunds, setRefunds] = useState<RefundRequest[]>(mockRefunds)
    const [filter, setFilter] = useState('ALL')

    const filtered = refunds.filter(r => filter === 'ALL' || r.status === filter)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <RefreshCw className="text-purple-600" size={32} />
                        Refund Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Review and process customer refund and return requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                        Refund Policy
                    </button>
                    <button className="bg-purple-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all active:scale-95">
                        Bulk Process
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Pending Refunds", value: "12", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Approved Today", value: "8", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Total Refunded", value: "$4,250", icon: DollarSign, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
                    { label: "Refund Rate", value: "1.4%", icon: RefreshCw, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</h3>
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by refund ID, order, or customer..." 
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-purple-600"
                    />
                </div>
                <div className="flex gap-2">
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(s => (
                        <button 
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                filter === s 
                                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20" 
                                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Refund Case</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer Entity</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Reasoning</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filtered.map((r) => (
                                <tr key={r.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center font-black text-xs">
                                                <RefreshCw size={18} />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 dark:text-white leading-none mb-1">{r.id}</p>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order {r.orderId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
                                                <User size={12} className="text-gray-500" />
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{r.customer}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-black text-gray-900 dark:text-white">
                                        ${r.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-6 text-xs font-medium text-gray-500 dark:text-gray-400 max-w-[200px] truncate">
                                        {r.reason}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            r.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' :
                                            r.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border border-orange-200/50' :
                                            'bg-rose-50 text-rose-600 border border-rose-200/50'
                                        }`}>
                                            {r.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Eye size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><CheckCircle2 size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><XCircle size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"><MessageCircle size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
