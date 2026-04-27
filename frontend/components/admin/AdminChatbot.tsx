"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, X, Send, Bot, User, Sparkles, Minus, Zap } from "lucide-react"

export default function AdminChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am your ReadyMart AI Assistant. How can I help you manage your store today?", sender: "ai", time: "Just now" }
    ])
    const [inputValue, setInputValue] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isOpen])

    const handleSend = () => {
        if (!inputValue.trim()) return

        const newUserMsg = { id: Date.now(), text: inputValue, sender: "user", time: "Just now" }
        setMessages(prev => [...prev, newUserMsg])
        setInputValue("")

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg = { 
                id: Date.now() + 1, 
                text: "I'm processing your request regarding '" + inputValue + "'. As an AI concierge, I can assist you with system configuration, sales insights, or UI updates across the ReadyMart platform.", 
                sender: "ai", 
                time: "Just now" 
            }
            setMessages(prev => [...prev, aiMsg])
        }, 1000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="pointer-events-auto mb-4 w-[350px] h-[520px] bg-white dark:bg-[#0A0A0B] rounded-3xl border border-gray-100 dark:border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-500">
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white flex items-center justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                             <Zap size={60} />
                        </div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20">
                                <Bot size={20} className="animate-bounce-slow" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">ReadyMart AI <Sparkles size={10} className="text-orange-400" /></h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Neural Core Active</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 relative z-10">
                             <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors"><Minus size={16} /></button>
                             <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white transition-colors"><X size={16} /></button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-5 bg-gray-50/50 dark:bg-gray-950/20 scrollbar-hide">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <div className={`flex gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-white dark:bg-gray-900 text-gray-400 border border-gray-100 dark:border-gray-800'}`}>
                                        {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                                    </div>
                                    <div className={`p-3.5 rounded-xl text-[10px] font-medium leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950 rounded-tr-none' : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-gray-800 rounded-tl-none'}`}>
                                        {msg.text}
                                        <div className={`mt-1.5 text-[8px] font-bold uppercase tracking-tighter opacity-50`}>
                                            {msg.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-[#0A0A0B] border-t border-gray-100 dark:border-gray-800">
                        <div className="relative group">
                            <input 
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Write your command..."
                                className="w-full pl-5 pr-12 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-[10px] font-bold text-gray-900 dark:text-white border-none focus:ring-2 focus:ring-orange-600 transition-all placeholder-gray-400"
                            />
                            <button 
                                onClick={handleSend}
                                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center hover:bg-orange-500 active:scale-95 transition-all"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* FAB Toggle */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`pointer-events-auto w-14 h-14 rounded-xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group relative overflow-hidden ${isOpen ? 'bg-gray-950 text-white rotate-90' : 'bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 text-white shadow-orange-600/40 ring-4 ring-white/10'}`}
            >
                {/* Glow Effect */}
                {!isOpen && (
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                )}

                {isOpen ? <X size={24} /> : (
                    <div className="relative z-10">
                        <Bot size={24} className="group-hover:scale-110 transition-all duration-500 drop-shadow-lg" />
                        <Sparkles size={12} className="absolute -top-2 -right-2 text-white animate-pulse" />
                    </div>
                )}
                {!isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse z-20"></span>
                )}
            </button>
        </div>
    )
}
