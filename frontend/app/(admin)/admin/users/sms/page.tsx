"use client"

import { useState } from "react"
import { 
    MessageCircle, 
    Plus, 
    Search, 
    Send, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    MoreHorizontal,
    Smartphone,
    CreditCard,
    AlertCircle,
    ArrowRight,
    Users,
    Zap,
    ChevronRight,
    MousePointer2,
    Calendar
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface SMSCampaign {
    id: string
    name: string
    message: string
    recipients: number
    status: "delivered" | "failed" | "pending" | "sending"
    date: string
    deliveryRate: number
}

const mockSMS: SMSCampaign[] = [
    { id: "1", name: "Flash Sale Alert", message: "ReadyMart: Flash Sale is LIVE! Get 20% off on smartphones. Shop now: bit.ly/rm-sale", recipients: 4500, status: "delivered", date: "2024-03-22", deliveryRate: 98.4 },
    { id: "2", name: "Order Confirmation", message: "Your order #9921 has been confirmed! We will notify you once shipped. Thanks for shopping.", recipients: 120, status: "delivered", date: "2024-03-24", deliveryRate: 100 },
    { id: "3", name: "Weekend Promo", message: "Stay stylish! New arrivals in men's fashion. Use code WEEKEND10 for extra discount.", recipients: 2800, status: "sending", date: "Ongoing", deliveryRate: 45.2 },
    { id: "4", name: "Cart Recovery", message: "Wait! You forgot something. Complete your purchase now and get free shipping.", recipients: 85, status: "pending", date: "Scheduled", deliveryRate: 0 },
    { id: "5", name: "OTP Verification", message: "Your ReadyMart verification code is: 458921. Valid for 10 minutes.", recipients: 1, status: "delivered", date: "2024-03-24", deliveryRate: 100 },
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function SMSMarketingPage() {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <MessageCircle size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            SMS Marketing
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Reach your customers instantly with bulk SMS and automated alerts.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all active:scale-95 group">
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    <span>Send Bulk SMS</span>
                </button>
            </div>

            {/* Quick Stats & Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <CreditCard size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Current SMS Credits</p>
                            <h3 className="text-5xl font-black mb-2">42,850 <span className="text-xl text-gray-400">/ 50k</span></h3>
                            <p className="text-gray-400 font-medium">Auto-renew enabled: <span className="text-white">BDT 500 / 10k Credits</span></p>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <button className="bg-emerald-600 text-white font-black px-6 py-3 rounded-2xl hover:bg-emerald-700 transition-all text-xs flex items-center gap-2">
                                <Plus size={16} /> Top-up Balance
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 text-white font-black px-6 py-3 rounded-2xl transition-all text-xs flex items-center gap-2 border border-white/10">
                                <AlertCircle size={16} /> Pricing Plans
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center gap-2">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
                        <CheckCircle2 size={24} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Delivered</p>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">124.2k</h3>
                    <p className="text-[10px] text-emerald-600 font-black">+12% this month</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col justify-center gap-2">
                    <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-2xl flex items-center justify-center mb-2">
                        <XCircle size={24} />
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Failed Reports</p>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white">0.42%</h3>
                    <p className="text-[10px] text-gray-400 font-black">Within industry standard</p>
                </div>
            </div>

            {/* Campaign History */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                        <Smartphone size={20} className="text-emerald-600" />
                        Messaging Logs
                    </h3>
                    <div className="relative w-full md:w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                         <input 
                            type="text" 
                            placeholder="Find logs..." 
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500"
                         />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Campaign / Message Content</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Recipients</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Delivery</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                            {mockSMS.map((camp) => (
                                <tr key={camp.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-all">
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="font-extrabold text-gray-900 dark:text-white leading-tight mb-1">{camp.name}</p>
                                            <p className="text-xs text-gray-400 font-medium line-clamp-1 truncate max-w-[250px] italic">"{camp.message}"</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
                                            <Users size={14} className="text-emerald-500" />
                                            {camp.recipients > 1 ? `${camp.recipients.toLocaleString()} Users` : 'Single User'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500" style={{ width: `${camp.deliveryRate}%` }}></div>
                                            </div>
                                            <span className="text-xs font-black text-gray-900 dark:text-white">{camp.deliveryRate}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 font-medium text-sm text-gray-600 dark:text-gray-300">
                                        {camp.status === "delivered" ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full w-fit">
                                                <CheckCircle2 size={12} /> {camp.date}
                                            </div>
                                        ) : camp.status === "pending" ? (
                                            <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                                                <Clock size={12} /> {camp.date}
                                            </div>
                                        ) : camp.status === "sending" ? (
                                            <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full w-fit animate-pulse">
                                                <Zap size={12} /> Sending...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-rose-600 font-bold text-xs bg-rose-50 dark:bg-rose-900/20 px-3 py-1 rounded-full w-fit">
                                                <XCircle size={12} /> Failed
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                                            <button title="Retry" className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-xl transition-all"><Zap size={18} /></button>
                                            <button title="Logs" className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all"><MoreHorizontal size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Template Card Suggestion */}
            <div className="bg-emerald-900 text-white rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Smartphone size={120} />
                </div>
                <div className="relative z-10 flex items-center gap-6 text-center md:text-left">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 border border-white/20">
                        <Zap size={32} className="text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black mb-1 leading-tight">SMS Templates Gallery</h3>
                        <p className="text-emerald-100 text-lg opacity-80 max-w-lg font-medium">Drive more sales with our <span className="text-white font-bold">pre-written SMS templates</span> for discounts and cart recovery.</p>
                    </div>
                </div>
                <button className="relative z-10 bg-white text-emerald-900 font-black px-8 py-4 rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    Setup Automation <ChevronRight size={20} />
                </button>
            </div>

        </div>
    )
}
