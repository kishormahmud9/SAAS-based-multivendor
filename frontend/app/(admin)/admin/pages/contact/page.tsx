"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Phone, Mail, MapPin, Globe, Clock, MessageSquare, Send } from "lucide-react"

export default function ContactUsManager() {
    const [saving, setSaving] = useState(false)
    const [info, setInfo] = useState({
        email: "support@readymart.com",
        phone: "+1 (555) 123-4567",
        address: "123 Fashion Street, Design District, NY 10001",
        workingHours: "Mon - Fri: 9AM - 6PM, Sat: 10AM - 4PM",
        whatsapp: "+1 (555) 987-6543",
        mapUrl: "https://www.google.com/maps/embed?pb=...",
        title: "Get in Touch",
        description: "Have a question or need assistance? Our support team is here to help you."
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Contact information updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                            <Phone size={24} />
                        </div>
                        Contact Page Controller
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage how customers reach you and what they see on the contact page.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Sync Contact Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Channels */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                            <MessageSquare size={120} />
                        </div>
                        
                        <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2 mb-8">
                            <Send size={14} className="animate-pulse" /> Support Channels
                        </h3>

                        <div className="space-y-5 relative z-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Support Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input 
                                        type="email" 
                                        value={info.email}
                                        onChange={(e) => setInfo({...info, email: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input 
                                        type="text" 
                                        value={info.phone}
                                        onChange={(e) => setInfo({...info, phone: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Business Address</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <textarea 
                                        value={info.address}
                                        onChange={(e) => setInfo({...info, address: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all min-h-[80px] resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logistics & Content */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-8">
                             Operational Timing
                        </h3>
                        
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Working Hours</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input 
                                        type="text" 
                                        value={info.workingHours}
                                        onChange={(e) => setInfo({...info, workingHours: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Map Embed Link (Google Maps)</label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input 
                                        type="text" 
                                        value={info.mapUrl}
                                        onChange={(e) => setInfo({...info, mapUrl: e.target.value})}
                                        className="w-full bg-gray-100/50 dark:bg-gray-800 border-none rounded-xl py-2 px-3 text-[10px] font-mono text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-900/5 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-900/20 relative group">
                        <div className="text-center space-y-3">
                             <div className="w-16 h-16 bg-white dark:bg-gray-950 rounded-full flex items-center justify-center mx-auto shadow-sm ring-1 ring-blue-100 dark:ring-blue-900/50 group-hover:scale-110 transition-transform duration-500">
                                <Phone size={24} className="text-blue-900 animate-bounce" />
                             </div>
                             <div>
                                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Need a live chat?</h4>
                                <p className="text-xs text-gray-500 font-medium">Enable AI Chatbot in <span className="text-blue-600 underline">Settings</span> for 24/7 support.</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
