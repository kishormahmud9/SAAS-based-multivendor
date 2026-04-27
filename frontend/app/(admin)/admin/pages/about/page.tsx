"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, FileText, Globe, Eye, Image as ImageIcon, History, Sparkles } from "lucide-react"

export default function AboutUsManager() {
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState({
        title: "About ReadyMart",
        subtitle: "Your one-stop destination for premium fashion. We bring you the latest trends at unbeatable prices.",
        story: "Founded in 2026, ReadyMart started with a simple vision: to make high-end fashion accessible to everyone. Our team of designers and curators work tirelessly to bring you the best styles from around the globe.",
        mission: "To empower individuals through fashion that inspires confidence and self-expression.",
        vision: "To become the world's most customer-centric fashion destination.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
        seoTitle: "About Us | ReadyMart - Premium Fashion Destination",
        seoDescription: "Learn more about ReadyMart's journey, mission, and our commitment to providing premium fashion at unbeatable prices."
    })

    const handleSave = async () => {
        setSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("About Us content updated successfully")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                            <FileText size={20} />
                        </div>
                        About Us Manager
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your brand story, mission, and vision statements.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center gap-2">
                        <Eye size={18} /> Preview
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Areas */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 flex items-center gap-2 mb-2">
                            <Sparkles size={14} /> Brand Identity
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Page Main Title</label>
                                <input 
                                    type="text" 
                                    value={content.title}
                                    onChange={(e) => setContent({...content, title: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subtitle / Slogan</label>
                                <textarea 
                                    value={content.subtitle}
                                    onChange={(e) => setContent({...content, subtitle: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-900 transition-all min-h-[80px]"
                                />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-4">
                             <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                                Our Story & Journey
                            </h3>
                            <textarea 
                                value={content.story}
                                onChange={(e) => setContent({...content, story: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-4 px-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-900 transition-all min-h-[160px]"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Our Mission</label>
                                <textarea 
                                    value={content.mission}
                                    onChange={(e) => setContent({...content, mission: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-xs font-medium text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-900 transition-all min-h-[100px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Our Vision</label>
                                <textarea 
                                    value={content.vision}
                                    onChange={(e) => setContent({...content, vision: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-xs font-medium text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-900 transition-all min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Configuration */}
                <div className="space-y-6">
                    {/* Media Manager */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                            <ImageIcon size={14} className="text-blue-600" /> Featured Media
                        </h3>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-4 border border-gray-100 dark:border-gray-800">
                            <img src={content.image} alt="Featured" className="w-full h-full object-cover" />
                            <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                                Change Image
                            </button>
                        </div>
                        <input 
                            type="text" 
                            value={content.image}
                            onChange={(e) => setContent({...content, image: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2 px-3 text-[10px] font-mono text-gray-400"
                            placeholder="Image URL"
                        />
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                            <Globe size={14} className="text-emerald-500" /> SEO Optimization
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Meta Title</label>
                                <input 
                                    type="text" 
                                    value={content.seoTitle}
                                    onChange={(e) => setContent({...content, seoTitle: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 px-3 text-xs font-bold text-gray-600 focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Meta Description</label>
                                <textarea 
                                    value={content.seoDescription}
                                    onChange={(e) => setContent({...content, seoDescription: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2.5 px-3 text-xs font-medium text-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none min-h-[100px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Version History */}
                    <div className="p-4 bg-blue-50/30 dark:bg-blue-900/5 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                         <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 mb-3">
                            <History size={12} /> Recent Changes
                        </p>
                        <div className="space-y-3">
                            {[
                                { user: "Admin", action: "Updated Mission", date: "2h ago" },
                                { user: "System", action: "SEO Optimized", date: "Yesterday" }
                            ].map((log, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px]">
                                    <span className="font-bold text-gray-700 dark:text-gray-300">{log.action}</span>
                                    <span className="text-gray-400">{log.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
