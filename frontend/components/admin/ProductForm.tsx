"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
    Plus, 
    Save, 
    Loader2, 
    Type, 
    X,
    Activity,
    AlertCircle,
    Trash2,
    GripVertical,
    Sliders,
    ImageIcon,
    Upload,
    DollarSign,
    Box,
    Layers,
    Globe,
    Settings,
    Tag,
    ChevronDown,
    CheckCircle
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import { getImageUrl } from "@/src/lib/image-utils"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"

const productSchema = z.object({
    name: z.string().min(2, "Name is required"),
    slug: z.string().min(2, "Slug is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    shortDescription: z.string().optional(),
    sku: z.string().optional(),
    productType: z.enum(["SIMPLE", "VARIABLE"]).default("SIMPLE"),
    price: z.number().min(0, "Price cannot be negative"),
    salePrice: z.number().optional().nullable(),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    categoryId: z.string().min(1, "Category is required"),
    brandId: z.string().optional().nullable(),
    status: z.enum(["DRAFT", "PENDING_REVIEW", "ACTIVE", "INACTIVE", "ARCHIVED", "OUT_OF_STOCK"]),
    isFeatured: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).default([]),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
    initialData?: any;
    isEdit?: boolean;
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
}

export default function ProductForm({ initialData, isEdit, onSuccess, onCancel }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<any[]>([])
    const [brands, setBrands] = useState<any[]>([])
    const [allAttributes, setAllAttributes] = useState<any[]>([])
    
    // Media State
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [imagePreviews, setImagePreviews] = useState<string[]>(initialData?.images || [])
    
    // Variant State
    const [selectedAttributes, setSelectedAttributes] = useState<any[]>([]) // [{id, name, values: []}]
    const [variants, setVariants] = useState<any[]>(initialData?.variants || [])

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        setError, 
        clearErrors,
        control,
        formState: { errors } 
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            shortDescription: initialData?.shortDescription || "",
            sku: initialData?.sku || "",
            productType: initialData?.productType || "SIMPLE",
            price: Number(initialData?.price) || 0,
            salePrice: initialData?.salePrice ? Number(initialData?.salePrice) : null,
            stock: initialData?.stock || 0,
            categoryId: initialData?.categoryId || "",
            brandId: initialData?.brandId || "",
            status: initialData?.status || "DRAFT",
            isFeatured: initialData?.isFeatured ?? false,
            metaTitle: initialData?.metaTitle || "",
            metaDescription: initialData?.metaDescription || "",
            metaKeywords: initialData?.metaKeywords || [],
        }
    })

    const productName = watch("name")
    const productType = watch("productType")

    // Auto Slug
    useEffect(() => {
        if (productName && !isEdit) {
            const slug = productName.toLowerCase().trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_]+/g, '-')
                .replace(/^-+|-+$/g, '')
            setValue("slug", slug)
        }
    }, [productName, setValue, isEdit])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [catRes, brandRes, attrRes] = await Promise.all([
                adminService.getCategories(),
                adminService.getBrands(),
                adminService.getAttributes()
            ])
            if (catRes.success) setCategories(catRes.data)
            if (brandRes.success) setBrands(brandRes.data)
            if (attrRes.success) setAllAttributes(attrRes.data)
        } catch (error) {
            console.error("Failed to fetch form data")
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const validFiles = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} is too large (>5MB)`)
                return false
            }
            return true
        })

        setImageFiles(prev => [...prev, ...validFiles])
        
        validFiles.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeImage = (index: number) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
        // If it was a new file, remove it from imageFiles
        // We'll handle this by matching names or just being careful during submit
        // Simplified: just clearing imageFiles and re-adding if we had a mapping
        // For now, let's just clear both for simplicity or handle during submission
    }

    const generateVariants = () => {
        if (selectedAttributes.length === 0) return

        // Cartesian product of selected attribute values
        const combinations = selectedAttributes.reduce((acc, attr) => {
            if (attr.selectedValues.length === 0) return acc
            const newAcc: any[] = []
            if (acc.length === 0) {
                return attr.selectedValues.map((val: string) => ({ 
                    [attr.name.toLowerCase()]: val,
                    name: val 
                }))
            }
            acc.forEach((combo: any) => {
                attr.selectedValues.forEach((val: string) => {
                    newAcc.push({
                        ...combo,
                        [attr.name.toLowerCase()]: val,
                        name: `${combo.name} / ${val}`
                    })
                })
            })
            return newAcc
        }, [])

        const newVariants = combinations.map((combo: any) => ({
            name: combo.name,
            sku: `${watch("sku") || 'PROD'}-${combo.name.replace(/ \/ /g, '-').toUpperCase()}`,
            price: watch("price"),
            salePrice: watch("salePrice"),
            stock: 0,
            options: combo
        }))

        setVariants(newVariants)
    }

    const onFormSubmit = async (values: ProductFormValues) => {
        setLoading(true)
        try {
            const formData = new FormData()
            
            // Append basic fields
            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (Array.isArray(value)) {
                        formData.append(key, JSON.stringify(value))
                    } else {
                        formData.append(key, value.toString())
                    }
                }
            })

            // Append Variants if any
            if (productType === 'VARIABLE') {
                formData.append('variants', JSON.stringify(variants))
            }

            // Append Images
            imageFiles.forEach(file => {
                formData.append('images', file)
            })

            // If editing and kept old images
            if (isEdit) {
                const existingImages = imagePreviews.filter(p => p.startsWith('http') || p.startsWith('/uploads'))
                formData.append('existingImages', JSON.stringify(existingImages))
            }

            const res = isEdit 
                ? await adminService.updateProduct(initialData.id, formData)
                : await adminService.createProduct(formData)
            
            if (res.success) {
                toast.success(`Product ${isEdit ? 'updated' : 'created'} successfully`)
                onSuccess?.(res.data?.id)
            }
        } catch (error: any) {
            if (error.errors) {
                handleBackendErrors<ProductFormValues>(error.errors, setError)
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Side: Product Content */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* section: Basic Info */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                                <Type size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">General Information</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Core product identity and descriptions</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <AdminInput 
                                label="Product Name"
                                placeholder="e.g. Nike Air Max 270"
                                {...register("name")}
                                error={errors.name?.message}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AdminInput 
                                    label="Slug (URL Identifier)"
                                    placeholder="auto-generated-slug"
                                    {...register("slug")}
                                    error={errors.slug?.message}
                                    readOnly
                                />
                                <AdminInput 
                                    label="Base SKU"
                                    placeholder="e.g. NIKE-AM270"
                                    {...register("sku")}
                                    error={errors.sku?.message}
                                />
                            </div>

                            <AdminInput 
                                label="Short Description"
                                as="textarea"
                                placeholder="A brief summary for listings..."
                                rows={2}
                                {...register("shortDescription")}
                                error={errors.shortDescription?.message}
                                className="resize-none"
                            />

                            <AdminInput 
                                label="Full Description"
                                as="textarea"
                                placeholder="Detailed product features and information..."
                                rows={6}
                                {...register("description")}
                                error={errors.description?.message}
                                className="resize-none"
                            />
                        </div>
                    </div>

                    {/* section: Media */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                                <ImageIcon size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Product Gallery</h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Upload up to 10 high-quality images</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {imagePreviews.map((src, idx) => (
                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 group shadow-sm">
                                    <img src={getImageUrl(src)} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    <button 
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-rose-600 scale-75 group-hover:scale-100"
                                    >
                                        <X size={14} />
                                    </button>
                                    {idx === 0 && (
                                        <div className="absolute bottom-0 inset-x-0 bg-orange-500/90 py-1 text-[8px] font-black text-white uppercase text-center tracking-widest">
                                            Thumbnail
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {imagePreviews.length < 10 && (
                                <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all group">
                                    <Upload className="text-gray-300 group-hover:text-orange-500 transition-colors" size={24} />
                                    <span className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">Add Photo</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* section: Variants & Attributes */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                                    <Layers size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Inventory Variants</h3>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage sizes, colors, and SKUs</p>
                                </div>
                            </div>

                            <select 
                                {...register("productType")}
                                className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-black uppercase tracking-widest text-gray-600 focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="SIMPLE">Simple Product</option>
                                <option value="VARIABLE">Variable Product</option>
                            </select>
                        </div>

                        {productType === 'VARIABLE' ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-top-2 duration-500">
                                {/* Attribute Selection */}
                                <div className="p-6 bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Selected Attributes</h4>
                                        <div className="flex items-center gap-2">
                                            <select 
                                                onChange={(e) => {
                                                    const attr = allAttributes.find(a => a.id === e.target.value)
                                                    if (attr && !selectedAttributes.find(a => a.id === attr.id)) {
                                                        setSelectedAttributes([...selectedAttributes, { ...attr, selectedValues: [] }])
                                                    }
                                                }}
                                                className="px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-[10px] font-black uppercase tracking-widest"
                                            >
                                                <option value="">+ Add Attribute</option>
                                                {allAttributes.map(a => (
                                                    <option key={a.id} value={a.id}>{a.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {selectedAttributes.map((attr, idx) => (
                                            <div key={attr.id} className="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{attr.name}</span>
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setSelectedAttributes(prev => prev.filter((_, i) => i !== idx))}
                                                            className="text-rose-500 hover:bg-rose-50 p-1 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {attr.values.map((v: any) => (
                                                            <button
                                                                key={v.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    const updated = [...selectedAttributes]
                                                                    const current = updated[idx].selectedValues
                                                                    if (current.includes(v.value)) {
                                                                        updated[idx].selectedValues = current.filter((val: string) => val !== v.value)
                                                                    } else {
                                                                        updated[idx].selectedValues = [...current, v.value]
                                                                    }
                                                                    setSelectedAttributes(updated)
                                                                }}
                                                                className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                                                    attr.selectedValues.includes(v.value)
                                                                        ? 'bg-orange-500 text-white shadow-sm'
                                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                                                }`}
                                                            >
                                                                {v.value}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        
                                        {selectedAttributes.length > 0 && (
                                            <button 
                                                type="button"
                                                onClick={generateVariants}
                                                className="w-full py-3 bg-gray-900 dark:bg-orange-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-md"
                                            >
                                                Generate Variant Matrix
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Variants Table */}
                                {variants.length > 0 && (
                                    <div className="overflow-hidden border border-gray-100 dark:border-gray-800 rounded-3xl">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 dark:bg-gray-800/50">
                                                <tr>
                                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Variant</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price ($)</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock</th>
                                                    <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">SKU</th>
                                                    <th className="px-4 py-4"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                                {variants.map((v, idx) => (
                                                    <tr key={idx} className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                                                        <td className="px-6 py-4">
                                                            <span className="text-xs font-black text-gray-900 dark:text-white">{v.name}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <input 
                                                                type="number"
                                                                value={v.price}
                                                                onChange={(e) => {
                                                                    const updated = [...variants]
                                                                    updated[idx].price = Number(e.target.value)
                                                                    setVariants(updated)
                                                                }}
                                                                className="w-20 px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <input 
                                                                type="number"
                                                                value={v.stock}
                                                                onChange={(e) => {
                                                                    const updated = [...variants]
                                                                    updated[idx].stock = Number(e.target.value)
                                                                    setVariants(updated)
                                                                }}
                                                                className="w-20 px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-xs font-bold"
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <input 
                                                                type="text"
                                                                value={v.sku}
                                                                onChange={(e) => {
                                                                    const updated = [...variants]
                                                                    updated[idx].sku = e.target.value
                                                                    setVariants(updated)
                                                                }}
                                                                className="w-32 px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-[10px] font-black uppercase"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-4">
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setVariants(prev => prev.filter((_, i) => i !== idx))}
                                                                className="text-gray-300 hover:text-rose-500 transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-emerald-50/20 dark:bg-emerald-900/5 rounded-3xl border border-emerald-100/50 dark:border-emerald-900/10">
                                <AdminInput 
                                    label="Regular Price ($)"
                                    type="number"
                                    {...register("price", { valueAsNumber: true })}
                                    error={errors.price?.message}
                                    containerClassName="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
                                />
                                <AdminInput 
                                    label="Sale Price ($)"
                                    type="number"
                                    {...register("salePrice", { valueAsNumber: true })}
                                    error={errors.salePrice?.message}
                                    containerClassName="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
                                />
                                <AdminInput 
                                    label="Current Stock"
                                    type="number"
                                    {...register("stock", { valueAsNumber: true })}
                                    error={errors.stock?.message}
                                    containerClassName="bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
                                />
                                <div className="flex items-center justify-center border-2 border-dashed border-emerald-100 dark:border-emerald-900/20 rounded-2xl p-4">
                                    <div className="text-center">
                                        <Box className="mx-auto text-emerald-500 mb-2" size={24} />
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Inventory Tracked</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Settings & Status */}
                <div className="space-y-8 sticky top-8">
                    
                    {/* section: Status & Visibility */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-orange-500 mb-2">
                            <Settings size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Status & Visibility</span>
                        </div>

                        <AdminInput 
                            label="Listing Status"
                            as="select"
                            {...register("status")}
                            error={errors.status?.message}
                        >
                            <option value="DRAFT">Draft (Internal Only)</option>
                            <option value="ACTIVE">Active (Live on Store)</option>
                            <option value="INACTIVE">Inactive (Hidden)</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                        </AdminInput>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <div className="space-y-1">
                                <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest leading-none">Featured Product</p>
                                <p className="text-[10px] text-gray-500 font-medium">Show on homepage</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" {...register("isFeatured")} />
                                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>
                    </div>

                    {/* section: Categorization */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-purple-500 mb-2">
                            <Tag size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Classification</span>
                        </div>

                        <AdminInput 
                            label="Category"
                            as="select"
                            {...register("categoryId")}
                            error={errors.categoryId?.message}
                        >
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </AdminInput>

                        <AdminInput 
                            label="Brand"
                            as="select"
                            {...register("brandId")}
                            error={errors.brandId?.message}
                        >
                            <option value="">Select Brand (Optional)</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </AdminInput>
                    </div>

                    {/* section: SEO Meta */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-emerald-500 mb-2">
                            <Globe size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Marketplace SEO</span>
                        </div>

                        <AdminInput 
                            label="Meta Title"
                            placeholder="Optimized product title..."
                            {...register("metaTitle")}
                        />
                        <AdminInput 
                            label="Meta Description"
                            as="textarea"
                            rows={3}
                            placeholder="Search engine summary..."
                            {...register("metaDescription")}
                            className="resize-none"
                        />
                    </div>

                    {/* Submit Actions */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none space-y-4">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle size={24} />}
                            {isEdit ? 'Save Product Changes' : 'Launch New Product'}
                        </button>
                        {onCancel && (
                            <button 
                                type="button"
                                onClick={onCancel}
                                className="w-full py-5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-[2rem] font-black hover:bg-gray-200 transition-all text-xs uppercase tracking-widest"
                            >
                                Discard & Exit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
