"use client"

import { useState } from "react"
import { 
    MessageSquare, 
    Send, 
    Bot, 
    Zap, 
    Settings2, 
    History, 
    ShieldCheck, 
    Brain, 
    RefreshCcw, 
    Maximize2, 
    ChevronRight,
    TrendingUp,
    BarChart3,
    Activity,
    Plus,
    Search
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface ChatLog {
    id: string
    user: string
    message: string
    botResponse: string
    satisfied: boolean
    date: string
}

const mockLogs: ChatLog[] = [
    { id: "1", user: "Kishor Mahmud", message: "Where is my order #9921?", botResponse: "I found order #9921! It was shipped on March 22 and is currently in transit. You can track it here: [link].", satisfied: true, date: "10:30 AM" },
    { id: "2", user: "Sadia Rahman", message: "Do you have any discounts for new users?", botResponse: "Yes! You can use code NEW2026 for 10% off your first purchase.", satisfied: true, date: "11:15 AM" },
    { id: "3", user: "Unknown", message: "Can I return a product after 7 days?", botResponse: "Yes, our return policy allows returns within 30 days of delivery for most items.", satisfied: false, date: "01:45 PM" },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function ChatbotManagementPage() {
    const [testInput, setTestInput] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 animate-pulse">
                            <Bot size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-none">
                            Gemini Chatbot
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Train, monitor, and optimize your AI customer support agent.
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-full border border-emerald-200/50 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest leading-none">
                        <Activity size={12} className="animate-pulse" />
                        Bot Online
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-3 px-6 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group">
                        <Brain size={18} className="group-hover:rotate-12 transition-transform" />
                        <span>Train Agent</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Conversations", value: "14,821", icon: MessageSquare, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/30" },
                    { label: "AI Resolution Rate", value: "88.4%", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/30" },
                    { label: "Avg. Response Time", value: "1.2s", icon: Zap, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/10" },
                    { label: "Training Knowledge", value: "842 docs", icon: Brain, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/30" },
                ].map(stat => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4 group hover:border-indigo-500/20 transition-all duration-300">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none">{stat.value}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Bot Control Center */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Chat Simulation (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col h-[600px] overflow-hidden">
                        <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                                    <Bot size={20} />
                                </div>
                                <div className="leading-none">
                                    <h4 className="text-sm font-black text-gray-900 dark:text-white">Active Simulation</h4>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Model: Gemini 2.0 Flash</span>
                                </div>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-indigo-600 transition-all"><RefreshCcw size={18} /></button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 flex flex-col no-scrollbar">
                           <div className="flex items-start gap-4 max-w-[80%]">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                                    <Bot size={16} className="text-indigo-500" />
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Hello! I'm your ReadyMart AI assistant. How can I help you with your shopping experience today?
                                </div>
                           </div>

                           <div className="flex items-start gap-4 max-w-[80%] ml-auto flex-row-reverse">
                                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0 text-white">
                                    KB
                                </div>
                                <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none text-sm font-medium text-white shadow-lg shadow-indigo-500/20">
                                    Where can I find the latest tech gadgets?
                                </div>
                           </div>

                           <div className="flex items-start gap-4 max-w-[80%]">
                                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                                    <Bot size={16} className="text-indigo-500" />
                                </div>
                                <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-2xl rounded-tl-none border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Great question! You can find our latest tech articles and product launches in the <span className="text-indigo-500 font-bold underline cursor-pointer">Technology section</span> of our blog. Would you like me to show you the best-selling gadgets from this week?
                                </div>
                           </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-gray-50/50 dark:bg-gray-800/10 border-t border-gray-50 dark:border-gray-800 flex gap-3 items-center">
                            <input 
                                type="text" 
                                value={testInput}
                                onChange={(e) => setTestInput(e.target.value)}
                                placeholder="Test the bot's response..." 
                                className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-3 px-5 text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            <button className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: History & Config (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    
                    {/* Recent Interactions */}
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[400px]">
                        <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/20">
                           <h4 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2">
                               <History size={16} className="text-indigo-600" />
                               Conversations history
                           </h4>
                           <button className="text-xs font-black text-indigo-600 hover:underline">View All</button>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar">
                           {mockLogs.map(log => (
                               <div key={log.id} className="p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-all cursor-pointer group">
                                   <div className="flex justify-between items-start mb-2">
                                       <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{log.user} • {log.date}</span>
                                       {log.satisfied ? <ShieldCheck size={14} className="text-emerald-500" /> : <ShieldCheck size={14} className="text-rose-400" />}
                                   </div>
                                   <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-indigo-500 transition-colors">Q: {log.message}</p>
                                   <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium line-clamp-1 italic">Bot: {log.botResponse}</p>
                               </div>
                           ))}
                        </div>
                    </div>

                    {/* Quick Config Card */}
                    <div className="bg-gradient-to-br from-indigo-900 to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Zap size={100} />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <h4 className="text-lg font-black leading-tight">Advanced Trigger Rules</h4>
                            <p className="text-sm text-indigo-100/60 font-medium">Define when the bot should intervene vs handover to a human agent.</p>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase py-3 rounded-xl transition-all border border-white/10">Configure</button>
                                <button className="w-12 h-11 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all border border-white/10"><Settings2 size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
