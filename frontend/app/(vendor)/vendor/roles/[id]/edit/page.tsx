"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { 
    Shield, 
    ChevronLeft, 
    Save, 
    X,
    Info,
    Lock,
    Trash2,
    Copy
} from "lucide-react"
import { PermissionMatrix } from "@/components/vendor/PermissionMatrix"
import { toast } from "react-hot-toast"

const MOCK_ROLES = [
    { id: "1", name: "Manager", desc: "Full access to all store operations and staff management.", status: "Active", permissions: ["dashboard.view", "products.view", "products.add", "products.edit", "products.delete", "orders.view", "orders.update", "staff.view", "staff.add", "staff.edit"] },
    { id: "2", name: "Sales Agent", desc: "Can manage products and orders but cannot see financial reports.", status: "Active", permissions: ["dashboard.view", "products.view", "products.inventory", "orders.view", "orders.update"] },
]

export default function EditRolePage() {
    const router = useRouter()
    const { id } = useParams()
    
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [status, setStatus] = useState("Active")
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

    useEffect(() => {
        const role = MOCK_ROLES.find(r => r.id === id)
        if (role) {
            setName(role.name)
            setDesc(role.desc)
            setStatus(role.status)
            setSelectedPermissions(role.permissions)
        }
    }, [id])

    const handleSave = () => {
        if (!name) {
            toast.error("Please provide a role name")
            return
        }
        toast.success("Role updated successfully!")
        router.push("/vendor/roles")
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/vendor/roles" className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors shadow-sm">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <Shield className="text-blue-600" size={32} />
                            Edit Role: {name}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Update access levels and permissions for this custom role.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-red-500 transition-all shadow-sm">
                        <Trash2 size={20} />
                    </button>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2" onClick={handleSave}>
                        <Save size={18} /> Update Role
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Role Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-28">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <Info size={20} className="text-blue-500" />
                            Role Details
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Role Name</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Description</label>
                                <textarea 
                                    rows={4}
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none resize-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Role Status</label>
                                <div className="flex p-1 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                                    <button 
                                        onClick={() => setStatus("Active")}
                                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Active' ? 'bg-white dark:bg-gray-900 text-emerald-600 shadow-sm' : 'text-gray-400'}`}
                                    >
                                        Active
                                    </button>
                                    <button 
                                        onClick={() => setStatus("Inactive")}
                                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${status === 'Inactive' ? 'bg-white dark:bg-gray-900 text-rose-500 shadow-sm' : 'text-gray-400'}`}
                                    >
                                        Inactive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-2xl flex items-center justify-center gap-3 text-blue-600 text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all">
                        <Copy size={16} /> Duplicate Role
                    </button>
                </div>

                {/* Right: Permission Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    <PermissionMatrix 
                        selectedPermissions={selectedPermissions}
                        onChange={setSelectedPermissions}
                    />
                </div>
            </div>

        </div>
    )
}
