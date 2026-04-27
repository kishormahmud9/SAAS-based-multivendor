"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, CreditCard, ShieldCheck, Zap, Globe, Plus, Trash2, Settings2, DollarSign, Wallet } from "lucide-react"

export default function PaymentGatewaySettings() {
    const [saving, setSaving] = useState(false)
    const [methods, setMethods] = useState([
        { id: "stripe", name: "Stripe Connect", status: "Active", type: "Credit/Debit Cards", enabled: true },
        { id: "paypal", name: "PayPal Express", status: "Active", type: "Digital Wallet", enabled: true },
        { id: "cod", name: "Cash on Delivery", status: "Active", type: "Manual", enabled: true }
    ])

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Payment configurations updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                            <CreditCard size={24} />
                        </div>
                        Payment Gateway Orchestrator
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Manage transaction flow, payment methods, and secure checkout configurations.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Sync Gateways
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Active Methods */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {methods.map((method, i) => (
                            <div key={method.id} className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden animate-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-gray-50 dark:bg-gray-950 rounded-2xl flex items-center justify-center text-blue-600 border border-gray-100 dark:border-gray-800 shadow-sm group-hover:scale-110 transition-transform">
                                        <Wallet size={24} />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${method.enabled ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                        {method.status}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{method.name}</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">{method.type}</p>
                                
                                <div className="flex items-center gap-3 pt-6 border-t border-gray-50 dark:border-gray-900">
                                     <button className="flex-1 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                        <Settings2 size={14} /> Configure
                                     </button>
                                     <button className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}

                        <button className="bg-dashed-gray dark:bg-dashed-dark rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 p-10 flex flex-col items-center justify-center text-center group hover:border-blue-500/50 transition-all duration-500">
                             <div className="w-14 h-14 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                <Plus size={24} />
                             </div>
                             <h4 className="mt-4 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-500">Add Payment Method</h4>
                        </button>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-emerald-500" /> Security Standards
                            </h3>
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">PCI-DSS Level 1</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                             {[
                                { title: "SSL Encryption", value: "256-bit AES", status: "Active" },
                                { title: "Fraud Protection", value: "Sift Integrated", status: "Active" },
                                { title: "3D Secure", value: "v2.0 Protocol", status: "Enforced" }
                             ].map((sec, i) => (
                                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
                                     <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{sec.title}</p>
                                     <p className="text-xs font-bold text-gray-900 dark:text-white">{sec.value}</p>
                                     <div className="mt-3 flex items-center gap-1.5 text-[9px] font-black text-emerald-500 uppercase tracking-tighter shadow-sm">
                                         <div className="w-1 h-1 rounded-full bg-emerald-500"></div> {sec.status}
                                     </div>
                                </div>
                             ))}
                        </div>
                    </div>
                </div>

                {/* Flow Controls */}
                <div className="space-y-6">
                    <div className="p-8 bg-blue-900/5 dark:bg-blue-950/20 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 mb-6 px-1">
                            <Globe size={14} /> Global Rules
                        </h3>
                        <div className="space-y-5">
                             <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Daily Payout Limit</label>
                                <div className="relative">
                                     <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                     <input type="number" defaultValue="50000" className="w-full bg-white dark:bg-gray-950 border-none rounded-2xl py-3.5 pl-10 pr-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all font-mono shadow-sm" />
                                </div>
                             </div>
                             <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Multi-Currency</span>
                                    <div className="w-8 h-4 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Auto-Refunds</span>
                                    <div className="w-8 h-4 bg-gray-300 dark:bg-gray-800 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-950/20 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                             <Zap size={100} />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-300 mb-4 px-1">Real-time Insights</h3>
                        <div className="text-4xl font-black mb-1">98.2%</div>
                        <p className="text-[10px] font-bold text-blue-200/50 uppercase tracking-widest">Auth Success Rate</p>
                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-end">
                             <div>
                                <p className="text-[9px] font-black text-blue-300 uppercase underline underline-offset-4 decoration-blue-500/50 cursor-pointer">View Incident Logs</p>
                             </div>
                             <div className="flex gap-1.5 h-8 items-end">
                                 {[2,4,3,6,8,5,7,9,4,6].map((h, i) => <div key={i} className="w-1 bg-blue-500/40 rounded-full hover:bg-blue-400 transition-colors" style={{ height: `${h * 10}%` }}></div>)}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
