"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Search, Globe, Link as LinkIcon, BarChart3, Share2, Plus, Trash2, Eye, ShieldCheck } from "lucide-react"

export default function SEOSettings() {
    const [saving, setSaving] = useState(false)
    const [seo, setSeo] = useState({
        googleAnalyticsId: "UA-983177-01",
        metaTitle: "ReadyMart | Premium Fashion Store",
        metaDescription: "The ultimate destination for modern fashion trends and comfort innovative wear.",
        ogImage: "https://readymart.com/og-banner.jpg",
        sitemapUrl: "/sitemap.xml",
        pixelId: "109283741123"
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("SEO & Tracking data synchronized")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                            <Search size={24} />
                        </div>
                        SEO & Analytics Engine
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Configure search engine visibility, social sharing metadata, and tracking pixels.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-600/20"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Apply Meta Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Search Meta */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                             Search Presence
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Default Meta Title</label>
                                <input 
                                    type="text" 
                                    value={seo.metaTitle}
                                    onChange={(e) => setSeo({...seo, metaTitle: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-4 px-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Global Meta Description</label>
                                <textarea 
                                    value={seo.metaDescription}
                                    onChange={(e) => setSeo({...seo, metaDescription: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-5 px-5 text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500 transition-all min-h-[120px] resize-none"
                                />
                                <div className="flex justify-between items-center px-1">
                                    <span className="text-[9px] font-bold text-gray-400">Current: {seo.metaDescription.length} chars</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Recommended: 150-160</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                             Tracking & Analytics
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Google Analytics ID</label>
                                <div className="relative">
                                     <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                     <input 
                                        type="text" 
                                        value={seo.googleAnalyticsId}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                                     />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Facebook Pixel ID</label>
                                <div className="relative">
                                     <BarChart3 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                     <input 
                                        type="text" 
                                        value={seo.pixelId}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                                     />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sharing & Social */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
                             Social Preview (OG)
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="aspect-video bg-gray-50 dark:bg-gray-950 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 relative group overflow-hidden">
                                <img src={seo.ogImage} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" alt="OG Preview" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button className="p-3 bg-white rounded-xl shadow-lg"><Plus size={18} /></button>
                                    <button className="p-3 bg-red-500 text-white rounded-xl shadow-lg"><Trash2 size={18} /></button>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                <div className="flex items-center gap-3 mb-2">
                                     <Share2 size={14} className="text-emerald-500" />
                                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Preview Structure</span>
                                </div>
                                <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate">https://readymart.com</h4>
                                <p className="text-[10px] font-bold text-gray-900 dark:text-white mt-1 leading-tight">{seo.metaTitle}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-emerald-900/5 dark:bg-emerald-950/20 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/30">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 dark:border-emerald-900/50">
                                <LinkIcon size={20} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1">Index Status</h4>
                                <p className="text-[10px] font-extrabold text-emerald-600 uppercase flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Healthy</p>
                            </div>
                            <button className="ml-auto p-2 text-gray-300 hover:text-emerald-500 transition-colors"><Eye size={18} /></button>
                        </div>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-[2.5rem] border border-white/5 relative group overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                             <ShieldCheck size={120} />
                         </div>
                         <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                             <BarChart3 size={14} className="text-emerald-500" /> SEO Score
                         </h4>
                         <div className="text-5xl font-black text-white mb-2">94%</div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Optimized for 2026 Core Web Vitals</p>
                         <div className="mt-8 flex gap-1">
                             {[1,2,3,4,5,6].map(i => <div key={i} className={`h-1.5 rounded-full ${i < 6 ? 'bg-emerald-500 w-6' : 'bg-gray-800 w-4'}`}></div>)}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
