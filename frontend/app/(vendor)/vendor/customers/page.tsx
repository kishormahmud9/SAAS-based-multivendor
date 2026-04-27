"use client"
import { Users, Search, Filter, Mail, Phone, ShoppingBag, ChevronRight } from "lucide-react"

export default function CustomersPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Users className="text-blue-600" size={32} />
                        Your Customers
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">View and manage your customer list, their order history and purchase patterns.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-black text-gray-700 dark:text-gray-200">
                        Export CRM Data
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search customers by name or email..." className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-medium focus:outline-none" />
                    </div>
                </div>

                <div className="p-20 text-center space-y-6">
                    <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-[2.5rem] flex items-center justify-center text-blue-600 mx-auto">
                        <Users size={48} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">Customer Database</h3>
                        <p className="text-gray-500 font-medium max-w-sm mx-auto">Loading your customer insights from recent transactions. You'll soon see your top buyers and their activity here.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
