"use client"

import { useState } from "react"
import { PERMISSION_GROUPS, ALL_PERMISSION_IDS } from "@/lib/permissions"
import { 
    CheckSquare, 
    Square, 
    ChevronDown, 
    ChevronRight, 
    Search,
    Shield,
    Check
} from "lucide-react"

type PermissionMatrixProps = {
    selectedPermissions: string[]
    onChange: (permissions: string[]) => void
}

export function PermissionMatrix({ selectedPermissions, onChange }: PermissionMatrixProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedGroups, setExpandedGroups] = useState<string[]>(PERMISSION_GROUPS.map(g => g.id))

    const toggleGroup = (groupId: string) => {
        setExpandedGroups(prev => 
            prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
        )
    }

    const togglePermission = (permissionId: string) => {
        if (selectedPermissions.includes(permissionId)) {
            onChange(selectedPermissions.filter(id => id !== permissionId))
        } else {
            onChange([...selectedPermissions, permissionId])
        }
    }

    const toggleAllInGroup = (groupId: string, groupPermissionIds: string[]) => {
        const allSelected = groupPermissionIds.every(id => selectedPermissions.includes(id))
        if (allSelected) {
            onChange(selectedPermissions.filter(id => !groupPermissionIds.includes(id)))
        } else {
            const newPermissions = [...new Set([...selectedPermissions, ...groupPermissionIds])]
            onChange(newPermissions)
        }
    }

    const toggleAll = () => {
        if (selectedPermissions.length === ALL_PERMISSION_IDS.length) {
            onChange([])
        } else {
            onChange(ALL_PERMISSION_IDS)
        }
    }

    const filteredGroups = PERMISSION_GROUPS.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.permissions.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={toggleAll}
                        className="flex items-center gap-3 group"
                    >
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            selectedPermissions.length === ALL_PERMISSION_IDS.length 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'border-gray-300 dark:border-gray-700 text-transparent'
                        }`}>
                            <Check size={14} strokeWidth={4} />
                        </div>
                        <span className="text-sm font-black text-gray-700 dark:text-gray-200 uppercase tracking-widest">Select All Permissions</span>
                    </button>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
                    <p className="text-xs font-bold text-gray-500">
                        <span className="text-blue-600 font-black">{selectedPermissions.length}</span> of {ALL_PERMISSION_IDS.length} assigned
                    </p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search permissions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
            </div>

            {/* Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGroups.map((group) => {
                    const groupPermissionIds = group.permissions.map(p => p.id)
                    const allInGroupSelected = groupPermissionIds.every(id => selectedPermissions.includes(id))
                    const someInGroupSelected = groupPermissionIds.some(id => selectedPermissions.includes(id)) && !allInGroupSelected
                    const isExpanded = expandedGroups.includes(group.id)

                    return (
                        <div key={group.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                            <div className="p-6 flex items-center justify-between border-b border-gray-50 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/50">
                                <button 
                                    onClick={() => toggleGroup(group.id)}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-white dark:bg-gray-950 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors shadow-sm">
                                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                    </div>
                                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">{group.name}</h4>
                                </button>
                                
                                <button 
                                    onClick={() => toggleAllInGroup(group.id, groupPermissionIds)}
                                    className="flex items-center gap-2 group"
                                >
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Select Group</span>
                                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                        allInGroupSelected ? 'bg-blue-600 border-blue-600 text-white' : 
                                        someInGroupSelected ? 'bg-blue-100 border-blue-600 text-blue-600 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-700 text-transparent'
                                    }`}>
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="p-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
                                    {group.permissions.map((permission) => (
                                        <label 
                                            key={permission.id}
                                            className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all group"
                                        >
                                            <div 
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    togglePermission(permission.id)
                                                }}
                                                className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                                                    selectedPermissions.includes(permission.id) 
                                                    ? 'bg-blue-600 border-blue-600 text-white' 
                                                    : 'border-gray-300 dark:border-gray-700 text-transparent group-hover:border-blue-500'
                                                }`}
                                            >
                                                <Check size={10} strokeWidth={4} />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{permission.name}</p>
                                                <p className="text-[10px] text-gray-500 mt-1 font-medium">{permission.description}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
