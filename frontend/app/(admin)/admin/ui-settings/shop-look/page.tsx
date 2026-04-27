"use client"

import UGCSettings from "@/components/admin/ui-settings/UGCSettings"
import { Instagram, Camera, Heart } from "lucide-react"

export default function ShopLookPage() {
    return (
        <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
                <h1 className="text-2xl font-bold dark:text-white flex items-center gap-3 tracking-tight">
                    <div className="w-12 h-12 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-rose-500/20">
                        <Instagram size={24} />
                    </div>
                    Shop the Look (UGC)
                </h1>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Manage your social wall and shoppable Instagram feed.</p>
            </div>

            <div className="bg-white dark:bg-black p-10 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
                    <Camera size={200} />
                </div>
                <div className="relative z-10">
                    <UGCSettings />
                </div>
            </div>
            
            <div className="mt-10 p-8 bg-gradient-to-r from-rose-500/10 to-amber-500/10 rounded-[2rem] border border-rose-100 dark:border-rose-900/20 flex flex-col md:flex-row items-center gap-8">
                <div className="flex -space-x-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-gray-900 bg-gray-200 overflow-hidden shadow-lg">
                            <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                        </div>
                    ))}
                </div>
                <div className="flex-1 text-center md:text-left space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 flex items-center justify-center md:justify-start gap-2">
                        <Heart size={14} fill="currentColor" /> Community Engagement
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white italic">"Customers are 4x more likely to buy when they see real people using your products."</p>
                </div>
                <button className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100 dark:border-gray-700">View Statistics</button>
            </div>
        </div>
    );
}
