"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { Shield, ShieldCheck, Plus, Search, Edit3, Trash2, Check, X, ShieldAlert, Loader2 } from "lucide-react"
import Modal from "@/components/ui/Modal"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { apiClient } from "@/src/lib/api-client"
import { toast } from "react-hot-toast"

interface Permission {
    id: string
    name: string
    module: string
    action: string
    description: string
}

interface Role {
    id: string
    name: string
    description: string
    _count: {
        userRoles: number
        permissions: number
    }
    permissions: {
        permissionId: string
        permission: Permission
    }[]
    isSystem?: boolean
}

export default function RolesPermissionsPage() {
    const [roles, setRoles] = useState<Role[]>([])
    const [allPermissions, setAllPermissions] = useState<Permission[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)

    // Form Modal
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({ id: '', name: '', description: '' })
    
    // Delete Modal
    const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)

    // Permission saving state
    const [savingPermissions, setSavingPermissions] = useState(false)
    const [localPermissionIds, setLocalPermissionIds] = useState<Set<string>>(new Set())
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [rolesRes, permsRes] = await Promise.all([
                apiClient('/roles'),
                apiClient('/roles/permissions')
            ])
            setRoles(rolesRes.data)
            setAllPermissions(permsRes.data)
            
            if (rolesRes.data.length > 0 && !selectedRole) {
                handleSelectRole(rolesRes.data[0])
            }
        } catch (err) {
            toast.error((err as Error).message || "Failed to load roles data")
        } finally {
            setLoading(false)
        }
    }

    const handleSelectRole = (role: Role) => {
        if (hasUnsavedChanges) {
            if (!window.confirm("You have unsaved changes. Discard them?")) return
        }
        setSelectedRole(role)
        // Defensive check for role.permissions
        const permissionIds = role.permissions?.map(p => p.permissionId) || []
        setLocalPermissionIds(new Set(permissionIds))
        setHasUnsavedChanges(false)
    }

    // Group permissions by module
    const modules = useMemo(() => {
        const groups: Record<string, Permission[]> = {}
        for (const p of allPermissions) {
            if (!groups[p.module]) groups[p.module] = []
            groups[p.module].push(p)
        }
        return Object.entries(groups).map(([name, perms]) => ({ name, permissions: perms }))
    }, [allPermissions])

    const handleTogglePermission = (permissionId: string) => {
        if (!selectedRole || selectedRole.isSystem) return
        
        const newSet = new Set(localPermissionIds)
        if (newSet.has(permissionId)) {
            newSet.delete(permissionId)
        } else {
            newSet.add(permissionId)
        }
        setLocalPermissionIds(newSet)
        setHasUnsavedChanges(true)
    }

    const handleToggleModuleFull = (moduleId: string) => {
        if (!selectedRole || selectedRole.isSystem) return

        const modPerms = modules.find(m => m.name === moduleId)?.permissions || []
        const modPermIds = modPerms.map(p => p.id)
        
        const hasAll = modPermIds.every(id => localPermissionIds.has(id))
        
        const newSet = new Set(localPermissionIds)
        if (hasAll) {
            // Remove all
            modPermIds.forEach(id => newSet.delete(id))
        } else {
            // Add all
            modPermIds.forEach(id => newSet.add(id))
        }
        setLocalPermissionIds(newSet)
        setHasUnsavedChanges(true)
    }

    const handleSavePermissions = async () => {
        if (!selectedRole) return
        try {
            setSavingPermissions(true)
            await apiClient(`/roles/${selectedRole.id}`, {
                method: 'PATCH',
                body: { permissionIds: Array.from(localPermissionIds) }
            })
            toast.success("Permissions updated successfully")
            setHasUnsavedChanges(false)
            fetchData() // Refresh
        } catch (err) {
            toast.error((err as Error).message || "Failed to update permissions")
        } finally {
            setSavingPermissions(false)
        }
    }

    const handleResetPermissions = () => {
        if (!selectedRole) return
        setLocalPermissionIds(new Set(selectedRole.permissions.map(p => p.permissionId)))
        setHasUnsavedChanges(false)
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsSubmitting(true)
            if (formData.id) {
                await apiClient(`/roles/${formData.id}`, {
                    method: 'PATCH',
                    body: { name: formData.name, description: formData.description }
                })
                toast.success("Role updated successfully")
            } else {
                await apiClient('/roles', {
                    method: 'POST',
                    body: { name: formData.name, description: formData.description }
                })
                toast.success("Role created successfully")
            }
            setIsFormOpen(false)
            fetchData()
        } catch (err) {
            toast.error((err as Error).message || "Operation failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteRole = async () => {
        if (!roleToDelete) return
        try {
            await apiClient(`/roles/${roleToDelete.id}`, { method: 'DELETE' })
            toast.success("Role deleted successfully")
            setRoleToDelete(null)
            if (selectedRole?.id === roleToDelete.id) {
                setSelectedRole(null)
            }
            fetchData()
        } catch (err) {
            toast.error((err as Error).message || "Failed to delete role")
            setRoleToDelete(null)
        }
    }

    if (loading && roles.length === 0) {
        return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>
    }

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
                <Link 
                    href="/admin/roles/create"
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95"
                >
                    <Plus size={18} /> Create New Role
                </Link>
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
                                onClick={() => handleSelectRole(role)}
                                className={`w-full text-left p-6 rounded-[2rem] border transition-all relative overflow-hidden group ${
                                    selectedRole?.id === role.id 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20" 
                                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-blue-500/30"
                                }`}
                            >
                                {selectedRole?.id === role.id && (
                                    <div className="absolute right-0 top-0 p-4 opacity-20">
                                        <Shield size={60} />
                                    </div>
                                )}
                                <div className="relative z-10 flex justify-between items-start mb-2">
                                    <h4 className="font-black text-lg leading-tight">{role.name}</h4>
                                    {role.isSystem && <span className="text-[8px] font-black uppercase tracking-widest bg-white/20 px-1.5 py-0.5 rounded">System</span>}
                                </div>
                                <p className={`text-xs font-medium leading-relaxed mb-4 line-clamp-2 ${selectedRole?.id === role.id ? "text-blue-50/70" : "text-gray-500"}`}>
                                    {role.description || "No description provided."}
                                </p>
                                <div className="flex items-center justify-between gap-2">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${selectedRole?.id === role.id ? "text-white" : "text-gray-400"}`}>
                                        {role._count?.userRoles || 0} Users • {role._count?.permissions || 0} Perms
                                    </span>
                                    <Link 
                                        href={`/admin/roles/${role.id}/permissions`}
                                        onClick={(e) => e.stopPropagation()}
                                        className={`p-2 rounded-lg transition-all ${
                                            selectedRole?.id === role.id 
                                            ? "bg-white/20 text-white hover:bg-white/30" 
                                            : "bg-gray-50 text-gray-400 hover:text-blue-600 dark:bg-gray-800"
                                        }`}
                                    >
                                        <ShieldCheck size={16} />
                                    </Link>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Permission Matrix (8 cols) */}
                <div className="lg:col-span-8">
                    {selectedRole ? (
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-fit">
                            <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                                        <ShieldCheck size={20} className="text-blue-600" />
                                        Permission Matrix: <span className="text-blue-600">{selectedRole.name}</span>
                                    </h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Define action-level access for each system module</p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => {
                                            setFormData({ id: selectedRole.id, name: selectedRole.name, description: selectedRole.description || '' })
                                            setIsFormOpen(true)
                                        }}
                                        className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        disabled={selectedRole.isSystem}
                                    >
                                        <Edit3 size={18} className={selectedRole.isSystem ? "opacity-50" : ""} />
                                    </button>
                                    {!selectedRole.isSystem && (
                                        <button 
                                            onClick={() => setRoleToDelete(selectedRole)}
                                            className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
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
                                            <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Mod</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                        {modules.map(mod => {
                                            const modPermIds = mod.permissions.map(p => p.id)
                                            const isFull = modPermIds.every(id => localPermissionIds.has(id))
                                            
                                            return (
                                                <tr key={mod.name} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                                    <td className="px-8 py-6 font-bold text-gray-900 dark:text-white text-sm capitalize">
                                                        {mod.name}
                                                    </td>
                                                    {['view', 'create', 'edit', 'delete'].map(action => {
                                                        const perm = mod.permissions.find(p => p.action === action)
                                                        const hasAction = perm ? localPermissionIds.has(perm.id) : false
                                                        
                                                        return (
                                                            <td key={action} className="px-4 py-6 text-center">
                                                                {perm ? (
                                                                    <button 
                                                                        disabled={selectedRole.isSystem}
                                                                        onClick={() => handleTogglePermission(perm.id)}
                                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all ${
                                                                        hasAction 
                                                                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" 
                                                                        : "bg-gray-50 text-gray-300 dark:bg-gray-800/50 dark:text-gray-700 hover:bg-gray-100"
                                                                    } ${selectedRole.isSystem ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                                                                        {hasAction ? <Check size={16} strokeWidth={3} /> : <X size={16} />}
                                                                    </button>
                                                                ) : (
                                                                    <span className="text-gray-300">-</span>
                                                                )}
                                                            </td>
                                                        )
                                                    })}
                                                    <td className="px-8 py-6 text-center">
                                                        <button 
                                                            disabled={selectedRole.isSystem}
                                                            onClick={() => handleToggleModuleFull(mod.name)}
                                                            className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto transition-all shadow-sm ${
                                                                isFull 
                                                                ? "bg-blue-600 text-white shadow-blue-600/20" 
                                                                : "bg-gray-50 text-gray-300 dark:bg-gray-800/50 dark:text-gray-700 hover:bg-gray-100"
                                                            } ${selectedRole.isSystem ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}>
                                                            <Shield size={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-8 bg-gray-50/50 dark:bg-gray-800/30 flex justify-end gap-3">
                                {hasUnsavedChanges && (
                                    <>
                                        <button 
                                            onClick={handleResetPermissions}
                                            className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                                        >
                                            Reset Changes
                                        </button>
                                        <button 
                                            onClick={handleSavePermissions}
                                            disabled={savingPermissions}
                                            className="px-8 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {savingPermissions ? "Saving..." : "Save Role Definition"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-12 text-center text-gray-500">
                            Select a role to view or edit permissions.
                        </div>
                    )}

                    {selectedRole?.isSystem && (
                        <div className="mt-8 p-8 bg-orange-900/5 dark:bg-orange-950/20 rounded-[2.5rem] border border-orange-100 dark:border-orange-900/30 flex gap-6 items-center">
                            <div className="w-16 h-16 bg-white dark:bg-gray-950 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm ring-1 ring-orange-100 dark:ring-orange-900/50">
                                <ShieldAlert size={32} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-black uppercase tracking-widest text-orange-900 dark:text-orange-400 mb-1 leading-tight">System Role</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">This is a system role. Its permissions and details cannot be modified or deleted to ensure system integrity. Modifying system roles requires database-level adjustments.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Role Form Modal */}
            <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={formData.id ? "Edit Role" : "Create New Role"}>
                <form onSubmit={handleSubmitForm} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Role Name</label>
                        <input 
                            required
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-3"
                            placeholder="e.g. Content Editor"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-3 min-h-[100px]"
                            placeholder="Briefly describe the role..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 font-bold text-gray-500">Cancel</button>
                        <button disabled={isSubmitting} type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50">
                            {isSubmitting ? "Saving..." : "Save Role"}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirm Modal */}
            <ConfirmModal
                isOpen={!!roleToDelete}
                onClose={() => setRoleToDelete(null)}
                onConfirm={handleDeleteRole}
                title="Delete Role"
                message={`Are you sure you want to delete the role "${roleToDelete?.name}"? This action cannot be undone.`}
            />
        </div>
    )
}
