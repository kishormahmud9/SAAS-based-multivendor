"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Truck, Globe, Clock, Package, Eye, ShieldCheck } from "lucide-react"

export default function ShippingPolicyManager() {
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState({
        title: "Shipping & Delivery Policy",
        standardDays: "3-5 Business Days",
        expressDays: "1-2 Business Days",
        freeShippingThreshold: "99",
        policyText: `
# Shipping & Delivery Guidelines

Our goal is to offer you the best shipping options, no matter where you live. Every day, we deliver to hundreds of customers across the world, ensuring that we provide the very highest levels of responsiveness to you at all times.

## 1. Shipping Rates
- **Standard Shipping:** $9.99 (Free on orders over $99)
- **Express Shipping:** $19.99

## 2. Order Processing
Orders are processed within 1-2 business days. You will receive a notification once your order has shipped.

## 3. Tracking
All orders include tracking. Once shipped, a tracking number will be sent to your email.
        `
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Shipping policy updated successfully")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                            <Truck size={20} />
                        </div>
                        Shipping Logic Manager
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">Configure shipping rates, delivery times, and policy details.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Sync Logistics
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Free Shipping Threshold ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">$</span>
                                    <input 
                                        type="number" 
                                        value={content.freeShippingThreshold}
                                        onChange={(e) => setContent({...content, freeShippingThreshold: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Standard Delivery Time</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input 
                                        type="text" 
                                        value={content.standardDays}
                                        onChange={(e) => setContent({...content, standardDays: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Detailed Shipping Policy (Markdown)</label>
                            <textarea 
                                value={content.policyText}
                                onChange={(e) => setContent({...content, policyText: e.target.value})}
                                className="w-full bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-3xl py-6 px-6 text-sm leading-relaxed font-mono text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-600 transition-all min-h-[400px] resize-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-blue-900/5 dark:bg-blue-600/5 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:scale-125 transition-transform duration-1000">
                             <Package size={120} />
                        </div>
                        <h3 className="text-blue-900 dark:text-blue-400 font-black text-xs uppercase tracking-widest mb-4">Total Shipments (30D)</h3>
                        <div className="text-4xl font-black text-blue-900 dark:text-white mb-2">1,284</div>
                        <p className="text-[10px] font-bold text-blue-800/50 dark:text-blue-400/50 tracking-widest uppercase">+12% vs last month</p>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-6">
                             Courier Partners
                        </h3>
                        <div className="space-y-4">
                            {["FedEx Express", "DHL Global", "UPS Logistics"].map(partner => (
                                <div key={partner} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                    <div className="w-8 h-8 bg-white dark:bg-gray-950 rounded-lg flex items-center justify-center text-blue-600">
                                        <Globe size={16} />
                                    </div>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{partner}</span>
                                    <span className="ml-auto text-[10px] bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 font-black tracking-tighter px-1.5 py-0.5 rounded uppercase">Active</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                         <div className="flex gap-4">
                            <ShieldCheck className="text-emerald-500 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1">Insurance Sync</h4>
                                <p className="text-[10px] font-bold text-gray-500 leading-tight">All international shipments are automatically insured up to $500.</p>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
