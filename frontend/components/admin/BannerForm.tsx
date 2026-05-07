"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
    Upload, 
    Save, 
    Loader2, 
    Type, 
    Link as LinkIcon,
    Layers, 
    Image as ImageIcon,
    X,
    Hash,
    CheckCircle
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"
import Image from "next/image"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"

// 1. Zod Schema for Validation
const bannerSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters").max(100, "Title too long"),
    link: z.string().url("Invalid URL").optional().or(z.literal("")),
    type: z.enum(["CAROUSEL", "OFFER", "POPUP", "HERO"]),
    isActive: z.boolean().default(true),
    order: z.number().min(0, "Order cannot be negative"),
})

type BannerFormValues = z.infer<typeof bannerSchema>

interface BannerFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function BannerForm({ initialData, isEdit }: BannerFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || "")

    // 2. Initialize React Hook Form
    const { 
        register, 
        handleSubmit, 
        setValue, 
        setError, 
        clearErrors,
        formState: { errors } 
    } = useForm<BannerFormValues>({
        resolver: zodResolver(bannerSchema) as any,
        defaultValues: {
            title: initialData?.title || "",
            link: initialData?.link || "",
            type: initialData?.type || "HERO",
            isActive: initialData?.isActive ?? true,
            order: initialData?.order || 0,
        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size must be less than 5MB")
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

    // 3. Unified Submission
    const onFormSubmit = async (values: BannerFormValues) => {
        if (!isEdit && !imageFile) {
            toast.error("Banner image is required")
            return
        }

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
                ? await adminService.updateBanner(initialData.id, submitData)
                : await adminService.createBanner(submitData)
            
            if (res.success) {
                toast.success(`Banner ${isEdit ? 'updated' : 'created'} successfully`)
                router.push("/admin/marketing/banners")
            }
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                handleBackendErrors<BannerFormValues>(error.errors, setError)
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit as any)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                                label="Banner Title"
                                placeholder="e.g. Summer Collection 2026"
                                {...register("title")}
                                error={errors.title?.message}
                            />

                            <AdminInput 
                                label="Banner Link (Redirect URL)"
                                placeholder="e.g. https://readymart.com/shop"
                                {...register("link")}
                                error={errors.link?.message}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AdminInput 
                                    label="Banner Type"
                                    as="select"
                                    {...register("type")}
                                    error={errors.type?.message}
                                >
                                    <option value="HERO">Hero (Large)</option>
                                    <option value="CAROUSEL">Carousel</option>
                                    <option value="OFFER">Offer Banner</option>
                                    <option value="POPUP">Popup Banner</option>
                                </AdminInput>

                                <AdminInput 
                                    label="Display Order"
                                    type="number"
                                    {...register("order", { valueAsNumber: true })}
                                    error={errors.order?.message}
                                    className="font-bold"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Status & Media */}
                <div className="space-y-8">
                    
                    {/* Media */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Banner Image</h3>
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
                                <label className={`w-full aspect-square rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-orange-500 hover:bg-orange-50/10 transition-all border-gray-200 dark:border-gray-800`}>
                                     <Upload className="text-gray-400 group-hover:text-orange-500 transition-colors" size={32} />
                                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Upload Banner</span>
                                     <span className="text-[8px] text-gray-400">Max 5MB (JPG, PNG, WebP)</span>
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

                    {/* Status Toggle */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                                    <CheckCircle size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Active Status</h3>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="sr-only peer"
                                    {...register("isActive")}
                                />
                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
                            </label>
                         </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                            {isEdit ? 'Update Banner' : 'Create Banner'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
