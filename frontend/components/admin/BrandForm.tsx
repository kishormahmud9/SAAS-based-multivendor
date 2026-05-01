"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
    Plus, 
    Upload, 
    Save, 
    Loader2, 
    Globe, 
    Type, 
    Image as ImageIcon,
    X,
    Activity,
    AlertCircle
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"
import Image from "next/image"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"

const brandSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().max(500, "Description too long").optional().or(z.literal("")),
    isActive: z.union([z.boolean(), z.string()]).transform(val => val === true || val === 'true'),
})

type BrandFormValues = z.infer<typeof brandSchema>

interface BrandFormProps {
    initialData?: any;
    isEdit?: boolean;
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
}

export default function BrandForm({ initialData, isEdit, onSuccess, onCancel }: BrandFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>(initialData?.logo || "")
    const [isCheckingName, setIsCheckingName] = useState(false)

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        setError, 
        clearErrors,
        formState: { errors } 
    } = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            isActive: initialData?.isActive ?? true,
        }
    })

    const brandName = watch("name")

    // Dynamic Slug Generation
    useEffect(() => {
        if (brandName && !isEdit) {
            const generatedSlug = brandName.toLowerCase().trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_]+/g, '-')
                .replace(/^-+|-+$/g, '')
            
            setValue("slug", generatedSlug)
        }
        if (brandName && errors.name) {
            clearErrors("name")
        }
    }, [brandName, setValue, clearErrors, errors.name, isEdit])

    // Debounced Name Check
    useEffect(() => {
        const checkName = async () => {
            if (!brandName?.trim()) return
            if (isEdit && brandName.trim() === initialData?.name) return

            setIsCheckingName(true)
            try {
                const res = await adminService.checkBrandName(brandName)
                if (res.success && res.data.exists) {
                    setError("name", { message: "Brand name is already available" })
                }
            } catch (error) {
                console.error("Name check failed", error)
            } finally {
                setIsCheckingName(false)
            }
        }

        const timeoutId = setTimeout(checkName, 600)
        return () => clearTimeout(timeoutId)
    }, [brandName, isEdit, initialData?.name, setError])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Logo size must be less than 2MB")
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

    const onFormSubmit = async (values: BrandFormValues) => {
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
                ? await adminService.updateBrand(initialData.id, submitData)
                : await adminService.createBrand(submitData)
            
            if (res.success) {
                toast.success(`Brand ${isEdit ? 'updated' : 'created'} successfully`)
                if (onSuccess) {
                    onSuccess(res.data?.id)
                } else {
                    router.push("/admin/brands")
                }
            }
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                handleBackendErrors<BrandFormValues>(error.errors, setError)
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Side: Main Form Content (2/3 Width) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Information Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600">
                                <Type size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Brand Identity</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Core brand details and naming</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AdminInput 
                                label="Brand Name"
                                placeholder="e.g. Apple, Samsung, Nike"
                                {...register("name")}
                                error={errors.name?.message}
                                isChecking={isCheckingName}
                                name="name"
                            />

                            <AdminInput 
                                label="Slug"
                                placeholder="Auto-generated from name"
                                {...register("slug")}
                                error={errors.slug?.message}
                                readOnly
                                name="slug"
                            />
                        </div>

                        <AdminInput 
                            label="Description"
                            as="textarea"
                            placeholder="Write a compelling description for this brand..."
                            rows={8}
                            {...register("description")}
                            error={errors.description?.message}
                            className="resize-none"
                            name="description"
                        />
                    </div>

                    {/* Status Section (Only for Edit) */}
                    {isEdit && (
                        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center text-emerald-600">
                                    <Activity size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Visibility Control</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage store-front availability</p>
                                </div>
                            </div>

                            <div className="max-w-md">
                                <AdminInput 
                                    label="Current Status"
                                    as="select"
                                    {...register("isActive")}
                                    error={errors.isActive?.message}
                                    name="isActive"
                                >
                                    <option value="true">Active (Published)</option>
                                    <option value="false">Inactive (Draft)</option>
                                </AdminInput>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side: Media & Actions (1/3 Width) */}
                <div className="space-y-8">
                    {/* Brand Logo Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600">
                                <ImageIcon size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white">Brand Logo</h3>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            {imagePreview ? (
                                <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex items-center justify-center group">
                                    <Image 
                                        src={getImageUrl(imagePreview)} 
                                        fill
                                        unoptimized
                                        className="object-contain p-8 transition-transform group-hover:scale-105 duration-500" 
                                        alt="Preview"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null)
                                            setImagePreview("")
                                        }}
                                        className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-xl shadow-xl hover:bg-rose-600 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <label name="logo" className={`w-full aspect-square rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-orange-500 hover:bg-orange-50/10 transition-all border-gray-200 dark:border-gray-800`}>
                                     <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-300 group-hover:text-orange-500 group-hover:scale-110 transition-all">
                                         <Upload size={32} />
                                     </div>
                                     <div className="text-center">
                                         <span className="text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">Upload Assets</span>
                                         <p className="text-[10px] text-gray-400 mt-1 font-bold">JPG, PNG, WEBP (Max 2MB)</p>
                                     </div>
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

                    {/* Action Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 text-orange-500 mb-2">
                            <AlertCircle size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Publishing Actions</span>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={loading || isCheckingName}
                            className="w-full py-5 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Save className="group-hover:rotate-12 transition-transform" size={24} />}
                            {isEdit ? 'Update Changes' : 'Launch Brand'}
                        </button>
                        
                        {onCancel && (
                            <button 
                                type="button"
                                onClick={onCancel}
                                className="w-full py-5 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-[2rem] font-black hover:bg-gray-100 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                            >
                                Discard Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
