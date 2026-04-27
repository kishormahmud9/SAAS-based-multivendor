"use client"

import { useState } from "react"
import { 
    Brain, 
    MessageSquare, 
    ShieldCheck, 
    Sliders, 
    Zap, 
    Plus, 
    FileText, 
    Globe, 
    Save, 
    History,
    Sparkles,
    UserCircle2,
    Lock,
    ChevronRight,
    Search,
    Trash2,
    Database,
    Smile,
    HeartPulse,
    Eye
} from "lucide-react"

// ─── Component ──────────────────────────────────────────────────────────────
export default function AIBehaviorPage() {
    const [tone, setTone] = useState(75)

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Brain size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                            AI Behavior & Personality
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Define the soul of your AI. Influence tone, style, and guardrails.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group">
                    <Save size={18} />
                    <span>Apply Brain Profile</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Personality & Tone (7 cols) */}
                <div className="lg:col-span-7 space-y-8">
                    
                    {/* Personality Profiles */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden p-8 space-y-8">
                        <div>
                             <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <UserCircle2 size={24} className="text-indigo-600" />
                                Personality Archetypes
                             </h3>
                             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Select the core persona of your agents</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { name: "Professional", icon: ShieldCheck, desc: "Formal, concise, and highly accurate. Best for B2B.", active: true },
                                { name: "Friendly", icon: Smile, desc: "Warm, empathetic, and conversational.", active: false },
                                { name: "Creative", icon: Sparkles, desc: "Enthusiastic, humorous, and persuasive.", active: false },
                            ].map(persona => (
                                <div key={persona.name} className={`p-6 rounded-[2rem] border transition-all cursor-pointer group flex flex-col items-center text-center gap-4 ${persona.active ? 'bg-indigo-600 text-white border-transparent' : 'bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:bg-white'}`}>
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${persona.active ? 'bg-white/10 text-white' : 'bg-white dark:bg-gray-800 text-indigo-600 shadow-sm'}`}>
                                        <persona.icon size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-black text-sm uppercase tracking-widest">{persona.name}</h4>
                                        <p className={`text-[10px] leading-relaxed font-medium ${persona.active ? 'text-indigo-100' : 'text-gray-400'}`}>{persona.desc}</p>
                                    </div>
                                    {persona.active && <div className="mt-auto px-4 py-1.5 bg-white/10 rounded-full text-[8px] font-black uppercase">Active Soul</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tone Sliders */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden p-8 space-y-8">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <Sliders size={24} className="text-indigo-600" />
                            Fine-Tuning Sliders
                        </h3>

                        <div className="space-y-10">
                            {[
                                { label: "Conciseness vs Detail", labels: ["Brief", "Comprehensive"], value: 65 },
                                { label: "Formality vs Casual", labels: ["Strict", "Relaxed"], value: 30 },
                                { label: "Optimism vs Realism", labels: ["Cautious", "Positive"], value: 85 },
                            ].map(slider => (
                                <div key={slider.label} className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">{slider.label}</h5>
                                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">{slider.value}%</span>
                                    </div>
                                    <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full">
                                        <div className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full" style={{ width: `${slider.value}%` }}></div>
                                        <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-lg" style={{ left: `calc(${slider.value}% - 0.5rem)` }}></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                        <span>{slider.labels[0]}</span>
                                        <span>{slider.labels[1]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Knowledge Base & Guardrails (5 cols) */}
                <div className="lg:col-span-5 space-y-8">
                    
                    {/* Knowledge Base */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden p-8 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
                                <Database size={20} className="text-indigo-600" />
                                Knowledge Base
                            </h3>
                            <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all"><Plus size={18} /></button>
                        </div>

                        <div className="space-y-3">
                            {[
                                { name: "Store_Policy_v2.pdf", size: "1.2 MB", type: "document" },
                                { name: "https://readymart.com/faq", size: "Web Crawler", type: "link" },
                                { name: "Product_Catalog_2026.csv", size: "8.4 MB", type: "document" },
                            ].map(item => (
                                <div key={item.name} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-indigo-200 transition-all group">
                                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                                        {item.type === 'document' ? <FileText size={18} /> : <Globe size={18} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black text-gray-900 dark:text-white truncate uppercase tracking-tight">{item.name}</p>
                                        <p className="text-[10px] font-bold text-gray-400">{item.size}</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 transition-all hover:bg-indigo-100">Index All Sources</button>
                    </div>

                    {/* Guardrails Card */}
                    <div className="bg-rose-950 text-rose-200 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                            <Lock size={100} fill="currentColor" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-widest text-white">Negative Guardrails</h4>
                            <div className="space-y-3">
                                {[
                                    "No political or religious discourse.",
                                    "Do not mention competitors directly.",
                                    "Refuse unauthorized refund requests.",
                                ].map(rule => (
                                    <div key={rule} className="flex items-center gap-3 text-xs font-medium">
                                        <Zap size={12} className="text-rose-500 shrink-0" />
                                        {rule}
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-white underline hover:text-rose-300">Advanced Safety Config</button>
                        </div>
                    </div>

                    {/* Dynamic Insight */}
                    <div className="p-8 bg-indigo-50 dark:bg-indigo-950/20 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/50 flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm animate-bounce">
                            <HeartPulse size={24} />
                        </div>
                        <p className="text-xs font-bold text-indigo-900 dark:text-indigo-100 px-4">
                            "Personality synchronization reduces AI 'hallucination' by 18%. Your current Friendly archetype is ideal for engagement."
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}
