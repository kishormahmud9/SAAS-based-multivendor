"use client"

import { useState } from "react"
import { 
    Bell, 
    CheckCircle, 
    Clock, 
    AlertCircle, 
    ShoppingBag, 
    MessageCircle, 
    Settings, 
    MoreVertical, 
    Search,
    Filter,
    Check
} from "lucide-react"

const MOCK_NOTIFICATIONS = [
    { id: 1, title: "New Order Received", desc: "Order #ORD-9923 was placed by Sarah Connor.", time: "2 mins ago", type: "order", icon: ShoppingBag, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20", unread: true },
    { id: 2, title: "Payout Successful", desc: "Your withdrawal of $500.00 has been processed.", time: "5 hours ago", type: "system", icon: CheckCircle, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20", unread: true },
    { id: 3, title: "Low Stock Alert", desc: "Wireless Headphones are running low (5 left).", time: "1 day ago", type: "inventory", icon: AlertCircle, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20", unread: false },
    { id: 4, title: "Customer Review", desc: "Mike Ross left a 5-star review on 'Smart Watch Pro'.", time: "2 days ago", type: "review", icon: MessageCircle, color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20", unread: false },
    { id: 5, title: "System Update", desc: "New features have been added to the Vendor Portal.", time: "3 days ago", type: "system", icon: Settings, color: "text-gray-600 bg-gray-50 dark:bg-gray-800", unread: false },
]

export default function NotificationsPage() {
    const [tab, setTab] = useState("all")

    const filteredNotifications = tab === "all" 
        ? MOCK_NOTIFICATIONS 
        : MOCK_NOTIFICATIONS.filter(n => n.unread)

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Bell className="text-blue-600" size={32} />
                        Notifications
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Stay updated with your latest orders, payouts and store activity.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                        <Check size={18} /> Mark All Read
                    </button>
                    <button className="w-10 h-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all">
                        <Settings size={20} />
                    </button>
                </div>
            </div>

            {/* Tabs & Filters */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full md:w-auto">
                    <button 
                        onClick={() => setTab("all")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'all' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        All <span className="ml-1 opacity-60">({MOCK_NOTIFICATIONS.length})</span>
                    </button>
                    <button 
                        onClick={() => setTab("unread")}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === 'unread' ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        Unread <span className="ml-1 opacity-60">({MOCK_NOTIFICATIONS.filter(n => n.unread).length})</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-xl text-sm font-medium focus:outline-none"
                        />
                    </div>
                    <button className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
                {filteredNotifications.map((notif) => {
                    const Icon = notif.icon
                    return (
                        <div 
                            key={notif.id} 
                            className={`group relative p-6 rounded-[2rem] border transition-all duration-300 ${
                                notif.unread 
                                ? 'bg-white dark:bg-gray-900 border-blue-100 dark:border-blue-900/30 shadow-md' 
                                : 'bg-gray-50/50 dark:bg-gray-800/30 border-transparent hover:bg-white dark:hover:bg-gray-900 hover:border-gray-100 dark:hover:border-gray-800'
                            }`}
                        >
                            <div className="flex items-start gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.color} group-hover:scale-110 transition-transform`}>
                                    <Icon size={28} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-lg font-black tracking-tight ${notif.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                            {notif.title}
                                        </h3>
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 uppercase tracking-widest">
                                                <Clock size={12} /> {notif.time}
                                            </span>
                                            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-medium ${notif.unread ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500'}`}>
                                        {notif.desc}
                                    </p>
                                    <div className="pt-3 flex items-center gap-4">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">View Details</button>
                                        {notif.unread && (
                                            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600">Mark as read</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {notif.unread && (
                                <div className="absolute top-6 left-6 w-2 h-2 bg-blue-600 rounded-full animate-ping opacity-75"></div>
                            )}
                        </div>
                    )
                })}

                {filteredNotifications.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
                            <Bell size={40} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">All caught up!</h3>
                        <p className="text-gray-500 font-medium">You have no new notifications at the moment.</p>
                    </div>
                )}
            </div>

            {/* Load More */}
            {filteredNotifications.length > 0 && (
                <div className="flex justify-center pt-8">
                    <button className="px-8 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                        Load Older Notifications
                    </button>
                </div>
            )}

        </div>
    )
}
