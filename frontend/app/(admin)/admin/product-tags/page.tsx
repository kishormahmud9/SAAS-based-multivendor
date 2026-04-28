"use client"

import { useState } from "react"
import { 
    Hash, 
    Plus, 
    Trash2, 
    Search, 
    Tag as TagIcon, 
    Loader2,
    TrendingUp,
    Zap,
    X
} from "lucide-react"
import { toast } from "react-hot-toast"

export default function AdminTagsPage() {
    const [tags, setTags] = useState([
        { id: "1", name: "Trending", usage: 145, color: "bg-blue-500" },
        { id: "2", name: "Summer Sale", usage: 89, color: "bg-orange-500" },
        { id: "3", name: "Eco-Friendly", usage: 56, color: "bg-emerald-500" },
        { id: "4", name: "New Arrival", usage: 210, color: "bg-purple-500" }
    ])

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Hash className="text-orange-500" size={32} />
                        Metadata & Tags
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage global product tags and SEO identifiers for better discovery.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Add new tag..."
                            className="pl-4 pr-12 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                            <Plus size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Popular Tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {tags.map((tag) => (
                    <div key={tag.id} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center group">
                        <div className={`w-12 h-12 ${tag.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <TagIcon size={24} />
                        </div>
                        <h4 className="font-black text-gray-900 dark:text-white mb-1">{tag.name}</h4>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tag.usage} Products Linked</p>
                        <button className="mt-4 p-2 text-gray-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* All Tags Management */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-500">
                        <Zap size={20} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Active Tag Cloud</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                    {tags.concat([
                        {id: "5", name: "Bestseller", usage: 0, color: ""},
                        {id: "6", name: "Limited Edition", usage: 0, color: ""},
                        {id: "7", name: "Sale", usage: 0, color: ""},
                        {id: "8", name: "Premium", usage: 0, color: ""},
                        {id: "9", name: "Gift Idea", usage: 0, color: ""},
                    ]).map((tag, i) => (
                        <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-500 transition-all group cursor-pointer">
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">#{tag.name}</span>
                            <X size={14} className="text-gray-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
