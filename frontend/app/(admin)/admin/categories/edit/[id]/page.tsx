"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft, Edit3, Loader2 } from "lucide-react"
import CategoryForm from "@/components/admin/CategoryForm"
import { adminService } from "@/src/services/admin.service"

export default function AdminEditCategoryPage() {
    const params = useParams()
    const id = params.id as string
    const [category, setCategory] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            fetchCategory()
        }
    }, [id])

    const fetchCategory = async () => {
        try {
            const res = await adminService.getCategoryById(id)
            if (res.success) {
                setCategory(res.data)
            }
        } catch (error) {
            console.error("Failed to fetch category")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-6">
                <Link href="/admin/categories" className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-sm group">
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                        <Edit3 className="text-orange-500" size={32} />
                        Edit Category
                    </h1>
                    <p className="text-sm text-gray-500 font-medium">Modify category properties and hierarchy placement.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="animate-spin text-orange-500" size={40} />
                </div>
            ) : category ? (
                <CategoryForm initialData={category} isEdit={true} />
            ) : (
                <div className="p-10 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 text-center">
                    <p className="text-gray-500 font-bold">Category not found.</p>
                    <Link href="/admin/categories" className="text-orange-500 mt-2 block font-black">Back to List</Link>
                </div>
            )}
        </div>
    )
}
