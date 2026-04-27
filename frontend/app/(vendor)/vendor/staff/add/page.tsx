"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
    UserPlus, 
    ChevronLeft, 
    Save, 
    Mail, 
    User, 
    Phone, 
    Shield, 
    ChevronDown,
    AlertCircle,
    X,
    Lock
} from "lucide-react"
import { PermissionMatrix } from "@/components/vendor/PermissionMatrix"
import { toast } from "react-hot-toast"

const MOCK_ROLES = [
    { id: "1", name: "Manager" },
    { id: "2", name: "Sales Agent" },
    { id: "3", name: "Support Rep" },
    { id: "4", name: "Inventory Specialist" },
]

export default function AddStaffPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [showOverrides, setShowOverrides] = useState(false)
    const [overrides, setOverrides] = useState<string[]>([])

    const handleSave = () => {
        if (!name || !email || !role) {
            toast.error("Please fill in all required fields")
            return
        }
        toast.success("Staff member invited successfully!")
        router.push("/vendor/staff")
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/vendor/staff" className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors shadow-sm">
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <UserPlus className="text-blue-600" size={32} />
                            Invite New Staff
                        </h1>
                        <p className="text-sm text-gray-500 font-medium mt-1">Add a team member and assign them a specific access role.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleSave} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                        <Save size={18} /> Send Invitation
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Staff Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest text-[10px] mb-4">Personal Details</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Jessica Alba"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input 
                                        type="email" 
                                        placeholder="jessica@store.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-widest text-[10px] mb-4">Access Assignment</h3>
                        
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Select Role</label>
                                <div className="relative">
                                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select 
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full pl-12 pr-10 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="">Choose a role...</option>
                                        {MOCK_ROLES.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowOverrides(!showOverrides)}
                            className="w-full py-4 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 hover:border-blue-100 dark:hover:border-blue-900/30 transition-all flex items-center justify-center gap-2"
                        >
                            {showOverrides ? <X size={14} /> : <Plus size={14} />}
                            {showOverrides ? "Remove Permission Overrides" : "Add Permission Overrides"}
                        </button>
                    </div>
                </div>

                {/* Right: Overrides */}
                <div className="lg:col-span-2 space-y-6">
                    {showOverrides ? (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-3xl flex gap-4">
                                <AlertCircle className="text-blue-600 shrink-0" size={24} />
                                <div>
                                    <h4 className="text-sm font-black text-blue-900 dark:text-blue-100">Custom Overrides Enabled</h4>
                                    <p className="text-xs text-blue-700/70 dark:text-blue-300/70 font-medium mt-1">Selecting permissions here will override the defaults set by the chosen role. Use this for specific one-off permissions.</p>
                                </div>
                            </div>
                            <PermissionMatrix 
                                selectedPermissions={overrides}
                                onChange={setOverrides}
                            />
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] rounded-[3rem] border-4 border-dashed border-gray-50 dark:border-gray-800/50 flex flex-col items-center justify-center text-center p-12 space-y-4">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-gray-300">
                                <Lock size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-400">Default Role Permissions</h3>
                                <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto mt-2">The staff member will inherit all permissions from the selected role unless you enable overrides.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

import { Plus } from "lucide-react"
