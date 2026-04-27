"use client"

import { useState } from "react"
import { 
    PlusCircle, 
    Save, 
    Send, 
    Image as ImageIcon, 
    Link as LinkIcon, 
    Hash, 
    Type, 
    Layout, 
    ArrowLeft,
    CheckCircle2,
    Settings2,
    Eye,
    History,
    FileText,
    ChevronDown,
    Search,
    XCircle,
    Plus
} from "lucide-react"
import Link from "next/link"

// ─── Component ──────────────────────────────────────────────────────────────
export default function CreatePostPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blogs/posts" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 hover:text-orange-600 border border-gray-100 dark:border-gray-800 shadow-sm transition-all group active:scale-95">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                                Draft New Article
                            </h1>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            Create engaging content to inspire and inform your customers.
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 font-black py-3 px-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                        <Save size={18} />
                        <span>Save Draft</span>
                    </button>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-black py-3 px-8 rounded-2xl shadow-xl shadow-orange-500/25 transition-all active:scale-95 group">
                        <span>Publish Now</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Main Editor Surface (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* Title Input */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Article Headline</label>
                            <input 
                                type="text" 
                                placeholder="Enter an eye-catching title..." 
                                className="w-full text-4xl font-black text-gray-900 dark:text-white bg-transparent border-none focus:ring-0 placeholder:text-gray-200 dark:placeholder:text-gray-800 p-0"
                            />
                        </div>

                        {/* Toolbar Placeholder */}
                        <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-x-auto no-scrollbar">
                           {[Type, Layout, ImageIcon, LinkIcon, Hash].map((Icon, i) => (
                               <button key={i} className="p-3 text-gray-400 hover:text-orange-600 hover:bg-white dark:hover:bg-gray-900 rounded-xl transition-all"><Icon size={20} /></button>
                           ))}
                           <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
                           {['H1', 'H2', 'B', 'I', 'Quote'].map(text => (
                               <button key={text} className="px-3 py-2 text-gray-400 hover:text-orange-600 hover:bg-white dark:hover:bg-gray-900 rounded-xl transition-all font-black text-xs">{text}</button>
                           ))}
                        </div>

                        {/* Content Area */}
                        <textarea 
                            placeholder="Start tellings your story..." 
                            className="w-full min-h-[500px] bg-transparent border-none focus:ring-0 text-lg leading-relaxed text-gray-600 dark:text-gray-300 resize-none font-medium placeholder:text-gray-300 dark:placeholder:text-gray-700"
                        />
                    </div>
                </div>

                {/* Sidebar Controls (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Publishing Settings */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <Settings2 size={20} className="text-orange-600" />
                            Post Strategy
                        </h3>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Category</span>
                                <div className="relative">
                                    <select className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 appearance-none">
                                        <option>Technology</option>
                                        <option>Lifestyle</option>
                                        <option>Fashion</option>
                                        <option>Home & Kitchen</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Featured Image</span>
                                <div className="aspect-video bg-gray-50 dark:bg-gray-800 rounded-[2rem] border-2 border-dashed border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-3 group hover:border-orange-500/30 transition-all cursor-pointer overflow-hidden relative">
                                    <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-orange-600 shadow-sm transition-colors">
                                        <PlusCircle size={24} />
                                    </div>
                                    <span className="text-xs font-black text-gray-400">Click to Upload</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">SEO Keywords</span>
                                <div className="flex flex-wrap gap-2">
                                    {['#tech', '#2026', '#ReadyMart'].map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-orange-50 dark:bg-orange-950/20 text-orange-600 rounded-full text-[10px] font-black flex items-center gap-1 border border-orange-200/50">
                                            {tag} <XCircle size={10} className="cursor-pointer" />
                                        </span>
                                    ))}
                                    <button className="w-6 h-6 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-600 transition-colors">
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pre-publication Checklist */}
                    <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white space-y-6">
                        <h3 className="text-lg font-black flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-emerald-400" />
                            Launch Checklist
                        </h3>
                        <div className="space-y-3">
                            {[
                                { t: 'Compelling headline', done: true },
                                { t: 'Optimized featured image', done: false },
                                { t: 'Alt text for all visuals', done: false },
                                { t: 'Proper internal links', done: true },
                                { t: 'Meta description set', done: false },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${item.done ? 'bg-emerald-500 text-white' : 'bg-white/10 text-transparent border border-white/20'}`}>
                                        <CheckCircle2 size={12} />
                                    </div>
                                    <span className={item.done ? 'text-white' : 'text-gray-400'}>{item.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions / History */}
                    <div className="flex items-center gap-3">
                        <button className="flex-1 bg-emerald-50 text-emerald-600 font-black py-4 rounded-2xl border border-emerald-100 flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all uppercase tracking-widest text-[10px]">
                            <Eye size={16} /> Preview Mode
                        </button>
                        <button className="w-16 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all shadow-inner">
                            <History size={20} />
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}
