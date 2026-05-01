"use client"

import { useState } from "react"
import Image from "next/image"
import { 
    Store, 
    Upload, 
    Image as ImageIcon, 
    MapPin, 
    Phone, 
    Mail, 
    Globe, 
    Facebook, 
    Instagram, 
    Twitter, 
    Clock,
    Camera,
    CheckCircle,
    Info
} from "lucide-react"

export default function StoreSettingsPage() {
    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Store className="text-blue-600" size={32} />
                        Store Settings
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Configure your public store profile, branding and contact information.</p>
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105">
                    Save Changes
                </button>
            </div>

            {/* Visual Branding Section */}
            <div className="space-y-6">
                <div className="relative group">
                    <div className="w-full h-64 rounded-[2.5rem] bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 overflow-hidden relative">
                        <Image 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop" 
                            alt="Store Banner"
                            fill
                            unoptimized
                            className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" 
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all">
                                <Camera size={18} /> Change Banner
                            </button>
                        </div>
                    </div>

                    {/* Logo Overlay */}
                    <div className="absolute -bottom-10 left-10 group/logo">
                        <div className="w-32 h-32 rounded-3xl bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 shadow-2xl overflow-hidden relative">
                            <Image 
                                src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?w=200&h=200&fit=crop" 
                                alt="Store Logo"
                                fill
                                unoptimized
                                className="object-cover" 
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity cursor-pointer">
                                <Camera size={20} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-10" /> {/* Spacer for logo offset */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: General Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                            Basic Store Info
                        </h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Store Name</label>
                                <input 
                                    type="text" 
                                    defaultValue="ReadyMart Tech Store"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Store Description</label>
                                <textarea 
                                    rows={4}
                                    defaultValue="Your premium destination for high-quality electronics, gadgets and tech accessories. We provide top-notch customer service and fast delivery."
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Contact Email</label>
                                    <input 
                                        type="email" 
                                        defaultValue="store@readymart.com"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                                    <input 
                                        type="text" 
                                        defaultValue="+880 1700 000 000"
                                        className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Store Address */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                             Business Address
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Address</label>
                                <textarea 
                                    rows={2}
                                    defaultValue="House 12, Road 5, Sector 3, Uttara, Dhaka-1230, Bangladesh"
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">City</label>
                                    <input type="text" defaultValue="Dhaka" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium" />
                                </div>
                                <div>
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Zip Code</label>
                                    <input type="text" defaultValue="1230" className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white font-medium" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Social & Hours */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Social Links</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                                <input type="text" placeholder="Facebook URL" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-medium" />
                            </div>
                            <div className="relative">
                                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600" size={18} />
                                <input type="text" placeholder="Instagram URL" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-medium" />
                            </div>
                            <div className="relative">
                                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" size={18} />
                                <input type="text" placeholder="Twitter URL" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-medium" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <Clock className="text-blue-500" size={20} />
                            Opening Hours
                        </h3>
                        <div className="space-y-3">
                            {[
                                { day: "Mon - Fri", hours: "09:00 AM - 08:00 PM" },
                                { day: "Saturday", hours: "10:00 AM - 06:00 PM" },
                                { day: "Sunday", hours: "Closed", closed: true },
                            ].map(h => (
                                <div key={h.day} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                    <span className="text-xs font-bold text-gray-500">{h.day}</span>
                                    <span className={`text-xs font-black ${h.closed ? "text-red-500" : "text-gray-900 dark:text-white"}`}>{h.hours}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                             Manage Holiday Mode
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
