"use client"

import { useState } from "react"
import { 
    FileText, 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Eye, 
    Edit3, 
    Trash2, 
    CheckCircle2, 
    Clock, 
    XCircle,
    ArrowUpDown,
    User,
    Calendar,
    ChevronRight,
    BarChart3
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface BlogPost {
    id: string
    title: string
    author: string
    category: string
    status: "published" | "draft" | "scheduled" | "archived"
    views: number
    date: string
}

const mockPosts: BlogPost[] = [
    { id: "1", title: "Top 10 Smart Gadgets You Need in 2026", author: "Kishor Mahmud", category: "Technology", status: "published", views: 12840, date: "2024-03-22" },
    { id: "2", title: "How to Style Your Home with LED Lighting", author: "Sadia Rahman", category: "Lifestyle", status: "published", views: 5130, date: "2024-03-20" },
    { id: "3", title: "The Ultimate Guide to Wireless Earbuds", author: "Ariful Islam", category: "Technology", status: "draft", views: 0, date: "2024-03-24" },
    { id: "4", title: "Fashion Trends Dominating 2026", author: "Nusrat Jahan", category: "Fashion", status: "scheduled", views: 0, date: "2024-03-26" },
    { id: "5", title: "Best Budget Smartphones Under ৳15,000", author: "Tanvir Ahmed", category: "Technology", status: "published", views: 8420, date: "2024-03-15" },
    { id: "6", title: "Kitchen Gadgets That Save Time", author: "Kamal Hossain", category: "Home & Kitchen", status: "archived", views: 2100, date: "2023-12-10" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function AllPostsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <FileText size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            All Blog Posts
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage your content library, track engagement, and publish new articles.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create New Post</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by title, author, or category..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Filter By</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowUpDown size={18} />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Posts List Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Article Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Category</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none text-center">Engagement</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {mockPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all group">
                                    <td className="px-8 py-6 max-w-md">
                                        <div className="space-y-1">
                                            <p className="font-extrabold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors leading-snug line-clamp-1">{post.title}</p>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="inline-flex items-center gap-1.5 font-black text-gray-900 dark:text-white">
                                            <Eye size={16} className="text-gray-400" />
                                            {post.views.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        {post.status === "published" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit uppercase tracking-widest border border-emerald-200/50">
                                                <CheckCircle2 size={12} /> Live
                                            </div>
                                        ) : post.status === "scheduled" ? (
                                            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-[10px] bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit uppercase tracking-widest border border-blue-200/50">
                                                <Clock size={12} /> Scheduled
                                            </div>
                                        ) : post.status === "draft" ? (
                                            <div className="flex items-center gap-1.5 text-gray-500 font-bold text-[10px] bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit uppercase tracking-widest">
                                                <FileText size={12} /> Draft
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-rose-600 font-bold text-[10px] bg-rose-50 dark:bg-rose-900/20 px-3 py-1 rounded-full w-fit uppercase tracking-widest">
                                                <XCircle size={12} /> Archived
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                                            <button title="Edit Post" className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-xl transition-all">
                                                <Edit3 size={18} />
                                            </button>
                                            <button title="Delete" className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all">
                                                <Trash2 size={18} />
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

            {/* Pagination / Footer */}
            <div className="flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">
                <p className="text-sm font-bold text-gray-400">Showing 6 of 42 articles</p>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-black text-gray-400 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-black shadow-lg shadow-orange-500/20">1</button>
                    <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-black text-gray-900 dark:text-white hover:bg-gray-100 transition-colors">2</button>
                    <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs font-black text-gray-900 dark:text-white hover:bg-gray-100 transition-colors">Next</button>
                </div>
            </div>

            {/* Content Strategy Tip */}
            <div className="bg-indigo-900 text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-12">
                    <BarChart3 size={160} />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <BarChart3 size={32} className="text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1 leading-tight">Post Engagement Insights</h3>
                        <p className="text-indigo-100 text-lg opacity-80 max-w-lg font-medium">Articles with <span className="text-white font-bold">at least 3 internal product links</span> see 40% higher conversion. Optimize your drafts now.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-indigo-900 font-black px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    View Strategy <ChevronRight size={20} />
                </button>
            </div>

        </div>
    )
}
