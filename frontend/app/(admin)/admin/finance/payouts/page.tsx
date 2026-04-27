"use client"

import { useState } from "react"
import { 
    History, 
    Search, 
    Filter, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    ArrowUpRight, 
    DollarSign, 
    CreditCard, 
    Banknote, 
    MoreHorizontal, 
    Eye, 
    Download, 
    Landmark, 
    FileText, 
    Calendar,
    ChevronRight,
    ArrowDownRight
} from "lucide-react"

interface Payout {
    id: string
    storeName: string
    amount: number
    method: 'BANK_TRANSFER' | 'STRIPE' | 'PAYPAL'
    reference: string
    status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED'
    date: string
}

const mockPayouts: Payout[] = [
    { id: "PO-7721", storeName: "Elite Electronics", amount: 1250.00, method: 'BANK_TRANSFER', reference: "TXN_992011", status: 'PENDING', date: "2024-03-25" },
    { id: "PO-7720", storeName: "Urban Vogue", amount: 840.50, method: 'STRIPE', reference: "ch_3O9xJ2", status: 'COMPLETED', date: "2024-03-24" },
    { id: "PO-7719", storeName: "Tech Gadgets", amount: 2100.00, method: 'PAYPAL', reference: "PP-882910", status: 'APPROVED', date: "2024-03-23" },
    { id: "PO-7718", storeName: "Home Decor", amount: 450.00, method: 'BANK_TRANSFER', reference: "TXN_991822", status: 'REJECTED', date: "2024-03-22" },
]

export default function PayoutsHistoryPage() {
    const [payouts, setPayouts] = useState<Payout[]>(mockPayouts)
    const [filter, setFilter] = useState('ALL')

    const filteredPayouts = payouts.filter(p => filter === 'ALL' || p.status === filter)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <History className="text-blue-600" size={32} />
                        Payout History
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Track and process all vendor payout transactions across the marketplace.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                        <FileText size={18} /> Export CSV
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                        <Download size={18} /> Export PDF
                    </button>
                </div>
            </div>

            {/* Financial Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Pending Payouts", value: "$1,250.00", count: "1", icon: Clock, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Approved (Not Sent)", value: "$2,100.00", count: "1", icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Completed (30D)", value: "$42,500.80", count: "124", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Rejected Requests", value: "$450.00", count: "1", icon: XCircle, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start relative z-10">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 text-[10px] font-black px-2 py-1 rounded-lg text-gray-500 uppercase tracking-widest">
                                {stat.count} TXNs
                            </div>
                        </div>
                        <div className="mt-4 relative z-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                             <stat.icon size={100} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                    {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'REJECTED'].map(s => (
                        <button 
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                                filter === s 
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                                : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100"
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <div className="ml-auto flex items-center gap-3">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="TXN ID or Store..." 
                            className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-blue-600 w-full md:w-48"
                        />
                    </div>
                    <button className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400 hover:text-blue-600 transition-colors">
                        <Filter size={18} />
                    </button>
                    <button className="p-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-gray-400 hover:text-blue-600 transition-colors">
                        <Calendar size={18} />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Store / Vendor</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredPayouts.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center font-black text-[10px]">
                                                {p.id.split('-')[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tighter">{p.id}</p>
                                                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{p.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-bold text-gray-900 dark:text-white text-sm">
                                        {p.storeName}
                                    </td>
                                    <td className="px-6 py-6 font-black text-gray-900 dark:text-white">
                                        ${p.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            {p.method === 'BANK_TRANSFER' ? <Landmark size={14} className="text-gray-400" /> : 
                                             p.method === 'STRIPE' ? <CreditCard size={14} className="text-gray-400" /> : 
                                             <Banknote size={14} className="text-gray-400" />}
                                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{p.method.replace('_', ' ')}</span>
                                        </div>
                                        <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{p.reference}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            p.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' :
                                            p.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border border-orange-200/50 animate-pulse' :
                                            p.status === 'APPROVED' ? 'bg-blue-50 text-blue-600 border border-blue-200/50' :
                                            'bg-rose-50 text-rose-600 border border-rose-200/50'
                                        }`}>
                                            {p.status === 'COMPLETED' && <CheckCircle2 size={12} />}
                                            {p.status === 'PENDING' && <Clock size={12} />}
                                            {p.status === 'REJECTED' && <XCircle size={12} />}
                                            {p.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Details"><Eye size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="Approve"><CheckCircle2 size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Reject"><XCircle size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="More"><MoreHorizontal size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Info Message */}
            <div className="bg-blue-900/5 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-8 rounded-[2.5rem] flex items-center gap-8 group">
                <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 group-hover:rotate-6 transition-transform">
                    <Landmark size={32} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-1 leading-none">Automated Settlement Cycle</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        ReadyMart processes approved payouts every Friday at 10:00 PM UTC. Direct Bank transfers may take 2-3 business days to reflect in the vendor's account after processing.
                    </p>
                </div>
                <button className="ml-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 whitespace-nowrap">
                    Review Settlement Logic
                </button>
            </div>
        </div>
    )
}
