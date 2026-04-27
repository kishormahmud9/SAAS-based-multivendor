"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Building2, MapPin, Mail, Phone, Globe, Instagram, Twitter, Facebook, Calculator, FileText } from "lucide-react"

export default function BusinessProfileSettings() {
    const [saving, setSaving] = useState(false)
    const [profile, setProfile] = useState({
        companyName: "ReadyMart Solutions Inc.",
        taxId: "TX-98234-77",
        address: "123 Innovation Drive, Tech City, CA 94043",
        supportPhone: "+1 (800) 555-0199",
        supportEmail: "business@readymart.com",
        socials: {
            instagram: "readymart_official",
            twitter: "readymart_tech",
            facebook: "readymart.store"
        }
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Business profile updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                            <Building2 size={24} />
                        </div>
                        Corporate Business Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Manage your legal entity details, contact information, and social presence.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Update Identity
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Legal & Contact */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
                             <FileText size={150} />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                            <Calculator size={14} /> Legal & Tax Info
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Entity Name</label>
                                <input 
                                    type="text" 
                                    value={profile.companyName}
                                    onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tax ID / VAT Number</label>
                                <input 
                                    type="text" 
                                    value={profile.taxId}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all font-mono"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 relative z-10">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Physical Address</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-4 top-4 text-gray-300" />
                                <textarea 
                                    value={profile.address}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all min-h-[80px] resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                         <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
                            <Phone size={14} /> Official Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Business Phone</label>
                                <div className="relative">
                                    <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" value={profile.supportPhone} className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Official Email</label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="email" value={profile.supportEmail} className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-600 transition-all font-mono" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Presence */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                            <Globe size={14} /> Social Connectivity
                        </h3>
                        
                        <div className="space-y-4">
                            {[
                                { platform: "Instagram", icon: Instagram, color: "text-pink-500", handle: profile.socials.instagram },
                                { platform: "Twitter (X)", icon: Twitter, color: "text-blue-400", handle: profile.socials.twitter },
                                { platform: "Facebook", icon: Facebook, color: "text-blue-600", handle: profile.socials.facebook }
                            ].map((social, i) => {
                                const Icon = social.icon
                                return (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl group hover:scale-[1.02] transition-transform">
                                        <div className={`w-10 h-10 rounded-xl bg-white dark:bg-gray-950 flex items-center justify-center ${social.color} shadow-sm border border-gray-100 dark:border-gray-800`}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{social.platform}</p>
                                            <div className="flex items-center gap-1 font-mono text-xs font-bold text-gray-900 dark:text-white">
                                                <span className="opacity-30">@</span>{social.handle}
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-300 hover:text-indigo-600 transition-colors">
                                            <Save size={14} />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-8 bg-indigo-900/5 dark:bg-indigo-950/20 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 text-center">
                         <div className="w-16 h-16 bg-white dark:bg-gray-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                            <Building2 size={24} className="text-indigo-600" />
                         </div>
                         <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2">Verified Enterprise</h4>
                         <p className="text-[10px] text-gray-500 font-bold leading-relaxed px-4">Your business profile is verified for higher global transaction limits and priority support.</p>
                         <div className="mt-6 flex justify-center gap-2">
                             {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>)}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
