"use client"

import { useState } from "react"
import { 
    MessageCircle, 
    Search, 
    MoreVertical, 
    Send, 
    Image as ImageIcon, 
    Paperclip, 
    Smile, 
    Phone, 
    Video, 
    User,
    CheckCheck,
    Clock,
    Filter,
    Star
} from "lucide-react"

const MOCK_CHATS = [
    { id: 1, name: "Sarah Connor", lastMsg: "Is the headphone still available?", time: "2m ago", unread: 2, online: true, avatar: "S" },
    { id: 2, name: "John Doe", lastMsg: "Thank you for the fast delivery!", time: "1h ago", unread: 0, online: false, avatar: "J" },
    { id: 3, name: "Mike Ross", lastMsg: "Can I get a discount for bulk order?", time: "3h ago", unread: 0, online: true, avatar: "M" },
    { id: 4, name: "Rachel Zane", lastMsg: "The watch band is a bit tight.", time: "1d ago", unread: 0, online: false, avatar: "R" },
    { id: 5, name: "Harvey Specter", lastMsg: "Send me the invoice please.", time: "2d ago", unread: 0, online: true, avatar: "H" },
]

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(MOCK_CHATS[0])

    return (
        <div className="p-0 h-[calc(100vh-100px)] animate-in fade-in duration-700 overflow-hidden">
            <div className="flex h-full">
                
                {/* Chat List Sidebar */}
                <div className="w-80 md:w-96 border-r border-gray-100 dark:border-gray-800 flex flex-col bg-white dark:bg-gray-950">
                    <div className="p-6 border-b border-gray-50 dark:border-gray-900">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Messages</h1>
                            <button className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                <MessageCircle size={20} />
                            </button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-transparent focus:border-blue-500/30 rounded-xl text-sm font-medium focus:outline-none" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="p-4 space-y-1">
                            {MOCK_CHATS.map((chat) => (
                                <button 
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${
                                        selectedChat.id === chat.id 
                                        ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600' 
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-900 border-l-4 border-transparent'
                                    }`}
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-gray-500 font-black text-lg">
                                            {chat.avatar}
                                        </div>
                                        {chat.online && (
                                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-gray-950 rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <h4 className="text-sm font-black text-gray-900 dark:text-white truncate">{chat.name}</h4>
                                            <span className="text-[10px] font-bold text-gray-400">{chat.time}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500'}`}>{chat.lastMsg}</p>
                                            {chat.unread > 0 && (
                                                <span className="bg-blue-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center">{chat.unread}</span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Main Area */}
                <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
                    
                    {/* Chat Header */}
                    <div className="px-8 py-4 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 font-black">
                                {selectedChat.avatar}
                            </div>
                            <div>
                                <h3 className="text-base font-black text-gray-900 dark:text-white leading-tight">{selectedChat.name}</h3>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{selectedChat.online ? 'Online' : 'Offline'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400"><Phone size={20} /></button>
                            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400"><Video size={20} /></button>
                            <button className="w-10 h-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400"><MoreVertical size={20} /></button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                        <div className="flex justify-center">
                            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-500">Today</span>
                        </div>

                        {/* Customer Message */}
                        <div className="flex items-start gap-4 max-w-[80%]">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs font-black shrink-0">
                                {selectedChat.avatar}
                            </div>
                            <div className="space-y-1">
                                <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">Hi, I'm interested in the Wireless Headphones. Is it still available in Silver color?</p>
                                </div>
                                <span className="text-[9px] font-bold text-gray-400 px-1">10:15 AM</span>
                            </div>
                        </div>

                        {/* Vendor Message */}
                        <div className="flex items-start gap-4 max-w-[80%] ml-auto flex-row-reverse">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black shrink-0">
                                V
                            </div>
                            <div className="space-y-1 text-right">
                                <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none shadow-lg shadow-blue-500/20 text-white">
                                    <p className="text-sm font-medium leading-relaxed">Hello Sarah! Yes, we have 2 units left in Silver. Would you like to place an order now?</p>
                                </div>
                                <div className="flex items-center justify-end gap-1.5 px-1">
                                    <span className="text-[9px] font-bold text-gray-400">10:18 AM</span>
                                    <CheckCheck size={12} className="text-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Customer Message */}
                        <div className="flex items-start gap-4 max-w-[80%]">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs font-black shrink-0">
                                {selectedChat.avatar}
                            </div>
                            <div className="space-y-1">
                                <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-800">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">That's great! Does it come with international warranty?</p>
                                </div>
                                <span className="text-[9px] font-bold text-gray-400 px-1">10:20 AM</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
                        <div className="max-w-4xl mx-auto relative flex items-center gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] px-6 py-2 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
                            <button className="text-gray-400 hover:text-blue-600 transition-colors"><Smile size={22} /></button>
                            <button className="text-gray-400 hover:text-blue-600 transition-colors"><Paperclip size={22} /></button>
                            <input 
                                type="text" 
                                placeholder="Type your message here..."
                                className="flex-1 bg-transparent border-none py-3 text-sm font-medium focus:outline-none text-gray-900 dark:text-white"
                            />
                            <button className="text-gray-400 hover:text-blue-600 transition-colors"><ImageIcon size={22} /></button>
                            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all transform active:scale-95 shadow-lg shadow-blue-500/30">
                                <Send size={18} className="-mr-1" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
