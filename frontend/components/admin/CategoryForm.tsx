"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, X, Loader2, Upload, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface CategoryFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
        description?: string
        image?: string
    }
    onSuccess?: (id: string) => void
    onCancel?: () => void
}

export default function CategoryForm({ initialData, onSuccess, onCancel }: CategoryFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        image: "",
    })
    const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string } | null>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                slug: initialData.slug,
                description: initialData.description || "",
                image: initialData.image || "",
            })
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Auto-generate slug from name if creating new
        if (name === "name" && !initialData) {
            setFormData((prev) => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
            }))
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        if (!allowedTypes.includes(file.type)) {
            toast.error("Format not supported. Please use JPG, PNG or WebP.");
            return;
        }

        if (file.size > maxSize) {
            toast.error("File is too large. Max size is 2MB.");
            return;
        }

        if (selectedFile) URL.revokeObjectURL(selectedFile.preview)
        setSelectedFile({ file, preview: URL.createObjectURL(file) })
    }

    const removeSelectedFile = () => {
        if (selectedFile) URL.revokeObjectURL(selectedFile.preview)
        setSelectedFile(null)
    }

    const uploadFile = async (file: File) => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await fetch("/api/upload", { method: "POST", body: formData, credentials: 'include' })
            const data = await res.json()
            return data.success ? data.url : null
        } catch (error) {
            toast.error("Image upload failed")
            return null
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = formData.image
            if (selectedFile) {
                const uploadedUrl = await uploadFile(selectedFile.file)
                if (!uploadedUrl) {
                    setLoading(false)
                    return
                }
                imageUrl = uploadedUrl
            }

            const url = initialData
                ? `/api/categories/${initialData.id}`
                : "/api/categories"

            const method = initialData ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, image: imageUrl }),
                credentials: 'include',
            })

            const data = await response.json()

            if (data.success) {
                toast.success(initialData ? "Category updated" : "Category created")
                if (onSuccess) {
                    onSuccess(data.data.id)
                } else {
                    router.push("/admin/categories/manage")
                    router.refresh()
                }
            } else {
                toast.error(data.error || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to save category")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                </div>
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category Image</label>
                    <div className="flex items-center gap-6 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-700/50">
                        <div className="relative w-24 h-24 bg-white dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                            {(selectedFile?.preview || formData.image) ? (
                                <>
                                    <img src={selectedFile?.preview || formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (selectedFile) removeSelectedFile()
                                            else setFormData({...formData, image: ""})
                                        }}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </>
                            ) : (
                                <Upload className="text-gray-300" size={32} />
                            )}
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <Upload size={16} className="mr-2" />
                                {uploading ? "Uploading..." : "Click to upload image"}
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                    type="button"
                    onClick={() => onCancel ? onCancel() : router.back()}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                    <X size={18} />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {(loading || uploading) ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {initialData ? "Update Category" : "Create Category"}
                </button>
            </div>
        </form>
    )
}
