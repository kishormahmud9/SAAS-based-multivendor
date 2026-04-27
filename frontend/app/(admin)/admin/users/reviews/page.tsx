"use client"

import { useState } from "react"
import { 
    MessageSquare, 
    Star, 
    Search, 
    Filter, 
    CheckCircle2, 
    XCircle, 
    MoreHorizontal,
    Reply,
    Eye,
    Trash2,
    ShoppingBag,
    User,
    Calendar,
    ThumbsUp,
    AlertCircle,
    ArrowRight
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface Review {
    id: string
    product: string
    user: string
    rating: number
    comment: string
    status: "pending" | "published" | "hidden"
    date: string
    likes: number
}

const mockReviews: Review[] = [
    { id: "1", product: "Wireless Headphones Pro", user: "Ariful Islam", rating: 5, comment: "Amazing sound quality and very comfortable for long hours. Highly recommended!", status: "published", date: "2024-03-22", likes: 12 },
    { id: "2", product: "Smart Watch Elite", user: "Sadia Rahman", rating: 4, comment: "Good features but the battery life could be better. Overall happy with the purchase.", status: "pending", date: "2024-03-24", likes: 0 },
    { id: "3", product: "Leather Wallet", user: "Kamal Hossain", rating: 2, comment: "The color is different from the pictures. Quality is okay but not what I expected.", status: "published", date: "2024-03-20", likes: 3 },
    { id: "4", product: "Gaming Mouse RGB", user: "Nusrat Jahan", rating: 5, comment: "Super fast response time and the lighting looks great!", status: "hidden", date: "2024-03-15", likes: 8 },
    { id: "5", product: "Unisex Hoodie", user: "Tanvir Ahmed", rating: 1, comment: "Received the wrong size and the fabric feels cheap. Very disappointed.", status: "pending", date: "2024-03-23", likes: 0 },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function ReviewsPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <MessageSquare size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Reviews & Feedback
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Moderate user-generated content and engage with your customers' voices.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 rounded-2xl border border-emerald-200/50 flex items-center gap-3 font-bold text-emerald-600 select-none">
                        <Star size={18} className="fill-emerald-600" />
                        <span>Avg. Rating: 4.8</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Reviews", value: "2.4k", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/30" },
                    { label: "Pending", value: "18", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/30" },
                    { label: "Published", value: "2.3k", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                    { label: "Hidden", value: "42", icon: XCircle, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/30" },
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

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search reviews by product or customer..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Star size={18} />
                        <span>All Ratings</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Status</span>
                    </button>
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {mockReviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm p-8 flex flex-col md:flex-row gap-8 transition-all hover:shadow-xl hover:border-emerald-500/20 group animate-in slide-in-from-bottom-2 duration-500">
                        {/* User & Rating Profile */}
                        <div className="md:w-64 shrink-0 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-gray-900 dark:text-white leading-tight">{review.user}</h4>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Verified Buyer</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star 
                                            key={s} 
                                            size={16} 
                                            className={`${s <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-gray-800'}`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-widest">
                                    <Calendar size={12} /> {review.date}
                                </span>
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center flex-wrap gap-2 text-sm font-bold">
                                <span className="text-gray-400 uppercase tracking-widest text-[10px]">Product:</span>
                                <span className="text-gray-900 dark:text-white flex items-center gap-1.5 group-hover:text-emerald-600 transition-colors">
                                    <ShoppingBag size={14} />
                                    {review.product}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                                "{review.comment}"
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold">
                                    <ThumbsUp size={14} /> {review.likes} Likes
                                </div>
                                {review.status === "pending" && (
                                    <div className="px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded border border-amber-200/50">Needs Review</div>
                                )}
                                {review.status === "hidden" && (
                                    <div className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded">Hidden</div>
                                )}
                            </div>
                        </div>

                        {/* Actions Panel */}
                        <div className="md:w-32 shrink-0 flex flex-row md:flex-col items-center justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-6 md:pt-0 md:pl-8">
                            <button title="Publish" className="p-3 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl hover:bg-emerald-100 transition-all flex items-center justify-center shrink-0">
                                <CheckCircle2 size={20} />
                            </button>
                            <button title="Reply" className="p-3 text-blue-600 bg-blue-50 dark:bg-blue-950/30 rounded-2xl hover:bg-blue-100 transition-all flex items-center justify-center shrink-0">
                                <Reply size={20} />
                            </button>
                            <button title="Hide" className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-2xl transition-all flex items-center justify-center shrink-0">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Moderation Tip Banner */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Star size={120} className="fill-white" />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <ThumbsUp size={32} className="text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1">Boost Product Trust</h3>
                        <p className="text-gray-400 text-lg max-w-lg font-medium">Verified reviews with photos have <span className="text-white font-bold">3.2x higher conversion rate</span>. Encourage users to upload images with their feedback.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl whitespace-nowrap active:scale-95">
                    View Image Reviews <ArrowRight size={20} />
                </button>
            </div>

        </div>
    )
}
