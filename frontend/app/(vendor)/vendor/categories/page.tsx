"use client"
import { Layers, Plus, Search, Filter, FolderTree, ArrowRight } from "lucide-react"

export default function CategoriesPage() {
    return (
        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Layers className="text-blue-600" size={32} />
                        Store Categories
                    </h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Organize your products into logical categories for better customer navigation.</p>
                </div>
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-black shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 flex items-center gap-2">
                    <Plus size={18} /> New Category
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Search categories..." className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-medium focus:outline-none" />
                    </div>
                </div>

                <div className="p-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center text-blue-600 mx-auto">
                        <FolderTree size={40} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Product Hierarchy</h3>
                        <p className="text-gray-500 font-medium max-w-sm mx-auto">You haven't created any custom categories yet. Start by grouping your products to improve store SEO.</p>
                    </div>
                    <button className="text-sm font-black text-blue-600 hover:underline flex items-center gap-2 mx-auto uppercase tracking-widest">
                        Learn how to categorize <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
