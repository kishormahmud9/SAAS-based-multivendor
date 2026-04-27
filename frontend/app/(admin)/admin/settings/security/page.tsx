"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, ShieldCheck, Lock, UserCheck, Eye, EyeOff, ShieldAlert, History } from "lucide-react"

export default function SecuritySettings() {
    const [saving, setSaving] = useState(false)
    const [twoFactor, setTwoFactor] = useState(true)
    const [passwordExpiry, setPasswordExpiry] = useState("90")
    const [showKey, setShowKey] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Security policies updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-600/20">
                            <ShieldCheck size={24} />
                        </div>
                        Security & Access Control
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Manage authentication rules, password policies, and system-wide security.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all flex items-center gap-2 shadow-xl shadow-red-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Apply Security Layers
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Auth Policy */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center gap-2">
                            <Lock size={14} /> Authentication Policy
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] group hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-transparent hover:border-red-100 dark:hover:border-red-900/30">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-xs text-gray-500 font-medium leading-tight">Require 2FA for all administrative accounts.</p>
                                </div>
                                <button 
                                    onClick={() => setTwoFactor(!twoFactor)}
                                    className={`w-12 h-6 rounded-full relative transition-colors ${twoFactor ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-800'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${twoFactor ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-2 px-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Password Expiry (Days)</label>
                                <div className="relative">
                                     <History size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                     <input 
                                        type="number" 
                                        value={passwordExpiry}
                                        onChange={(e) => setPasswordExpiry(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-red-600 transition-all font-mono"
                                     />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-8 px-1">
                            <UserCheck size={14} /> Session Management
                        </h3>
                        <div className="space-y-4">
                             {[
                                { title: "Concurrent Logins", desc: "Allow only one active session per user", status: true },
                                { title: "Idle Timeout", desc: "Logout after 30 minutes of inactivity", status: true }
                             ].map((opt, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                    <div>
                                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{opt.title}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{opt.desc}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"></div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* System Integrity */}
                <div className="space-y-6">
                    <div className="p-8 bg-red-900/5 dark:bg-red-950/20 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 relative group">
                        <div className="flex gap-6 items-center">
                            <div className="w-16 h-16 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center text-red-600 shadow-sm ring-1 ring-red-100 dark:ring-red-900/50 group-hover:rotate-12 transition-transform duration-500">
                                <ShieldAlert size={28} className="animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-red-900 dark:text-red-400 mb-1 leading-tight">Advanced Guard System</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed mb-4">Your current protection level is <span className="text-red-600 uppercase font-black tracking-widest">Enhanced</span>. Periodic audits are enabled.</p>
                                <button className="px-5 py-2 bg-red-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:opacity-80 transition-opacity">Launch Auditor</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                         <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-8">
                             Global Encryption Key
                         </h3>
                         <div className="space-y-4">
                             <div className="relative group">
                                <div className="absolute inset-0 bg-gray-950 rounded-2xl filter blur-sm opacity-10 group-hover:opacity-20 transition-opacity"></div>
                                <div className="relative bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                    <div className="font-mono text-xs text-gray-400 truncate max-w-[200px]">
                                        {showKey ? "AES_GCM_v2_f839-2920-3e86-d6d3-0d6f-e88e-fd98-4389" : "••••••••••••••••••••••••••••••••"}
                                    </div>
                                    <button 
                                        onClick={() => setShowKey(!showKey)}
                                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                             </div>
                             <p className="text-[9px] text-gray-400 font-bold text-center italic">This key is used for server-side PII encryption. <span className="text-red-500 underline">Never reveal it.</span></p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
