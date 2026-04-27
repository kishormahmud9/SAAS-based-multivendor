"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { 
    Shield, 
    ChevronLeft, 
    Edit, 
    Users, 
    Calendar,
    Activity,
    CheckCircle2,
    Lock,
    Trash2,
    ArrowRight,
    Search
} from "lucide-react"
import { PERMISSION_GROUPS } from "@/lib/permissions"

const MOCK_ROLES = [
    { 
        id: "1", 
        name: "Manager", 
        desc: "Full access to all store operations and staff management.", 
        status: "Active", 
        created: "12 Jan, 2026",
        lastUpdated: "2 days ago",
        permissions: ["dashboard.view", "products.view", "products.add", "products.edit", "products.delete", "orders.view", "orders.update", "staff.view", "staff.add", "staff.edit"],
        users: [
            { name: "John Doe", email: "john@example.com", avatar: "JD" },
            { name: "Sarah Smith", email: "sarah@example.com", avatar: "SS" },
        ]
    }
]

export default function RoleDetailsPage() {
    const { id } = useParams()
    const role = MOCK_ROLES.find(r => r.id === id) || MOCK_ROLES[0]

    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/vendor/roles" className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors shadow-sm">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white">{role.name}</h1>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 rounded-full text-[9px] font-black uppercase tracking-widest">{role.status}</span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">Role Details & Permissions Overview</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={`/vendor/roles/${id}/edit`} className="px-8 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl text-sm font-black shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                        <Edit size={18} /> Edit Role
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Metadata */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest text-[10px]">About This Role</h3>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{role.desc}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-50 dark:border-gray-800">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Created On</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white mt-1">{role.created}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated</p>
                                <p className="text-sm font-black text-gray-900 dark:text-white mt-1">{role.lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Users */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Assigned Staff</h3>
                            <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg text-[10px] font-black">{role.users.length}</span>
                        </div>
                        
                        <div className="space-y-4">
                            {role.users.map((user, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center text-xs font-black text-gray-500 shadow-sm group-hover:scale-110 transition-transform">
                                        {user.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-black text-gray-900 dark:text-white truncate">{user.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold truncate">{user.email}</p>
                                    </div>
                                    <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                                </div>
                            ))}
                        </div>

                        <Link href="/vendor/staff" className="w-full py-3 bg-gray-50 dark:bg-gray-800 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all mt-4">
                            Manage All Staff <Users size={14} />
                        </Link>
                    </div>
                </div>

                {/* Right: Permission Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/30 dark:bg-gray-900/50">
                            <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                <Activity className="text-blue-600" size={24} />
                                Permissions Matrix
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Access</p>
                                    <p className="text-sm font-black text-blue-600">{role.permissions.length} Enabled</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {PERMISSION_GROUPS.map((group) => {
                                const activeInGroup = group.permissions.filter(p => role.permissions.includes(p.id))
                                if (activeInGroup.length === 0) return null

                                return (
                                    <div key={group.id} className="space-y-4">
                                        <div className="flex items-center justify-between pb-2 border-b border-gray-50 dark:border-gray-800">
                                            <h4 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-[0.2em]">{group.name}</h4>
                                            <span className="text-[9px] font-black text-emerald-500 uppercase">{activeInGroup.length} Active</span>
                                        </div>
                                        <div className="space-y-3">
                                            {activeInGroup.map(p => (
                                                <div key={p.id} className="flex items-center gap-3 group">
                                                    <div className="w-5 h-5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 shadow-sm">
                                                        <CheckCircle2 size={12} />
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{p.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
