"use client"

import { useState } from "react"
import {
    Ticket,
    Plus,
    Search,
    Copy,
    Edit3,
    Trash2,
    Calendar,
    Users,
    CheckCircle2,
    XCircle,
    Clock,
    Tag,
    Scissors,
    Zap,
    Gift,
    ChevronRight,
    MousePointer2
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface Coupon {
    id: string
    code: string
    discountType: "percentage" | "fixed" | "free-shipping"
    discountValue: number
    minPurchase: number
    expiryDate: string
    usageLimit: number
    usedCount: number
    status: "active" | "expired" | "disabled"
}

const mockCoupons: Coupon[] = [
    { id: "1", code: "WELCOME2026", discountType: "percentage", discountValue: 10, minPurchase: 1000, expiryDate: "2026-12-31", usageLimit: 500, usedCount: 124, status: "active" },
    { id: "2", code: "FESTIVE500", discountType: "fixed", discountValue: 500, minPurchase: 5000, expiryDate: "2024-04-15", usageLimit: 100, usedCount: 85, status: "active" },
    { id: "3", code: "FREESHIP24", discountType: "free-shipping", discountValue: 0, minPurchase: 2000, expiryDate: "2024-03-20", usageLimit: 1000, usedCount: 1000, status: "expired" },
    { id: "4", code: "MODERNSTORE", discountType: "percentage", discountValue: 15, minPurchase: 3000, expiryDate: "2024-12-31", usageLimit: 200, usedCount: 42, status: "disabled" },
    { id: "5", code: "FLASH25", discountType: "percentage", discountValue: 25, minPurchase: 0, expiryDate: "2024-03-25", usageLimit: 50, usedCount: 12, status: "active" }
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function CouponsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [coupons, setCoupons] = useState(mockCoupons)

    const filteredCoupons = coupons.filter(c => 
        c.code.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 text-xl font-black italic">
                            %
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Coupons Manager
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Maximize sales by defining high-conversion coupon codes and seasonal discounts.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Generate New Coupon</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search coupons by code..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                    />
                </div>
                
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest px-4 shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span>{coupons.filter(c => c.status === 'active').length} Active</span>
                    </div>
                </div>
            </div>

            {/* Coupons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCoupons.map((coupon) => (
                    <div key={coupon.id} className="group relative bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 flex flex-col sm:flex-row">
                        
                        {/* Left Side: The "Value" half of ticket */}
                        <div className={`sm:w-32 bg-gradient-to-br ${coupon.status === 'active' ? 'from-indigo-600 to-indigo-900' : 'from-gray-600 to-gray-800'} p-6 flex flex-col items-center justify-center text-white relative`}>
                            {/* Decorative Cutouts */}
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-white dark:bg-gray-950 rounded-full" />
                            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-white dark:bg-gray-950 rounded-full" />
                            
                            <div className="text-center">
                                <span className="text-3xl font-black leading-none block">
                                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : coupon.discountType === 'fixed' ? `৳${coupon.discountValue}` : 'FREE'}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-70 block">
                                    {coupon.discountType === 'percentage' ? 'OFF' : coupon.discountType === 'fixed' ? 'FIXED' : 'SHIP'}
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Details half of ticket */}
                        <div className="flex-1 p-8 relative">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-widest uppercase">{coupon.code}</h3>
                                        <button className="text-gray-300 hover:text-indigo-500 transition-colors" title="Copy Code">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-gray-400">Min. Purchase: <span className="text-gray-900 dark:text-white">৳{coupon.minPurchase.toLocaleString()}</span></p>
                                </div>
                                <div className="flex flex-col items-end">
                                    {coupon.status === 'active' ? (
                                        <span className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-emerald-200/50">Active</span>
                                    ) : (
                                        <span className="bg-gray-100 dark:bg-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">Suspended</span>
                                    )}
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-gray-100 dark:border-gray-800">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Calendar size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Expires</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-900 dark:text-white">{coupon.expiryDate}</p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Users size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Usage</span>
                                    </div>
                                    <p className="text-sm font-black text-gray-900 dark:text-white">{coupon.usedCount} / {coupon.usageLimit}</p>
                                </div>
                             </div>

                             {/* Action Hover Panel */}
                             <div className="absolute right-4 bottom-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit3 size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                                <button className="p-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl font-bold text-xs px-3">Manage</button>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Strategies Section */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Zap size={20} className="text-amber-500" />
                        Campaign Strategies
                    </h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-transparent hover:border-indigo-500/20 transition-all group">
                        <Gift size={24} className="text-indigo-600 mb-4" />
                        <h4 className="font-extrabold text-gray-900 dark:text-white mb-2">Cart Abandonment</h4>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">Send 10% discount codes to users with items left in cart for more than 24h.</p>
                        <button className="text-xs font-black text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">Setup Hook <ChevronRight size={14} /></button>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-transparent hover:border-indigo-500/20 transition-all group">
                        <Scissors size={24} className="text-rose-600 mb-4" />
                        <h4 className="font-extrabold text-gray-900 dark:text-white mb-2">Conditional Cutting</h4>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">Apply progressive discounts based on cart volume: Buy 3+ items, get 15% off.</p>
                        <button className="text-xs font-black text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">Configure Rules <ChevronRight size={14} /></button>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-transparent hover:border-indigo-500/20 transition-all group">
                        <MousePointer2 size={24} className="text-amber-600 mb-4" />
                        <h4 className="font-extrabold text-gray-900 dark:text-white mb-2">Influencer Codes</h4>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4">Track performance of custom codes generated for social media partners.</p>
                        <button className="text-xs font-black text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">View Analytics <ChevronRight size={14} /></button>
                    </div>
                </div>
            </div>

        </div>
    )
}
