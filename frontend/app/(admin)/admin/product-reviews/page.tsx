"use client"

import { useState, useEffect } from "react"
import { 
    MessageSquare, 
    Star, 
    Search, 
    CheckCircle, 
    XCircle, 
    Trash2, 
    User, 
    Package,
    Loader2,
    Filter,
    ShieldCheck
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        // Mocking reviews for now as we might not have a specific service method yet
        // In a real app, this would be adminService.getReviews()
        setReviews([
            { id: "1", userName: "Kishor Mahmud", productName: "iPhone 15 Pro", rating: 5, comment: "Amazing product, highly recommended!", status: "PENDING", createdAt: new Date() },
            { id: "2", userName: "John Doe", productName: "Nike Air Max", rating: 4, comment: "Very comfortable, but colors are a bit different.", status: "APPROVED", createdAt: new Date() },
        ])
        setLoading(false)
    }, [])

    const handleStatusUpdate = (id: string, status: string) => {
        toast.success(`Review ${status.toLowerCase()}`)
        setReviews(reviews.map(r => r.id === id ? { ...r, status } : r))
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <MessageSquare className="text-orange-500" size={32} />
                        Review Moderation
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Monitor and moderate customer feedback for all marketplace items.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-xs font-black text-orange-600 uppercase tracking-widest border border-orange-100 dark:border-orange-800">
                        {reviews.filter(r => r.status === 'PENDING').length} Pending
                    </span>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search reviews by user or product..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                    />
                </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-orange-500" size={40} />
                    </div>
                ) : reviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4 flex-1">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 shrink-0">
                                    <User size={24} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-black text-gray-900 dark:text-white">{review.userName}</h4>
                                        <span className="text-gray-300">•</span>
                                        <div className="flex items-center gap-1 text-orange-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-200" : ""} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Package size={12} className="text-orange-500" />
                                        {review.productName}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-3">"{review.comment}"</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 md:border-l dark:border-gray-800 md:pl-6 shrink-0">
                                {review.status === 'PENDING' ? (
                                    <>
                                        <button 
                                            onClick={() => handleStatusUpdate(review.id, 'APPROVED')}
                                            className="w-11 h-11 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleStatusUpdate(review.id, 'REJECTED')}
                                            className="w-11 h-11 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                        review.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                    }`}>
                                        <ShieldCheck size={14} />
                                        {review.status}
                                    </span>
                                )}
                                <button className="w-11 h-11 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
