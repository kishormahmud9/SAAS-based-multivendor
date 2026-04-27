"use client"
import { Ticket, Plus, Search, Filter, Trash2, Edit, Calendar } from "lucide-react"

export default function CouponsPage() {
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Ticket className="text-orange-600" size={32} />
                        Coupon Codes
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Create and manage promo codes for your customers.</p>
                </div>
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> New Coupon
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden p-20 text-center space-y-6">
                <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-[2rem] flex items-center justify-center text-orange-600 mx-auto">
                    <Ticket size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Active Promotions</h3>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto">You can find all your coupon codes and auto-discounts in the combined Discounts Hub.</p>
                </div>
                <Link href="/vendor/discounts" className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl text-xs font-black uppercase tracking-widest inline-block">Go to Discounts Hub</Link>
            </div>
        </div>
    )
}

import Link from "next/link"
