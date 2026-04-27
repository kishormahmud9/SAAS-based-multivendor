"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Mail, Calendar, Shield, ShoppingBag, MapPin, Loader2, Eye } from "lucide-react"
import { toast } from "react-hot-toast"
import { fetchWithAuth } from "@/lib/api/fetchWithAuth"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function AdminUserDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [roleToChangeTo, setRoleToChangeTo] = useState<string | null>(null)

    useEffect(() => {
        if (params?.id) {
            fetchUser()
        }
    }, [params?.id])

    const fetchUser = async () => {
        try {
            const res = await fetchWithAuth(`/api/admin/users/${params?.id}`)
            const data = await res.json()
            if (data.success) {
                setUser(data.data)
            } else {
                toast.error("User not found")
                router.push("/admin/users")
            }
        } catch (error) {
            toast.error("Failed to load user")
        } finally {
            setLoading(false)
        }
    }

    const handleRoleUpdate = async (newRole: string) => {
        setRoleToChangeTo(null)
        setUpdating(true)
        try {
            const res = await fetchWithAuth(`/api/admin/users/${params?.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole }),
            })
            const data = await res.json()

            if (data.success) {
                toast.success(`User role updated to ${newRole}`)
                setUser({ ...user, role: newRole })
            } else {
                toast.error(data.error || "Failed to update role")
            }
        } catch (error) {
            toast.error("Failed to update role")
        } finally {
            setUpdating(false)
        }
    }

    if (loading) return <div className="p-12 text-center"><Loader2 className="animate-spin mx-auto text-orange-600" size={32} /></div>
    if (!user) return <div>User not found</div>

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/users" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-900 dark:text-white">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Details</h1>
                    <p className="text-gray-600 dark:text-gray-400">View and manage user information</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name || "No Name"}</h2>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                                        <Mail size={16} />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                                        <Calendar size={16} />
                                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-green-100 text-green-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                    }`}>
                                    {user.role === 'ADMIN' && <Shield size={14} />}
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Role Management</h3>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setRoleToChangeTo("USER")}
                                    disabled={user.role === "USER" || updating}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${user.role === "USER"
                                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                        : "bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                        }`}
                                >
                                    Set as User
                                </button>
                                <button
                                    onClick={() => setRoleToChangeTo("ADMIN")}
                                    disabled={user.role === "ADMIN" || updating}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${user.role === "ADMIN"
                                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                        : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-600/20"
                                        }`}
                                >
                                    Set as Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <ShoppingBag size={20} className="text-gray-500 dark:text-gray-400" />
                                Recent Orders
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Total: {user._count.orders}</span>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-gray-800">
                            {user.orders.length === 0 ? (
                                <div className="p-6 text-center text-gray-500 dark:text-gray-400 italic">No orders yet</div>
                            ) : (
                                user.orders.map((order: any) => (
                                    <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white uppercase tracking-tighter">{order.orderNumber}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-gray-900 dark:text-white">${Number(order.totalAmount).toFixed(2)}</p>
                                            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{order.status}</span>
                                        </div>
                                        <Link href={`/admin/orders/${order.id}`} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                            <Eye size={18} />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Addresses */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <MapPin size={20} className="text-gray-500 dark:text-gray-400" />
                                Addresses
                            </h3>
                        </div>
                        <div className="p-6 space-y-4">
                            {user.addresses.length === 0 ? (
                                <p className="text-gray-500 dark:text-gray-400 italic">No addresses saved</p>
                            ) : (
                                user.addresses.map((addr: any) => (
                                    <div key={addr.id} className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl text-sm text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700/50">
                                        <p className="font-black text-[10px] text-orange-600 uppercase tracking-widest mb-2">{addr.type === 'BILLING' ? 'Billing Address' : 'Shipping Address'}</p>
                                        <div className="space-y-1 font-medium">
                                            <p className="text-gray-900 dark:text-white">{addr.street}</p>
                                            <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">{addr.country}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={!!roleToChangeTo}
                onClose={() => setRoleToChangeTo(null)}
                onConfirm={() => roleToChangeTo && handleRoleUpdate(roleToChangeTo)}
                title="Change User Role"
                message={`Are you sure you want to change this user's role to ${roleToChangeTo}?`}
                confirmText="Update Role"
                variant="primary"
            />
        </div>
    )
}
