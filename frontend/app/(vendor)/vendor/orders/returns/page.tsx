"use client"
import { RefreshCw, Search, Filter, ShieldCheck, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ReturnsPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                    <RefreshCw className="text-orange-600" size={32} />
                    Returns & Refunds
                </h1>
                <p className="text-sm text-gray-500 font-medium mt-1">Manage customer return requests, inspect items and process refunds.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                    { label: "New Requests", value: "3", icon: Clock, color: "text-amber-500" },
                    { label: "Under Review", value: "4", icon: ShieldCheck, color: "text-blue-500" },
                    { label: "Refunded", value: "128", icon: CheckCircle, color: "text-emerald-500" },
                    { label: "Rejected", value: "12", icon: XCircle, color: "text-rose-500" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <stat.icon className={stat.color} size={24} />
                            <span className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-12 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center text-center">
                 <div className="w-24 h-24 bg-orange-50 dark:bg-orange-900/20 rounded-[2rem] flex items-center justify-center mb-8">
                    <RefreshCw className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Refund Management System</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-3 font-medium">You have no active return requests at the moment. All previous refunds have been settled.</p>
                <button className="mt-8 px-8 py-3 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-black text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">View History</button>
            </div>
        </div>
    )
}
