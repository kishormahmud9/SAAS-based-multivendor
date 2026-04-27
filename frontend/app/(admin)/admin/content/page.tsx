"use client"

import { useState } from "react"
import { 
    Layout, 
    Edit3, 
    Eye, 
    CheckCircle2, 
    Clock, 
    FileText, 
    Search, 
    MoreHorizontal,
    Monitor,
    Smartphone,
    LayoutTemplate,
    MousePointer2,
    Settings2,
    ChevronRight,
    Component,
    AlertCircle,
    ArrowUpRight
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface ContentPage {
    id: string
    name: string
    route: string
    status: "published" | "draft" | "hidden"
    lastModified: string
    sections: number
}

const mockPages: ContentPage[] = [
    { id: "1", name: "Home Page", route: "/", status: "published", lastModified: "2024-03-24 10:30 AM", sections: 12 },
    { id: "2", name: "About Us", route: "/about", status: "published", lastModified: "2024-03-20 04:15 PM", sections: 4 },
    { id: "3", name: "Contact Us", route: "/contact", status: "published", lastModified: "2024-03-22 09:00 AM", sections: 3 },
    { id: "4", name: "FAQ & Support", route: "/faq", status: "draft", lastModified: "2024-03-23 02:45 PM", sections: 6 },
    { id: "5", name: "Terms & Conditions", route: "/terms", status: "published", lastModified: "2023-12-15 11:20 AM", sections: 1 },
    { id: "6", name: "Privacy Policy", route: "/privacy", status: "published", lastModified: "2023-12-15 11:20 AM", sections: 1 },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function PageContentManager() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Layout size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                            Page Content Manager
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">
                        Customize your store's static pages and dynamic sections with ease.
                    </p>
                </div>
                
                <div className="flex items-center gap-3 bg-white dark:bg-gray-900 p-2 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <button className="p-2 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl transition-all"><Monitor size={20} /></button>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all"><Smartphone size={20} /></button>
                </div>
            </div>

            {/* Main Surface */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Pages List (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <LayoutTemplate size={20} className="text-indigo-600" />
                                Site Blueprints
                            </h3>
                            <div className="relative w-48">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                <input type="text" placeholder="Search pages..." className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2 pl-9 pr-4 text-xs font-bold focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                            {mockPages.map((page) => (
                                <div key={page.id} className="p-8 hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all group flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{page.name}</h4>
                                            <p className="text-xs font-bold text-gray-400 font-mono tracking-tighter">{page.route}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex flex-col items-end gap-1 text-right min-w-[150px]">
                                        <div className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${page.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                            {page.status}
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{page.lastModified}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="hidden sm:flex items-center gap-2 text-xs font-black text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800">
                                            <Component size={14} className="text-indigo-500" />
                                            {page.sections} Sections
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button title="Edit Content" className="p-3 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl hover:bg-indigo-100 transition-all shadow-sm">
                                                <Edit3 size={18} />
                                            </button>
                                            <button className="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-2xl transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar Settings (1 col) */}
                <div className="space-y-6">
                    {/* Visual Editor Card */}
                    <div className="bg-indigo-900 text-white rounded-[2.5rem] p-8 space-y-6 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Settings2 size={120} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                <MousePointer2 size={24} className="text-indigo-400" />
                            </div>
                            <h3 className="text-2xl font-black leading-tight">Theme Editor</h3>
                            <p className="text-indigo-100 font-medium opacity-80">Adjust colors, fonts, and global assets across the entire store.</p>
                            <button className="w-full bg-white text-indigo-900 font-black py-4 rounded-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-xl">
                                Open Visual Editor <ArrowUpRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* SEO Health */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-3 leading-none">
                            <AlertCircle size={20} className="text-indigo-600" />
                            Content SEO Health
                        </h3>
                        <div className="space-y-4">
                            {[
                                { t: 'Meta Descriptions', v: 85, color: 'bg-emerald-500' },
                                { t: 'H1 Tag Optimization', v: 92, color: 'bg-emerald-500' },
                                { t: 'Image Alt Texts', v: 42, color: 'bg-orange-500' },
                            ].map(item => (
                                <div key={item.t} className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest leading-none">
                                        <span className="text-gray-400">{item.t}</span>
                                        <span className="text-gray-900 dark:text-white">{item.v}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.v}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 font-bold bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl italic leading-relaxed">
                            Tip: Pages with missing alt texts have a 15% lower search visibility.
                        </p>
                    </div>

                    {/* Previews Button */}
                    <button className="w-full bg-emerald-50 text-emerald-600 font-black py-5 rounded-[2rem] border border-emerald-100 flex items-center justify-center gap-3 hover:bg-emerald-100 transition-all shadow-sm active:scale-95 uppercase tracking-widest text-xs">
                        <Eye size={20} /> Preview Entire Site
                    </button>
                </div>

            </div>

        </div>
    )
}
