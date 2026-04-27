"use client"

import { useState } from "react"
import { 
    Mail, 
    Plus, 
    Search, 
    BarChart3, 
    Users, 
    Send, 
    CheckCircle2, 
    Clock, 
    FileText, 
    MoreHorizontal,
    TrendingUp,
    MousePointer2,
    Eye,
    ChevronRight,
    Zap,
    Layout
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface EmailCampaign {
    id: string
    name: string
    subject: string
    segment: string
    status: "sent" | "draft" | "scheduled" | "sending"
    sentDate: string
    openRate: number
    clickRate: number
}

const mockCampaigns: EmailCampaign[] = [
    { id: "1", name: "Eid-ul-Fitr Grand Sale", subject: "Up to 50% Off! Celebrate Eid with ReadyMart", segment: "All Customers", status: "sent", sentDate: "2024-03-20", openRate: 45.2, clickRate: 12.8 },
    { id: "2", name: "Weekend Flash Sale", subject: "Don't miss out! 24-hour flash sale starts now", segment: "VIP Customers", status: "sent", sentDate: "2024-03-23", openRate: 68.5, clickRate: 24.1 },
    { id: "3", name: "Abandoned Cart Reminder", subject: "You left something behind!", segment: "Cart Abandoners", status: "sending", sentDate: "Ongoing", openRate: 32.1, clickRate: 8.4 },
    { id: "4", name: "Newsletter March", subject: "New arrivals and tech trends this month", segment: "Newsletter Subs", status: "scheduled", sentDate: "2024-03-30", openRate: 0, clickRate: 0 },
    { id: "5", name: "Welcome Series", subject: "Welcome to the family! Here is 10% off", segment: "New Signups", status: "draft", sentDate: "N/A", openRate: 0, clickRate: 0 },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function EmailMarketingPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Mail size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Email Marketing
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Design, automate, and track high-converting email campaigns.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-blue-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Campaign</span>
                </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Emails Sent", value: "84.5k", icon: Send, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30" },
                    { label: "Avg. Open Rate", value: "32.4%", icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                    { label: "Avg. Click Rate", value: "8.2%", icon: MousePointer2, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/30" },
                    { label: "Subscriber Base", value: "12.8k", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
                ].map(stat => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 group hover:border-blue-500/30 transition-all duration-300">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Campaign Table Sections */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Layout size={20} className="text-blue-600" />
                        Campaign Overview
                    </h3>
                    <div className="relative w-full md:w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                         <input 
                            type="text" 
                            placeholder="Find campaign..." 
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500"
                         />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Campaign Name</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Audience Segment</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Performance</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                            {mockCampaigns.map((camp) => (
                                <tr key={camp.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-extrabold text-gray-900 dark:text-white leading-tight mb-1">{camp.name}</p>
                                            <p className="text-xs text-gray-400 italic font-medium line-clamp-1 truncate max-w-[200px]">{camp.subject}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                                            <Users size={14} className="text-blue-500" />
                                            {camp.segment}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        {camp.status === 'sent' ? (
                                            <div className="space-y-1.5 min-w-[120px]">
                                                <div className="flex justify-between text-[10px] font-black">
                                                    <span className="text-emerald-500">{camp.openRate}% Open</span>
                                                    <span className="text-blue-500">{camp.clickRate}% Click</span>
                                                </div>
                                                <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden flex">
                                                    <div className="h-full bg-emerald-500" style={{ width: `${camp.openRate}%` }}></div>
                                                    <div className="h-full bg-blue-500" style={{ width: `${camp.clickRate}%` }}></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-xs font-bold text-gray-300 italic">No data yet</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-6 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        {camp.status === "sent" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
                                                <CheckCircle2 size={12} /> {camp.sentDate}
                                            </div>
                                        ) : camp.status === "scheduled" ? (
                                            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                                                <Clock size={12} /> {camp.sentDate}
                                            </div>
                                        ) : camp.status === "sending" ? (
                                            <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full w-fit animate-pulse">
                                                <Zap size={12} /> In Progress
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-400 font-bold text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                                                <FileText size={12} /> Draft
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                                            <button title="View Analytics" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all"><BarChart3 size={18} /></button>
                                            <button title="Manage" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all"><MoreHorizontal size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Template Gallery Tip */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Layout size={120} />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <Layout size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1 leading-tight">Brand-New Templates</h3>
                        <p className="text-blue-100 text-lg opacity-80 max-w-lg font-medium">We've added <span className="text-white font-bold">12 mobile-optimized</span> email templates for summer sales. Just drag, drop, and send.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-blue-900 font-black px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    Browse Templates <ChevronRight size={20} />
                </button>
            </div>

        </div>
    )
}
