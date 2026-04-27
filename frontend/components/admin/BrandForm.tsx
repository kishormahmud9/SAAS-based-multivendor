"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, X, Loader2, Upload, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface BrandFormProps {
    initialData?: {
        id: string
        name: string
        slug: string
        logo?: string
    }
    onSuccess?: (id: string) => void
    onCancel?: () => void
}

export default function BrandForm({ initialData, onSuccess, onCancel }: BrandFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        logo: "",
    })
    const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string } | null>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                slug: initialData.slug,
                logo: initialData.logo || "",
            })
        }
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        if (selectedFile) {
            URL.revokeObjectURL(selectedFile.preview)
        }

        setSelectedFile({
            file,
            preview: URL.createObjectURL(file)
        })
    }

    const removeSelectedFile = () => {
        if (selectedFile) {
            URL.revokeObjectURL(selectedFile.preview)
        }
        setSelectedFile(null)
    }

    const uploadFile = async (file: File) => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
                credentials: 'include',
            })

            const data = await res.json()
            if (data.success) {
                return data.url
            }
            return null
        } catch (error) {
            toast.error("Logo upload failed")
            return null
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let logoUrl = formData.logo

            if (selectedFile) {
                const uploadedUrl = await uploadFile(selectedFile.file)
                if (!uploadedUrl) {
                    setLoading(false)
                    return
                }
                logoUrl = uploadedUrl
            }

            const url = initialData
                ? `/api/brands/${initialData.id}`
                : "/api/brands"

            const method = initialData ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, logo: logoUrl }),
                credentials: 'include',
            })

            const data = await response.json()

            if (data.success) {
                toast.success(initialData ? "Brand updated" : "Brand created")
                if (onSuccess) {
                    onSuccess(data.data.id)
                } else {
                    router.push("/admin/brands/manage")
                    router.refresh()
                }
            } else {
                toast.error(data.error || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to save brand")
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
                <div className="md:col-span-2 space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Logo</label>
                    <div className="flex items-center gap-6 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-700/50">
                        {/* Preview */}
                        <div className="relative w-24 h-24 bg-white dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                            {(selectedFile?.preview || formData.logo) ? (
                                <>
                                    <img 
                                        src={selectedFile?.preview || formData.logo} 
                                        alt="Logo Preview" 
                                        className="w-full h-full object-contain p-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (selectedFile) removeSelectedFile()
                                            else setFormData({...formData, logo: ""})
                                        }}
                                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-sm hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </>
                            ) : (
                                <Upload className="text-gray-300" size={32} />
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex-1 space-y-2">
                            <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                <Upload size={16} className="mr-2" />
                                {uploading ? "Uploading..." : "Click to upload logo"}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Recommended size: 200x200px. Max size: 2MB.</p>
                        </div>
                    </div>
                    
                    {/* Fallback URL input (optional, but keep it for flexibility) */}
                    <div className="mt-4">
                        <input
                            type="url"
                            name="logo"
                            value={formData.logo}
                            onChange={(e) => setFormData({...formData, logo: e.target.value})}
                            placeholder="Or paste an image URL instead"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                        />
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
                    {initialData ? "Update Brand" : "Create Brand"}
                </button>
            </div>
        </form>
    )
}
