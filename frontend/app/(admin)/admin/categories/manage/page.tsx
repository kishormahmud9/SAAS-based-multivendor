"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import Modal from "@/components/ui/Modal"
import CategoryForm from "@/components/admin/CategoryForm"
import ConfirmModal from "@/components/ui/ConfirmModal"
import { getImageUrl } from "@/src/lib/image-utils"

export default function CategoryManagePage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<any>(null)
    const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
            const data = await response.json()
            if (data.success) {
                setCategories(data.data)
            }
        } catch (error) {
            toast.error("Failed to load categories")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setCategoryToDelete(null)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
                method: "DELETE",
            })
            const data = await response.json()

            if (data.success) {
                toast.success("Category deleted")
                fetchCategories()
            } else {
                toast.error(data.error || "Failed to delete")
            }
        } catch (error) {
            toast.error("Failed to delete category")
        }
    }

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your product categories</p>
                </div>
                <button
                    onClick={() => {
                        setEditingCategory(null)
                        setIsModalOpen(true)
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-200 dark:shadow-none"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                            <tr>
                                <th className="px-6 py-3">Image</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Slug</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Products</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center">
                                        <Loader2 className="animate-spin mx-auto text-orange-600" size={24} />
                                    </td>
                                </tr>
                            ) : filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No categories found
                                    </td>
                                </tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                                {category.image ? (
                                                    <img src={getImageUrl(category.image)} alt={category.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {category.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                            {category.slug}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-500 text-sm max-w-xs truncate">
                                            {category.description || "No description"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                            {category._count?.products || 0}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingCategory(category)
                                                    setIsModalOpen(true)
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => setCategoryToDelete(category.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Category Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCategory ? "Edit Category" : "Add New Category"}
            >
                <CategoryForm
                    initialData={editingCategory}
                    onSuccess={() => {
                        setIsModalOpen(false)
                        fetchCategories()
                    }}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <ConfirmModal
                isOpen={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={() => categoryToDelete && handleDelete(categoryToDelete)}
                title="Delete Category"
                message="Are you sure you want to delete this category? All products in this category will remain but their category field will be set to Uncategorized."
                confirmText="Delete"
                variant="danger"
            />
        </div>
    )
}
