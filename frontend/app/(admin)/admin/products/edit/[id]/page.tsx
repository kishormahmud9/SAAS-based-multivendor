"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Save, X, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import toast from "react-hot-toast"
import Modal from "@/components/ui/Modal"
import CategoryForm from "@/components/admin/CategoryForm"
import BrandForm from "@/components/admin/BrandForm"
import SearchableSelect from "@/components/ui/SearchableSelect"
import { fetchWithAuth } from "@/lib/api/fetchWithAuth"

interface Category {
    id: string
    name: string
}

interface Brand {
    id: string
    name: string
}

export default function EditProductPage() {
    const router = useRouter()
    const params = useParams()
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<{ file: File; preview: string }[]>([])

    // Modal states
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [isBrandModalOpen, setIsBrandModalOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        price: "",
        salePrice: "",
        stock: "",
        categoryId: "",
        brandId: "",
        images: [""],
        isFeatured: false,
        isArchived: false,
    })

    useEffect(() => {
        if (params?.id) {
            fetchData()
        }
    }, [params?.id])

    const fetchData = async () => {
        try {
            const [productRes, catRes, brandRes] = await Promise.all([
                fetch(`/api/admin/products/${params?.id}`, { credentials: 'include' }),
                fetch("/api/categories", { credentials: 'include' }),
                fetch("/api/brands", { credentials: 'include' }),
            ])

            const productData = await productRes.json()
            const catData = await catRes.json()
            const brandData = await brandRes.json()

            if (catData.success) setCategories(catData.data)
            if (brandData.success) setBrands(brandData.data)

            if (productData.success) {
                const p = productData.data
                setFormData({
                    name: p.name,
                    slug: p.slug,
                    description: p.description,
                    price: p.price.toString(),
                    salePrice: p.salePrice?.toString() || "",
                    stock: p.stock.toString(),
                    categoryId: p.categoryId,
                    brandId: p.brandId || "",
                    images: p.images.length ? p.images : [""],
                    isFeatured: p.isFeatured,
                    isArchived: p.isArchived,
                })
            } else {
                toast.error("Product not found")
                router.push("/admin/products/manage")
            }
        } catch (error) {
            toast.error("Failed to load data")
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 2 * 1024 * 1024; // 2MB

        const newFiles: { file: File; preview: string }[] = []

        Array.from(files).forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                toast.error(`${file.name} is not a supported format. Please use JPG, PNG or WebP.`);
                return;
            }
            if (file.size > maxSize) {
                toast.error(`${file.name} is too large. Max size is 2MB.`);
                return;
            }
            newFiles.push({
                file,
                preview: URL.createObjectURL(file)
            })
        })

        setSelectedFiles(prev => [...prev, ...newFiles])
    }

    const removeFile = (index: number) => {
        const newFiles = [...selectedFiles]
        URL.revokeObjectURL(newFiles[index].preview)
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)
    }

    const uploadFiles = async () => {
        const uploadedUrls: string[] = []
        setUploading(true)

        try {
            for (const item of selectedFiles) {
                const formData = new FormData()
                formData.append("file", item.file)

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                    credentials: 'include',
                })

                const data = await res.json()
                if (data.success) {
                    uploadedUrls.push(data.url)
                }
            }
            return uploadedUrls
        } catch (error) {
            toast.error("Image upload failed")
            return []
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        try {
            // 1. Upload new images first
            let uploadedImages = [...formData.images.filter(img => img.trim() !== "")]
            
            if (selectedFiles.length > 0) {
                const newUploadedUrls = await uploadFiles()
                if (newUploadedUrls.length === 0 && selectedFiles.length > 0) {
                    setSubmitting(false)
                    return // Stop if upload failed
                }
                uploadedImages = [...uploadedImages, ...newUploadedUrls]
            }

            if (uploadedImages.length === 0) {
                toast.error("Please add at least one image")
                setSubmitting(false)
                return
            }

            const productData = {
                name: formData.name,
                slug: formData.slug,
                description: formData.description,
                price: parseFloat(formData.price),
                salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
                stock: parseInt(formData.stock),
                categoryId: formData.categoryId,
                brandId: formData.brandId || null,
                images: uploadedImages,
                isFeatured: formData.isFeatured,
                isArchived: formData.isArchived,
            }

            const res = await fetch(`/api/admin/products/${params?.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
                credentials: 'include',
            })

            const data = await res.json()

            if (data.success) {
                toast.success("Product updated successfully!")
                router.push("/admin/products/manage")
                router.refresh()
            } else {
                toast.error(data.error || "Failed to update product")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <div className="p-12 text-center">Loading...</div>

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center space-x-4">
                <Link
                    href="/admin/products/manage"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-400 dark:to-blue-300">
                        Edit Product
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Update product details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6 transition-colors">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Product Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Slug *</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        />
                    </div>
                </div>

                {/* Pricing & Stock */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">Pricing & Inventory</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sale Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.salePrice}
                                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                            <input
                                type="number"
                                required
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Category & Brand */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">Organization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Category *</label>
                                <button 
                                    type="button"
                                    onClick={() => setIsCategoryModalOpen(true)}
                                    className="text-orange-600 hover:text-orange-700 text-xs font-bold flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add New
                                </button>
                            </div>
                            <SearchableSelect
                                options={categories}
                                value={formData.categoryId}
                                onChange={(value) => setFormData({ ...formData, categoryId: value })}
                                placeholder="Select Category"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Brand</label>
                                <button 
                                    type="button"
                                    onClick={() => setIsBrandModalOpen(true)}
                                    className="text-orange-600 hover:text-orange-700 text-xs font-bold flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add New
                                </button>
                            </div>
                            <SearchableSelect
                                options={brands}
                                value={formData.brandId}
                                onChange={(value) => setFormData({ ...formData, brandId: value })}
                                placeholder="No Brand"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b dark:border-gray-700 pb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Product Images</h3>
                        <label className="cursor-pointer flex items-center space-x-1 text-sm text-orange-600 hover:text-orange-700 font-semibold">
                            <Plus size={16} />
                            <span>Add Images</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {/* Existing/URL Images */}
                        {formData.images.map((img, index) => img && (
                            <div key={`url-${index}`} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100">
                                <img src={img} alt="Product" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newImages = [...formData.images];
                                        newImages.splice(index, 1);
                                        setFormData({...formData, images: newImages});
                                    }}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}

                        {/* Selected Files Preview */}
                        {selectedFiles.map((item, index) => (
                            <div key={`file-${index}`} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                                <img src={item.preview} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                    <X size={14} />
                                </button>
                                <div className="absolute inset-x-0 bottom-0 bg-black/40 text-white text-[10px] py-1 px-2 truncate">
                                    {item.file.name}
                                </div>
                            </div>
                        ))}

                        {/* Add Button */}
                        <label className="aspect-square border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center space-y-2 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all cursor-pointer group">
                            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-full group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                                <Plus size={24} className="text-gray-400 group-hover:text-orange-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500 group-hover:text-orange-600">Add More</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {uploading && (
                        <p className="text-xs text-orange-600 animate-pulse font-medium">Uploading images...</p>
                    )}
                </div>

                {/* Status */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-2">Status</h3>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Featured</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.isArchived}
                                onChange={(e) => setFormData({ ...formData, isArchived: e.target.checked })}
                                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">Archived</span>
                        </label>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4 pt-6 border-t dark:border-gray-700">
                    <Link
                        href="/admin/products/manage"
                        className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 text-center transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting || uploading}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 shadow-lg dark:shadow-none flex items-center justify-center space-x-2"
                    >
                        <span>{submitting ? (uploading ? "Uploading..." : "Saving...") : "Save Changes"}</span>
                    </button>
                </div>
            </form>

            {/* Modals */}
            <Modal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                title="Add New Category"
            >
                <CategoryForm 
                    onSuccess={(newId) => {
                        fetchData()
                        setFormData({ ...formData, categoryId: newId })
                        setIsCategoryModalOpen(false)
                    }}
                    onCancel={() => setIsCategoryModalOpen(false)}
                />
            </Modal>

            <Modal
                isOpen={isBrandModalOpen}
                onClose={() => setIsBrandModalOpen(false)}
                title="Add New Brand"
            >
                <BrandForm 
                    onSuccess={(newId) => {
                        fetchData()
                        setFormData({ ...formData, brandId: newId })
                        setIsBrandModalOpen(false)
                    }}
                    onCancel={() => setIsBrandModalOpen(false)}
                />
            </Modal>
        </div>
    )
}
