"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, ShieldCheck, FileText, Globe, Eye, History, AlertTriangle } from "lucide-react"

export default function TermsConditionsManager() {
    const [saving, setSaving] = useState(false)
    const [lastUpdated, setLastUpdated] = useState("2026-03-24")
    const [content, setContent] = useState(`
# Terms & Conditions

## 1. Introduction
Welcome to ReadyMart. These terms and conditions outline the rules and regulations for the use of ReadyMart's Website.

## 2. Intellectual Property Rights
Other than the content you own, under these Terms, ReadyMart and/or its licensors own all the intellectual property rights and materials contained in this Website.

## 3. Restrictions
You are specifically restricted from all of the following:
- publishing any Website material in any other media;
- selling, sublicensing and/or otherwise commercializing any Website material;
- publicly performing and/or showing any Website material;

## 4. Your Privacy
Please read our Privacy Policy.
    `)

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        setLastUpdated(new Date().toISOString().split('T')[0])
        toast.success("Terms & Conditions updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-gray-900/20 ring-1 ring-white/10">
                            <ShieldCheck size={20} />
                        </div>
                        Legal & Compliance
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your store's terms, conditions, and legal frameworks.</p>
                </div>
                <div className="flex gap-3">
                     <button className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors flex items-center gap-2">
                        <Eye size={18} /> View Live
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-gray-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Publish Document
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Document Editor */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.02] group-hover:scale-105 transition-transform duration-1000">
                             <FileText size={200} />
                        </div>
                        
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <FileText size={14} /> Markdown Document Editor
                            </h3>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                                Last Updated: {lastUpdated}
                            </span>
                        </div>

                        <textarea 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-3xl py-8 px-8 text-sm leading-relaxed font-mono text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gray-900 transition-all min-h-[600px] resize-none scrollbar-hide"
                            spellCheck={false}
                        />
                    </div>
                </div>

                {/* Document Context/Settings */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-3xl border border-yellow-100 dark:border-yellow-900/30">
                        <p className="text-[10px] font-black uppercase tracking-widest text-yellow-700 dark:text-yellow-500 flex items-center gap-2 mb-3">
                            <AlertTriangle size={14} /> Legal Disclaimer
                        </p>
                        <p className="text-[10px] text-yellow-800/60 dark:text-yellow-200/40 font-bold leading-relaxed">
                            These documents are provided as templates. Please consult with legal counsel to ensure compliance with local laws and regulations.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-6 px-1">
                             Related Documents
                        </h3>
                        <div className="space-y-2">
                            {["Privacy Policy", "Refund Policy", "User Agreement", "Cookie Policy"].map(doc => (
                                <button key={doc} className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center justify-between group">
                                    <span>{doc}</span>
                                    <Globe size={14} className="opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 dark:bg-gray-800/10 rounded-3xl border border-gray-100 dark:border-gray-800">
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-4">
                            <History size={14} /> Revision History
                        </p>
                        <div className="space-y-4">
                            {[
                                { version: "v2.0", date: "Mar 24, 2026", user: "Kishor" },
                                { version: "v1.2", date: "Jan 12, 2026", user: "Admin" },
                            ].map((rev, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px]">
                                    <div className="flex flex-col">
                                        <span className="font-black text-gray-900 dark:text-white">{rev.version}</span>
                                        <span className="text-gray-400">{rev.user}</span>
                                    </div>
                                    <span className="bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-400 font-bold">{rev.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
