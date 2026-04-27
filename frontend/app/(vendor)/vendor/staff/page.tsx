"use client"

import { useState } from "react"
import Link from "next/link"
import { 
    Users, 
    Plus, 
    Search, 
    Shield, 
    MoreVertical, 
    Edit, 
    Trash2, 
    Mail, 
    Phone, 
    Calendar,
    CheckCircle2,
    XCircle,
    UserPlus,
    Activity
} from "lucide-react"

const MOCK_STAFF = [
    { id: 1, name: "Jessica Alba", email: "jessica@store.com", role: "Manager", status: "Active", joined: "12 Jan, 2026", avatar: "JA" },
    { id: 2, name: "David Beckham", email: "david@store.com", role: "Sales Agent", status: "Active", joined: "05 Feb, 2026", avatar: "DB" },
    { id: 3, name: "Scarlett Johansson", email: "scarlett@store.com", role: "Support", status: "Inactive", joined: "20 Mar, 2026", avatar: "SJ" },
]

export default function StaffManagementPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Users className="text-blue-600" size={32} />
                        Staff Management
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Add team members and assign roles to manage your store collaboratively.</p>
                </div>
                <Link href="/vendor/staff/add" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <UserPlus size={18} /> Add New Staff
                </Link>
            </div>

            {/* Quick Stats / Roles Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Staff", value: "3", icon: Users, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Active Now", value: "2", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Permissions", value: "15", icon: Shield, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Invites Sent", value: "1", icon: Mail, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
                ].map(stat => (
                    <div key={stat.label} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Staff List Table */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search staff by name or email..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-medium focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select className="px-5 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 outline-none appearance-none cursor-pointer">
                            <option>All Roles</option>
                            <option>Manager</option>
                            <option>Sales Agent</option>
                            <option>Support</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-800">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Staff Member</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Joined Date</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {MOCK_STAFF.map((staff) => (
                                <tr key={staff.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-gray-500 font-black text-sm shrink-0">
                                                {staff.avatar}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{staff.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold mt-1 tracking-widest">{staff.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 w-fit">
                                            <Shield size={12} className="text-blue-600" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">{staff.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" /> {staff.joined}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                                            }`}>
                                                {staff.status}
                                            </span>
                                            <div className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors ${staff.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`}>
                                                <div className={`w-3 h-3 bg-white rounded-full absolute transition-all ${staff.status === 'Active' ? 'right-1' : 'left-1'} top-1 shadow-sm`}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/vendor/staff/${staff.id}/edit`} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                                                <Edit size={16} />
                                            </Link>
                                            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Permissions Info */}
            <div className="p-8 rounded-[3rem] bg-gray-900 text-white relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-1/4 h-full bg-gradient-to-l from-blue-600/20 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3">
                        <h3 className="text-2xl font-black flex items-center gap-3">
                            <Shield className="text-blue-400" size={32} />
                            Role-Based Access Control
                        </h3>
                        <p className="text-gray-400 font-medium text-sm max-w-2xl">Ensure store security by giving staff only the permissions they need. Managers have full access, while Sales Agents can only process orders and view products.</p>
                    </div>
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/30 transition-all whitespace-nowrap">Manage Roles</button>
                </div>
            </div>

        </div>
    )
}
