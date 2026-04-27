"use client"

import { useState } from "react"
import { 
    HelpCircle, 
    Plus, 
    Search, 
    Filter, 
    ChevronDown, 
    ChevronUp, 
    Edit3, 
    Trash2, 
    MessageCircle, 
    Layers, 
    Eye, 
    Save, 
    Loader2,
    BookOpen,
    Clock,
    MoreHorizontal
} from "lucide-react"
import { toast } from "react-hot-toast"

interface FAQ {
    id: string
    question: string
    answer: string
    category: string
    status: 'PUBLISHED' | 'DRAFT'
    views: number
    lastUpdated: string
}

const mockFAQs: FAQ[] = [
    { id: "1", question: "How do I set up my vendor store?", answer: "Go to your dashboard, click on 'Store Settings' and follow the setup wizard to configure your brand identity.", category: "Vendor Guide", status: 'PUBLISHED', views: 1240, lastUpdated: "2024-03-24" },
    { id: "2", question: "What are the platform commission rates?", answer: "Commission rates vary by subscription plan. Basic plans start at 10%, while Enterprise plans offer custom rates as low as 5%.", category: "Finance", status: 'PUBLISHED', views: 856, lastUpdated: "2024-03-22" },
    { id: "3", question: "How to process a refund request?", answer: "Locate the order in your 'Sales Hub', click 'Review Refund', and select 'Approve' or 'Reject' based on your return policy.", category: "Orders", status: 'DRAFT', views: 0, lastUpdated: "2024-03-25" },
]

export default function FAQManagementPage() {
    const [faqs, setFaqs] = useState<FAQ[]>(mockFAQs)
    const [search, setSearch] = useState("")
    const [saving, setSaving] = useState(false)

    const filteredFAQs = faqs.filter(f => f.question.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase()))

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("FAQ database synchronized")
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <HelpCircle className="text-indigo-600" size={32} />
                        FAQ Knowledge Base
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage support articles, documentation, and frequently asked questions for your platform.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                        <Layers size={18} /> Categories
                    </button>
                    <button className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95 flex items-center gap-2">
                        <Plus size={18} /> Create Article
                    </button>
                </div>
            </div>

            {/* Support Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Articles", value: "84", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
                    { label: "Total Views (30D)", value: "12,840", icon: Eye, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Helpfulness Rating", value: "94.2%", icon: MessageCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-6 group hover:shadow-md transition-all">
                        <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by question, answer, or category..." 
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600 transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-all">
                        <Filter size={16} /> Filters
                    </button>
                    <button 
                        onClick={handleSave}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                        Sync Base
                    </button>
                </div>
            </div>

            {/* Article List */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Article Title & Category</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Views</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Last Updated</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredFAQs.map((faq) => (
                                <tr key={faq.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                                                <HelpCircle size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 dark:text-white text-sm line-clamp-1">{faq.question}</p>
                                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1 inline-block">{faq.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            faq.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' : 'bg-gray-100 text-gray-500 border border-gray-200/50'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${faq.status === 'PUBLISHED' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                                            {faq.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center font-black text-gray-900 dark:text-white">
                                        {faq.views.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Clock size={12} />
                                            {faq.lastUpdated}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><MoreHorizontal size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Smart Suggestion Banner */}
            <div className="bg-indigo-900/5 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-20 h-20 bg-indigo-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-600/30 shrink-0 transform group-hover:rotate-12 transition-transform duration-500">
                    <MessageCircle size={40} />
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-black text-gray-900 dark:text-white leading-tight mb-2 uppercase tracking-tight">AI Knowledge Extraction</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        Enable our AI engine to automatically suggest FAQ articles by analyzing common patterns in support tickets and customer chats. This can reduce support volume by up to 45%.
                    </p>
                </div>
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all active:scale-95 whitespace-nowrap">
                    Enable AI Insights
                </button>
            </div>
        </div>
    )
}
