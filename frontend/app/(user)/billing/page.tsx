"use client"

import { CreditCard, Plus, ShieldCheck, Info } from "lucide-react"

export default function BillingPage() {
    return (
        <div className="p-6 md:p-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Billing Information</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your payment methods and billing history.</p>
            </div>

            {/* Saved Cards */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Saved Payment Methods</h2>
                    <button className="text-orange-600 dark:text-orange-400 text-sm font-bold flex items-center gap-1 hover:underline">
                        <Plus size={16} /> Add New Card
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-black p-6 rounded-[2rem] text-white shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-3xl group-hover:bg-white/10 transition-all duration-500"></div>
                        
                        <div className="flex justify-between items-start mb-12">
                            <CreditCard size={32} className="text-orange-500" />
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest opacity-60">Primary Card</p>
                                <p className="font-bold">VISA</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-xl tracking-[0.2em] font-medium">•••• •••• •••• 4242</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] uppercase opacity-50 mb-1">Card Holder</p>
                                    <p className="font-semibold text-sm uppercase">John Doe</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase opacity-50 mb-1">Expires</p>
                                    <p className="font-semibold text-sm">12/26</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center hover:border-orange-500/50 hover:bg-orange-50/30 dark:hover:bg-orange-500/5 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20 group-hover:text-orange-600 transition-all">
                            <Plus size={32} className="text-gray-300 dark:text-gray-700 group-hover:text-orange-500" />
                        </div>
                        <p className="font-bold text-gray-900 dark:text-white">Add New Payment Method</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Securely save cards for faster checkout.</p>
                    </div>
                </div>
            </div>

            {/* Billing Info Form */}
            <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold uppercase tracking-widest text-xs">
                    <ShieldCheck size={16} /> Secure Billing Details
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Billing Email</label>
                        <input type="email" placeholder="billing@example.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">VAT Number (Optional)</label>
                        <input type="text" placeholder="US 123456789" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" />
                    </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20 flex gap-3 text-blue-700 dark:text-blue-400 text-sm">
                    <Info size={20} className="flex-shrink-0" />
                    <p>Your billing information is used for generating invoices and tax purposes. We prioritize your data security and never share these details.</p>
                </div>

                <button className="px-8 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl font-bold hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all shadow-lg">
                    Update Billing Information
                </button>
            </div>
        </div>
    )
}
