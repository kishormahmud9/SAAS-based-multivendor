"use client"

import { useState } from "react"
import Link from "next/link"
import { 
    ShoppingBag, 
    Search, 
    Filter, 
    Eye, 
    Download, 
    Printer, 
    MoreVertical,
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight
} from "lucide-react"

const MOCK_ORDERS = [
    { id: "#ORD-9923", customer: "Sarah Connor", email: "sarah@sky.net", amount: "$120.00", items: 3, status: "Completed", payment: "Paid", date: "2 mins ago" },
    { id: "#ORD-9922", customer: "John Doe", email: "john@doe.com", amount: "$45.50", items: 1, status: "Pending", payment: "Unpaid", date: "15 mins ago" },
    { id: "#ORD-9921", customer: "Mike Ross", email: "mike@pearson.com", amount: "$210.00", items: 5, status: "Processing", payment: "Paid", date: "1 hour ago" },
    { id: "#ORD-9920", customer: "Rachel Zane", email: "rachel@specter.com", amount: "$89.99", items: 2, status: "Shipped", payment: "Paid", date: "3 hours ago" },
    { id: "#ORD-9919", customer: "Harvey Specter", email: "harvey@legal.com", amount: "$540.00", items: 12, status: "Completed", payment: "Paid", date: "Yesterday" },
    { id: "#ORD-9918", customer: "Donna Paulsen", email: "donna@coo.com", amount: "$75.25", items: 2, status: "Cancelled", payment: "Refunded", date: "2 days ago" },
]

export default function OrderListPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <ShoppingBag className="text-indigo-600" size={32} />
                        Sales Orders
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Track and manage all customer orders, shipments and status updates.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                        <Download size={18} />
                        Export Orders
                    </button>
                </div>
            </div>

            {/* Quick Status Filters */}
            <div className="flex flex-wrap items-center gap-3">
                {[
                    { label: "All Orders", count: 1482, active: true },
                    { label: "Pending", count: 12, active: false },
                    { label: "Processing", count: 45, active: false },
                    { label: "Shipped", count: 28, active: false },
                    { label: "Completed", count: 1390, active: false },
                    { label: "Returns", count: 7, active: false },
                ].map(tab => (
                    <button 
                        key={tab.label}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                            tab.active 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" 
                            : "bg-white dark:bg-gray-900 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800"
                        }`}
                    >
                        {tab.label} <span className={`ml-1 opacity-60`}>({tab.count})</span>
                    </button>
                ))}
            </div>

            {/* Search & Bulk */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by Order ID, Customer Name or Email..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                        <Filter size={18} />
                        Filter Date
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Order Details</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {MOCK_ORDERS.map((order) => {
                                const StatusIcon = order.status === 'Completed' ? CheckCircle : order.status === 'Pending' ? Clock : order.status === 'Shipped' ? Truck : XCircle
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group cursor-pointer">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs">
                                                    {order.id.slice(-2)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{order.id}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{order.date} • {order.items} items</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{order.customer}</p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-widest">{order.email}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-black text-gray-900 dark:text-white">{order.amount}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                                order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                            }`}>
                                                {order.payment}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest w-fit ${
                                                order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                order.status === 'Pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                                                order.status === 'Processing' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                                                'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                            }`}>
                                                <StatusIcon size={12} />
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                                                    <Printer size={16} />
                                                </button>
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                                                    <ArrowUpRight size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination */}
                <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/20 dark:bg-transparent">
                    <p className="text-xs font-bold text-gray-400">Total 1,482 orders found across all time</p>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-black text-gray-400 hover:text-indigo-600 transition-all flex items-center gap-2 disabled:opacity-30" disabled>
                            <ChevronLeft size={16} /> Previous
                        </button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 text-xs font-black text-gray-400 hover:text-indigo-600 transition-all flex items-center gap-2">
                            Next <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
