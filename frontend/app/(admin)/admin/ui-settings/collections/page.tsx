"use client"

import LookbookSettings from "@/components/admin/ui-settings/LookbookSettings"
import { LayoutGrid } from "lucide-react"

export default function CollectionsPage() {
    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl flex items-center justify-center text-indigo-600">
                        <LayoutGrid size={24} />
                    </div>
                    Curated Collections
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage the lookbook section with featured collection items and grid layouts.</p>
            </div>

            <div className="bg-white dark:bg-transparent rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800/50 shadow-sm">
                <LookbookSettings />
            </div>
            
            <div className="mt-8 p-6 bg-blue-50/50 dark:bg-blue-950/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid size={14} /> Design Tip
                </p>
                <p className="mt-1 text-xs text-blue-900/60 dark:text-blue-100/40 font-medium leading-relaxed italic">
                    "Use high-quality lifestyle imagery for collections to increase click-through rates by up to 45% compared to plain product shots."
                </p>
            </div>
        </div>
    );
}
