"use client"

import { useState } from "react"
import {
    Sliders,
    Plus,
    Search,
    Edit3,
    Trash2,
    Settings,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Info,
    LayoutGrid,
    Type,
    Palette,
    Layers,
    Move
} from "lucide-react"

// ─── Data ──────────────────────────────────────────────────────────────────
interface AttributeValue {
    id: string
    label: string
    value: string // e.g., hex code or just label
}

interface AttributeGroup {
    id: string
    name: string
    slug: string
    type: "text" | "color" | "number" | "boolean"
    values: AttributeValue[]
    status: "active" | "inactive"
    productCount: number
}

const mockAttributes: AttributeGroup[] = [
    { 
        id: "1", name: "Size", slug: "size", type: "text", 
        values: [
            { id: "101", label: "Small", value: "S" },
            { id: "102", label: "Medium", value: "M" },
            { id: "103", label: "Large", value: "L" },
            { id: "104", label: "Extra Large", value: "XL" }
        ],
        status: "active", productCount: 142
    },
    { 
        id: "2", name: "Main Color", slug: "color", type: "color", 
        values: [
            { id: "201", label: "Deep Black", value: "#000000" },
            { id: "202", label: "Pure White", value: "#FFFFFF" },
            { id: "203", label: "Royal Blue", value: "#2563EB" },
            { id: "204", label: "Sunset Orange", value: "#F97316" }
        ],
        status: "active", productCount: 89
    },
    { 
        id: "3", name: "Material", slug: "material", type: "text", 
        values: [
            { id: "301", label: "Cotton", value: "cotton" },
            { id: "302", label: "Polyester", value: "polyester" },
            { id: "303", label: "Leather", value: "leather" }
        ],
        status: "active", productCount: 56
    },
    { 
        id: "4", name: "Battery Capacity", slug: "battery", type: "number", 
        values: [
            { id: "401", label: "2000mAh", value: "2000" },
            { id: "402", label: "5000mAh", value: "5000" }
        ],
        status: "inactive", productCount: 12
    }
]

// ─── Component ──────────────────────────────────────────────────────────────
export default function AttributesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [attributeGroups, setAttributeGroups] = useState(mockAttributes)

    const filteredGroups = attributeGroups.filter(group => 
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.slug.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <Sliders size={24} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Attributes & Specs
                        </h1>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                        Define global product variants and technical specifications.
                    </p>
                </div>
                
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all active:scale-95 group">
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Attribute Group</span>
                </button>
            </div>

            {/* Controls Bar */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search attributes by name..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                        <Info size={16} className="text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                            {attributeGroups.length} Active Groups
                        </span>
                    </div>
                </div>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGroups.map((group) => (
                    <div key={group.id} className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
                        {/* Group Header */}
                        <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/30 dark:bg-gray-800/20">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${group.status === 'active' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                    {group.type === 'color' ? <Palette size={24} /> : group.type === 'number' ? <LayoutGrid size={24} /> : <Type size={24} />}
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                        {group.name}
                                        {group.status === 'inactive' && <span className="text-[10px] uppercase tracking-widest bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">Draft</span>}
                                    </h3>
                                    <p className="text-sm text-gray-500 font-medium">Slug: /attr/{group.slug}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-xl transition-all">
                                    <Edit3 size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                                    <Settings size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Values Content */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                                <span>Defined Values</span>
                                <span className="text-indigo-600 dark:text-indigo-400">{group.values.length} Units</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {group.values.map((val) => (
                                    <div key={val.id} className="relative pl-3 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl flex items-center gap-3 group/val hover:border-indigo-400/50 transition-all">
                                        {group.type === 'color' && (
                                            <div className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm" style={{ backgroundColor: val.value }} />
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-gray-900 dark:text-white">{val.label}</span>
                                            <span className="text-[10px] text-gray-400 font-mono">{val.value}</span>
                                        </div>
                                        <button className="opacity-0 group-hover/val:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all ml-1">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                
                                <button className="px-4 py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-xs font-bold transition-all flex items-center gap-2">
                                    <Plus size={14} />
                                    <span>Add Value</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer Info */}
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Layers size={14} className="text-gray-400" />
                                <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Used in <span className="text-gray-900 dark:text-white">{group.productCount} products</span></span>
                            </div>
                            <button className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                View Usage <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                ))}
                
                {/* Empty State UI */}
                {filteredGroups.length === 0 && (
                    <div className="col-span-1 lg:col-span-2 p-20 text-center bg-white dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                        <Move size={48} className="mx-auto text-gray-200 dark:text-gray-700 mb-6" />
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">No Attributes Found</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Create global attributes like Size, Color, or Technical Specs to standardize your product catalog.</p>
                        <button className="mt-8 bg-indigo-600 text-white font-bold py-3 px-8 rounded-2xl shadow-xl shadow-indigo-500/25 hover:bg-indigo-700 transition-all">
                            Add Your First Attribute
                        </button>
                    </div>
                )}
            </div>

        </div>
    )
}
