"use client"

import { useState } from "react"
import {
    Hash,
    Plus,
    Search,
    Edit3,
    Trash2,
    MoreHorizontal,
    Filter,
    ArrowUpDown,
    CheckCircle2,
    XCircle,
    Copy,
    ExternalLink
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface ProductTag {
    id: string
    name: string
    slug: string
    count: number
    status: "active" | "inactive"
    createdAt: string
}

const mockTags: ProductTag[] = [
    { id: "1", name: "Summer Collection", slug: "summer-collection", count: 24, status: "active", createdAt: "2024-03-20" },
    { id: "2", name: "Electronics", slug: "electronics", count: 48, status: "active", createdAt: "2024-03-18" },
    { id: "3", name: "Limited Edition", slug: "limited-edition", count: 12, status: "active", createdAt: "2024-03-15" },
    { id: "4", name: "Discounted", slug: "discounted", count: 156, status: "active", createdAt: "2024-03-10" },
    { id: "5", name: "New Arrival", slug: "new-arrival", count: 32, status: "active", createdAt: "2024-03-22" },
    { id: "6", name: "Clearance", slug: "clearance", count: 85, status: "inactive", createdAt: "2024-02-28" },
    { id: "7", name: "Premium", slug: "premium", count: 19, status: "active", createdAt: "2024-03-05" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function ProductTagsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [tags, setTags] = useState(mockTags)

    const filteredTags = tags.filter(tag => 
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                            <Hash size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Product Tags
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Organize and label your products with descriptive tags for better discoverability.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create New Tag</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search tags by name or slug..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-400"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-5 py-3 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <ArrowUpDown size={18} />
                        <span>Sort</span>
                    </button>
                </div>
            </div>

            {/* Tags Grid / List */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tag Name</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Slug</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-center">Usage</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {filteredTags.map((tag) => (
                                <tr key={tag.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <Hash size={16} />
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{tag.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-mono text-xs bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-lg w-fit">
                                            {tag.slug}
                                            <Copy size={12} className="cursor-pointer hover:text-orange-500 transition-colors" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <div className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold text-sm">
                                            {tag.count}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        {tag.status === "active" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
                                                <CheckCircle2 size={14} />
                                                <span>Active</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-bold text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full w-fit">
                                                <XCircle size={14} />
                                                <span>Inactive</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-xl transition-all" title="Edit Tag">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all" title="Delete Tag">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {filteredTags.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tags found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query or create a new tag.</p>
                    </div>
                )}
                
                {/* Pagination Placeholder */}
                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        Showing <span className="text-gray-900 dark:text-white font-bold">{filteredTags.length}</span> of {tags.length} tags
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 font-bold text-sm shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white font-bold text-sm shadow-sm hover:bg-gray-50 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Quick Insights Banner */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-500/20">
                <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                        <TrendingUp size={32} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-extrabold mb-1">Tag Optimization Suggestion</h3>
                        <p className="text-blue-100 text-lg opacity-80">You have 12 tags with zero usage. Consider merging or deleting them to keep your catalog clean.</p>
                    </div>
                </div>
                <button className="bg-white text-blue-700 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-xl active:scale-95 whitespace-nowrap">
                    View Unused Tags
                </button>
            </div>

        </div>
    )
}

function TrendingUp({ size, className }: { size: number, className: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={size} 
            height={size} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}
