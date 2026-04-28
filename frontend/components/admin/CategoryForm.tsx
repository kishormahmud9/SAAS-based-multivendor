"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
    ChevronLeft, 
    Plus, 
    Upload, 
    Save, 
    Loader2, 
    Globe, 
    Layout, 
    Type, 
    Layers, 
    Image as ImageIcon,
    Tag,
    X
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"

interface CategoryFormProps {
    initialData?: any;
    isEdit?: boolean;
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
}

export default function CategoryForm({ initialData, isEdit, onSuccess, onCancel }: CategoryFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [flatCategories, setFlatCategories] = useState<any[]>([])
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "")
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        description: initialData?.description || "",
        parentId: initialData?.parentId || null,
        isActive: initialData?.isActive ?? true,
        sortOrder: initialData?.sortOrder || 0,
        metaTitle: initialData?.metaTitle || "",
        metaDesc: initialData?.metaDesc || ""
    })

    useEffect(() => {
        fetchFlatCategories()
    }, [])

    const fetchFlatCategories = async () => {
        try {
            const res = await adminService.getCategoryFlat()
            if (res.success) {
                const filtered = isEdit 
                    ? res.data.filter((c: any) => c.id !== initialData.id)
                    : res.data
                setFlatCategories(filtered)
            }
        } catch (error) {
            console.error("Failed to fetch categories")
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size must be less than 2MB")
                return
            }
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setFieldErrors({})
        
        try {
            const submitData = new FormData()
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) {
                    submitData.append(key, value.toString())
                }
            })
            if (imageFile) {
                submitData.append('image', imageFile)
            }

            const res = isEdit 
                ? await adminService.updateCategory(initialData.id, submitData)
                : await adminService.createCategory(submitData)
            
            if (res.success) {
                toast.success(`Category ${isEdit ? 'updated' : 'created'} successfully`)
                if (onSuccess) {
                    onSuccess(res.data?.id)
                } else {
                    router.push("/admin/categories")
                }
            }
        } catch (error: any) {
            if (error.errorMessages && error.errorMessages.length > 0) {
                const newErrors: Record<string, string> = {}
                error.errorMessages.forEach((err: any) => {
                    newErrors[err.path] = err.message
                })
                setFieldErrors(newErrors)
                toast.error(error.message || "Validation Error")
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    const ErrorMsg = ({ name }: { name: string }) => {
        if (!fieldErrors[name]) return null;
        return <p className="text-[10px] font-black text-rose-500 mt-2 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">{fieldErrors[name]}</p>
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* General Information */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
                                <Type size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">General Information</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Category Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => {
                                        const name = e.target.value
                                        setFormData({
                                            ...formData, 
                                            name, 
                                            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                                        })
                                    }}
                                    placeholder="e.g. Consumer Electronics"
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.name ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium`}
                                />
                                <ErrorMsg name="name" />
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Slug (Unique URL Identifier)</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.slug ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-400 font-medium`}
                                />
                                <ErrorMsg name="slug" />
                            </div>

                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Description</label>
                                <textarea 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Briefly describe this category..."
                                    rows={4}
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.description ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium resize-none`}
                                />
                                <ErrorMsg name="description" />
                            </div>
                        </div>
                    </div>

                    {/* Hierarchy & Sorting */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                                <Layers size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Hierarchy & Placement</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Parent Category</label>
                                <select 
                                    value={formData.parentId || ""}
                                    onChange={(e) => setFormData({...formData, parentId: e.target.value || null})}
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.parentId ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium appearance-none`}
                                >
                                    <option value="">None (Root Category)</option>
                                    {flatCategories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                <ErrorMsg name="parentId" />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Display Order</label>
                                <input 
                                    type="number" 
                                    value={formData.sortOrder}
                                    onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.sortOrder ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-bold`}
                                />
                                <ErrorMsg name="sortOrder" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Status & SEO */}
                <div className="space-y-8">
                    
                    {/* Media */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Thumbnail</h3>
                        </div>
                        
                        <div className="space-y-4">
                            {imagePreview ? (
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                                    <img 
                                        src={getImageUrl(imagePreview)} 
                                        className="w-full h-full object-cover" 
                                        alt="Preview"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null)
                                            setImagePreview("")
                                        }}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg shadow-lg hover:bg-rose-600 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <label className={`aspect-video rounded-2xl border-2 border-dashed ${fieldErrors.image ? 'border-rose-300 bg-rose-50/50' : 'border-gray-200 dark:border-gray-800'} flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-orange-500 transition-all`}>
                                     <Upload className="text-gray-400 group-hover:text-orange-500 transition-colors" size={32} />
                                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Image</span>
                                     <span className="text-[8px] text-gray-400">Max 2MB (JPG, PNG, WebP)</span>
                                     <input 
                                         type="file" 
                                         accept="image/*"
                                         onChange={handleImageChange}
                                         className="hidden"
                                     />
                                </label>
                            )}
                            <ErrorMsg name="image" />
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                                <Globe size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">SEO Settings</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Meta Title</label>
                                <input 
                                    type="text" 
                                    value={formData.metaTitle}
                                    onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                                    placeholder="Search engine optimized title"
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.metaTitle ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium`}
                                />
                                <ErrorMsg name="metaTitle" />
                            </div>
                            <div>
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">Meta Description</label>
                                <textarea 
                                    value={formData.metaDesc}
                                    onChange={(e) => setFormData({...formData, metaDesc: e.target.value})}
                                    placeholder="Brief summary for Google search..."
                                    rows={3}
                                    className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border ${fieldErrors.metaDesc ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-gray-900 dark:text-white font-medium resize-none`}
                                />
                                <ErrorMsg name="metaDesc" />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex items-center gap-4">
                        {onCancel && (
                            <button 
                                type="button"
                                onClick={onCancel}
                                className="flex-1 py-5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-[2rem] font-black hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                        <button 
                            type="submit"
                            disabled={loading}
                            className={`${onCancel ? 'flex-[2]' : 'w-full'} py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                            {isEdit ? 'Update Category' : 'Create Category'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
