"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Lock, Eye, Shield, Globe, History, AlertCircle } from "lucide-react"

export default function PrivacyPolicyManager() {
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState(`
# Privacy Policy

## 1. Information We Collect
We collect information from you when you register on our site, place an order, subscribe to our newsletter or respond to a survey.

## 2. How We Use Your Information
Any of the information we collect from you may be used in one of the following ways:
- To personalize your experience
- To improve our website
- To improve customer service
- To process transactions

## 3. How We Protect Your Information
We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
    `)

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Privacy Policy updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                            <Lock size={24} />
                        </div>
                        Privacy & Data Safety
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage how you collect, handle, and protect user data.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Apply Privacy Rules
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                                <Shield size={14} /> Compliance Document
                            </h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-2 underline underline-offset-4">
                                <Globe size={12} /> Standard Templates
                            </button>
                        </div>
                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-3xl py-8 px-8 text-sm leading-relaxed font-mono text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 transition-all min-h-[600px] resize-none"
                            spellCheck={false}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-emerald-500/10 dark:bg-emerald-500/5 p-6 rounded-3xl border border-emerald-500/10">
                         <div className="flex gap-4">
                            <Shield className="text-emerald-500 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1 leading-tight">GDPR & CCPA Compliant</h4>
                                <p className="text-[10px] font-bold text-gray-500">Your site currently meets the basic requirements for international data laws.</p>
                            </div>
                         </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <AlertCircle size={14} className="text-blue-500" /> Data Points Collected
                        </h3>
                        <div className="space-y-3">
                            {["IP Address", "Device Info", "Location (Approx)", "Email Address", "Cookie Hash"].map(item => (
                                <div key={item} className="flex justify-between items-center px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-xl text-[10px] font-bold text-gray-500">
                                    <span>{item}</span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-blue-900/5 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20">
                         <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                            <History size={14} /> Data Policy History
                        </h3>
                        <div className="space-y-3">
                            {[
                                { user: "Legal Expert", date: "Jan 2026", action: "Policy Review" },
                                { user: "System", date: "Dec 2025", action: "Compliance Update" }
                            ].map((h, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-blue-500 rounded-full opacity-20"></div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase leading-none">{h.action}</span>
                                        <span className="text-[9px] text-gray-400 font-bold">{h.date} by {h.user}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
