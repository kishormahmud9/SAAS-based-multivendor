"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
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
import Image from "next/image"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"

// 1. Zod Schema for Validation
const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().max(500, "Description too long").optional().or(z.literal("")),
    parentId: z.string().nullable().optional(),
    isActive: z.boolean().default(true),
    sortOrder: z.number().min(0, "Order cannot be negative"),
    metaTitle: z.string().max(70, "Meta title too long").optional().or(z.literal("")),
    metaDesc: z.string().max(160, "Meta description too long").optional().or(z.literal(""))
})

type CategoryFormValues = z.infer<typeof categorySchema>

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
    const [isCheckingName, setIsCheckingName] = useState(false)

    // 2. Initialize React Hook Form
    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        setError, 
        clearErrors,
        formState: { errors } 
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            parentId: initialData?.parentId || null,
            isActive: initialData?.isActive ?? true,
            sortOrder: initialData?.sortOrder || 0,
            metaTitle: initialData?.metaTitle || "",
            metaDesc: initialData?.metaDesc || ""
        }
    })

    const categoryName = watch("name")

    // 3. Dynamic Slug Generation & Instant Error Clearing
    useEffect(() => {
        if (categoryName) {
            const generatedSlug = categoryName.toLowerCase().trim()
                .replace(/[^\w\s-]/g, '') // Remove non-word chars
                .replace(/[\s_]+/g, '-')  // Replace spaces/underscores with -
                .replace(/^-+|-+$/g, '')   // Trim - from start/end
            
            setValue("slug", generatedSlug)
            
            // Clear name-related errors when user types
            if (errors.name) {
                clearErrors("name")
            }
        }
    }, [categoryName, setValue, clearErrors, errors.name])

    // 4. Debounced Backend Name Uniqueness Check
    useEffect(() => {
        const checkName = async () => {
            if (!categoryName?.trim()) return
            if (isEdit && categoryName.trim() === initialData?.name) return

            setIsCheckingName(true)
            try {
                const res = await adminService.checkCategoryName(categoryName)
                if (res.success && res.data.exists) {
                    setError("name", { message: "Category name is already available" })
                }
            } catch (error) {
                console.error("Name check failed", error)
            } finally {
                setIsCheckingName(false)
            }
        }

        const timeoutId = setTimeout(checkName, 600)
        return () => clearTimeout(timeoutId)
    }, [categoryName, isEdit, initialData?.name, setError])

    useEffect(() => {
        fetchFlatCategories()
        if (!isEdit) {
            fetchNextOrder()
        }
    }, [isEdit])

    const fetchNextOrder = async () => {
        try {
            const res = await adminService.getCategoryNextOrder()
            if (res.success) {
                setValue("sortOrder", res.data)
            }
        } catch (error) {
            console.error("Failed to fetch next sort order")
        }
    }

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
            clearErrors("name") // Use this to clear image errors if we add them to schema
        }
    }

    // 5. Unified Submission with Dynamic Error Mapping
    const onFormSubmit = async (values: CategoryFormValues) => {
        setLoading(true)
        try {
            const submitData = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
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
            // Dynamic Mapping of Backend Errors to UI
            if (error.errors) {
                handleBackendErrors<CategoryFormValues>(error.errors, setError)
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                            <AdminInput 
                                label="Category Name"
                                placeholder="e.g. Consumer Electronics"
                                {...register("name")}
                                error={errors.name?.message}
                                isChecking={isCheckingName}
                            />

                            <AdminInput 
                                label="Slug (Unique URL Identifier)"
                                placeholder="Auto-generated from name"
                                {...register("slug")}
                                error={errors.slug?.message}
                                readOnly
                            />

                            <AdminInput 
                                label="Description"
                                as="textarea"
                                placeholder="Briefly describe this category..."
                                rows={4}
                                {...register("description")}
                                error={errors.description?.message}
                                className="resize-none"
                            />
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
                            <AdminInput 
                                label="Parent Category"
                                as="select"
                                {...register("parentId")}
                                error={errors.parentId?.message}
                            >
                                <option value="">None (Root Category)</option>
                                {flatCategories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </AdminInput>

                            <AdminInput 
                                label="Display Order"
                                type="number"
                                {...register("sortOrder", { valueAsNumber: true })}
                                error={errors.sortOrder?.message}
                                className="font-bold"
                            />
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
                                    <Image 
                                        src={getImageUrl(imagePreview)} 
                                        fill
                                        unoptimized
                                        className="object-cover" 
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
                                <label className={`aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-orange-500 transition-all border-gray-200 dark:border-gray-800`}>
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
                            <AdminInput 
                                label="Meta Title"
                                placeholder="Search engine optimized title"
                                {...register("metaTitle")}
                                error={errors.metaTitle?.message}
                            />

                            <AdminInput 
                                label="Meta Description"
                                as="textarea"
                                placeholder="Brief summary for Google search..."
                                rows={3}
                                {...register("metaDesc")}
                                error={errors.metaDesc?.message}
                                className="resize-none"
                            />
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
                            disabled={loading || isCheckingName}
                            className={`${onCancel ? 'flex-[2]' : 'w-full'} py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
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
