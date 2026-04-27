"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Truck, Map, Globe, ShieldCheck, Plus, Trash2, Settings2, Package, Clock } from "lucide-react"

export default function LogisticsSettings() {
    const [saving, setSaving] = useState(false)
    const [zones, setZones] = useState([
        { id: "1", name: "Domestic (USA)", countries: "USA", rate: "$9.99", type: "Standard", status: "Active" },
        { id: "2", name: "European Union", countries: "EU Countries", rate: "$19.99", type: "International", status: "Active" },
        { id: "3", name: "Dhaka Metro", countries: "Bangladesh", rate: "৳ 60", type: "Local", status: "Active" }
    ])

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Logistics & Tax rules updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                            <Truck size={24} />
                        </div>
                        Shipping & Logistics Engine
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Configure shipping zones, tax rates, and fulfillment rules for global deliveries.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Apply Logistics
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Shipping Zones */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
                             <Map size={150} />
                        </div>
                        
                        <div className="flex justify-between items-center mb-8 relative z-10">
                            <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                <Globe size={14} /> Global Shipping Zones
                            </h3>
                            <button className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-blue-100 transition-colors">
                                <Plus size={14} /> Create Zone
                            </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {zones.map((zone, i) => (
                                <div key={zone.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-gray-50 dark:bg-gray-900 rounded-[2rem] group hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <div className="w-12 h-12 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                            <Map size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">{zone.name}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{zone.countries}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Base Rate</p>
                                             <p className="text-xs font-bold text-gray-900 dark:text-white">{zone.rate}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-3 bg-white dark:bg-gray-950 rounded-xl text-gray-400 hover:text-blue-600 transition-colors shadow-sm"><Settings2 size={16} /></button>
                                            <button className="p-3 bg-white dark:bg-gray-950 rounded-xl text-gray-400 hover:text-red-500 transition-colors shadow-sm"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                                    <ShieldCheck size={14} className="text-emerald-500" /> Tax Compliance
                                </h3>
                                <div className="space-y-4">
                                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Auto-calculate VAT</span>
                                         <div className="w-8 h-4 bg-emerald-500 rounded-full relative shadow-sm shadow-emerald-500/50"><div className="absolute right-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                                     </div>
                                     <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tax-Inclusive Prices</span>
                                         <div className="w-8 h-4 bg-gray-300 dark:bg-gray-800 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div></div>
                                     </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-2">
                                    <Package size={14} className="text-blue-500" /> Fulfillment Logic
                                </h3>
                                <div className="space-y-4">
                                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Stock Deduct Point</p>
                                          <select className="w-full bg-transparent border-none p-0 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-0">
                                              <option>On Order Placement</option>
                                              <option>On Payment Success</option>
                                              <option>On Fulfillment</option>
                                          </select>
                                      </div>
                                      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Weight Unit</p>
                                          <select className="w-full bg-transparent border-none p-0 text-xs font-bold text-gray-900 dark:text-white outline-none focus:ring-0">
                                              <option>Kilograms (kg)</option>
                                              <option>Pounds (lbs)</option>
                                          </select>
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                   <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                             <Truck size={120} />
                        </div>
                        <h4 className="text-3xl font-black relative z-10">14</h4>
                        <p className="text-xs font-bold text-blue-100/70 relative z-10 uppercase tracking-widest">Active Zones</p>
                        <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                              <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">Most Used Partner</p>
                              <p className="text-sm font-bold">DHL Express Global</p>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-900/5 dark:bg-blue-950/20 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30">
                         <div className="text-center">
                             <div className="w-16 h-16 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-900/50 shadow-sm group hover:rotate-12 transition-transform duration-500">
                                <Clock size={24} className="text-blue-600" />
                             </div>
                             <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2">Carrier Sync</h4>
                             <p className="text-[10px] text-gray-400 font-bold leading-relaxed">Tracking data is refreshed every 15 minutes across all active carriers worldwide.</p>
                             <div className="mt-6 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                 <div className="h-full w-2/3 bg-blue-500 animate-pulse"></div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
