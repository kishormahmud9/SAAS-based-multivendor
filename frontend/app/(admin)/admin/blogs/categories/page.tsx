"use client"

import { useState } from "react"
import { 
    FolderTree, 
    Plus, 
    Search, 
    FileText, 
    Edit3, 
    Trash2, 
    MoreHorizontal,
    ChevronRight,
    TrendingUp,
    Hash,
    Layers,
    ArrowRight,
    LayoutGrid,
    Settings2
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface BlogCategory {
    id: string
    name: string
    slug: string
    postCount: number
    description: string
    status: "active" | "hidden"
}

const mockCategories: BlogCategory[] = [
    { id: "1", name: "Technology", slug: "technology", postCount: 18, description: "Latest gadgets, software updates, and tech reviews.", status: "active" },
    { id: "2", name: "Lifestyle", slug: "lifestyle", postCount: 12, description: "Home decor, wellness, and everyday living tips.", status: "active" },
    { id: "3", name: "Fashion", slug: "fashion", postCount: 9, description: "Trending styles, seasonal lookbooks, and fashion news.", status: "active" },
    { id: "4", name: "Home & Kitchen", slug: "home-kitchen", postCount: 7, description: "Appliances, recipes, and interior design inspiration.", status: "active" },
    { id: "5", name: "Health & Fitness", slug: "health-fitness", postCount: 5, description: "Workout routines, nutrition, and mental health.", status: "hidden" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function BlogCategoriesPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <FolderTree size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Blog Categories
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Organize your articles into logical topics to help users find relevant content.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Category</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search categories by name or slug..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <LayoutGrid size={18} />
                        <span>Reorder</span>
                    </button>
                </div>
            </div>

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCategories.map((cat) => (
                    <div key={cat.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-500 group flex flex-col">
                        <div className="p-8 space-y-4 flex-1">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                    <Layers size={24} />
                                </div>
                                <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${cat.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {cat.status}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-1 group-hover:text-orange-600 transition-colors">{cat.name}</h3>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-4">
                                    <Hash size={12} /> {cat.slug}
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-2">
                                    {cat.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <div className="px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-2 border border-gray-100 dark:border-gray-800">
                                    <FileText size={14} className="text-orange-500" />
                                    <span className="text-xs font-black text-gray-900 dark:text-white">{cat.postCount} Posts</span>
                                </div>
                                {cat.postCount > 10 && (
                                    <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                        <TrendingUp size={12} /> Popular
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="px-8 py-5 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button title="Edit" className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                                    <Edit3 size={18} />
                                </button>
                                <button title="Delete" className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 text-gray-900 dark:text-white font-black text-sm hover:translate-x-1 transition-transform">
                                View Content <ArrowRight size={16} className="text-orange-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Taxonomy Banner */}
            <div className="bg-gray-900 text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity scale-150">
                    <Settings2 size={120} />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <Settings2 size={32} className="text-orange-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1 leading-tight text-white">Advanced Content Taxonomy</h3>
                        <p className="text-gray-400 text-lg max-w-lg font-medium">Use hierarchical categories to create complex content structures. Boost your <span className="text-white font-bold">SEO authority</span> by grouping related topics.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    SEO Settings <ChevronRight size={20} />
                </button>
            </div>

        </div>
    )
}
