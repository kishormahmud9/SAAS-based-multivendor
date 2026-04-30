"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, UserCog, Loader2 } from "lucide-react"
import UserForm from "@/components/admin/UserForm"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"

export default function AdminEditUserPage() {
    const params = useParams()
    const router = useRouter()
    const userId = params.id as string

    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

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
            toast.error("Failed to load user data")
            router.push("/admin/users")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="p-12 flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="animate-spin text-orange-600" size={40} />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Fetching User Data...</p>
            </div>
        )
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => router.back()} 
                    className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-sm group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 uppercase tracking-tight">
                        <UserCog className="text-orange-500" size={32} />
                        Edit User Profile
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Update account details and administrative permissions for <span className="text-orange-500 font-bold">{user.name}</span>.</p>
                </div>
            </div>

            <UserForm initialData={user} isEdit={true} />
        </div>
    )
}
