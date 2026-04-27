"use client"

import { useState } from "react"
import Link from "next/link"
import { 
    Shield, 
    Plus, 
    Search, 
    Filter, 
    MoreVertical, 
    Edit, 
    Trash2, 
    Copy, 
    Eye, 
    Users, 
    Calendar,
    ChevronLeft,
    ChevronRight,
    Activity
} from "lucide-react"

const MOCK_ROLES = [
    { id: 1, name: "Manager", desc: "Full access to all store operations and staff management.", users: 2, created: "12 Jan, 2026", status: "Active" },
    { id: 2, name: "Sales Agent", desc: "Can manage products and orders but cannot see financial reports.", users: 5, created: "05 Feb, 2026", status: "Active" },
    { id: 3, name: "Support Rep", desc: "Access to messages and reviews only.", users: 3, created: "20 Mar, 2026", status: "Active" },
    { id: 4, name: "Inventory Specialist", desc: "Can only update stock and product information.", users: 1, created: "10 Apr, 2026", status: "Inactive" },
]

export default function RolesPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Shield className="text-blue-600" size={32} />
                        Role Permissions
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Define custom roles and assign specific permissions to your team members.</p>
                </div>
                <Link href="/vendor/roles/create" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> Create New Role
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Roles", value: "4", icon: Shield, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Assigned Users", value: "11", icon: Users, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Active Permissions", value: "42", icon: Activity, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div className="bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search roles by name or description..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <button className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-500 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all">
                        <Filter size={18} /> Filters
                    </button>
                    <select className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 outline-none appearance-none cursor-pointer">
                        <option>Status: All</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>

            {/* Roles Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Role Info</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Total Users</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Created Date</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {MOCK_ROLES.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                                                <Shield size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{role.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-widest uppercase">ID: #ROL-00{role.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-sm text-gray-500 font-medium max-w-xs line-clamp-1">{role.desc}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[...Array(Math.min(role.users, 3))].map((_, i) => (
                                                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[8px] font-black text-gray-500 uppercase">
                                                        U{i+1}
                                                    </div>
                                                ))}
                                                {role.users > 3 && (
                                                    <div className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-blue-100 flex items-center justify-center text-[8px] font-black text-blue-600">
                                                        +{role.users - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">{role.users} Staff</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            role.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' : 'bg-rose-50 text-rose-500 dark:bg-rose-900/20'
                                        }`}>
                                            {role.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" /> {role.created}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/vendor/roles/${role.id}`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100" title="View Details">
                                                <Eye size={16} />
                                            </Link>
                                            <Link href={`/vendor/roles/${role.id}/edit`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-100" title="Edit Role">
                                                <Edit size={16} />
                                            </Link>
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100" title="Duplicate">
                                                <Copy size={16} />
                                            </button>
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-400 italic">Showing 4 of 4 custom roles</p>
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 disabled:opacity-30" disabled>
                            <ChevronLeft size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 disabled:opacity-30" disabled>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
