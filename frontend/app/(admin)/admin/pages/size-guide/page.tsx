"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, Ruler, Layout, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react"

export default function SizeGuideManager() {
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState("Men")
    const [guides, setGuides] = useState([
        { id: "1", category: "Men", type: "Tops", unit: "cm", rows: [
            { size: "S", chest: "88-96", waist: "73-81" },
            { size: "M", chest: "96-104", waist: "81-89" },
            { size: "L", chest: "104-112", waist: "89-97" }
        ]},
        { id: "2", category: "Women", type: "Dresses", unit: "cm", rows: [
            { size: "XS", bust: "78-82", waist: "60-64" },
            { size: "S", bust: "82-86", waist: "64-68" },
            { size: "M", bust: "86-90", waist: "68-72" }
        ]}
    ])

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Size charts updated")
    }

    const currentGuide = guides.find(g => g.category === activeTab)

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                     <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Ruler size={20} />
                        </div>
                        Size Chart Architect
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">Design and manage size guides for your product categories.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-indigo-600 text-white px-8 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Sync Measurement Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Navigation */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 px-1">Categories</h3>
                        <div className="space-y-2">
                            {["Men", "Women", "Kids", "Accessories"].map(cat => (
                                <button 
                                    key={cat} 
                                    onClick={() => setActiveTab(cat)}
                                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'}`}
                                >
                                    <span>{cat}</span>
                                    {activeTab === cat && <CheckCircle2 size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-amber-500/10 dark:bg-amber-500/5 rounded-3xl border border-amber-500/10">
                         <div className="flex gap-4">
                            <AlertCircle className="text-amber-500 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1">Expert Tip</h4>
                                <p className="text-[10px] font-bold text-gray-500 leading-tight">Accurate size guides can reduce product returns by up to 25%.</p>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Editor */}
                <div className="lg:col-span-3 space-y-6">
                    {currentGuide ? (
                        <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm animate-in fade-in zoom-in-95 duration-500">
                             <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-1">Configuration</p>
                                    <h3 className="text-xl font-bold dark:text-white">{currentGuide.category} - {currentGuide.type} Guide</h3>
                                </div>
                                <div className="flex gap-2">
                                     <button className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                     <button className="px-5 py-3 bg-gray-50 dark:bg-gray-900 rounded-2xl text-[10px] font-black tracking-widest uppercase text-gray-600 dark:text-gray-300 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <Plus size={14} /> Add Row
                                     </button>
                                </div>
                             </div>

                             <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800">
                                            <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Size Code</th>
                                            <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Chest / Bust</th>
                                            <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-gray-400 px-4">Waist (cm)</th>
                                            <th className="pb-4 text-right"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100/50 dark:divide-gray-800/50">
                                        {currentGuide.rows.map((row: any, i) => (
                                            <tr key={i} className="group hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                                                <td className="py-5 px-4"><input value={row.size} readOnly className="bg-transparent border-none text-sm font-black p-0 focus:ring-0 w-16" /></td>
                                                <td className="py-5 px-4"><input value={row.chest || row.bust || ""} readOnly className="bg-transparent border-none text-sm font-bold text-gray-600 p-0 focus:ring-0 w-24" /></td>
                                                <td className="py-5 px-4"><input value={row.waist} readOnly className="bg-transparent border-none text-sm font-bold text-gray-600 p-0 focus:ring-0 w-24" /></td>
                                                <td className="py-5 text-right px-4 opacity-0 group-hover:opacity-100 transition-opacity"><button className="text-red-400 hover:text-red-500"><Trash2 size={14} /></button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    ) : (
                        <div className="bg-dashed-gray dark:bg-dashed-dark rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center opacity-40">
                             <Layout size={48} className="text-gray-400 mb-6" />
                             <h4 className="text-lg font-bold text-gray-500">No Guide Active</h4>
                             <p className="text-sm text-gray-400 max-w-sm mt-2">Select a category from the sidebar or create a new template to begin designing your size guide.</p>
                             <button className="mt-8 px-8 py-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300">Create New Template</button>
                        </div>
                    )}

                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                         <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                                <Layout size={32} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-1 leading-tight">Visual Preview System</h3>
                                <p className="text-[10px] font-bold text-gray-500 leading-relaxed mb-4">Click below to see how this chart appears in the product description modal on the mobile app.</p>
                                <button className="px-6 py-2 bg-gray-900 text-white dark:bg-white dark:text-black rounded-full font-black text-[9px] uppercase tracking-widest hover:opacity-80 transition-opacity">Launch Previewer</button>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
