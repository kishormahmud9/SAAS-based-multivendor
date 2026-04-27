"use client"

import { useState } from "react"
import { 
    Cpu, 
    Key, 
    Settings2, 
    ShieldAlert, 
    CheckCircle2, 
    Globe, 
    Zap, 
    Database, 
    Code2, 
    Search,
    RefreshCw,
    AlertTriangle,
    Sliders,
    Monitor,
    ChevronDown,
    Lock,
    Eye,
    EyeOff
} from "lucide-react"

// ─── Component ──────────────────────────────────────────────────────────────
export default function ConfigureAIPage() {
    const [showKey, setShowKey] = useState(false)

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Zap size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                            Configure AI Engine
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium font-mono text-sm">
                        {"//"} Manage model endpoints, security keys, and integration logic.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                     <button className="flex items-center gap-2 px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-black rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:bg-gray-50 active:scale-95 text-xs uppercase tracking-widest">
                        <RefreshCw size={16} /> Sync Configuration
                     </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 text-xs uppercase tracking-widest">
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Model & API Sec (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Model Selection Card */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/20">
                             <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-tight">
                                <Monitor size={20} className="text-indigo-600" />
                                Primary Intelligence Model
                             </h3>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { name: "Gemini 2.0 Flash", provider: "Google", desc: "Fast, multimodal, optimized for speed. (Recommended)", active: true },
                                    { name: "Gemini 1.5 Pro", provider: "Google", desc: "High reasoning, complex task solving.", active: false },
                                    { name: "GPT-4o", provider: "OpenAI", desc: "Balanced performance and high versatility.", active: false },
                                    { name: "Llama 3 70B", provider: "Meta", desc: "Powerful open-source model via Groq.", active: false },
                                ].map(model => (
                                    <div key={model.name} className={`p-6 rounded-3xl border transition-all cursor-pointer relative group ${model.active ? 'bg-indigo-50/50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-800' : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-indigo-300 shadow-sm'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-extrabold text-gray-900 dark:text-white">{model.name}</h4>
                                                <p className="text-[10px] uppercase font-black tracking-widest text-indigo-500">{model.provider}</p>
                                            </div>
                                            {model.active && <CheckCircle2 size={16} className="text-indigo-600" />}
                                        </div>
                                        <p className="text-xs text-gray-400 font-medium leading-relaxed">{model.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* API Key Management */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                         <div className="p-8 border-b border-gray-50 dark:border-gray-800 bg-gray-50/20 flex justify-between items-center">
                             <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-tight leading-none">
                                <Key size={20} className="text-indigo-600" />
                                API & Security Keys
                             </h3>
                             <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 px-3 py-1.5 rounded-lg border border-indigo-100">
                                <Settings2 size={14} /> Manage Permissions
                             </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Google AI Studio Key</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors">
                                            <Lock size={16} />
                                        </div>
                                        <input 
                                            type={showKey ? "text" : "password"} 
                                            value="AIzaSyA_XXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                            readOnly
                                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-mono tracking-widest text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                        />
                                        <button 
                                            onClick={() => setShowKey(!showKey)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-all"
                                        >
                                            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800/50 rounded-2xl flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800/30 rounded-xl flex items-center justify-center text-emerald-600">
                                        <Database size={20} />
                                    </div>
                                    <div className="leading-tight">
                                        <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-100 uppercase tracking-widest">Key Status Active</h4>
                                        <p className="text-[10px] text-emerald-600 font-bold opacity-80 italic">Verified at 10:45 AM Today • Monthly limit: $50 / $500 used</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Limits & Technical (4 cols) */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* Usage Limits Card */}
                    <div className="bg-indigo-950 text-white rounded-[2.5rem] p-8 border border-white/5 shadow-2xl space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Sliders size={120} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <h4 className="text-lg font-black uppercase tracking-widest leading-none">Resource Limits</h4>

                            <div className="space-y-6">
                                {[
                                    { label: "Token Usage", limit: "5M", current: "1.2M", percent: 24 },
                                    { label: "Daily Calls", limit: "1,000", current: "412", percent: 41.2 },
                                    { label: "Max Output Tokens", limit: "4,096", current: "2,048", percent: 50 },
                                ].map(limit => (
                                    <div key={limit.label} className="space-y-2">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-indigo-200">{limit.label}</span>
                                            <span className="text-white">{limit.current} / {limit.limit}</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                             <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${limit.percent}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-white text-indigo-950 font-black rounded-2xl hover:bg-indigo-50 transition-all text-xs uppercase tracking-widest shadow-xl shadow-white/5 active:scale-95">Upgrade Limit</button>
                        </div>
                    </div>

                    {/* Integrated Tools */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                         <h3 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-3 leading-none uppercase tracking-widest">
                            <ShieldAlert size={18} className="text-amber-500" />
                            Security Guardrails
                         </h3>
                         <div className="space-y-4">
                            {[
                                { t: "Pii Scrubbing", d: "Auto-masks emails/phones", active: true },
                                { t: "Output Filtering", d: "Block offensive content", active: true },
                                { t: "Rate Limiting", d: "Prevent API key abuse", active: true },
                            ].map(tool => (
                                <div key={tool.t} className="flex items-center justify-between">
                                    <div className="leading-none">
                                        <h5 className="text-xs font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight">{tool.t}</h5>
                                        <p className="text-[10px] text-gray-400 font-bold">{tool.d}</p>
                                    </div>
                                    <div className="w-10 h-5 bg-indigo-600 rounded-full flex items-center px-1">
                                        <div className="w-3 h-3 bg-white rounded-full ml-auto shadow-sm"></div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>

                    {/* Technical Snip */}
                    <div className="bg-gray-50 dark:bg-black rounded-[2rem] p-6 border border-gray-100 dark:border-gray-800 shadow-inner group">
                         <div className="flex items-center gap-2 mb-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                             <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] leading-none">Integration Status</span>
                         </div>
                         <p className="text-[11px] font-mono text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                             {"/*"} Core engine connected via Vercel AI SDK. Using WebSocket streaming for responses. {"*/"}
                         </p>
                    </div>

                </div>

            </div>

        </div>
    )
}
