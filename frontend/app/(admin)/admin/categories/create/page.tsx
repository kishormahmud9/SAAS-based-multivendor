"use client"

import Link from "next/link"
import { ChevronLeft, FolderPlus } from "lucide-react"
import CategoryForm from "@/components/admin/CategoryForm"

export default function AdminCreateCategoryPage() {
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6">
                <Link href="/admin/categories" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-sm group">
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <FolderPlus className="text-orange-500" size={32} />
                        Create Category
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Add a new segment to your store's taxonomy.</p>
                </div>
            </div>

            <CategoryForm />
        </div>
    )
}
