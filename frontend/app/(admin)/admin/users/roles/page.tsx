"use client"

import { useState } from "react"
import { Shield, ShieldCheck, Plus, Search, MoreHorizontal, UserCheck, Lock, Edit3, Trash2, Check, X, ShieldAlert } from "lucide-react"

interface Permission {
    id: string
    module: string
    actions: ('VIEW' | 'CREATE' | 'EDIT' | 'DELETE' | 'FULL_ACCESS')[]
}

interface Role {
    id: string
    name: string
    description: string
    usersCount: number
    permissions: Permission[]
    isSystem?: boolean
}

const modules = [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'catalog', name: 'Product Catalog' },
    { id: 'sales', name: 'Sales & Orders' },
    { id: 'vendors', name: 'Vendor Marketplace' },
    { id: 'marketing', name: 'Marketing & SEO' },
    { id: 'support', name: 'Support Tickets' },
    { id: 'settings', name: 'System Settings' },
]

const mockRoles: Role[] = [
    {
        id: "1",
        name: "Super Admin",
        description: "Full system access with all permissions enabled.",
        usersCount: 2,
        isSystem: true,
        permissions: modules.map(m => ({ id: m.id, module: m.id, actions: ['FULL_ACCESS'] }))
    },
    {
        id: "2",
        name: "Inventory Manager",
        description: "Can manage products, categories and stock levels.",
        usersCount: 5,
        permissions: [
            { id: 'catalog', module: 'catalog', actions: ['VIEW', 'CREATE', 'EDIT', 'DELETE'] },
            { id: 'dashboard', module: 'dashboard', actions: ['VIEW'] },
        ]
    },
    {
        id: "3",
        name: "Support Agent",
        description: "Limited access to support tickets and customer directory.",
        usersCount: 8,
        permissions: [
            { id: 'support', module: 'support', actions: ['VIEW', 'EDIT'] },
            { id: 'catalog', module: 'catalog', actions: ['VIEW'] },
        ]
    }
]

export default function RolesPermissionsPage() {
    const [roles, setRoles] = useState<Role[]>(mockRoles)
    const [selectedRole, setSelectedRole] = useState<Role>(mockRoles[0])
    const [isCreating, setIsCreating] = useState(false)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <ShieldCheck className="text-blue-600" size={32} />
                        RBAC Management
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Define system roles and granular module-level permissions.</p>
                </div>
                <button 
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95"
                >
                    <Plus size={18} /> Create New Role
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Role List (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search roles..." 
                                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-2.5 pl-10 pr-4 text-xs font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {roles.map(role => (
                            <button 
                                key={role.id}
                                onClick={() => setSelectedRole(role)}
                                className={`w-full text-left p-6 rounded-[2rem] border transition-all relative overflow-hidden group ${
                                    selectedRole.id === role.id 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20" 
                                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-500/30"
                                }`}
                            >
                                {selectedRole.id === role.id && (
                                    <div className="absolute right-0 top-0 p-4 opacity-20">
                                        <Shield size={60} />
                                    </div>
                                )}
                                <div className="relative z-10 flex justify-between items-start mb-2">
                                    <h4 className="font-black text-lg leading-tight">{role.name}</h4>
                                    {role.isSystem && <span className="text-[8px] font-black uppercase tracking-widest bg-white/20 px-1.5 py-0.5 rounded">System</span>}
                                </div>
                                <p className={`text-xs font-medium leading-relaxed mb-4 line-clamp-2 ${selectedRole.id === role.id ? "text-blue-50/70" : "text-gray-500"}`}>
                                    {role.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <div className={`flex -space-x-2 ${selectedRole.id === role.id ? "opacity-50" : ""}`}>
                                        {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 border-2 border-white dark:border-gray-900"></div>)}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedRole.id === role.id ? "text-white" : "text-gray-400"}`}>
                                        {role.usersCount} Assigned Users
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Permission Matrix (8 cols) */}
                <div className="lg:col-span-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-fit">
                        <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                    <Lock size={20} className="text-blue-600" />
                                    Permission Matrix: <span className="text-blue-600">{selectedRole.name}</span>
                                </h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Define action-level access for each system module</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                                {!selectedRole.isSystem && <button className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18} /></button>}
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white dark:bg-gray-900">
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">System Module</th>
                                        <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">View</th>
                                        <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Create</th>
                                        <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Edit</th>
                                        <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Delete</th>
                                        <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Full</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {modules.map(mod => {
                                        const rolePerm = selectedRole.permissions.find(p => p.module === mod.id)
                                        const hasAction = (action: string) => rolePerm?.actions.includes(action as any) || rolePerm?.actions.includes('FULL_ACCESS')
                                        const isFull = rolePerm?.actions.includes('FULL_ACCESS')

                                        return (
                                            <tr key={mod.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                                <td className="px-8 py-6 font-bold text-gray-900 dark:text-white text-sm">
                                                    {mod.name}
                                                </td>
                                                {['VIEW', 'CREATE', 'EDIT', 'DELETE'].map(action => (
                                                    <td key={action} className="px-4 py-6 text-center">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all ${
                                                            hasAction(action) 
                                                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" 
                                                            : "bg-gray-50 text-gray-300 dark:bg-gray-800/50 dark:text-gray-700"
                                                        }`}>
                                                            {hasAction(action) ? <Check size={16} strokeWidth={3} /> : <X size={16} />}
                                                        </div>
                                                    </td>
                                                ))}
                                                <td className="px-8 py-6 text-center">
                                                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto transition-all shadow-sm ${
                                                            isFull 
                                                            ? "bg-blue-600 text-white shadow-blue-600/20" 
                                                            : "bg-gray-50 text-gray-300 dark:bg-gray-800/50 dark:text-gray-700"
                                                        }`}>
                                                            <Shield size={20} />
                                                        </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-8 bg-gray-50/50 dark:bg-gray-800/30 flex justify-end gap-3">
                            <button className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors">Reset Changes</button>
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95">Save Role Definition</button>
                        </div>
                    </div>

                    <div className="mt-8 p-8 bg-orange-900/5 dark:bg-orange-950/20 rounded-[2.5rem] border border-orange-100 dark:border-orange-900/30 flex gap-6 items-center">
                         <div className="w-16 h-16 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm ring-1 ring-orange-100 dark:ring-orange-900/50">
                            <ShieldAlert size={32} />
                         </div>
                         <div className="flex-1">
                            <h4 className="text-sm font-black uppercase tracking-widest text-orange-900 dark:text-orange-400 mb-1 leading-tight">Security Protocol</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Changes to system roles are logged in the <span className="text-orange-600 font-bold underline">Audit Trail</span>. Removing a role will automatically move assigned users to the default &quot;Member&quot; role.</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
