"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Bell, Mail, MessageSquare, Smartphone, CheckCircle2, AlertCircle, Settings2, Zap } from "lucide-react"

export default function NotificationSettings() {
    const [saving, setSaving] = useState(false)
    const [channels, setChannels] = useState([
        { id: "email", name: "Email Notifications", icon: Mail, enabled: true, desc: "Order updates, marketing, and security alerts via SMTP/SendGrid." },
        { id: "sms", name: "SMS Alerts", icon: MessageSquare, enabled: false, desc: "Instant order tracking and OTP via Twilio/Vonage integration." },
        { id: "push", name: "Web Push", icon: Smartphone, enabled: true, desc: "Real-time browser notifications for promotions and abandoned carts." }
    ])

    const toggleChannel = (id: string) => {
        setChannels(channels.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))
    }

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Notification preferences updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                            <Bell size={24} />
                        </div>
                        Notification Control Hub
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Configure how your system communicates with customers and staff.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-amber-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-700 transition-all flex items-center gap-2 shadow-xl shadow-amber-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Sync Channels
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Channel List */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {channels.map((channel, i) => {
                            const Icon = channel.icon
                            return (
                                <div key={channel.id} className={`bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden animate-in zoom-in-95 duration-500`} style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${channel.enabled ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-gray-100 dark:bg-gray-900 text-gray-400'}`}>
                                            <Icon size={24} />
                                        </div>
                                        <button 
                                            onClick={() => toggleChannel(channel.id)}
                                            className={`w-12 h-6 rounded-full relative transition-colors ${channel.enabled ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-800'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${channel.enabled ? 'right-1' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{channel.name}</h3>
                                    <p className="text-xs text-gray-500 font-medium leading-relaxed">{channel.desc}</p>
                                    
                                    <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-900 flex justify-between items-center">
                                        <button className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 hover:underline">
                                           <Settings2 size={12} /> Configure Provider
                                        </button>
                                        <Zap size={14} className={channel.enabled ? 'text-amber-500 animate-pulse' : 'text-gray-300'} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8 px-1">Trigger Logic Management</h3>
                        <div className="space-y-4">
                             {[
                                { event: "New Order Placement", notify: "Staff + Customer", type: "Priority" },
                                { event: "Stock Critical Level", notify: "Inventory Manager", type: "High" },
                                { event: "Customer Birthday", notify: "Customer (Automated)", type: "Marketing" }
                             ].map((evt, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-50 dark:bg-gray-900 rounded-[1.5rem] border border-transparent hover:border-amber-100 dark:hover:border-amber-900/30 transition-all group">
                                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                        <div className="w-10 h-10 bg-white dark:bg-gray-950 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 dark:text-white">{evt.event}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{evt.notify}</p>
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-900/30">{evt.type}</span>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Metrics */}
                <div className="space-y-6">
                    <div className="p-8 bg-amber-900/5 dark:bg-amber-950/20 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/30">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-500 flex items-center gap-2 mb-4">
                            <AlertCircle size={14} /> System Health
                        </p>
                        <div className="space-y-4">
                             <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">SMTP Server</span>
                                <span className="text-xs font-black text-emerald-500 uppercase tracking-tighter shadow-sm flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Connected</span>
                             </div>
                             <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-500">Twilio API</span>
                                <span className="text-xs font-black text-red-500 uppercase tracking-tighter flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Failed (401)</span>
                             </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-amber-600/20 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                             <Bell size={120} />
                         </div>
                         <h4 className="text-3xl font-black relative z-10">4.5k</h4>
                         <p className="text-xs font-bold text-amber-100/70 relative z-10 uppercase tracking-widest">Delivered (24H)</p>
                         <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Peak Delivery Hour</p>
                              <p className="text-sm font-bold">10:00 AM - 11:30 AM</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
