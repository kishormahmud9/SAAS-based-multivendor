"use client"

import { useState } from "react"
import { Wallet, Search, Filter, CheckCircle2, XCircle, Clock, ArrowUpRight, DollarSign, CreditCard, Banknote, MoreHorizontal, Eye, Download, Landmark, ShieldCheck } from "lucide-react"

interface Withdrawal {
    id: string
    storeName: string
    amount: number
    method: 'Bank Transfer' | 'PayPal' | 'Stripe'
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
    date: string
    transactionId: string | null
}

const mockWithdrawals: Withdrawal[] = [
    { id: "1", storeName: "Elite Electronics", amount: 450.00, method: 'Bank Transfer', status: 'PENDING', date: "2024-03-24", transactionId: null },
    { id: "2", storeName: "Urban Vogue", amount: 1250.50, method: 'PayPal', status: 'COMPLETED', date: "2024-03-22", transactionId: "TXN_8829102" },
    { id: "3", storeName: "Comfort Living", amount: 800.00, method: 'Bank Transfer', status: 'REJECTED', date: "2024-03-20", transactionId: null },
    { id: "4", storeName: "Tech Gadgets", amount: 2100.00, method: 'Stripe', status: 'APPROVED', date: "2024-03-24", transactionId: "TXN_7736152" },
]

export default function WithdrawalsPage() {
    const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(mockWithdrawals)
    const [filter, setFilter] = useState('ALL')

    const filtered = withdrawals.filter(w => filter === 'ALL' || w.status === filter)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <Wallet className="text-blue-600" size={32} />
                        Payout Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Review and process vendor withdrawal requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                        <Download size={18} /> Export CSV
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">
                        Bulk Payout
                    </button>
                </div>
            </div>

            {/* Financial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Pending Payouts", value: "$3,450.00", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Total Disbursed", value: "$158,240", icon: Banknote, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Gateway Balance", value: "$12,400", icon: Landmark, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Monthly Growth", value: "+12.4%", icon: ArrowUpRight, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon size={20} />
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">+2.5%</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'REJECTED'].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${filter === s
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100"
                            }`}
                    >
                        {s}
                    </button>
                ))}
                <div className="ml-auto flex items-center gap-3">
                    <div className="relative hidden lg:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="TXN ID or Store..."
                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-blue-600 w-48"
                        />
                    </div>
                    <button className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-2.5 rounded-xl hover:bg-gray-100">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Withdrawals Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Store Entity</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payout Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Method</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Request Date</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filtered.map((w) => (
                                <tr key={w.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center font-black text-xs shadow-sm">
                                                {w.storeName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 dark:text-white leading-none mb-1">{w.storeName}</p>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Verified Store</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-black text-gray-900 dark:text-white">
                                        <div className="flex items-center gap-1">
                                            <DollarSign size={14} className="text-emerald-500" />
                                            <span>{w.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            {w.method === 'Bank Transfer' ? <Landmark size={14} className="text-gray-400" /> : <CreditCard size={14} className="text-gray-400" />}
                                            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{w.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-sm font-bold text-gray-600 dark:text-gray-400">
                                        {w.date}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${w.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' :
                                                w.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border border-orange-200/50 animate-pulse' :
                                                    w.status === 'APPROVED' ? 'bg-blue-50 text-blue-600 border border-blue-200/50' :
                                                        'bg-rose-50 text-rose-600 border border-rose-200/50'
                                            }`}>
                                            {w.status === 'COMPLETED' && <CheckCircle2 size={12} />}
                                            {w.status === 'PENDING' && <Clock size={12} />}
                                            {w.status === 'REJECTED' && <XCircle size={12} />}
                                            {w.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                                            {w.status === 'PENDING' && (
                                                <>
                                                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="Approve">
                                                        <CheckCircle2 size={18} />
                                                    </button>
                                                    <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Reject">
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Details">
                                                <Eye size={18} />
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

            {/* Financial Info Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                        <Landmark size={200} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                            <ShieldCheck className="text-emerald-500" />
                            Automated Payout Guard
                        </h3>
                        <p className="text-gray-400 text-lg max-w-xl font-medium leading-relaxed mb-8">
                            ReadyMart uses <span className="text-white font-bold">Smart-Flow Verification</span> to cross-check order delivery status before releasing funds. This prevents fraud and ensures customer satisfaction.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Escrowed Funds</p>
                                <p className="text-xl font-black">$42,500.80</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Release Cycle</p>
                                <p className="text-xl font-black">7 Days</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                        <Banknote size={40} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-gray-900 dark:text-white">Configure Tax</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage VAT/GST and local tax rules for vendor payouts.</p>
                    </div>
                    <button className="w-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 text-gray-900 dark:text-white font-black py-4 rounded-2xl transition-all active:scale-95 border border-gray-200 dark:border-gray-700 uppercase tracking-widest text-[10px]">
                        Global Tax Rules
                    </button>
                </div>
            </div>
        </div>
    )
}
