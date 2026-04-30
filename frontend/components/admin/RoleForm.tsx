"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Loader2, Shield, Type, AlignLeft } from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"

const roleSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    description: z.string().max(500, "Description too long").optional().or(z.literal("")),
})

type RoleFormValues = z.infer<typeof roleSchema>

interface RoleFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function RoleForm({ initialData, isEdit }: RoleFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const { 
        register, 
        handleSubmit, 
        setError, 
        formState: { errors } 
    } = useForm<RoleFormValues>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
        }
    })

    const onFormSubmit = async (values: RoleFormValues) => {
        setLoading(true)
        try {
            const res = isEdit 
                ? await adminService.updateRole(initialData.id, values)
                : await adminService.createRole(values)
            
            if (res.success) {
                toast.success(`Role ${isEdit ? 'updated' : 'created'} successfully`)
                router.push("/admin/users/roles")
            }
        } catch (error: any) {
            if (error.errors) {
                handleBackendErrors<RoleFormValues>(error.errors, setError)
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                
                <div className="flex items-center gap-3 border-b border-gray-50 dark:border-gray-800 pb-6">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shadow-blue-600/10">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900 dark:text-white">Role Details</h3>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Basic identification for the system role</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="group">
                        <div className="flex items-center gap-2 mb-1">
                            <Type size={14} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Identify Role</span>
                        </div>
                        <AdminInput 
                            label="Role Name"
                            placeholder="e.g. Senior Moderator, Content Manager"
                            {...register("name")}
                            error={errors.name?.message}
                        />
                    </div>

                    <div className="group">
                        <div className="flex items-center gap-2 mb-1">
                            <AlignLeft size={14} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</span>
                        </div>
                        <AdminInput 
                            label="Role Description"
                            as="textarea"
                            placeholder="Explain what users with this role can do..."
                            rows={4}
                            {...register("description")}
                            error={errors.description?.message}
                            className="resize-none"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[2rem] font-black shadow-xl shadow-blue-600/25 transition-all transform hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <Save size={24} className="group-hover:rotate-12 transition-transform" />
                        )}
                        <span className="uppercase tracking-widest text-sm">
                            {isEdit ? 'Update Role Definition' : 'Initialize New Role'}
                        </span>
                    </button>
                </div>
            </div>
        </form>
    )
}
