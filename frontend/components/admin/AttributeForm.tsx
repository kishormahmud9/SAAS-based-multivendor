"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
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
    Sliders
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"

const attributeValueSchema = z.object({
    id: z.string().optional(),
    value: z.string().min(1, "Value is required").trim(),
})

const attributeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().max(500, "Description too long").optional().or(z.literal("")),
    type: z.enum(["SELECT", "COLOR", "BUTTON", "RADIO"]),
    isActive: z.boolean().default(true),
    values: z.array(attributeValueSchema).min(1, "At least one value is required"),
})

type AttributeFormValues = z.infer<typeof attributeSchema>

interface AttributeFormProps {
    initialData?: any;
    isEdit?: boolean;
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
}

export default function AttributeForm({ initialData, isEdit, onSuccess, onCancel }: AttributeFormProps) {
    const [loading, setLoading] = useState(false)
    const [isCheckingName, setIsCheckingName] = useState(false)

    const { 
        register, 
        handleSubmit, 
        setValue, 
        watch, 
        setError, 
        clearErrors,
        control,
        formState: { errors } 
    } = useForm<AttributeFormValues>({
        resolver: zodResolver(attributeSchema) as any,
        defaultValues: {
            name: initialData?.name || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            type: initialData?.type || "SELECT",
            isActive: initialData?.isActive ?? true,
            values: initialData?.values?.map((v: any) => ({ id: v.id, value: v.value })) || [{ value: "" }],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "values"
    })

    const attrName = watch("name")

    // Auto Slug
    useEffect(() => {
        if (attrName && !isEdit) {
            const slug = attrName.toLowerCase().trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_]+/g, '-')
                .replace(/^-+|-+$/g, '')
            setValue("slug", slug)
        }
    }, [attrName, setValue, isEdit])

    const onFormSubmit = async (values: AttributeFormValues) => {
        setLoading(true)
        try {
            const res = isEdit 
                ? await adminService.updateAttribute(initialData.id, values)
                : await adminService.createAttribute(values)
            
            if (res.success) {
                toast.success(`Attribute ${isEdit ? 'updated' : 'created'} successfully`)
                onSuccess?.(res.data?.id)
            }
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                handleBackendErrors<AttributeFormValues>(error.errors, setError)
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit as any)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Side: Basic Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center text-orange-600">
                                <Sliders size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white">Attribute Definition</h3>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Define global property and its behavior</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AdminInput 
                                label="Attribute Name"
                                placeholder="e.g. Color, Size, Material"
                                {...register("name")}
                                error={errors.name?.message}
                                name="name"
                            />

                            <AdminInput 
                                label="Slug"
                                placeholder="Auto-generated"
                                {...register("slug")}
                                error={errors.slug?.message}
                                readOnly
                                name="slug"
                            />

                            <AdminInput 
                                label="Display Type"
                                as="select"
                                {...register("type")}
                                error={errors.type?.message}
                                name="type"
                            >
                                <option value="SELECT">Dropdown List</option>
                                <option value="COLOR">Color Swatch</option>
                                <option value="BUTTON">Choice Buttons</option>
                                <option value="RADIO">Radio Options</option>
                            </AdminInput>

                            <AdminInput 
                                label="Status"
                                as="select"
                                value={watch("isActive") ? "true" : "false"}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    setValue("isActive", e.target.value === "true", { shouldValidate: true })
                                }}
                                error={errors.isActive?.message}
                                name="isActive"
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </AdminInput>
                        </div>

                        <AdminInput 
                            label="Description (Optional)"
                            as="textarea"
                            placeholder="Internal note about this attribute..."
                            rows={3}
                            {...register("description")}
                            error={errors.description?.message}
                            className="resize-none"
                            name="description"
                        />
                    </div>

                    {/* Values Section */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center text-indigo-600">
                                    <Type size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white">Attribute Values</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">Manage available options</p>
                                </div>
                            </div>
                            <button 
                                type="button"
                                onClick={() => append({ value: "" })}
                                className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-100 transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} />
                                Add Value
                            </button>
                        </div>

                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                                    <div className="text-gray-300 cursor-grab active:cursor-grabbing">
                                        <GripVertical size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <input 
                                            {...register(`values.${index}.value` as const)}
                                            placeholder="Enter value (e.g. Red, XL, Leather)"
                                            className={`w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800/50 border ${errors.values?.[index]?.value ? 'border-rose-500 ring-4 ring-rose-500/10' : 'border-gray-100 dark:border-gray-800'} rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-sm font-bold text-gray-900 dark:text-white`}
                                        />
                                        {errors.values?.[index]?.value && (
                                            <p className="text-[10px] text-rose-500 font-black uppercase tracking-widest mt-1.5 ml-1 flex items-center gap-1">
                                                <AlertCircle size={10} />
                                                {errors.values[index]?.value?.message}
                                            </p>
                                        )}
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}
                                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-all disabled:opacity-30"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                            {errors.values?.root && (
                                <p className="text-sm text-rose-500 font-bold">{errors.values.root.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Sidebar Actions */}
                <div className="space-y-8 sticky top-8">
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                        <div className="flex items-center gap-3 text-orange-500 mb-2">
                            <AlertCircle size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Publishing Actions</span>
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Save className="group-hover:rotate-12 transition-transform" size={24} />}
                            {isEdit ? 'Update Changes' : 'Create Attribute'}
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

                    <div className="p-8 bg-orange-50/50 dark:bg-orange-900/5 rounded-[2.5rem] border border-orange-100/50 dark:border-orange-900/20">
                        <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest mb-3">Pro Tip</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            Use descriptive names like "Main Color" or "Garment Size" to help customers filter products more effectively.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    )
}
