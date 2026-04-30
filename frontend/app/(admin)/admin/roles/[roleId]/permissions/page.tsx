"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import { ShieldCheck, ChevronLeft, Save, Loader2, Check, X, Shield, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { adminService } from "@/src/services/admin.service"
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
    isSystem: boolean
}

export default function RolePermissionsAssignmentPage() {
    const params = useParams()
    const router = useRouter()
    const roleId = params.roleId as string

    const [role, setRole] = useState<Role | null>(null)
    const [allPermissions, setAllPermissions] = useState<Permission[]>([])
    const [localPermissionIds, setLocalPermissionIds] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    useEffect(() => {
        fetchData()
    }, [roleId])

    const fetchData = async () => {
        try {
            setLoading(true)
            const [roleRes, permsRes, rolePermsRes] = await Promise.all([
                adminService.getRoleById(roleId),
                adminService.getPermissions(),
                adminService.getRolePermissions(roleId)
            ])

            if (roleRes.success) setRole(roleRes.data)
            if (permsRes.success) setAllPermissions(permsRes.data)
            if (rolePermsRes.success) {
                setLocalPermissionIds(new Set(rolePermsRes.data))
            }
        } catch (err) {
            toast.error("Failed to load permission data")
        } finally {
            setLoading(false)
        }
    }

    // Group permissions by module
    const modules = useMemo(() => {
        const groups: Record<string, Permission[]> = {}
        for (const p of allPermissions) {
            if (!groups[p.module]) groups[p.module] = []
            groups[p.module].push(p)
        }
        return Object.entries(groups).map(([name, perms]) => ({ 
            name, 
            permissions: perms.sort((a, b) => a.action.localeCompare(b.action)) 
        }))
    }, [allPermissions])

    const handleTogglePermission = (permissionId: string) => {
        if (!role || role.isSystem) return
        
        const newSet = new Set(localPermissionIds)
        if (newSet.has(permissionId)) {
            newSet.delete(permissionId)
        } else {
            newSet.add(permissionId)
        }
        setLocalPermissionIds(newSet)
        setHasUnsavedChanges(true)
    }

    const handleToggleModuleFull = (moduleName: string) => {
        if (!role || role.isSystem) return

        const modPerms = modules.find(m => m.name === moduleName)?.permissions || []
        const modPermIds = modPerms.map(p => p.id)
        
        const hasAll = modPermIds.every(id => localPermissionIds.has(id))
        
        const newSet = new Set(localPermissionIds)
        if (hasAll) {
            modPermIds.forEach(id => newSet.delete(id))
        } else {
            modPermIds.forEach(id => newSet.add(id))
        }
        setLocalPermissionIds(newSet)
        setHasUnsavedChanges(true)
    }

    const handleSave = async () => {
        if (!role) return
        try {
            setSaving(true)
            const res = await adminService.updateRolePermissions(role.id, Array.from(localPermissionIds))
            if (res.success) {
                toast.success("Permissions synced successfully")
                setHasUnsavedChanges(false)
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to update permissions")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Matrix...</p>
            </div>
        )
    }

    if (!role) {
        return <div className="p-8 text-center text-rose-500 font-black">Role not found</div>
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Link href="/admin/users/roles" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all shadow-sm group">
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <ShieldCheck className="text-blue-600" size={32} />
                            Permission Matrix
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Configuring access for: <span className="text-blue-600 font-bold">{role.name}</span></p>
                    </div>
                </div>

                {hasUnsavedChanges && (
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-blue-600 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Sync Permissions
                    </button>
                )}
            </div>

            {role.isSystem && (
                <div className="p-6 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-3xl flex gap-4 items-center animate-in zoom-in duration-300">
                    <ShieldAlert className="text-amber-600 shrink-0" size={24} />
                    <p className="text-xs text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wide leading-relaxed">
                        This is a system-protected role. Permissions are fixed and cannot be modified via the UI to prevent accidental lockout.
                    </p>
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">System Module</th>
                                <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">View</th>
                                <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Create</th>
                                <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Edit</th>
                                <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Delete</th>
                                <th className="px-8 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {modules.map(mod => {
                                const modPermIds = mod.permissions.map(p => p.id)
                                const isFull = modPermIds.every(id => localPermissionIds.has(id))
                                
                                return (
                                    <tr key={mod.name} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors group">
                                        <td className="px-8 py-6">
                                            <span className="font-bold text-gray-900 dark:text-white text-sm capitalize group-hover:text-blue-600 transition-colors">
                                                {mod.name}
                                            </span>
                                        </td>
                                        {['view', 'create', 'edit', 'delete'].map(action => {
                                            const perm = mod.permissions.find(p => p.action === action)
                                            const isChecked = perm ? localPermissionIds.has(perm.id) : false
                                            
                                            return (
                                                <td key={action} className="px-4 py-6 text-center">
                                                    {perm ? (
                                                        <button 
                                                            disabled={role.isSystem}
                                                            onClick={() => handleTogglePermission(perm.id)}
                                                            className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto transition-all ${
                                                                isChecked 
                                                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30" 
                                                                : "bg-gray-50 text-gray-300 dark:bg-gray-800/50 dark:text-gray-700 hover:bg-gray-100"
                                                            } ${role.isSystem ? 'cursor-not-allowed opacity-70' : 'cursor-pointer active:scale-90 hover:ring-4 hover:ring-blue-500/10'}`}
                                                        >
                                                            {isChecked ? <Check size={18} strokeWidth={3} /> : <X size={18} />}
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-200 dark:text-gray-800 font-bold">-</span>
                                                    )}
                                                </td>
                                            )
                                        })}
                                        <td className="px-8 py-6 text-center">
                                            <button 
                                                disabled={role.isSystem}
                                                onClick={() => handleToggleModuleFull(mod.name)}
                                                className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition-all shadow-sm ${
                                                    isFull 
                                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                                                    : "bg-gray-50 text-gray-300 dark:bg-gray-800/50 dark:text-gray-700 hover:bg-gray-100"
                                                } ${role.isSystem ? 'cursor-not-allowed opacity-70' : 'cursor-pointer active:scale-90'}`}
                                            >
                                                <Shield size={24} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sticky Actions Bar */}
            {hasUnsavedChanges && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 px-8 py-4 rounded-[2.5rem] shadow-2xl shadow-blue-600/10 flex items-center gap-8 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Unsaved Changes</span>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">You have modified the permission matrix</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => fetchData()}
                            className="text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Discard
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                        >
                            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                            Save Matrix
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
