"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Terminal, Key, Database, RefreshCw, Eye, EyeOff, Plus, Trash2, Globe, ShieldCheck, Zap, CheckCircle2 } from "lucide-react"

export default function APISettings() {
    const [saving, setSaving] = useState(false)
    const [showSecret, setShowSecret] = useState(false)
    const [webhooks, setWebhooks] = useState([
        { id: "1", url: "https://api.thirdparty.com/hooks/readymart", events: "order.created, order.paid", status: "Healthy" },
        { id: "2", url: "https://analytics.readymart.io/track", events: "customer.signup", status: "Healthy" }
    ])

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("API configurations updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-gray-900/20 ring-1 ring-white/10">
                            <Terminal size={24} />
                        </div>
                        Developer Console & API Hub
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Manage system access keys, webhooks, and third-party integrations.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gray-950 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-gray-950/20 active:scale-95 disabled:opacity-50 border border-white/5"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Apply Integrations
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* API Keys */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 px-1">
                                <Key size={14} /> Access Credentials
                            </h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center gap-2">
                                <RefreshCw size={12} /> Regenerate Keys
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Publishable API Key</label>
                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-mono text-xs text-gray-600 dark:text-gray-300 border border-transparent hover:border-blue-500/30 transition-all select-all">
                                    pk_live_51Msz7yB...98234
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Secret Access Secret</label>
                                <div className="relative group">
                                     <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-mono text-xs text-gray-600 dark:text-gray-300 border border-transparent hover:border-red-500/30 transition-all overflow-hidden flex items-center justify-between">
                                        <span className="truncate max-w-[400px]">
                                            {showSecret ? "sk_live_f839-2920-3e86-d6d3-0d6f-e88e-fd98-4389" : "••••••••••••••••••••••••••••••••••••••••"}
                                        </span>
                                        <button onClick={() => setShowSecret(!showSecret)} className="text-gray-400 hover:text-white transition-colors">
                                            {showSecret ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                         <div className="flex justify-between items-center">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 px-1">
                                <Globe size={14} /> Registered Webhooks
                            </h3>
                            <button className="px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 transition-colors">
                                <Plus size={14} /> New Endpoint
                            </button>
                         </div>

                         <div className="space-y-4">
                             {webhooks.map((hook, i) => (
                                <div key={hook.id} className="p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all group animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-4">
                                             <div className="w-10 h-10 bg-white dark:bg-gray-950 rounded-xl flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 dark:border-gray-800">
                                                <Database size={18} />
                                             </div>
                                             <div>
                                                <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{hook.url}</p>
                                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{hook.events}</p>
                                             </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                                                <CheckCircle2 size={10} /> {hook.status}
                                            </div>
                                            <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                             ))}
                         </div>
                    </div>
                </div>

                {/* Developer Metrics */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-8 px-1">
                            <Database size={14} className="text-blue-500" /> API Usage (24h)
                        </h3>
                        <div className="space-y-6">
                             <div className="space-y-2">
                                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
                                    <span>Requests Rate</span>
                                    <span className="text-gray-900 dark:text-white">8,421 / 10,000</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-950 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-600 w-[84%] animate-in slide-in-from-left duration-1000"></div>
                                </div>
                             </div>

                             <div className="pt-4 grid grid-cols-2 gap-4">
                                 <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center">
                                     <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Avg Latency</p>
                                     <p className="text-lg font-black text-gray-900 dark:text-white">42ms</p>
                                 </div>
                                 <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl text-center">
                                     <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Success</p>
                                     <p className="text-lg font-black text-emerald-500">99.9%</p>
                                 </div>
                             </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-indigo-900 to-black rounded-[2.5rem] text-white shadow-xl shadow-indigo-950/20 relative group overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                             <Zap size={120} />
                        </div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2 px-1 flex items-center gap-2">
                            <ShieldCheck size={14} /> Security Status
                        </h4>
                        <div className="text-3xl font-black mb-1">Enforced</div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TLS 1.3 | AES-256 Enabled</p>
                        
                        <div className="mt-8 pt-6 border-t border-white/10">
                             <p className="text-[10px] font-bold text-gray-500 leading-tight">Your API endpoints are protected by Cloudflare WAF and custom rate-limiting rules.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
