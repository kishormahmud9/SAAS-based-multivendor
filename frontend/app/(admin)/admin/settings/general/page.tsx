"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Globe, Image as ImageIcon, Plus, Trash2, Languages, Coins, MapPin } from "lucide-react"

export default function GeneralSettings() {
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState({
        siteName: "ReadyMart",
        siteDescription: "Your Premium E-commerce Destination",
        contactEmail: "admin@readymart.com",
        defaultLanguage: "English",
        defaultCurrency: "USD ($)",
        timezone: "UTC -5 (Eastern Time)",
        logoUrl: "https://readymart.com/logo.png",
        faviconUrl: "https://readymart.com/favicon.ico"
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Global settings synchronized")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                            <Globe size={24} />
                        </div>
                        Global Store Configuration
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Manage your store's identity, localization, and primary assets.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Sync System
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Identity Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                             Brand Identity
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Store Name</label>
                                <input 
                                    type="text" 
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Support Email</label>
                                <input 
                                    type="email" 
                                    value={settings.contactEmail}
                                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Store Description (Tagline)</label>
                            <textarea 
                                value={settings.siteDescription}
                                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-4 px-4 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all min-h-[80px] resize-none"
                            />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                             Localization & Units
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">System Language</label>
                                <div className="relative">
                                    <Languages size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-blue-600">
                                        <option>English (US)</option>
                                        <option>Bengali</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Currency</label>
                                <div className="relative">
                                    <Coins size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-blue-600">
                                        <option>USD ($)</option>
                                        <option>BDT (৳)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Timezone</label>
                                <div className="relative">
                                    <MapPin size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <select className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-[10px] font-bold text-gray-900 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-blue-600">
                                        <option>UTC-5 (Eastern)</option>
                                        <option>UTC+6 (Dhaka)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media & Brand Assets */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-8">
                             Brand Assets
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Main Logo</label>
                                <div className="aspect-video bg-gray-50 dark:bg-gray-950 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 relative group overflow-hidden">
                                     <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-orange-500/20 group-hover:scale-110 transition-transform">R</div>
                                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                         <button className="p-2 bg-white rounded-lg text-gray-900"><Plus size={18} /></button>
                                         <button className="p-2 bg-red-500 rounded-lg text-white"><Trash2 size={18} /></button>
                                     </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Favicon (32x32)</label>
                                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-950 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 relative group overflow-hidden">
                                     <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black text-xs">R</div>
                                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                         <ImageIcon size={18} className="text-white" />
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] text-white shadow-xl shadow-gray-950/20 border border-white/5 relative group">
                        <div className="text-center space-y-3">
                             <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto shadow-sm ring-1 ring-white/20 group-hover:rotate-12 transition-transform duration-500">
                                <Globe size={24} className="text-orange-400 animate-pulse" />
                             </div>
                             <div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-white">System Status</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Version 4.2.1 Stable</p>
                             </div>
                             <div className="pt-4 flex justify-center gap-1.5">
                                 {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>)}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
