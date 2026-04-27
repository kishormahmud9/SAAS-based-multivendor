"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Search, Clock, Check, AlertCircle, ShoppingBag, ArrowRight, Settings, Shield, Activity, LogOut, Menu, X } from "lucide-react"
import { useSidebar } from "@/lib/contexts/SidebarContext"
import { useAuth } from "@/lib/contexts/AuthContext"
import { ThemeToggle } from "@/components/ThemeToggle"
import Link from "next/link"

const MOCK_NOTIFICATIONS = [
    { id: 1, title: "New Order Received", desc: "Order #ORD-2241 was placed by a customer.", time: "5 mins ago", type: "order", icon: ShoppingBag, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
    { id: 2, title: "Withdrawal Approved", desc: "Your withdrawal request for $500 was approved.", time: "2 hours ago", type: "system", icon: Check, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
    { id: 3, title: "Low Stock Alert", desc: "Wireless Headphones are running low (2 left).", time: "5 hours ago", type: "security", icon: AlertCircle, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
]

export default function VendorHeader() {
    const { user } = useAuth()
    const { isOpen, toggle } = useSidebar()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const userMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false)
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])
    
    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-40 transition-colors duration-300">
            <div className="flex items-center justify-between px-4 md:px-8 py-4">
                {/* Mobile Toggle */}
                <button 
                    onClick={toggle}
                    className="p-2 mr-4 md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                {/* Search Bar */}
                <div className="flex-1 max-w-2xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search your products, orders..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-4 ml-6">
                    <ThemeToggle />

                    {/* Notifications */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                            className={`relative p-2 rounded-xl transition-all duration-200 ${isNotificationsOpen ? 'text-blue-600 bg-blue-50 dark:bg-gray-800 shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800'}`}
                        >
                            <Bell size={22} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        </button>

                        {/* Dropdown */}
                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#0A0A0B] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                <div className="p-5 border-b border-gray-50 dark:border-gray-900 flex justify-between items-center">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Notifications</h3>
                                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-full">{MOCK_NOTIFICATIONS.length} New</span>
                                </div>

                                <div className="max-h-[300px] overflow-y-auto">
                                    {MOCK_NOTIFICATIONS.map((notif) => {
                                        const Icon = notif.icon
                                        return (
                                            <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer group border-b border-gray-50 dark:border-gray-900 last:border-0">
                                                <div className="flex gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.color} group-hover:scale-110 transition-transform`}>
                                                        <Icon size={18} />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{notif.title}</p>
                                                        <p className="text-[10px] text-gray-500 font-medium leading-relaxed truncate w-44">{notif.desc}</p>
                                                        <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase tracking-tighter pt-1">
                                                            <Clock size={10} /> {notif.time}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <Link 
                                    href="/vendor/notifications"
                                    onClick={() => setIsNotificationsOpen(false)}
                                    className="p-4 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-blue-600 transition-colors group"
                                >
                                    View All Notifications
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700 relative" ref={userMenuRef}>
                        <button 
                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                            className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-1.5 rounded-2xl transition-all duration-200 group"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 dark:from-blue-700 dark:to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
                                {user?.name?.[0]?.toUpperCase() || "V"}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">{user?.name || "Vendor User"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Store Owner</p>
                            </div>
                        </button>

                        {/* User Dropdown */}
                        {isUserMenuOpen && (
                            <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-[#0A0A0B] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-50 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/20">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Signed in as</p>
                                    <p className="text-xs font-black text-gray-900 dark:text-white truncate">{user?.email || "vendor@readymart.com"}</p>
                                    <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                                        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                                        Verified Vendor
                                    </div>
                                </div>

                                <div className="p-2">
                                    <Link 
                                        href="/vendor/settings"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Settings size={16} />
                                        </div>
                                        Store Settings
                                    </Link>
                                    <Link 
                                        href="/vendor/settings/security"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Shield size={16} />
                                        </div>
                                        Account Security
                                    </Link>
                                    <button 
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <Activity size={16} />
                                        </div>
                                        Activity Logs
                                    </button>
                                </div>

                                <div className="p-2 border-t border-gray-50 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/10">
                                    <button 
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-950 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800 group-hover:bg-red-500 group-hover:text-white transition-all">
                                            <LogOut size={16} />
                                        </div>
                                        Sign Out Portal
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
