"use client"

import { BarChart3, TrendingUp, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Banknote, Landmark, Download, Filter, Calendar, Activity } from "lucide-react"

const monthlyRevenue = [
    { month: "Oct", revenue: 42000, commission: 4200 },
    { month: "Nov", revenue: 58000, commission: 5800 },
    { month: "Dec", revenue: 95000, commission: 9500 },
    { month: "Jan", revenue: 67000, commission: 6700 },
    { month: "Feb", revenue: 72000, commission: 7200 },
    { month: "Mar", revenue: 84000, commission: 8400 },
]

const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))

export default function RevenueOverviewPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <TrendingUp className="text-emerald-600" size={32} />
                        Revenue Analytics
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Track marketplace growth, platform commissions, and vendor payouts.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                        <Calendar size={18} /> Last 30 Days
                    </button>
                    <button className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2">
                        <Download size={18} /> Export Financial Report
                    </button>
                </div>
            </div>

            {/* Financial Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Gross Volume", value: "$84,200", change: "+14.5%", up: true, icon: Landmark, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Platform Commission", value: "$8,420", change: "+12.2%", up: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Net Profit", value: "$6,150", change: "+8.4%", up: true, icon: Wallet, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
                    { label: "Vendor Payouts", value: "$75,780", change: "-2.1%", up: false, icon: Banknote, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start relative z-10">
                            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="mt-4 relative z-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                             <stat.icon size={100} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Revenue Chart (2 cols) */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Revenue Growth</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Monthly performance overview</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Gross</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Commission</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end justify-between gap-4 h-64">
                        {monthlyRevenue.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="w-full relative flex flex-col items-center justify-end h-full">
                                    {/* Tooltip */}
                                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all bg-gray-900 text-white text-[10px] font-black px-3 py-2 rounded-xl shadow-xl z-20 pointer-events-none flex flex-col items-center">
                                        <span>${d.revenue.toLocaleString()}</span>
                                        <div className="w-2 h-2 bg-gray-900 rotate-45 -mb-3 mt-1"></div>
                                    </div>
                                    
                                    {/* Revenue Bar */}
                                    <div 
                                        className="w-full max-w-[40px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-t-2xl relative overflow-hidden group-hover:bg-emerald-500/20 transition-all"
                                        style={{ height: '100%' }}
                                    >
                                        <div 
                                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-y-105 transition-transform origin-bottom"
                                            style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                                        />
                                        {/* Commission Bar (Overlay) */}
                                        <div 
                                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-2xl shadow-lg shadow-blue-500/10 group-hover:scale-y-105 transition-transform origin-bottom opacity-80"
                                            style={{ height: `${(d.commission / maxRevenue) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Payment Methods Breakdown */}
                <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Payout Distribution</h3>
                    <div className="space-y-6">
                        {[
                            { label: "Direct Bank", value: 65, color: "bg-emerald-500", icon: Landmark },
                            { label: "Stripe Connect", value: 25, color: "bg-blue-500", icon: CreditCard },
                            { label: "PayPal", value: 10, color: "bg-orange-500", icon: Wallet },
                        ].map((p, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <p.icon size={14} className="text-gray-400" />
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{p.label}</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-900 dark:text-white">{p.value}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full ${p.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${p.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-gray-50 dark:border-gray-800">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-[2rem]">
                            <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                                <Activity size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">System Health</p>
                                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1 leading-none">Payment Gateway: Stable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions List */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Live Transactions</h3>
                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View Ledger</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Details</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Gross Amount</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Commission</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Net Profit</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                                                #{1024 + i}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-900 dark:text-white">Order from Customer #882</p>
                                                <p className="text-[10px] font-medium text-gray-400">Electronic Gadget Store</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Sale</td>
                                    <td className="px-6 py-6 font-bold text-gray-900 dark:text-white">$150.00</td>
                                    <td className="px-6 py-6 font-bold text-blue-600">$15.00</td>
                                    <td className="px-6 py-6 font-black text-gray-900 dark:text-white">$135.00</td>
                                    <td className="px-8 py-6 text-xs text-gray-400">Just now</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
