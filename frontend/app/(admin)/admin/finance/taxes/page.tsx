"use client"

import { useState } from "react"
import { 
    FileText, 
    Plus, 
    Globe, 
    Percent, 
    ShieldCheck, 
    Settings2, 
    ToggleLeft, 
    ToggleRight, 
    Download, 
    Edit3, 
    Trash2, 
    Search, 
    Save, 
    Loader2 
} from "lucide-react"

interface TaxRule {
    id: string
    country: string
    code: string
    rate: number
    type: 'VAT' | 'GST' | 'SALES_TAX'
    status: 'ACTIVE' | 'INACTIVE'
}

const mockTaxes: TaxRule[] = [
    { id: "1", country: "United Kingdom", code: "UK-VAT", rate: 20, type: 'VAT', status: 'ACTIVE' },
    { id: "2", country: "United States", code: "US-GST", rate: 7.5, type: 'GST', status: 'ACTIVE' },
    { id: "3", country: "India", code: "IN-GST", rate: 18, type: 'GST', status: 'ACTIVE' },
    { id: "4", country: "Germany", code: "DE-VAT", rate: 19, type: 'VAT', status: 'ACTIVE' },
]

export default function TaxManagementPage() {
    const [taxes, setTaxes] = useState<TaxRule[]>(mockTaxes)
    const [inclusive, setInclusive] = useState(true)
    const [saving, setSaving] = useState(false)

    const handleToggle = (id: string) => {
        setTaxes(taxes.map(t => t.id === id ? { ...t, status: t.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : t))
    }

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <Percent className="text-purple-600" size={32} />
                        Global Tax Logic
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Configure multi-regional tax compliance, VAT/GST rules, and invoice settings.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                        <Download size={18} /> Tax Reports
                    </button>
                    <button className="bg-purple-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-600/20 hover:bg-purple-700 transition-all active:scale-95 flex items-center gap-2">
                        <Plus size={18} /> New Tax Slab
                    </button>
                </div>
            </div>

            {/* Quick Settings Banner */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-blue-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <Settings2 size={200} />
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <ShieldCheck className="text-purple-400" />
                            Tax Calculation Engine
                        </h3>
                        <p className="text-purple-100/70 text-lg max-w-2xl font-medium leading-relaxed">
                            Define how taxes are applied during checkout. You can choose between price-inclusive or exclusive modes globally.
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] flex flex-col gap-4 min-w-[300px]">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-widest text-purple-200">Inclusive Pricing</span>
                            <button 
                                onClick={() => setInclusive(!inclusive)}
                                className="text-purple-400 hover:text-white transition-colors"
                            >
                                {inclusive ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                            </button>
                        </div>
                        <p className="text-[10px] text-purple-100/50 font-bold leading-tight">If enabled, the listed price already includes the applicable tax rate for that region.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tax Table (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-fit">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Regional Tax Rules</h3>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search country..." 
                                    className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold focus:ring-2 focus:ring-purple-600 w-48"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Country / Region</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Tax Type</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Rate (%)</th>
                                        <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {taxes.map((t) => (
                                        <tr key={t.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-xl flex items-center justify-center font-black">
                                                        <Globe size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-gray-900 dark:text-white leading-none mb-1">{t.country}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.code}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className="text-[10px] font-black bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg text-gray-500 uppercase tracking-widest">{t.type}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center font-black text-lg text-gray-900 dark:text-white">
                                                {t.rate}%
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <button onClick={() => handleToggle(t.id)} className={`w-10 h-5 rounded-full relative transition-colors ${t.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-800'}`}>
                                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${t.status === 'ACTIVE' ? 'right-0.5' : 'left-0.5'}`} />
                                                </button>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                                                    <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right: Invoice Settings */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8 h-fit">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl flex items-center justify-center">
                                <FileText size={20} />
                             </div>
                             <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Invoice Labeling</h3>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-2 px-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Default Tax Display Name</label>
                                <input 
                                    type="text" 
                                    defaultValue="VAT/GST"
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all"
                                />
                            </div>
                            <div className="space-y-2 px-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tax Identification Number</label>
                                <input 
                                    type="text" 
                                    placeholder="RT-9920-881"
                                    className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 px-4 text-xs font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 transition-all font-mono"
                                />
                            </div>
                            <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                                <p className="text-[10px] font-bold text-blue-800 dark:text-blue-400 leading-relaxed">
                                    Invoices are generated automatically for every order. These details will appear in the "Tax Summary" section of the PDF.
                                </p>
                            </div>
                            <button 
                                onClick={() => {
                                    setSaving(true)
                                    setTimeout(() => setSaving(false), 1500)
                                }}
                                className="w-full bg-gray-900 dark:bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                Save Global Rules
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
