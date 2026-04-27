"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import Modal from "@/components/ui/Modal"
import BrandForm from "@/components/admin/BrandForm"
import ConfirmModal from "@/components/ui/ConfirmModal"

export default function BrandManagePage() {
    const [brands, setBrands] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBrand, setEditingBrand] = useState<any>(null)
    const [brandToDelete, setBrandToDelete] = useState<string | null>(null)

    useEffect(() => {
        fetchBrands()
    }, [])

    const fetchBrands = async () => {
        try {
            const response = await fetch("/api/brands")
            const data = await response.json()
            if (data.success) {
                setBrands(data.data)
            }
        } catch (error) {
            toast.error("Failed to load brands")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        setBrandToDelete(null)

        try {
            const response = await fetch(`/api/brands/${id}`, {
                method: "DELETE",
            })
            const data = await response.json()

            if (data.success) {
                toast.success("Brand deleted")
                fetchBrands()
            } else {
                toast.error(data.error || "Failed to delete")
            }
        } catch (error) {
            toast.error("Failed to delete brand")
        }
    }

    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Brands</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage your product brands</p>
                </div>
                <button
                    onClick={() => {
                        setEditingBrand(null)
                        setIsModalOpen(true)
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg shadow-orange-200 dark:shadow-none"
                >
                    <Plus size={20} />
                    Add Brand
                </button>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search brands..."
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
                                <th className="px-6 py-3">Logo</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Slug</th>
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
                            ) : filteredBrands.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No brands found
                                    </td>
                                </tr>
                            ) : (
                                filteredBrands.map((brand) => (
                                    <tr key={brand.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg bg-white overflow-hidden border border-gray-100 flex items-center justify-center p-1">
                                                {brand.logo ? (
                                                    <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                        NB
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {brand.name}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                            {brand.slug}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                            {brand._count?.products || 0}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingBrand(brand)
                                                    setIsModalOpen(true)
                                                }}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                             <button
                                                onClick={() => setBrandToDelete(brand.id)}
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

            {/* Brand Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingBrand ? "Edit Brand" : "Add New Brand"}
            >
                <BrandForm
                    initialData={editingBrand}
                    onSuccess={() => {
                        setIsModalOpen(false)
                        fetchBrands()
                    }}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            <ConfirmModal
                isOpen={!!brandToDelete}
                onClose={() => setBrandToDelete(null)}
                onConfirm={() => brandToDelete && handleDelete(brandToDelete)}
                title="Delete Brand"
                message="Are you sure you want to delete this brand? All products associated with this brand will remain but their brand field will be cleared."
                confirmText="Delete"
                variant="danger"
            />
        </div>
    )
}
