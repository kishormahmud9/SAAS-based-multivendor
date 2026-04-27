"use client"

import { useState } from "react"
import { 
    MessageSquare, 
    Search, 
    Filter, 
    CheckCircle2, 
    XCircle, 
    AlertCircle, 
    Trash2, 
    Reply, 
    MoreHorizontal,
    User,
    Calendar,
    FileText,
    ArrowRight,
    Flag,
    ShieldAlert
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface BlogComment {
    id: string
    postTitle: string
    user: string
    content: string
    status: "pending" | "approved" | "spam" | "trash"
    date: string
}

const mockComments: BlogComment[] = [
    { id: "1", postTitle: "Top 10 Smart Gadgets You Need in 2026", user: "Ariful Islam", content: "Great article! I was looking for a budget-friendly smartwatch and this helped a lot.", status: "approved", date: "2024-03-22" },
    { id: "2", postTitle: "Fashion Trends Dominating 2026", user: "Sadia Rahman", content: "Is the oversized hoodie trend still going strong in 2026?", status: "pending", date: "2024-03-24" },
    { id: "3", postTitle: "The Ultimate Guide to Wireless Earbuds", user: "John Doe", content: "Check out this link for cheap electronics: http://spam-link.com", status: "spam", date: "2024-03-20" },
    { id: "4", postTitle: "How to Style Your Home with LED Lighting", user: "Nusrat Jahan", content: "Where can I buy those strip lights mentioned in the post?", status: "approved", date: "2024-03-18" },
    { id: "5", postTitle: "Best Budget Smartphones Under ৳15,000", user: "Tanvir Ahmed", content: "Does the phone mentioned have a good camera for night photography?", status: "pending", date: "2024-03-23" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function BlogCommentsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <MessageSquare size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Blog Comments
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Moderate user engagement, respond to questions, and filter spam content.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="bg-orange-50 dark:bg-orange-900/20 px-4 py-3 rounded-2xl border border-orange-200/50 flex items-center gap-3 font-bold text-orange-600 select-none">
                        <AlertCircle size={18} />
                        <span>28 Pending Responses</span>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search comments by user or content..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Filter By Status</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-rose-600 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors">
                        <Trash2 size={18} />
                        <span>Clear Spam</span>
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {mockComments.map((comment) => (
                    <div key={comment.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm p-8 flex flex-col md:flex-row gap-8 transition-all hover:shadow-xl hover:border-orange-500/20 group animate-in slide-in-from-bottom-2 duration-500 relative overflow-hidden">
                        
                        {/* Status Tip Glow */}
                        {comment.status === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>}

                        {/* User Profile */}
                        <div className="md:w-56 shrink-0 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500 shadow-inner">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-gray-900 dark:text-white leading-tight">{comment.user}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Contributor</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-widest leading-none">
                                    <Calendar size={12} /> {comment.date}
                                </span>
                                {comment.status === "pending" ? (
                                    <div className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 text-[10px] font-black uppercase tracking-widest rounded border border-orange-200/50 w-fit">Waiting</div>
                                ) : comment.status === "approved" ? (
                                    <div className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded border border-emerald-200/50 w-fit">Public</div>
                                ) : (
                                    <div className="px-2 py-0.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded border border-rose-200/50 w-fit">{comment.status}</div>
                                )}
                            </div>
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center flex-wrap gap-2 text-sm font-bold">
                                <span className="text-gray-400 uppercase tracking-widest text-[10px]">Article:</span>
                                <span className="text-gray-900 dark:text-white flex items-center gap-1.5 group-hover:text-orange-600 transition-colors">
                                    <FileText size={14} className="text-orange-500" />
                                    {comment.postTitle}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium bg-gray-50/50 dark:bg-gray-800/30 p-5 rounded-3xl border border-gray-100 dark:border-gray-800/50 italic">
                                "{comment.content}"
                            </p>
                        </div>

                        {/* Actions Panel */}
                        <div className="md:w-32 shrink-0 flex flex-row md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-6 md:pt-0 md:pl-8">
                            <button title="Approve" className="p-3 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl hover:bg-emerald-100 transition-all flex items-center justify-center shrink-0">
                                <CheckCircle2 size={20} />
                            </button>
                            <button title="Reply" className="p-3 text-blue-600 bg-blue-50 dark:bg-blue-950/30 rounded-2xl hover:bg-blue-100 transition-all flex items-center justify-center shrink-0">
                                <Reply size={20} />
                            </button>
                            <button title="Spam" className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-2xl transition-all flex items-center justify-center shrink-0">
                                <ShieldAlert size={20} />
                            </button>
                            <button className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-2xl transition-all flex items-center justify-center shrink-0">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Moderation Tip Banner */}
            <div className="bg-orange-950 text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-12">
                    <Flag size={160} />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <ShieldAlert size={32} className="text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1 leading-tight">Smart Spam Protection</h3>
                        <p className="text-orange-100 text-lg opacity-80 max-w-lg font-medium">Automatic filters caught <span className="text-white font-bold">14 spam clusters</span> this week. Your community stays clean and safe.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-orange-950 font-black px-8 py-4 rounded-2xl hover:bg-orange-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    Review Filter Rules <ArrowRight size={20} />
                </button>
            </div>

        </div>
    )
}
