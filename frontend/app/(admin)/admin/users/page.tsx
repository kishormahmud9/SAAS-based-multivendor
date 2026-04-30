"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Eye, ChevronLeft, ChevronRight, Loader2, User as UserIcon, Shield, Edit } from "lucide-react"
import { toast } from "react-hot-toast"
import { adminService } from "@/src/services/admin.service"
import { apiClient } from "@/src/lib/api-client"
import Modal from "@/components/ui/Modal"

interface User {
    id: string
    name: string | null
    email: string
    systemRole: "CUSTOMER" | "ADMIN" | "VENDOR" | "SUPER_ADMIN"
    createdAt: string
    userRoles: { role: { id: string, name: string } }[]
    _count?: {
        orders: number
    }
}

interface Role {
    id: string
    name: string
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    // Roles assignment
    const [allRoles, setAllRoles] = useState<Role[]>([])
    const [assignModalOpen, setAssignModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [selectedRoleIds, setSelectedRoleIds] = useState<Set<string>>(new Set())
    const [assigning, setAssigning] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchUsers()
        fetchRoles()
    }, [page])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const data = await adminService.getUsers() // Backend needs to support pagination/search
            if (data.success) {
                setUsers(data.data)
                // Backend pagination logic here if available
            }
        } catch (err) {
            toast.error((err as Error).message || "Failed to load users")
        } finally {
            setLoading(false)
        }
    }

    const fetchRoles = async () => {
        try {
            const res = await apiClient('/roles')
            setAllRoles(res.data)
        } catch (err) {
            console.error("Failed to fetch roles", err)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
        fetchUsers()
    }

    const openAssignModal = (user: User) => {
        setSelectedUser(user)
        setSelectedRoleIds(new Set(user.userRoles?.map(ur => ur.role.id) || []))
        setAssignModalOpen(true)
    }

    const toggleRole = (roleId: string) => {
        const newSet = new Set(selectedRoleIds)
        if (newSet.has(roleId)) newSet.delete(roleId)
        else newSet.add(roleId)
        setSelectedRoleIds(newSet)
    }

    const handleAssignRoles = async () => {
        if (!selectedUser) return
        setAssigning(true)
        try {
            await adminService.assignUserRoles(selectedUser.id, Array.from(selectedRoleIds))
            toast.success("Roles assigned successfully")
            setAssignModalOpen(false)
            fetchUsers()
        } catch (err) {
            toast.error((err as Error).message || "Failed to assign roles")
        } finally {
            setAssigning(false)
        }
    }

    const filteredUsers = users.filter(u => 
        (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users Directory</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage registered users and assign custom RBAC roles</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by Name or Email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>
                </form>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">System Role</th>
                                <th className="px-6 py-3">Assigned Roles</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin mx-auto text-orange-600" size={32} />
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                                                    <UserIcon size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{user.name || "No Name"}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                user.systemRole === 'SUPER_ADMIN' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                                user.systemRole === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 
                                                user.systemRole === 'VENDOR' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                }`}>
                                                {(user.systemRole === 'ADMIN' || user.systemRole === 'SUPER_ADMIN') && <Shield size={12} />}
                                                {user.systemRole}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.systemRole === 'SUPER_ADMIN' ? (
                                                 <span className="text-xs text-gray-500 italic">All Permissions (Bypass)</span>
                                            ) : (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {user.userRoles?.length > 0 ? (
                                                        user.userRoles.map(ur => (
                                                            <span key={ur.role.id} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-[10px] px-2 py-0.5 rounded font-medium">
                                                                {ur.role.name}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openAssignModal(user)}
                                                    className="inline-flex items-center justify-center p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                                                    title="Assign Roles"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <Link
                                                    href={`/admin/users/${user.id}`}
                                                    className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title={`Assign Roles to ${selectedUser?.name || 'User'}`} maxWidth="md">
                {selectedUser?.systemRole === 'SUPER_ADMIN' ? (
                     <div className="p-4 text-center">
                         <Shield className="mx-auto text-red-500 mb-2" size={48} />
                         <p className="text-gray-700 dark:text-gray-300 font-bold mb-1">Super Admin Account</p>
                         <p className="text-sm text-gray-500">Super Admins inherently possess all permissions. Custom role assignments are bypassed.</p>
                     </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Select the custom RBAC roles you want to assign to this user. This will grant them the specific permissions associated with each role.
                        </p>
                        
                        <div className="max-h-60 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-800 rounded-xl p-2 bg-gray-50 dark:bg-gray-900/50">
                            {allRoles.length === 0 ? (
                                <p className="p-4 text-sm text-center text-gray-500">No custom roles found. Create roles in the Roles & Permissions page first.</p>
                            ) : (
                                allRoles.map(role => (
                                    <label key={role.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-800 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedRoleIds.has(role.id)}
                                            onChange={() => toggleRole(role.id)}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="font-medium text-sm text-gray-900 dark:text-white">{role.name}</span>
                                    </label>
                                ))
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button onClick={() => setAssignModalOpen(false)} className="px-4 py-2 font-bold text-gray-500 hover:text-gray-700">Cancel</button>
                            <button 
                                onClick={handleAssignRoles}
                                disabled={assigning || selectedUser?.systemRole === 'SUPER_ADMIN'}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-600/20 disabled:opacity-50"
                            >
                                {assigning ? "Saving..." : "Save Assignments"}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}
