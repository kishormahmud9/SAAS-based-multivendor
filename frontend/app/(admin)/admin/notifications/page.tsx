"use client"

import { useState } from "react"
import { 
    Bell, 
    Clock, 
    Check, 
    AlertCircle, 
    ShoppingBag, 
    Search, 
    Filter, 
    MoreVertical, 
    Trash2, 
    CheckCircle2,
    Settings,
    Mail,
    UserPlus,
    CreditCard
} from "lucide-react"

const ALL_NOTIFICATIONS = [
    { id: 1, title: "New Order Received", desc: "Order #ORD-9923 was placed successfully by Kishor Mahmud.", time: "2 mins ago", type: "order", icon: ShoppingBag, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", unread: true },
    { id: 2, title: "System Update", desc: "Version 4.2.1 deployment completed. All services are operational.", time: "1 hour ago", type: "system", icon: Check, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20", unread: false },
    { id: 3, title: "Security Alert", desc: "Multiple failed login attempts detected from IP 192.168.1.105.", time: "3 hours ago", type: "security", icon: AlertCircle, color: "text-red-600 bg-red-50 dark:bg-red-900/20", unread: true },
    { id: 4, title: "New User Registered", desc: "A new customer has joined ReadyMart.", time: "5 hours ago", type: "user", icon: UserPlus, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20", unread: false },
    { id: 5, title: "Payment Successful", desc: "Payment for order #ORD-9920 has been confirmed.", time: "Yesterday", type: "payment", icon: CreditCard, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20", unread: false },
    { id: 6, title: "Newsletter Sent", desc: "Weekly digest has been delivered to 4.5k subscribers.", time: "2 days ago", type: "marketing", icon: Mail, color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20", unread: false },
]

export default function NotificationsPage() {
    const [filter, setFilter] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")

    const filteredNotifications = ALL_NOTIFICATIONS.filter(notif => {
        const matchesType = filter === "all" || notif.type === filter || (filter === "unread" && notif.unread)
        const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             notif.desc.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesType && matchesSearch
    })

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-black dark:text-white flex items-center gap-4 tracking-tight">
                        <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-600/20 ring-1 ring-white/10">
                            <Bell size={28} />
                        </div>
                        Notification Center
                    </h1>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Stay updated with orders, system health, and security alerts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white dark:bg-[#0A0A0B] border border-gray-100 dark:border-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-orange-600 transition-all flex items-center gap-2 shadow-sm">
                        <CheckCircle2 size={16} /> Mark All as Read
                    </button>
                    <button className="p-3 bg-white dark:bg-[#0A0A0B] border border-gray-100 dark:border-gray-800 rounded-2xl text-gray-500 hover:text-orange-600 transition-all shadow-sm">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                <Filter size={14} /> Filter Results
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { id: "all", label: "All Notifications", count: ALL_NOTIFICATIONS.length },
                                    { id: "unread", label: "Unread Only", count: ALL_NOTIFICATIONS.filter(n => n.unread).length },
                                    { id: "order", label: "Orders & Sales", count: ALL_NOTIFICATIONS.filter(n => n.type === "order").length },
                                    { id: "system", label: "System Health", count: ALL_NOTIFICATIONS.filter(n => n.type === "system").length },
                                    { id: "security", label: "Security & Access", count: ALL_NOTIFICATIONS.filter(n => n.type === "security").length },
                                ].map((type) => (
                                    <button 
                                        key={type.id}
                                        onClick={() => setFilter(type.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-xs font-bold transition-all ${filter === type.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20 scale-[1.02]' : 'bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                    >
                                        {type.label}
                                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black ${filter === type.id ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>{type.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-50 dark:border-gray-900">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                                <Search size={14} /> Global Search
                            </h3>
                            <div className="relative">
                                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search logs..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-600 transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-[2.5rem] border border-white/5 relative group overflow-hidden shadow-2xl">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000 rotate-12">
                             <Bell size={120} className="text-orange-500" />
                         </div>
                         <h4 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-2">Cloud Synced</h4>
                         <p className="text-[10px] font-bold text-gray-400 leading-relaxed">Notifications are synchronized across all your administrative devices in real-time.</p>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="lg:col-span-3 space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notif, i) => {
                            const Icon = notif.icon
                            return (
                                <div 
                                    key={notif.id} 
                                    className={`bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-6 border border-gray-100 dark:border-gray-800 shadow-sm group hover:scale-[1.01] transition-all animate-in slide-in-from-right-4 duration-500 ${notif.unread ? 'ring-2 ring-orange-600/20' : ''}`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                        <div className="flex items-start gap-5">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.color} group-hover:rotate-12 transition-transform shadow-sm`}>
                                                <Icon size={24} />
                                            </div>
                                            <div className="space-y-1.5 pt-1">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="text-base font-black text-gray-900 dark:text-white tracking-tight leading-none">{notif.title}</h4>
                                                    {notif.unread && <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>}
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-xl">{notif.desc}</p>
                                                <div className="flex items-center gap-4 pt-1">
                                                     <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                                                        <Clock size={12} /> {notif.time}
                                                     </div>
                                                     <span className="text-[9px] font-black uppercase tracking-widest text-gray-400/50">Status: {notif.unread ? 'New' : 'Read'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 self-end sm:self-center">
                                            <button className="p-3 bg-white dark:bg-gray-900 rounded-xl text-gray-400 hover:text-orange-600 transition-all shadow-sm border border-gray-100 dark:border-gray-800"><MoreVertical size={18} /></button>
                                            <button className="p-3 bg-white dark:bg-gray-900 rounded-xl text-gray-400 hover:text-red-500 transition-all shadow-sm border border-gray-100 dark:border-gray-800"><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="h-96 flex flex-col items-center justify-center bg-white dark:bg-[#0A0A0B] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm text-center px-8">
                             <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-300 mb-6">
                                <Bell size={48} className="opacity-20" />
                             </div>
                             <h4 className="text-lg font-black text-gray-800 dark:text-white mb-2 uppercase tracking-wide">Silent Forest</h4>
                             <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs">We couldn't find any notifications matching your filters. Try adjusting your search query.</p>
                        </div>
                    )}
                    
                    <div className="pt-8 text-center">
                         <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">End of Notification Logs</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
