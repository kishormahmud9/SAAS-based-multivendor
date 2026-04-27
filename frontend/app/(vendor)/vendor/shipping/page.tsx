"use client"

import { useState } from "react"
import { 
    Truck, 
    Plus, 
    MapPin, 
    DollarSign, 
    Clock, 
    ShieldCheck, 
    MoreVertical, 
    Trash2, 
    Edit, 
    ExternalLink,
    Search,
    Globe,
    Package
} from "lucide-react"

const MOCK_ZONES = [
    { id: 1, name: "Dhaka Metro", cost: "$0.00 (Free)", time: "1-2 Days", couriers: ["Pathao", "RedX"], active: true },
    { id: 2, name: "Chittagong City", cost: "$5.00", time: "2-4 Days", couriers: ["Steadfast", "eCourier"], active: true },
    { id: 3, name: "International (USA/Europe)", cost: "$45.00", time: "7-15 Days", couriers: ["DHL", "FedEx"], active: false },
]

export default function ShippingPage() {
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Truck className="text-blue-600" size={32} />
                        Shipping & Logistics
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Configure your delivery zones, charges and partner courier services.</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> Add Shipping Zone
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Shipping Zones */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Active Shipping Zones</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input type="text" placeholder="Search zone..." className="pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {MOCK_ZONES.map((zone) => (
                            <div key={zone.id} className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm group hover:border-blue-500/20 transition-all duration-300 relative overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-center gap-8">
                                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-3xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                                        <MapPin size={32} />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{zone.name}</h4>
                                            <div className={`w-12 h-6 ${zone.active ? 'bg-emerald-500' : 'bg-gray-300'} rounded-full relative p-1 cursor-pointer transition-colors`}>
                                                <div className={`w-4 h-4 bg-white rounded-full absolute ${zone.active ? 'right-1' : 'left-1'} top-1`}></div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Charge</p>
                                                <p className="text-sm font-bold text-emerald-600 flex items-center gap-1"><DollarSign size={14} /> {zone.cost}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estimated Time</p>
                                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1"><Clock size={14} /> {zone.time}</p>
                                            </div>
                                            <div className="space-y-1 col-span-2 md:col-span-1">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Couriers</p>
                                                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1"><Truck size={14} /> {zone.couriers.join(", ")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline flex items-center gap-1">
                                            <Edit size={12} /> Edit Zone
                                        </button>
                                        <button className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline flex items-center gap-1">
                                            <Trash2 size={12} /> Remove
                                        </button>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 italic">
                                        Last modified 2 days ago
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Courier Integration & Global Settings */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                             Logistics Partners
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">Link your account with our courier partners for automated label generation.</p>
                        
                        <div className="space-y-4">
                            {[
                                { name: "DHL Express", logo: "https://www.vectorlogo.zone/logos/dhl/dhl-ar21.svg", connected: true },
                                { name: "FedEx", logo: "https://www.vectorlogo.zone/logos/fedex/fedex-ar21.svg", connected: false },
                                { name: "RedX", logo: "https://redx.com.bd/static/media/logo.8d2f70d5.png", connected: true },
                            ].map(partner => (
                                <div key={partner.name} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center p-2">
                                            <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                                        </div>
                                        <span className="text-xs font-black text-gray-900 dark:text-white">{partner.name}</span>
                                    </div>
                                    {partner.connected ? (
                                        <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                                            <ShieldCheck size={12} /> Connected
                                        </span>
                                    ) : (
                                        <button className="text-[8px] font-black uppercase tracking-widest text-blue-600 hover:underline">Connect</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity" />
                        <div className="relative z-10 space-y-4">
                             <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Globe size={28} />
                             </div>
                             <h4 className="text-xl font-black">Global Shipping</h4>
                             <p className="text-xs opacity-80 font-medium leading-relaxed">Reach customers worldwide. Enable international shipping zones to expand your market footprint.</p>
                             <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                                Enable Now
                             </button>
                        </div>
                    </div>

                    {/* Quick Config */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h4 className="text-lg font-black text-gray-900 dark:text-white">Shipping Rules</h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Free Shipping on All</span>
                                <div className="w-10 h-5 bg-gray-200 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Local Pickup Only</span>
                                <div className="w-10 h-5 bg-gray-200 rounded-full relative p-1 cursor-pointer">
                                    <div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
