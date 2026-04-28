"use client"

import { useState } from "react"
import { 
    Sliders, 
    Plus, 
    Trash2, 
    Settings, 
    Layers, 
    Loader2, 
    ChevronLeft,
    Tag as TagIcon
} from "lucide-react"
import { toast } from "react-hot-toast"

export default function AdminAttributesPage() {
    const [attributes, setAttributes] = useState([
        { id: "1", name: "Color", values: ["Red", "Blue", "Black", "White"], type: "Visual" },
        { id: "2", name: "Size", values: ["S", "M", "L", "XL", "XXL"], type: "Dimension" },
        { id: "3", name: "Material", values: ["Cotton", "Polyester", "Leather"], type: "Technical" }
    ])

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Sliders className="text-orange-500" size={32} />
                        Global Attributes
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Define standardized properties for variants and filtering.</p>
                </div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-black shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} />
                    Create Attribute
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {attributes.map((attr) => (
                    <div key={attr.id} className="bg-white dark:bg-gray-900 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-orange-500">
                                    <Settings size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">{attr.name}</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{attr.type} Specification</p>
                                </div>
                            </div>
                            
                            <div className="flex-1 flex flex-wrap gap-2">
                                {attr.values.map(val => (
                                    <span key={val} className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800">
                                        {val}
                                    </span>
                                ))}
                                <button className="px-4 py-2 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all">
                                    + Add Value
                                </button>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-10 h-10 bg-gray-50 dark:bg-gray-800 text-gray-400 rounded-xl flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
