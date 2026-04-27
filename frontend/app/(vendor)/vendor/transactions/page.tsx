"use client"

import { useState } from "react"
import { 
    History, 
    Download, 
    Search, 
    Filter, 
    ArrowUpRight, 
    ArrowDownRight, 
    DollarSign, 
    CreditCard, 
    PieChart,
    ChevronLeft,
    ChevronRight,
    FileText
} from "lucide-react"

const MOCK_TRANSACTIONS = [
    { id: "TXN-88241", desc: "Payout for Order #ORD-9923", amount: "+$114.00", fee: "$6.00", type: "Credit", date: "2 mins ago", status: "Successful" },
    { id: "TXN-88240", desc: "Withdrawal to Bank Account", amount: "-$500.00", fee: "$0.00", type: "Debit", date: "5 hours ago", status: "Successful" },
    { id: "TXN-88239", desc: "Payout for Order #ORD-9922", amount: "+$43.20", fee: "$2.30", type: "Credit", date: "15 hours ago", status: "Successful" },
    { id: "TXN-88238", desc: "Subscription Renewal (Standard)", amount: "-$29.99", fee: "$0.00", type: "Debit", date: "1 day ago", status: "Successful" },
    { id: "TXN-88237", desc: "Payout for Order #ORD-9921", amount: "+$199.50", fee: "$10.50", type: "Credit", date: "2 days ago", status: "Successful" },
]

export default function TransactionsPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <History className="text-blue-600" size={32} />
                        Financial Transactions
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Full history of your earnings, payouts, and commission deductions.</p>
                </div>
                <button className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-black text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2">
                    <Download size={18} /> Export CSV
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Earnings", value: "$18,420", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Commission Paid", value: "$1,240", icon: PieChart, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Total Withdrawn", value: "$15,400", icon: CreditCard, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                    { label: "Pending Payout", value: "$1,200", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                ].map((stat, i) => {
                    const Icon = stat.icon || DollarSign
                    return (
                        <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-4`}>
                                <Icon size={24} />
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                    )
                })}
            </div>

            {/* Transaction List */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search by Transaction ID or Description..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-medium focus:outline-none"
                        />
                    </div>
                    <button className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-2xl text-sm font-bold text-gray-500 flex items-center gap-2">
                        <Filter size={18} /> Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Transaction Info</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Deduction (Fee)</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {MOCK_TRANSACTIONS.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                txn.type === 'Credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                            }`}>
                                                {txn.type === 'Credit' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{txn.desc}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{txn.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className={`text-sm font-black ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {txn.amount}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-bold text-gray-400">{txn.fee}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex flex-col items-end">
                                            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{txn.date}</p>
                                            <button className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:underline mt-1">Receipt</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 italic">Showing 5 of 124 transactions this month</p>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 disabled:opacity-30" disabled>
                            <ChevronLeft size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

import { TrendingUp, Clock } from "lucide-react"
