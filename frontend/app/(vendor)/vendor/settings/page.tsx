"use client"

import { useState } from "react"
import {
    User,
    Mail,
    Phone,
    Globe,
    Camera,
    Check,
    Bell,
    Languages,
    Moon,
    Sun,
    ExternalLink,
    Shield
} from "lucide-react"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ProfileSettingsPage() {
    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <User className="text-blue-600" size={32} />
                        Profile Settings
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Manage your personal information and account preferences.</p>
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105">
                    Save Changes
                </button>
            </div>

            {/* Profile Picture Section */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-950 shadow-2xl overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera size={24} className="text-white" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">John Doe</h3>
                        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Verified Vendor since 2024</p>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20">Change Photo</button>
                        <button className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest">Remove</button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Personal Information</h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" defaultValue="John Doe" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="email" defaultValue="john@readymart.com" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" defaultValue="+1 (555) 000-0000" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Account Preferences */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Preferences</h3>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Language</label>
                            <div className="relative">
                                <Languages className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <select className="w-full pl-12 pr-10 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none appearance-none cursor-pointer">
                                    <option>English (US)</option>
                                    <option>Spanish (ES)</option>
                                    <option>Bengali (BN)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-800">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                        <Bell size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Email Notifications</span>
                                </div>
                                <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600">
                                        <Globe size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Public Profile Visible</span>
                                </div>
                                <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col md:flex-row gap-4">
                <Link href="/vendor/settings/security" className="flex-1 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center text-blue-600 shadow-sm">
                            <Shield size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white">Security Settings</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Password, 2FA & Sessions</p>
                        </div>
                    </div>
                    <ExternalLink size={20} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                </Link>
                <Link href="/vendor/verification" className="flex-1 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-900 flex items-center justify-center text-emerald-600 shadow-sm">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white">Account Status</h4>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Verified Vendor</p>
                        </div>
                    </div>
                    <ExternalLink size={20} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                </Link>
            </div>

        </div>
    )
}



