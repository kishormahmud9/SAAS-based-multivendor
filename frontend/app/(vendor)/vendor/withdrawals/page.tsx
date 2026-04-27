"use client"

import { useState } from "react"
import { 
    Wallet, 
    CreditCard, 
    History, 
    ArrowUpRight, 
    ArrowDownRight, 
    DollarSign, 
    CheckCircle, 
    Clock, 
    AlertCircle,
    Building,
    Plus,
    X,
    Info
} from "lucide-react"

const MOCK_WITHDRAWALS = [
    { id: "#WDR-7701", amount: "$500.00", method: "Bank Transfer (DBBL)", status: "Completed", date: "2 days ago" },
    { id: "#WDR-7702", amount: "$1,200.00", method: "PayPal", status: "Pending", date: "5 hours ago" },
    { id: "#WDR-7698", amount: "$350.00", method: "Bank Transfer (DBBL)", status: "Completed", date: "1 week ago" },
    { id: "#WDR-7685", amount: "$800.00", method: "bKash", status: "Completed", date: "2 weeks ago" },
]

export default function WithdrawalsPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <CreditCard className="text-emerald-600" size={32} />
                    Payouts & Withdrawals
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1">Manage your earnings, link payment methods and request withdrawals.</p>
            </div>

            {/* Wallet Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                    
                    <div className="relative z-10">
                        <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Total Balance Available</p>
                        <h2 className="text-6xl font-black tracking-tighter mb-8">$8,230.45</h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Pending</p>
                                <p className="text-xl font-bold mt-1">$1,200.00</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Withdrawn</p>
                                <p className="text-xl font-bold mt-1">$15,400.00</p>
                            </div>
                            <div className="md:col-span-2 flex justify-end items-end">
                                <button className="px-8 py-3 bg-white text-emerald-600 rounded-2xl text-sm font-black shadow-lg hover:scale-105 transition-all">
                                    Withdraw Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Building className="text-blue-500" size={20} />
                        Payout Method
                    </h3>
                    
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-blue-500/20 relative group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center text-blue-600 shadow-sm">
                                <Building size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-900 dark:text-white">Dutch Bangla Bank</p>
                                <p className="text-[10px] text-gray-500 font-bold mt-0.5">Acc: **** 9923 (Savings)</p>
                            </div>
                        </div>
                        <span className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-black uppercase tracking-widest">Primary</span>
                    </div>

                    <button className="w-full py-4 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl text-xs font-black text-gray-400 hover:text-blue-500 hover:border-blue-500 transition-all flex items-center justify-center gap-2">
                        <Plus size={16} /> Link New Account
                    </button>
                </div>
            </div>

            {/* Withdrawal History */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <History className="text-emerald-500" size={24} />
                        Withdrawal History
                    </h3>
                    <div className="flex items-center gap-3">
                         <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <select className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none appearance-none">
                                <option>This Month</option>
                                <option>Last 3 Months</option>
                                <option>All Time</option>
                            </select>
                         </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Request ID</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Payout Method</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {MOCK_WITHDRAWALS.map((w) => (
                                <tr key={w.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-8 py-5 text-sm font-black text-gray-900 dark:text-white">{w.id}</td>
                                    <td className="px-8 py-5">
                                        <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{w.amount}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <Building size={14} className="text-gray-400" />
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{w.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            w.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20'
                                        }`}>
                                            {w.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-bold text-gray-500">{w.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Guidelines Card */}
            <div className="p-6 rounded-[2rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-lg">
                    <Info size={32} />
                </div>
                <div>
                    <h4 className="text-lg font-black text-blue-900 dark:text-blue-100">Payout Guidelines</h4>
                    <p className="text-sm text-blue-700/70 dark:text-blue-300/70 mt-1 font-medium">Minimum withdrawal amount is $100. Payouts are processed every Monday and Thursday. It may take up to 3 business days for funds to appear in your account.</p>
                </div>
            </div>

        </div>
    )
}
