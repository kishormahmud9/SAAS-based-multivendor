"use client"

import { useState } from "react"
import { 
    Zap, 
    Plus, 
    Calendar, 
    Clock, 
    ChevronRight, 
    MoreVertical, 
    Timer, 
    Package, 
    TrendingUp,
    ChevronLeft
} from "lucide-react"

const MOCK_CAMPAIGNS = [
    { 
        id: 1, 
        name: "Summer Mega Flash Sale", 
        start: "20 May, 2026 - 10:00 AM", 
        end: "20 May, 2026 - 10:00 PM", 
        products: 12, 
        status: "Upcoming", 
        progress: 0,
        color: "bg-blue-600"
    },
    { 
        id: 2, 
        name: "Weekend Tech Blitz", 
        start: "15 May, 2026 - 08:00 AM", 
        end: "17 May, 2026 - 08:00 AM", 
        products: 45, 
        status: "Active", 
        progress: 65,
        color: "bg-orange-600"
    },
    { 
        id: 3, 
        name: "Eid Special Offers", 
        start: "10 May, 2026 - 12:00 AM", 
        end: "14 May, 2026 - 11:59 PM", 
        products: 8, 
        status: "Ended", 
        progress: 100,
        color: "bg-gray-600"
    },
]

export default function FlashSalePage() {
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Zap className="text-orange-500 fill-orange-500" size={32} />
                        Flash Sale Campaigns
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Participate in high-traffic sales events to maximize your store visibility.</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> New Campaign
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Active Event", value: "1", icon: Timer, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Upcoming Sales", value: "3", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Revenue Boost", value: "+24%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Campaign List */}
            <div className="space-y-6">
                <h3 className="text-xl font-black text-gray-900 dark:text-white">All Flash Sale Events</h3>
                
                <div className="grid grid-cols-1 gap-6">
                    {MOCK_CAMPAIGNS.map((item) => (
                        <div key={item.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-xl hover:border-orange-500/20 transition-all duration-500 overflow-hidden">
                            <div className="flex flex-col lg:flex-row lg:items-center">
                                {/* Side Visual */}
                                <div className={`lg:w-2 ${item.color} h-2 lg:h-40 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                                
                                <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                    <div className="lg:col-span-4 space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                                                item.status === 'Active' ? 'bg-orange-100 text-orange-600 animate-pulse' :
                                                item.status === 'Upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <h4 className="text-2xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                        <div className="flex items-center gap-4 pt-2">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                                                <Package size={14} className="text-gray-400" /> {item.products} Products Joined
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Start Time</p>
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.start}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                                                <Clock size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">End Time</p>
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.end}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-3 space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                                <span className="text-gray-400">Time Elapsed</span>
                                                <span className="text-gray-900 dark:text-white">{item.progress}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                                                    style={{ width: `${item.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <button className="w-full py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                            Manage Products
                                        </button>
                                    </div>

                                    <div className="lg:col-span-1 flex justify-end">
                                        <button className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Placeholder */}
            <div className="flex items-center justify-between pt-4">
                <p className="text-xs font-bold text-gray-400 italic">Showing active campaigns for May 2026</p>
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
    )
}
