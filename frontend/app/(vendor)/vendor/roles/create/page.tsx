"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
    Shield, 
    ChevronLeft, 
    Save, 
    X,
    Info,
    CheckCircle2,
    Lock
} from "lucide-react"
import { PermissionMatrix } from "@/components/vendor/PermissionMatrix"
import { toast } from "react-hot-toast"

export default function CreateRolePage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [status, setStatus] = useState("Active")
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

    const handleSave = () => {
        if (!name) {
            toast.error("Please provide a role name")
            return
        }
        if (selectedPermissions.length === 0) {
            toast.error("Please assign at least one permission")
            return
        }

        toast.success("Role created successfully!")
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
                            Create Custom Role
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Define access levels by selecting specific permissions for this role.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => router.push("/vendor/roles")}
                        className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-black text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                        <Save size={18} /> Save Role
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
                                    placeholder="e.g. Sales Manager"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Description</label>
                                <textarea 
                                    placeholder="Briefly explain what this role can do..."
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

                        <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-800">
                             <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex gap-3">
                                <Lock className="text-blue-600 shrink-0" size={18} />
                                <p className="text-[10px] text-blue-700/70 dark:text-blue-300/70 font-medium leading-relaxed">System roles like "Owner" cannot be deleted or modified. Custom roles can be assigned to any staff member.</p>
                             </div>
                        </div>
                    </div>
                </div>

                {/* Right: Permission Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Assign Permissions</h3>
                        <p className="text-xs font-bold text-gray-400">{selectedPermissions.length} selected</p>
                    </div>

                    <PermissionMatrix 
                        selectedPermissions={selectedPermissions}
                        onChange={setSelectedPermissions}
                    />
                </div>
            </div>

            {/* Bottom Actions for Mobile */}
            <div className="md:hidden sticky bottom-6 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-[2.5rem] shadow-2xl flex items-center gap-3 z-30">
                <button 
                    onClick={handleSave}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2"
                >
                    <Save size={18} /> Save Role
                </button>
            </div>

        </div>
    )
}
