"use client"

import Link from "next/link"
import { ChevronLeft, ShieldPlus } from "lucide-react"
import RoleForm from "@/components/admin/RoleForm"

export default function AdminCreateRolePage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6">
                <Link href="/admin/users/roles" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all shadow-sm group">
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <ShieldPlus className="text-blue-600" size={32} />
                        Create New Role
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Define a new authority level with custom permissions.</p>
                </div>
            </div>

            <RoleForm />
        </div>
    )
}
