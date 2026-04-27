"use client"

import { useState } from "react"
import { 
    Layers, 
    Plus, 
    Search, 
    Users, 
    TrendingUp, 
    TrendingDown, 
    Target, 
    Mail, 
    PieChart, 
    Edit3, 
    Trash2, 
    ArrowRight,
    Zap,
    MousePointer2,
    BarChart3
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface Segment {
    id: string
    name: string
    description: string
    userCount: number
    growth: number
    lastUpdated: string
    color: string
}

const mockSegments: Segment[] = [
    { id: "1", name: "High Value VIPs", description: "Customers with lifetime spend > ৳50,000", userCount: 420, growth: 12.5, lastUpdated: "2024-03-22", color: "bg-amber-500" },
    { id: "2", name: "Recent Signups", description: "Joined in the last 30 days without order", userCount: 1240, growth: 24.2, lastUpdated: "2024-03-24", color: "bg-blue-500" },
    { id: "3", name: "At Risk (Inactive)", description: "No purchase in last 6 months", userCount: 850, growth: -5.4, lastUpdated: "2024-03-20", color: "bg-rose-500" },
    { id: "4", name: "Cart Abandoners", description: "Items in cart for > 24 hours", userCount: 312, growth: 8.1, lastUpdated: "2024-03-23", color: "bg-indigo-500" },
    { id: "5", name: "Frequent Shoppers", description: "Purchased more than 5 times this year", userCount: 156, growth: 15.0, lastUpdated: "2024-03-18", color: "bg-emerald-500" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function SegmentsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Layers size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Customer Segments
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Group your audience by behavior and traits to deliver personalized marketing.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Smart Segment</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search segments by name or rule..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <BarChart3 size={18} />
                        <span>Insights</span>
                    </button>
                </div>
            </div>

            {/* Segments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSegments.map((segment) => (
                    <div key={segment.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 flex flex-col group relative">
                        
                        {/* Status Icon Indicator */}
                        <div className={`absolute top-8 right-8 w-12 h-12 rounded-2xl ${segment.color} flex items-center justify-center text-white shadow-lg shadow-black/10`}>
                            <Target size={24} />
                        </div>

                        <div className="p-8 space-y-4 flex-1">
                            <div>
                                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-indigo-600 transition-colors">{segment.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 pr-12 font-medium">{segment.description}</p>
                            </div>

                            <div className="flex items-end justify-between pt-4">
                                <div>
                                    <div className="flex items-center gap-1.5 text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-1">
                                        <Users size={12} />
                                        <span>User Base</span>
                                    </div>
                                    <div className="text-3xl font-black text-gray-900 dark:text-white">{segment.userCount.toLocaleString()}</div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-black ${segment.growth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {segment.growth >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    {Math.abs(segment.growth)}%
                                </div>
                            </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-1 group-hover:opacity-100 opacity-0 transition-opacity">
                                <button title="Edit Rules" className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-xl transition-all"><Edit3 size={16} /></button>
                                <button title="Delete Segment" className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"><Trash2 size={16} /></button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button title="Sync Data" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all"><MousePointer2 size={16} /></button>
                                <button className="bg-indigo-600 text-white font-black px-5 py-2.5 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 text-sm">
                                    <Mail size={14} /> Campaign
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Smart Segmentation Banner */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                    <PieChart size={240} className="text-white" />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <Zap size={32} className="text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1">AI-Powered Auto Segments</h3>
                        <p className="text-indigo-100 text-lg opacity-80 max-w-lg">Advanced algorithms identified <span className="text-white font-bold">3 new behavior clusters</span> this week. Ready to explore?</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-indigo-950 font-black px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    Review Segments <ArrowRight size={20} />
                </button>
            </div>

        </div>
    )
}
