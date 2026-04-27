"use client"

import { useState } from "react"
import Link from "next/link"
import { 
    Wallet, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight, 
    DollarSign, 
    CreditCard, 
    PieChart,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    Info,
    Calendar
} from "lucide-react"

const MOCK_STATS = [
    { label: "Total Balance", value: "$8,230.45", icon: Wallet, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { label: "Withdrawable", value: "$6,500.00", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { label: "Pending Clear", value: "$1,730.45", icon: Clock, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
]

const MONTHLY_EARNINGS = [
    { month: "Jan", amount: 4200 },
    { month: "Feb", amount: 3800 },
    { month: "Mar", amount: 5100 },
    { month: "Apr", amount: 4800 },
    { month: "May", amount: 6200 },
    { month: "Jun", amount: 5500 },
]

export default function WalletPage() {
    const maxAmount = Math.max(...MONTHLY_EARNINGS.map(m => m.amount))

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Wallet className="text-blue-600" size={32} />
                        Wallet & Financials
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Monitor your store's financial health, earnings growth, and payouts.</p>
                </div>
                <Link href="/vendor/withdrawals" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <CreditCard size={18} /> Withdraw Funds
                </Link>
            </div>

            {/* Quick Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_STATS.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                        <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bg} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-500`}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mt-1 tracking-tighter">{stat.value}</h3>
                        <div className="flex items-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                             <TrendingUp size={12} /> +12.5% from last month
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts & Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Earnings Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <BarChart3 className="text-blue-500" size={24} />
                                Earnings Growth
                            </h3>
                            <p className="text-sm text-gray-500 font-medium mt-1">Your monthly revenue trends over the last 6 months.</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Year 2026</span>
                        </div>
                    </div>

                    <div className="flex items-end justify-between h-64 gap-2 md:gap-6">
                        {MONTHLY_EARNINGS.map((m) => (
                            <div key={m.month} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full relative flex items-center justify-center">
                                    <div 
                                        className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-indigo-400 rounded-t-xl group-hover:from-blue-500 group-hover:to-indigo-300 transition-all duration-500 relative"
                                        style={{ height: `${(m.amount / maxAmount) * 200}px` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                                            ${m.amount}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{m.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info / Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                         <div className="absolute -right-12 -top-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                         <div className="relative z-10">
                            <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                                <Info size={20} /> Smart Insight
                            </h4>
                            <p className="text-sm opacity-80 font-medium leading-relaxed">Your earnings are <span className="font-black text-emerald-300">24% higher</span> than average vendors in your category. Consider adding more inventory to maintain the momentum.</p>
                            <Link href="/vendor/reports" className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                                View Full Report <ArrowRight size={16} />
                            </Link>
                         </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h4 className="text-lg font-black text-gray-900 dark:text-white mb-6">Payment Overview</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600">
                                        <PieChart size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Marketplace Fee</span>
                                </div>
                                <span className="text-xs font-black text-gray-900 dark:text-white">5.0%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
                                        <CreditCard size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Next Payout</span>
                                </div>
                                <span className="text-xs font-black text-gray-900 dark:text-white">Every Monday</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Warning */}
            <div className="p-6 rounded-[2rem] bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/50 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 shrink-0 shadow-lg">
                    <AlertCircle size={32} />
                </div>
                <div>
                    <h4 className="text-lg font-black text-orange-900 dark:text-orange-100">Verification Required</h4>
                    <p className="text-sm text-orange-700/70 dark:text-orange-300/70 mt-1 font-medium">To withdraw amounts over $5,000.00, you must complete your business verification (KYC). Visit the Verification tab to upload documents.</p>
                </div>
                <Link href="/vendor/verification" className="md:ml-auto px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/30 transition-all">
                    Verify Now
                </Link>
            </div>

        </div>
    )
}
