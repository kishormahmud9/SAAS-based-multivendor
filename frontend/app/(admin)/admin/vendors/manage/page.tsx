"use client"

import { useState } from "react"
import { Search, Filter, Plus, Store, Users, ShieldCheck, AlertCircle, MoreHorizontal, Eye, Ban, CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

interface Vendor {
    id: string
    name: string
    email: string
    storeName: string
    logo: string
    status: 'ACTIVE' | 'PENDING' | 'SUSPENDED'
    joinDate: string
    totalSales: number
    balance: number
    commission: number
}

const mockVendors: Vendor[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@electronics.com",
        storeName: "Elite Electronics",
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=elite",
        status: 'ACTIVE',
        joinDate: "2024-01-15",
        totalSales: 12500,
        balance: 450,
        commission: 10
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@fashion.com",
        storeName: "Urban Vogue",
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=urban",
        status: 'PENDING',
        joinDate: "2024-03-20",
        totalSales: 0,
        balance: 0,
        commission: 12
    },
    {
        id: "3",
        name: "Mike Johnson",
        email: "mike@home.com",
        storeName: "Comfort Living",
        logo: "https://api.dicebear.com/7.x/identicon/svg?seed=comfort",
        status: 'SUSPENDED',
        joinDate: "2023-11-10",
        totalSales: 8400,
        balance: 120,
        commission: 10
    }
]

export default function VendorsManagePage() {
    const [vendors, setVendors] = useState<Vendor[]>(mockVendors)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("ALL")

    const filteredVendors = vendors.filter(v => {
        const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                             v.storeName.toLowerCase().includes(search.toLowerCase()) ||
                             v.email.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === "ALL" || v.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <Store className="text-blue-600" size={32} />
                        Vendor Partners
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Manage, verify and monitor all marketplace vendors.</p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-all">
                        <Plus size={18} /> Add New Vendor
                    </button>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2">
                        <ShieldCheck size={18} /> KYC Approvals
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Vendors", value: "154", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Pending Approval", value: "12", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Active Stores", value: "138", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Marketplace Revenue", value: "$42,500", icon: Store, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-none mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by vendor name, store, or email..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 transition-all"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-6 text-sm font-bold text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-blue-600 transition-all"
                    >
                        <option value="ALL">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="PENDING">Pending</option>
                        <option value="SUSPENDED">Suspended</option>
                    </select>
                    <button className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-3 rounded-2xl hover:bg-gray-100 transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Vendors Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor & Store</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Join Date</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sales & Balance</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Commission</th>
                                <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {filteredVendors.map((vendor) => (
                                <tr key={vendor.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 p-2">
                                                <img src={vendor.logo} alt="" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-900 dark:text-white leading-none mb-1">{vendor.storeName}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{vendor.name}</p>
                                                <p className="text-[10px] font-medium text-blue-600 dark:text-blue-400 lowercase">{vendor.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{vendor.joinDate}</p>
                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Joined</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-sm font-black text-emerald-600">${vendor.totalSales.toLocaleString()}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bal: ${vendor.balance}</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-black text-gray-900 dark:text-white">{vendor.commission}%</span>
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            vendor.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/50' :
                                            vendor.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border border-orange-200/50' :
                                            'bg-rose-50 text-rose-600 border border-rose-200/50'
                                        }`}>
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="View Profile">
                                                <Eye size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all" title="Verify Vendor">
                                                <CheckCircle size={18} />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all" title="Suspend">
                                                <Ban size={18} />
                                            </button>
                                            <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-1"></div>
                                            <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-xl transition-all">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 3 of 154 vendors</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">1</button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300">2</button>
                        <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-300">Next</button>
                    </div>
                </div>
            </div>

            {/* Verification Tip */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <ShieldCheck size={160} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2 leading-tight">Professional KYC Verification</h3>
                    <p className="text-blue-100 text-lg opacity-80 max-w-xl font-medium">Verify vendor identity, business registration, and tax documents to ensure a safe marketplace environment.</p>
                </div>
                <button className="relative z-10 bg-white text-blue-900 font-black px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap">
                    Launch KYC Auditor <ExternalLink size={20} />
                </button>
            </div>
        </div>
    )
}
