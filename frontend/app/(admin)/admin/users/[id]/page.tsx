"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
    ChevronLeft, 
    User as UserIcon, 
    Mail, 
    Calendar, 
    Shield, 
    ShoppingBag, 
    MapPin, 
    Loader2, 
    Eye, 
    EyeOff,
    Phone, 
    History,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    Clock,
    Key,
    UserX,
    UserCheck,
    Copy,
    Wand2,
    RefreshCw,
    XCircle,
    UserCircle,
    Globe
} from "lucide-react"
import { toast } from "react-hot-toast"
import { adminService } from "@/src/services/admin.service"
import ConfirmModal from "@/components/ui/ConfirmModal"
import Modal from "@/components/ui/Modal"
import { getImageUrl } from "@/src/lib/image-utils"

export default function AdminUserDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const userId = params.id as string

    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    
    // Modals state
    const [showSuspendModal, setShowSuspendModal] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)
    
    // Password reset state
    const [newPassword, setNewPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [tempPassword, setTempPassword] = useState<string | null>(null)

    useEffect(() => {
        if (userId) {
            fetchUser()
        }
    }, [userId])

    const fetchUser = async () => {
        try {
            setLoading(true)
            const res = await adminService.getUserById(userId)
            if (res.success) {
                setUser(res.data)
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

    const handleToggleStatus = async () => {
        setActionLoading(true)
        const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
        try {
            const res = await adminService.updateUserStatus(userId, newStatus)
            if (res.success) {
                toast.success(`User ${newStatus === 'ACTIVE' ? 'activated' : 'suspended'} successfully`)
                setUser({ ...user, status: newStatus })
                setShowSuspendModal(false)
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update status")
        } finally {
            setActionLoading(false)
        }
    }

    const handleResetPassword = async () => {
        if (!newPassword) {
            toast.error("Please enter or generate a password")
            return
        }
        setActionLoading(true)
        try {
            const res = await adminService.resetUserPassword(userId, newPassword)
            if (res.success) {
                setTempPassword(res.data.temporaryPassword)
                toast.success("Password updated successfully")
                setShowResetModal(false)
                setNewPassword("")
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to update password")
        } finally {
            setActionLoading(false)
        }
    }

    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
        let password = ""
        for (let i = 0; i < 12; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length))
        }
        setNewPassword(password)
        setShowPassword(true)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    }

    if (loading) {
        return (
            <div className="p-12 flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="animate-spin text-orange-600" size={40} />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Profile...</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="p-12 text-center space-y-4">
                <AlertCircle className="mx-auto text-rose-500" size={48} />
                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">User Not Found</h2>
                <Link href="/admin/users" className="text-orange-500 font-bold hover:underline">Back to Directory</Link>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Top Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <Link href="/admin/users" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-sm group">
                        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                User Profile
                            </h1>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'
                            }`}>
                                {user.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 font-medium mt-1">
                            Unique ID: <span className="font-mono text-xs">{user.id}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link 
                        href={`/admin/users/${userId}/edit`}
                        className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:border-orange-500 transition-all flex items-center gap-2"
                    >
                        <ShieldCheck size={14} /> Edit Profile
                    </Link>
                    <button 
                        onClick={() => setShowResetModal(true)}
                        className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-black text-[10px] uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:border-orange-500 transition-all flex items-center gap-2"
                    >
                        <Key size={14} /> Reset Password
                    </button>
                    <button 
                        onClick={() => setShowSuspendModal(true)}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 ${
                            user.status === 'ACTIVE' 
                            ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20' 
                            : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/20'
                        }`}
                    >
                        {user.status === 'ACTIVE' ? <><UserX size={14} /> Suspend User</> : <><UserCheck size={14} /> Activate User</>}
                    </button>
                </div>
            </div>

            {/* Temporary Password Alert */}
            {tempPassword && (
                <div className="bg-orange-500 text-white p-6 rounded-[2rem] shadow-xl shadow-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-500">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest opacity-80">Password Successfully Updated</p>
                            <p className="text-sm font-bold opacity-90">The new password has been applied to this account.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setTempPassword(null)}
                            className="px-6 py-3 bg-black/20 hover:bg-black/30 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN - Personal Info & Status */}
                <div className="space-y-8">
                    {/* Bio Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-orange-500/10 transition-colors" />
                        
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-300">
                                {user.avatar ? (
                                    <img 
                                        src={getImageUrl(user.avatar)} 
                                        alt={user.name} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon size={64} className="text-gray-300" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{user.name}</h2>
                                <div className="flex items-center justify-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[8px] font-black text-gray-500 uppercase tracking-widest">
                                        System Role: {user.systemRole}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-5 border-t border-gray-50 dark:border-gray-800 pt-8">
                            <div className="flex items-center gap-4 group/item">
                                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group/item">
                                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.phone || "Not Provided"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group/item">
                                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                    <UserCircle size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Demographics</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                                        {user.gender || 'Not Specified'} • {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'No DOB'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group/item">
                                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:text-orange-500 transition-colors">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Member Since</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RBAC Roles Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Assigned Roles</h3>
                            </div>
                            <Link href={`/admin/users/${userId}/edit`} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Manage</Link>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {user.roleAssignments?.length > 0 ? (
                                user.roleAssignments.map((ra: any) => (
                                    <span key={ra.role.id} className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800">
                                        {ra.role.name}
                                    </span>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 font-bold italic">No custom RBAC roles assigned</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* MIDDLE & RIGHT - Stats, Activity, Orders */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-orange-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600">
                                    <ShoppingBag size={24} />
                                </div>
                            </div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Lifetime Orders</h4>
                            <p className="text-3xl font-black text-gray-900 dark:text-white">{user._count?.orders || 0}</p>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-emerald-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <Shield size={24} />
                                </div>
                            </div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Trust Status</h4>
                            <div className="space-y-1 mt-1">
                                <div className="flex items-center gap-2">
                                    {user.emailVerified ? <CheckCircle2 size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-rose-400" />}
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${user.emailVerified ? 'text-emerald-600' : 'text-rose-400'}`}>Email {user.emailVerified ? 'Verified' : 'Pending'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {user.phoneVerified ? <CheckCircle2 size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-rose-400" />}
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${user.phoneVerified ? 'text-emerald-600' : 'text-rose-400'}`}>Phone {user.phoneVerified ? 'Verified' : 'Pending'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-indigo-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <Clock size={24} />
                                </div>
                            </div>
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Account History</h4>
                            <div className="mt-1">
                                <p className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-tighter">Last Seen: <span className="text-gray-500 font-medium">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never"}</span></p>
                                <p className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-tighter mt-1">Updated: <span className="text-gray-500 font-medium">{new Date(user.updatedAt).toLocaleDateString()}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Address Book */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Saved Addresses</h3>
                            </div>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{user.addresses?.length || 0} Entries</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {user.addresses?.length > 0 ? (
                                user.addresses.map((addr: any) => (
                                    <div key={addr.id} className="p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-[2rem] border border-gray-100 dark:border-gray-800/50 relative group transition-all hover:border-emerald-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg text-[8px] font-black uppercase tracking-widest text-emerald-600">
                                                {addr.label || addr.type} Address
                                            </span>
                                            {addr.isDefault && (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">Default</span>
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-black text-gray-900 dark:text-white">{addr.fullName || user.name}</p>
                                            <p className="text-xs font-bold text-gray-600 dark:text-gray-400">{addr.street}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{addr.city}, {addr.state} {addr.zipCode}</p>
                                            <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2 flex items-center gap-1">
                                                <Globe size={10} /> {addr.country}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 bg-gray-50 dark:bg-gray-800/30 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-700 text-center">
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest italic">No addresses added to this account yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Order History */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <History size={20} className="text-orange-500" />
                                <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">Recent Activity</h3>
                            </div>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last 5 Orders</span>
                        </div>
                        <div className="divide-y divide-gray-50 dark:divide-gray-800">
                            {user.orders?.length === 0 ? (
                                <div className="p-12 text-center text-gray-400 italic text-sm font-medium bg-white dark:bg-gray-900">
                                    No purchase history available for this user.
                                </div>
                            ) : (
                                user.orders.map((order: any) => (
                                    <div key={order.id} className="px-8 py-6 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors flex items-center justify-between group bg-white dark:bg-gray-900">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                                                <ShoppingBag size={20} />
                                            </div>
                                            <div>
                                                <p className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tighter">#{order.orderNumber || order.id.slice(-8).toUpperCase()}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="font-black text-gray-900 dark:text-white text-sm">${Number(order.totalAmount).toFixed(2)}</p>
                                                <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest">{order.status}</span>
                                            </div>
                                            <Link 
                                                href={`/admin/orders/${order.id}`} 
                                                className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all active:scale-90"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal 
                isOpen={showSuspendModal}
                onClose={() => setShowSuspendModal(false)}
                onConfirm={handleToggleStatus}
                title={user.status === 'ACTIVE' ? "Suspend User Access" : "Reactivate User Access"}
                message={user.status === 'ACTIVE' 
                    ? `Are you sure you want to suspend ${user.name}? They will no longer be able to log in or perform any actions.`
                    : `Are you sure you want to reactivate ${user.name}? Their full access will be restored.`
                }
                confirmText={user.status === 'ACTIVE' ? "Suspend Now" : "Reactivate Now"}
                variant={user.status === 'ACTIVE' ? "danger" : "primary"}
                loading={actionLoading}
            />

            <Modal
                isOpen={showResetModal}
                onClose={() => {
                    setShowResetModal(false)
                    setNewPassword("")
                }}
                title="Update User Password"
                maxWidth="md"
            >
                <div className="space-y-6 p-2">
                    <div className="flex flex-col items-center text-center space-y-2 mb-4">
                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600">
                            <Key size={32} />
                        </div>
                        <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Manual Password Override</h4>
                        <p className="text-xs text-gray-500 font-medium">You are about to manually change the login credentials for <span className="font-bold text-gray-700 dark:text-gray-300">{user.name}</span>.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-1 block">New Secure Password</label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password..."
                                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all pr-24"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <button 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-400"
                                        title={showPassword ? "Hide Password" : "Show Password"}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                    <button 
                                        onClick={generatePassword}
                                        className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-colors text-orange-600"
                                        title="Auto-Generate"
                                    >
                                        <Wand2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {newPassword && (
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <Shield size={16} className="text-blue-600" />
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Strength Verified</span>
                                </div>
                                <button 
                                    onClick={() => copyToClipboard(newPassword)}
                                    className="text-[10px] font-black text-gray-500 hover:text-gray-900 dark:hover:text-white uppercase tracking-widest flex items-center gap-1"
                                >
                                    <Copy size={12} /> Copy
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button 
                            onClick={() => {
                                setShowResetModal(false)
                                setNewPassword("")
                            }}
                            className="flex-1 py-4 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleResetPassword}
                            disabled={actionLoading || !newPassword}
                            className="flex-[2] py-4 bg-orange-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {actionLoading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                            Update Password
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
