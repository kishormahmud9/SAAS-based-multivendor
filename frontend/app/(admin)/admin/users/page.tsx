"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Eye, ChevronLeft, ChevronRight, Loader2, User as UserIcon, Shield, Edit, Plus, CheckCircle2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { adminService } from "@/src/services/admin.service"
import { apiClient } from "@/src/lib/api-client"
import { getImageUrl } from "@/src/lib/image-utils"
import Modal from "@/components/ui/Modal"

interface User {
    id: string
    name: string | null
    email: string
    avatar: string | null
    systemRole: "CUSTOMER" | "ADMIN" | "VENDOR" | "SUPER_ADMIN"
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION"
    emailVerified: string | null
    phoneVerified: string | null
    createdAt: string
    roleAssignments: { role: { id: string, name: string } }[]
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
    const [statusFilter, setStatusFilter] = useState("")
    const [systemRoleFilter, setSystemRoleFilter] = useState("")
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
        const timer = setTimeout(() => {
            fetchUsers()
        }, 300)
        return () => clearTimeout(timer)
    }, [page, search, statusFilter, systemRoleFilter])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
                search: search,
                status: statusFilter,
                systemRole: systemRoleFilter
            }).toString()

            const data = await adminService.getUsers(params)
            if (data.success) {
                setUsers(data.data)
                if (data.meta) {
                    setTotalPages(data.meta.totalPage)
                }
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
        setSelectedRoleIds(new Set(user.roleAssignments?.map(ur => ur.role.id) || []))
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


    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <UserIcon className="text-orange-500" size={32} />
                        Users Directory
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Manage registered users and assign custom RBAC roles</p>
                </div>
                <Link
                    href="/admin/users/create"
                    className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2 shadow-xl shadow-orange-500/20 active:scale-95"
                >
                    <Plus className="text-white" size={18} /> Create New User
                </Link>
            </div>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search Field */}
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium transition-all"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700 dark:text-gray-300 transition-all appearance-none"
                    >
                        <option value="">All Statuses</option>
                        <option value="ACTIVE">Active Users</option>
                        <option value="SUSPENDED">Suspended</option>
                        <option value="PENDING_VERIFICATION">Unverified</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>

                    {/* Role Filter */}
                    <select
                        value={systemRoleFilter}
                        onChange={(e) => setSystemRoleFilter(e.target.value)}
                        className="px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700 dark:text-gray-300 transition-all appearance-none"
                    >
                        <option value="">All Roles</option>
                        <option value="SUPER_ADMIN">Super Admins</option>
                        <option value="ADMIN">Admins</option>
                        <option value="VENDOR">Vendors</option>
                        <option value="CUSTOMER">Customers</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-8 py-5">User Identity</th>
                                <th className="px-6 py-5">Classification</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5">Trust Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin mx-auto text-orange-600" size={32} />
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-12">
                                                    {user.avatar ? (
                                                        <Image
                                                            src={getImageUrl(user.avatar)}
                                                            alt={user.name || ""}
                                                            fill
                                                            unoptimized
                                                            className="rounded-2xl object-cover ring-2 ring-gray-100 dark:ring-gray-800 group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
                                                            <UserIcon size={20} />
                                                        </div>
                                                    )}
                                                    {user.status === 'ACTIVE' && (
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{user.name || "Anonymous"}</p>
                                                    <p className="text-[11px] text-gray-500 font-medium mt-0.5">{user.email}</p>
                                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-tighter mt-1">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1.5">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.systemRole === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' :
                                                        user.systemRole === 'ADMIN' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20' :
                                                            user.systemRole === 'VENDOR' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' :
                                                                'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'
                                                    }`}>
                                                    <Shield size={10} />
                                                    {user.systemRole}
                                                </span>
                                                <div className="flex flex-wrap gap-1">
                                                    {user.roleAssignments?.map(ur => (
                                                        <span key={ur.role.id} className="text-[9px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded uppercase">
                                                            {ur.role.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20' :
                                                    user.status === 'SUSPENDED' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20' :
                                                        'bg-orange-50 text-orange-600 dark:bg-orange-900/20'
                                                }`}>
                                                <div className={`w-1 h-1 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-current'}`} />
                                                {user.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex items-center gap-1 text-[10px] font-bold ${user.emailVerified ? 'text-emerald-500' : 'text-gray-300'}`}>
                                                    <CheckCircle2 size={14} />
                                                    Email
                                                </div>
                                                <div className={`flex items-center gap-1 text-[10px] font-bold ${user.phoneVerified ? 'text-emerald-500' : 'text-gray-300'}`}>
                                                    <CheckCircle2 size={14} />
                                                    Phone
                                                </div>
                                            </div>
                                            {user._count?.orders !== undefined && (
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">{user._count.orders} Orders Placed</p>
                                            )}
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/users/${user.id}/edit`}
                                                    className="inline-flex items-center justify-center p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
                                                    title="Edit User Profile"
                                                >
                                                    <Edit size={18} />
                                                </Link>
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
                                disabled={assigning}
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
