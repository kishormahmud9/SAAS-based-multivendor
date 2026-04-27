"use client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { Save, Loader2, RefreshCw, Clock, AlertCircle, FileText, CheckCircle2, History } from "lucide-react"

export default function ReturnsPolicyManager() {
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState({
        returnWindow: "30 Days",
        restockingFee: "0",
        refundMethod: "Original Payment",
        policyText: `
# Returns & Exchanges Policy

We want you to be completely satisfied with your purchase. If you're not, we're here to help.

## 1. Return Window
You have 30 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it.

## 2. Refunds
Once we receive your item, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.

## 3. Shipping Costs
You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.

## 4. Exchanges
If you need to exchange an item for a different size or color, please contact our support team.
        `
    })

    const handleSave = async () => {
        setSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        toast.success("Returns policy updated")
    }

    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-500/20">
                            <RefreshCw size={24} />
                        </div>
                        Returns Controller
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage return windows, restocking fees, and refund procedures.</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-2 shadow-xl shadow-orange-600/20 active:scale-95 disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    Update Policy
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Policy Configuration */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <h3 className="text-xs font-black uppercase tracking-widest text-orange-600 flex items-center gap-2">
                            <AlertCircle size={14} /> Core Policy Settings
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Return window (Days)</label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input 
                                        type="text" 
                                        value={content.returnWindow}
                                        onChange={(e) => setContent({...content, returnWindow: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all font-mono"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Restocking Fee ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 font-bold">$</span>
                                    <input 
                                        type="number" 
                                        value={content.restockingFee}
                                        onChange={(e) => setContent({...content, restockingFee: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-gray-900/50 border-none rounded-2xl py-3.5 pl-10 pr-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Detailed Policy (Markdown)</label>
                             <textarea 
                                value={content.policyText}
                                onChange={(e) => setContent({...content, policyText: e.target.value})}
                                className="w-full bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-3xl py-6 px-6 text-sm leading-relaxed font-mono text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-orange-500 transition-all min-h-[400px] resize-none"
                             />
                        </div>
                    </div>
                </div>

                {/* Workflow & History */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-[#0A0A0B] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden group">
                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2 mb-8">
                             Auto-Approval Workflow
                        </h3>
                        <div className="space-y-3">
                             {[
                                { title: "Condition: Item Unused", status: true },
                                { title: "Condition: Within Window", status: true },
                                { title: "Action: Auto-Label Generation", status: false },
                                { title: "Action: Instant Refund to Wallet", status: false }
                             ].map((step, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl group hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all">
                                    <span className={`text-xs font-bold ${step.status ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.title}</span>
                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.status ? 'bg-emerald-500/20 text-emerald-500' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'}`}>
                                        <CheckCircle2 size={14} />
                                    </div>
                                </div>
                             ))}
                        </div>
                    </div>

                    <div className="p-8 bg-orange-600/5 dark:bg-orange-600/10 rounded-[2rem] border border-orange-100 dark:border-orange-900/20">
                         <div className="flex gap-4">
                             <History className="text-orange-500 flex-shrink-0" size={24} />
                             <div>
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white mb-2 underline underline-offset-4 decoration-orange-200">Legal Compliance</h4>
                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
                                    Your returns policy must comply with consumer protection laws. Changes to this document will be logged for regulatory audits.
                                </p>
                             </div>
                         </div>
                    </div>

                    <div className="relative aspect-video rounded-[2.5rem] bg-gray-950 flex items-center justify-center group overflow-hidden border border-gray-800">
                         <div className="text-center group-hover:scale-110 transition-transform duration-700">
                            <FileText size={48} className="text-orange-500/20 mx-auto" />
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mt-4">Document Preview</p>
                         </div>
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                             <p className="text-xs font-bold text-white mb-1">Live Document v3.4.1</p>
                             <p className="text-[10px] text-gray-400">Published by Kishor Mahmud on March 24, 2026</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
