"use client"

import { useState } from "react"
import { 
    Mic, 
    Phone, 
    History, 
    Settings2, 
    Plus, 
    Volume2, 
    User, 
    Languages, 
    Clock, 
    CheckCircle2, 
    Activity,
    MoreHorizontal,
    Music,
    Play,
    Search,
    ChevronRight,
    Zap
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface VoiceCall {
    id: string
    customer: string
    type: "Inbound" | "Outbound"
    duration: string
    status: "completed" | "failed" | "active"
    sentiment: "positive" | "neutral" | "negative"
    date: string
}

const mockCalls: VoiceCall[] = [
    { id: "1", customer: "Kishor Mahmud", type: "Inbound", duration: "02:45", status: "completed", sentiment: "positive", date: "Today, 10:30 AM" },
    { id: "2", customer: "Sadia Rahman", type: "Outbound", duration: "01:20", status: "completed", sentiment: "neutral", date: "Today, 11:15 AM" },
    { id: "3", customer: "Unknown User", type: "Inbound", duration: "00:45", status: "active", sentiment: "neutral", date: "Ongoing" },
    { id: "4", customer: "Ariful Islam", type: "Outbound", duration: "03:10", status: "completed", sentiment: "negative", date: "Yesterday" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function VoiceAIPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Mic size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                            Voice AI Agents
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Deploy natural-sounding AI agents for automated customer calls.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                    <span>Deploy New Agent</span>
                </button>
            </div>

            {/* Active Monitoring waveform placeholder */}
            <div className="bg-gradient-to-br from-indigo-950 to-black rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 3, 5, 8, 4, 2, 6, 9, 3, 5, 2].map((h, i) => (
                             <div key={i} className="w-2 bg-white rounded-full animate-pulse" style={{ height: `${h * 10}px`, animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-black uppercase tracking-widest text-indigo-300">
                             <Activity size={14} className="animate-pulse" /> Live Voice Processing
                        </div>
                        <h3 className="text-4xl font-black text-white leading-tight">Gemini Voice Engine 1.0</h3>
                        <p className="text-indigo-100/60 font-medium max-w-lg">Using ultra-low latency multimodal processing. Experience human-like turn taking with 200ms response delay.</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 divide-y divide-white/5 min-w-[280px]">
                        <div className="pb-4 flex justify-between items-center">
                            <span className="text-xs font-bold text-indigo-200">Concurrent Calls</span>
                            <span className="text-2xl font-black text-white">12 / 50</span>
                        </div>
                        <div className="py-4 flex justify-between items-center">
                            <span className="text-xs font-bold text-indigo-200">Average Duration</span>
                            <span className="text-2xl font-black text-white">2m 45s</span>
                        </div>
                        <div className="pt-4">
                            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black py-3 rounded-xl transition-all shadow-lg active:scale-95">Scale Infrastructure</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Call Logs (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 leading-none uppercase tracking-tight">
                                <History size={20} className="text-indigo-600" />
                                Recent Call History
                            </h3>
                            <div className="relative w-full md:w-64">
                               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                               <input type="text" placeholder="Find calls..." className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Participant</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Direction</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Duration</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {mockCalls.map((call) => (
                                        <tr key={call.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-extrabold text-gray-900 dark:text-white leading-none mb-1">{call.customer}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{call.date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${call.type === 'Inbound' ? 'text-indigo-600' : 'text-amber-600'}`}>
                                                    <Phone size={14} className={call.type === 'Outbound' ? 'rotate-135' : ''} />
                                                    {call.type}
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 font-mono text-xs font-black text-gray-600 dark:text-gray-300">
                                                {call.duration}
                                            </td>
                                            <td className="px-6 py-6">
                                                {call.status === "completed" ? (
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 size={14} className="text-emerald-500" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Finished</span>
                                                    </div>
                                                ) : call.status === "active" ? (
                                                    <div className="flex items-center gap-2 group-hover:animate-pulse">
                                                        <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 leading-none">Live Now</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs font-bold text-gray-300 italic">Dropped</span>
                                                )}
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                                                    <button title="Listen Recording" className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Play size={18} fill="currentColor" /></button>
                                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-xl transition-all"><MoreHorizontal size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right: Quick Settings (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Voice Selection */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <Volume2 size={20} className="text-indigo-600" />
                            Active Persona
                        </h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform shadow-sm">
                                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0">
                                    <Music size={24} />
                                </div>
                                <div>
                                    <h4 className="font-black text-indigo-900 dark:text-indigo-100 leading-none mb-1">Evelyn (Standard)</h4>
                                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">En-US • Calm • Professional</p>
                                </div>
                                <div className="ml-auto bg-indigo-600 text-white p-1 rounded-full"><Plus size={14} /></div>
                            </div>

                            <button className="w-full bg-gray-50 dark:bg-gray-800/50 text-gray-400 font-black py-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all uppercase tracking-widest text-[10px]">
                                <Settings2 size={16} /> Advanced Settings
                            </button>
                        </div>
                    </div>

                    {/* Language Support */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center gap-2 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                            <Languages size={80} />
                        </div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mb-2">Global Coverage</h4>
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                <Languages size={20} />
                             </div>
                             <div>
                                 <h3 className="text-3xl font-black text-gray-900 dark:text-white">24+</h3>
                                 <p className="text-xs font-bold text-gray-400">Languages supported</p>
                             </div>
                        </div>
                        <button className="mt-4 text-xs font-black text-indigo-600 flex items-center gap-1 hover:underline">Manage Locales <ChevronRight size={14} /></button>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-indigo-950 p-8 rounded-[2.5rem] text-white shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-indigo-300">
                                <Zap size={20} />
                            </div>
                            <h4 className="font-black text-sm uppercase tracking-widest">Voice Insights</h4>
                        </div>
                        <p className="text-sm font-medium text-indigo-100/60 leading-relaxed mb-1 italic">"Sentiment analysis shows human-like warmth increases customer retention by 32% compared to robotic tones."</p>
                    </div>

                </div>
            </div>

        </div>
    )
}
