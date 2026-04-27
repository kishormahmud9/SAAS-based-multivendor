"use client"

import FeatureHighlightSettings from "@/components/admin/ui-settings/FeatureHighlightSettings"
import { Sparkles, Zap } from "lucide-react"

export default function InnovationPage() {
    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                    <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
                        <Sparkles size={24} />
                    </div>
                    Innovation in Comfort
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium font-mono uppercase tracking-widest text-[10px]">{"//"} Feature Highlight Module</p>
            </div>

            <div className="bg-white dark:bg-[#0A0A0B] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden relative group">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:rotate-6 transition-transform duration-700">
                    <Zap size={140} />
                </div>
                <div className="relative z-10">
                    <FeatureHighlightSettings />
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600">
                        <Zap size={20} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Live Feedback</h4>
                        <p className="text-[10px] text-gray-400 font-bold">Changes reflect instantly on Home Page.</p>
                    </div>
                </div>
                <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/10 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/20 flex items-center gap-4">
                     <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                        <Sparkles size={20} />
                    </div>
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-widest text-emerald-900 dark:text-emerald-100">SEO Optimized</h4>
                        <p className="text-[10px] text-emerald-600 font-bold">Semantic HTML for feature lists.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
