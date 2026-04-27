"use client"

import { useState } from "react"
import { 
    Gem, 
    Check, 
    Zap, 
    Clock, 
    History, 
    Download, 
    ChevronRight, 
    AlertCircle,
    ArrowUpRight,
    Target
} from "lucide-react"

const MOCK_PLANS = [
    { 
        name: "Starter", 
        price: "Free", 
        period: "Forever", 
        features: ["10 Active Products", "5% Commission", "Standard Support", "Basic Analytics"], 
        current: false,
        color: "bg-gray-100 text-gray-900"
    },
    { 
        name: "Professional", 
        price: "$29.99", 
        period: "per month", 
        features: ["Unlimited Products", "3% Commission", "Priority Support", "Advanced Analytics", "Flash Sale Access"], 
        current: true,
        color: "bg-blue-600 text-white shadow-xl shadow-blue-500/25"
    },
    { 
        name: "Enterprise", 
        price: "$99.99", 
        period: "per month", 
        features: ["Global Fulfillment", "1% Commission", "Dedicated Manager", "White-label Branding", "Custom API Access"], 
        current: false,
        color: "bg-gray-900 text-white shadow-xl shadow-gray-900/25"
    },
]

const BILLING_HISTORY = [
    { id: "INV-2241", date: "01 May, 2026", amount: "$29.99", status: "Paid" },
    { id: "INV-2130", date: "01 Apr, 2026", amount: "$29.99", status: "Paid" },
    { id: "INV-2015", date: "01 Mar, 2026", amount: "$29.99", status: "Paid" },
]

export default function SubscriptionPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Gem className="text-blue-600" size={32} />
                        Subscription & Plans
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage your store's growth plan, usage limits and billing history.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                        <History size={18} /> Billing History
                    </button>
                </div>
            </div>

            {/* Usage Limits Section */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                 <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <Target size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Usage & Limits</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { label: "Product Listings", used: 248, total: "Unlimited", percent: 100, color: "bg-emerald-500" },
                            { label: "Storage Space", used: "4.2 GB", total: "10 GB", percent: 42, color: "bg-blue-500" },
                            { label: "Monthly API Calls", used: "12k", total: "50k", percent: 24, color: "bg-purple-500" },
                        ].map(usage => (
                            <div key={usage.label} className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{usage.label}</span>
                                    <span className="text-sm font-black text-gray-900 dark:text-white">{usage.used} / {usage.total}</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${usage.color} rounded-full transition-all duration-1000`} style={{ width: `${usage.percent}%` }}></div>
                                </div>
                                <p className="text-[10px] font-bold text-gray-500 italic">Resets in 12 days</p>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            {/* Plans Comparison */}
            <div className="space-y-8">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white">Choose Your Growth Path</h2>
                    <p className="text-gray-500 font-medium">Upgrade to a professional plan to lower your commissions and unlock tools.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {MOCK_PLANS.map((plan) => (
                        <div key={plan.name} className={`rounded-[3rem] p-10 flex flex-col relative transition-all duration-500 hover:scale-[1.02] border border-gray-100 dark:border-gray-800 ${plan.color}`}>
                            {plan.current && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Your Current Plan</span>
                            )}
                            
                            <div className="space-y-2 mb-8">
                                <h4 className="text-xl font-black">{plan.name}</h4>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black tracking-tighter">{plan.price}</span>
                                    <span className="text-xs font-bold opacity-60">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="flex-1 space-y-4 mb-10">
                                {plan.features.map(feat => (
                                    <li key={feat} className="flex items-center gap-3 text-sm font-medium">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.current ? 'bg-white/20' : 'bg-blue-600/10'}`}>
                                            <Check size={12} className={plan.current ? 'text-white' : 'text-blue-600'} />
                                        </div>
                                        <span className="opacity-90">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                                plan.current 
                                ? 'bg-white/20 hover:bg-white/30 text-white' 
                                : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-105 shadow-xl'
                            }`}>
                                {plan.current ? 'Manage Billing' : `Switch to ${plan.name}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Billing History Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <History size={24} className="text-blue-600" />
                        Recent Invoices
                    </h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">View All Billing</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Invoice ID</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Billing Date</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {BILLING_HISTORY.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all">
                                    <td className="px-8 py-5 text-sm font-black text-gray-900 dark:text-white">{inv.id}</td>
                                    <td className="px-8 py-5 text-sm font-bold text-gray-500">{inv.date}</td>
                                    <td className="px-8 py-5 text-sm font-black text-gray-900 dark:text-white">{inv.amount}</td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 transition-all">
                                            <Download size={16} />
                                        </button>
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
