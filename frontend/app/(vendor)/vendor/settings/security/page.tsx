"use client"

import { useState } from "react"
import Link from "next/link"
import { 
    Shield, 
    Key, 
    Smartphone, 
    History, 
    Monitor, 
    Smartphone as MobileIcon, 
    ChevronLeft, 
    Lock, 
    Eye, 
    EyeOff,
    CheckCircle2,
    AlertTriangle,
    X,
    LogOut
} from "lucide-react"

const MOCK_SESSIONS = [
    { id: 1, device: "MacBook Pro 16\"", location: "Dhaka, Bangladesh", time: "Active now", icon: Monitor, current: true },
    { id: 2, device: "iPhone 15 Pro", location: "Dhaka, Bangladesh", time: "2 hours ago", icon: MobileIcon, current: false },
    { id: 3, device: "Windows Desktop", location: "Chittagong, Bangladesh", time: "Yesterday", icon: Monitor, current: false },
]

export default function SecuritySettingsPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/vendor/settings" className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors shadow-sm">
                    <ChevronLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Security Settings</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Protect your account with password management and 2FA.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                
                {/* Left: Password & 2FA */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* Password Change */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                                <Key size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Change Password</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Current Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type={showPassword ? "text" : "password"} className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">New Password</label>
                                    <input type="password" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Confirm Password</label>
                                    <input type="password" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                                </div>
                            </div>
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/30 transition-all">Update Password</button>
                        </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <Smartphone size={24} />
                                    </div>
                                    <h3 className="text-xl font-black">Two-Factor Auth</h3>
                                </div>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">Recommended</span>
                            </div>
                            <p className="text-sm opacity-80 font-medium leading-relaxed">Add an extra layer of security to your account. When enabled, you'll need to provide a code from your phone to login.</p>
                            <div className="pt-4">
                                <button className="px-8 py-3 bg-white text-blue-600 rounded-2xl text-sm font-black shadow-xl hover:scale-105 transition-all">Enable 2FA Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Sessions & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Active Sessions */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                                <History className="text-blue-500" size={20} />
                                Active Sessions
                            </h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline">Logout All</button>
                        </div>

                        <div className="space-y-4">
                            {MOCK_SESSIONS.map((session) => (
                                <div key={session.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-start gap-4 group">
                                    <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 shadow-sm transition-all">
                                        <session.icon size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs font-black text-gray-900 dark:text-white truncate">{session.device}</h4>
                                            {session.current && <span className="text-[8px] font-black uppercase text-emerald-500">Current</span>}
                                        </div>
                                        <p className="text-[10px] text-gray-500 font-bold mt-0.5">{session.location}</p>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">{session.time}</p>
                                    </div>
                                    {!session.current && (
                                        <button className="p-1.5 text-gray-300 hover:text-red-500 transition-colors">
                                            <LogOut size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Security Alerts */}
                    <div className="bg-orange-50 dark:bg-orange-900/10 rounded-[2.5rem] p-8 border border-orange-100 dark:border-orange-800/50 space-y-4">
                         <div className="flex items-center gap-2 text-orange-600">
                            <AlertTriangle size={20} />
                            <h4 className="text-sm font-black uppercase tracking-widest">Security Alert</h4>
                         </div>
                         <p className="text-xs text-orange-700/70 dark:text-orange-300/70 font-medium leading-relaxed">Your password hasn't been changed in <span className="font-black">6 months</span>. We recommend updating it for better account protection.</p>
                         <button className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:underline">Dismiss Alert</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
