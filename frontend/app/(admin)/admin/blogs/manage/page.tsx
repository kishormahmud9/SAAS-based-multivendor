"use client"

import { useState } from "react"
import {
    FileText,
    PenTool,
    Eye,
    ThumbsUp,
    MessageSquare,
    TrendingUp,
    Clock,
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    ChevronRight,
    BookOpen,
    Layers,
    Star,
    Flame,
    CheckCircle2,
    XCircle,
    Edit3,
    Trash2,
    ArrowUpRight
} from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────
type PostStatus = "published" | "draft" | "scheduled" | "archived"

interface BlogPost {
    id: number
    title: string
    category: string
    author: string
    status: PostStatus
    views: number
    likes: number
    comments: number
    date: string
    readTime: string
    featured: boolean
}

// ─── Static Data ─────────────────────────────────────────────────────────────
const posts: BlogPost[] = [
    { id: 1, title: "Top 10 Smart Gadgets You Need in 2026", category: "Technology", author: "Admin", status: "published", views: 8420, likes: 312, comments: 48, date: "Mar 22, 2026", readTime: "6 min", featured: true },
    { id: 2, title: "How to Style Your Home with LED Lighting", category: "Lifestyle", author: "Admin", status: "published", views: 5130, likes: 198, comments: 27, date: "Mar 20, 2026", readTime: "4 min", featured: false },
    { id: 3, title: "The Ultimate Guide to Wireless Earbuds", category: "Technology", author: "Admin", status: "draft", views: 0, likes: 0, comments: 0, date: "Mar 24, 2026", readTime: "8 min", featured: false },
    { id: 4, title: "Fashion Trends Dominating 2026", category: "Fashion", author: "Admin", status: "scheduled", views: 0, likes: 0, comments: 0, date: "Mar 26, 2026", readTime: "5 min", featured: false },
    { id: 5, title: "Best Budget Smartphones Under ৳15,000", category: "Technology", author: "Admin", status: "published", views: 12840, likes: 541, comments: 93, date: "Mar 15, 2026", readTime: "7 min", featured: true },
    { id: 6, title: "Kitchen Gadgets That Save Time", category: "Home & Kitchen", author: "Admin", status: "archived", views: 3200, likes: 104, comments: 15, date: "Feb 10, 2026", readTime: "3 min", featured: false },
]

const categories = [
    { label: "Technology", count: 18, color: "bg-blue-500", light: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
    { label: "Lifestyle", count: 11, color: "bg-emerald-500", light: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300" },
    { label: "Fashion", count: 9, color: "bg-fuchsia-500", light: "bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300" },
    { label: "Home & Kitchen", count: 7, color: "bg-amber-500", light: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
    { label: "Health & Fitness", count: 5, color: "bg-red-500", light: "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300" },
]

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: PostStatus }) {
    const map: Record<PostStatus, string> = {
        published: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
        draft: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
        scheduled: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
        archived: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    }
    const icons: Record<PostStatus, React.ElementType> = {
        published: CheckCircle2,
        draft: Edit3,
        scheduled: Clock,
        archived: XCircle,
    }
    const Icon = icons[status]
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${map[status]}`}>
            <Icon className="w-3 h-3" />
            {status}
        </span>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BlogDashboardPage() {
    const [search, setSearch] = useState("")
    const [filterStatus, setFilterStatus] = useState<"all" | PostStatus>("all")

    const filtered = posts.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
        const matchStatus = filterStatus === "all" || p.status === filterStatus
        return matchSearch && matchStatus
    })

    const published = posts.filter(p => p.status === "published").length
    const drafts = posts.filter(p => p.status === "draft").length
    const scheduled = posts.filter(p => p.status === "scheduled").length
    const totalViews = posts.reduce((sum, p) => sum + p.views, 0)
    const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0)

    const topPost = [...posts].sort((a, b) => b.views - a.views)[0]

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-fuchsia-600 dark:from-rose-400 dark:to-fuchsia-400 flex items-center gap-3">
                        <BookOpen className="text-rose-500 w-8 h-8 shrink-0" />
                        Blog & Content Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1.5 text-sm md:text-base">
                        Manage your blog posts, track engagement, and schedule content.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all shrink-0">
                    <Plus className="w-4 h-4" /> New Post
                </button>
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                    { label: "Total Posts", value: posts.length.toString(), icon: FileText, gradient: "from-rose-500 to-rose-700", glow: "bg-rose-400" },
                    { label: "Published", value: published.toString(), icon: CheckCircle2, gradient: "from-emerald-500 to-teal-600", glow: "bg-emerald-400" },
                    { label: "Drafts", value: drafts.toString(), icon: Edit3, gradient: "from-gray-500 to-gray-700", glow: "bg-gray-400" },
                    { label: "Total Views", value: `${(totalViews / 1000).toFixed(1)}K`, icon: Eye, gradient: "from-blue-500 to-blue-700", glow: "bg-blue-400" },
                    { label: "Total Likes", value: totalLikes.toString(), icon: ThumbsUp, gradient: "from-fuchsia-500 to-purple-600", glow: "bg-fuchsia-400" },
                ].map(card => {
                    const Icon = card.icon
                    return (
                        <div key={card.label} className="relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                            <div className={`absolute -right-8 -top-8 w-24 h-24 ${card.glow} rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity`} />
                            <div className="relative z-10 flex items-start justify-between gap-2">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
                                    <p className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{card.value}</p>
                                </div>
                                <div className={`w-10 h-10 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg shrink-0`}>
                                    <Icon className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Posts Table */}
                <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">All Posts</h3>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search posts..."
                                    className="w-full sm:w-44 pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Filter className="w-4 h-4 text-gray-400 shrink-0" />
                                <select
                                    value={filterStatus}
                                    onChange={e => setFilterStatus(e.target.value as "all" | PostStatus)}
                                    className="py-2 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                >
                                    <option value="all">All</option>
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                        {filtered.map(post => (
                            <div key={post.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">

                                {/* Featured badge or icon */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${post.featured ? "bg-amber-100 dark:bg-amber-900/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                                    {post.featured
                                        ? <Flame className="w-5 h-5 text-amber-500" />
                                        : <FileText className="w-5 h-5 text-gray-400" />
                                    }
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-1">{post.title}</p>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span className="text-xs text-gray-400">{post.category}</span>
                                                <span className="text-gray-300 dark:text-gray-700 text-xs">·</span>
                                                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.date}</span>
                                                <span className="text-gray-300 dark:text-gray-700 text-xs">·</span>
                                                <span className="text-xs text-gray-400">{post.readTime} read</span>
                                            </div>
                                        </div>
                                        <StatusBadge status={post.status} />
                                    </div>

                                    {post.status === "published" && (
                                        <div className="flex items-center gap-4 mt-2">
                                            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Eye className="w-3.5 h-3.5" />{post.views.toLocaleString()}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <ThumbsUp className="w-3.5 h-3.5" />{post.likes}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <MessageSquare className="w-3.5 h-3.5" />{post.comments}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                    <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400" title="Edit">
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500" title="Delete">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                                        <MoreHorizontal className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filtered.length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <FileText className="w-10 h-10 mx-auto opacity-30 mb-2" />
                                <p className="text-sm">No posts found.</p>
                            </div>
                        )}
                    </div>

                    <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <p className="text-xs text-gray-400">Showing {filtered.length} of {posts.length} posts</p>
                        <button className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1 hover:underline">
                            View all <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-5">

                    {/* Top Post */}
                    <div className="bg-gradient-to-br from-rose-600 to-fuchsia-600 rounded-2xl p-5 text-white shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="w-4 h-4 opacity-80" />
                            <p className="text-xs font-semibold uppercase tracking-widest opacity-80">Top Performing Post</p>
                        </div>
                        <h3 className="text-base font-bold leading-snug mb-3">{topPost.title}</h3>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 opacity-90"><Eye className="w-4 h-4" />{topPost.views.toLocaleString()}</span>
                            <span className="flex items-center gap-1 opacity-90"><ThumbsUp className="w-4 h-4" />{topPost.likes}</span>
                            <span className="flex items-center gap-1 opacity-90"><MessageSquare className="w-4 h-4" />{topPost.comments}</span>
                        </div>
                    </div>

                    {/* Categories Breakdown */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Content Categories</h3>
                        <div className="space-y-3">
                            {categories.map(cat => (
                                <div key={cat.label} className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${cat.color} shrink-0`} />
                                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{cat.label}</span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cat.light}`}>{cat.count} posts</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Engagement Overview</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Avg. Read Time", value: "5.5 min", icon: Clock, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30" },
                                { label: "Avg. Likes per Post", value: Math.round(totalLikes / published).toString(), icon: ThumbsUp, color: "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/30" },
                                { label: "Avg. Comments", value: Math.round(posts.filter(p => p.status === "published").reduce((s, p) => s + p.comments, 0) / published).toString(), icon: MessageSquare, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30" },
                                { label: "Featured Posts", value: posts.filter(p => p.featured).length.toString(), icon: Flame, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30" },
                            ].map(item => {
                                const Icon = item.icon
                                return (
                                    <div key={item.label} className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Quick Content Actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Write a new blog post", icon: PenTool, color: "text-rose-600", hover: "hover:bg-rose-50 dark:hover:bg-rose-900/20" },
                                { label: "Manage content pages", icon: Layers, color: "text-blue-600", hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
                                { label: "View published posts", icon: TrendingUp, color: "text-emerald-600", hover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
                            ].map(action => {
                                const Icon = action.icon
                                return (
                                    <button key={action.label} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-all group ${action.hover}`}>
                                        <Icon className={`w-4 h-4 ${action.color}`} />
                                        <span className="flex-1 text-left">{action.label}</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
