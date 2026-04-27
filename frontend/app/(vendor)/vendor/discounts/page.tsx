"use client"

import { useState } from "react"
import { 
    Tag, 
    Plus, 
    Search, 
    Filter, 
    MoreVertical, 
    Trash2, 
    Edit, 
    Ticket, 
    Zap, 
    Calendar,
    CheckCircle2,
    Clock,
    XCircle
} from "lucide-react"

const MOCK_COUPONS = [
    { id: 1, code: "SUMMER25", discount: "25% OFF", type: "Percentage", usage: "124/500", expiry: "24 May, 2026", status: "Active" },
    { id: 2, code: "WELCOME10", discount: "$10 OFF", type: "Fixed Amount", usage: "850/Unlimited", expiry: "Permanent", status: "Active" },
    { id: 3, code: "FLASH50", discount: "50% OFF", type: "Percentage", usage: "50/50", expiry: "Expired", status: "Expired" },
]

const MOCK_AUTO_DISCOUNTS = [
    { id: 1, name: "Buy 2 Get 1 Free", rule: "Buy 2 items from 'Accessories' and get 1 free.", active: true },
    { id: 2, name: "Free Shipping over $100", rule: "Orders above $100 get free shipping automatically.", active: true },
]

export default function DiscountsPage() {
    const [tab, setTab] = useState("coupons")

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Tag className="text-orange-600" size={32} />
                        Discounts & Coupons
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Boost your sales by creating attractive offers and discount campaigns.</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> Create New Offer
                </button>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
                <button 
                    onClick={() => setTab("coupons")}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'coupons' ? 'bg-white dark:bg-gray-900 text-orange-600 shadow-sm' : 'text-gray-400'}`}
                >
                    <Ticket size={16} /> Coupons
                </button>
                <button 
                    onClick={() => setTab("auto")}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${tab === 'auto' ? 'bg-white dark:bg-gray-900 text-orange-600 shadow-sm' : 'text-gray-400'}`}
                >
                    <Zap size={16} /> Auto Rules
                </button>
            </div>

            {tab === "coupons" ? (
                <div className="space-y-6">
                    {/* Search & Filter */}
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search coupon code..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-orange-500/30 rounded-2xl text-sm font-medium focus:outline-none"
                            />
                        </div>
                        <button className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-2xl text-sm font-bold text-gray-500 flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </button>
                    </div>

                    {/* Coupon Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MOCK_COUPONS.map((coupon) => (
                            <div key={coupon.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 relative">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                            <Ticket size={24} />
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            coupon.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                                        }`}>
                                            {coupon.status}
                                        </span>
                                    </div>

                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-1">{coupon.code}</h3>
                                    <p className="text-lg font-bold text-orange-600">{coupon.discount}</p>
                                    
                                    <div className="mt-8 space-y-3">
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                                            <span>Usage Stats</span>
                                            <span className="text-gray-900 dark:text-white">{coupon.usage}</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-orange-500 rounded-full" style={{ width: '40%' }}></div>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pt-2">
                                            <Calendar size={12} /> Expiry: {coupon.expiry}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between border-t border-gray-50 dark:border-gray-800">
                                    <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Edit Code</button>
                                    <button className="w-8 h-8 rounded-lg hover:bg-white dark:hover:bg-gray-900 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                
                                {/* Ticket Cutout Effects */}
                                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full border border-gray-100 dark:border-gray-800"></div>
                                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full border border-gray-100 dark:border-gray-800"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Auto Discount Rules */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {MOCK_AUTO_DISCOUNTS.map((rule) => (
                            <div key={rule.id} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex items-start gap-6 relative overflow-hidden group">
                                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center text-blue-600 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                                    <Zap size={32} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white leading-tight">{rule.name}</h3>
                                        <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                            <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 leading-relaxed">{rule.rule}</p>
                                    <div className="pt-4 flex items-center gap-4">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Configure</button>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Remove Rule</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Rule Button */}
                        <button className="bg-gray-50 dark:bg-gray-800/30 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-4 group hover:border-orange-500 transition-all">
                            <div className="w-14 h-14 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-orange-600 shadow-sm transition-colors">
                                <Plus size={28} />
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-black text-gray-900 dark:text-white">Create New Auto-Rule</h4>
                                <p className="text-xs font-medium text-gray-500 mt-1">Setup volume or tier based automated discounts.</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}

        </div>
    )
}
