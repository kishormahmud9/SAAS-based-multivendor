"use client"
import { MessageSquare, Star, Search, Filter, MessageCircle, ArrowUpRight } from "lucide-react"

export default function ReviewsPage() {
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <MessageSquare className="text-blue-600" size={32} />
                        Customer Reviews
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage and respond to customer feedback to build trust and improve products.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        <Star size={14} className="fill-emerald-500" /> 4.8 Avg Rating
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Reviews", value: "1,240", icon: MessageSquare, color: "text-blue-500" },
                    { label: "Unanswered", value: "12", icon: MessageCircle, color: "text-orange-500" },
                    { label: "Positive (4-5★)", value: "1,180", icon: Star, color: "text-emerald-500" },
                    { label: "Negative (1-2★)", value: "8", icon: Star, color: "text-rose-500" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={stat.color} size={24} />
                            <span className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-20 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] flex items-center justify-center text-blue-600">
                    <MessageSquare size={48} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">Review Management</h3>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto">All customer reviews are up to date. Keep up the great work by responding to new feedback within 24 hours.</p>
                </div>
                <button className="text-sm font-black text-blue-600 hover:underline flex items-center gap-2 mx-auto uppercase tracking-widest">
                    Review Guidelines <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
    )
}
