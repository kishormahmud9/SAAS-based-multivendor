"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import BirthdayPicker from "./BirthdayPicker"
import { 
    Save, 
    Loader2, 
    User, 
    Mail, 
    Lock, 
    ShieldCheck, 
    UserPlus, 
    Shield, 
    Phone, 
    Calendar, 
    Info, 
    Image as ImageIcon,
    CheckCircle2,
    XCircle,
    UserCircle,
    MapPin,
    Plus,
    Trash2,
    Home,
    Briefcase,
    Building2,
    Globe,
    ChevronLeft,
    Upload,
    X
} from "lucide-react"
import { adminService } from "@/src/services/admin.service"
import { toast } from "react-hot-toast"
import AdminInput from "./AdminInput"
import { handleBackendErrors } from "@/src/lib/form-utils"
import { getImageUrl } from "@/src/lib/image-utils"
import Modal from "@/components/ui/Modal"

const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional().nullable(),
    password: z.string().optional(),
    roleId: z.string({ message: "Please select a role" }).min(1, "Please select a role"),
    systemRole: z.enum(['SUPER_ADMIN', 'ADMIN', 'VENDOR', 'CUSTOMER', 'VENDOR_STAFF']).default('CUSTOMER'),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION']).default('ACTIVE'),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY']).optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    emailVerified: z.boolean().default(false),
    phoneVerified: z.boolean().default(false),
})

type UserFormValues = z.infer<typeof userSchema>

interface UserFormProps {
    initialData?: any;
    isEdit?: boolean;
}

export default function UserForm({ initialData, isEdit }: UserFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState<any[]>([])
    const [fetchingRoles, setFetchingRoles] = useState(true)
    
    // Image Upload State
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>(initialData?.avatar || "")
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Address Management State
    const [addresses, setAddresses] = useState<any[]>(initialData?.addresses || [])
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [newAddress, setNewAddress] = useState({
        label: "",
        type: "HOME",
        fullName: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "BD",
        isDefault: false
    })

    useEffect(() => {
        fetchRoles()
    }, [])

    const fetchRoles = async () => {
        try {
            const res = await adminService.getRoles()
            if (res.success) {
                setRoles(res.data)
            }
        } catch (err) {
            console.error("Failed to fetch roles", err)
        } finally {
            setFetchingRoles(false)
        }
    }

    const { 
        register, 
        handleSubmit, 
        setError, 
        setValue,
        watch,
        control,
        formState: { errors } 
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            password: "",
            roleId: initialData?.roleAssignments?.[0]?.roleId || "",
            systemRole: initialData?.systemRole || 'CUSTOMER',
            status: initialData?.status || 'ACTIVE',
            gender: initialData?.gender || null,
            dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : "",
            emailVerified: !!initialData?.emailVerified,
            phoneVerified: !!initialData?.phoneVerified,
        }
    })

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

    const onFormSubmit = async (values: UserFormValues) => {
        setLoading(true)
        
        const submitData = new FormData()
        
        // Append all fields properly
        Object.entries(values).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                // For password, we only skip if it's empty AND we're in edit mode
                if (key === 'password') {
                    if (isEdit && !value) return; // Skip empty password on edit
                    submitData.append(key, value as string);
                } else {
                    submitData.append(key, value.toString())
                }
            }
        })

        // Handle Address Book (Stringify for FormData)
        submitData.append('addresses', JSON.stringify(addresses))

        // Handle Image
        if (imageFile) {
            submitData.append('avatar', imageFile)
        }

        try {
            const res = isEdit 
                ? await adminService.updateUser(initialData.id, submitData)
                : await adminService.createUser(submitData)
            
            if (res.success) {
                toast.success(`User ${isEdit ? 'updated' : 'created'} successfully`)
                router.push("/admin/users")
            }
        } catch (error: any) {
            // PROPERLY HANDLE VALIDATION ERRORS FROM BACKEND
            if (error.errors && Array.isArray(error.errors)) {
                handleBackendErrors<UserFormValues>(error.errors, setError)
                toast.error("Please fix the validation errors in the form")
            } else {
                toast.error(error.message || "Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleAddAddress = () => {
        if (!newAddress.street || !newAddress.city || !newAddress.fullName) {
            toast.error("Please fill required address fields")
            return
        }
        setAddresses([...addresses, { ...newAddress, id: `new-${Date.now()}` }])
        setShowAddressModal(false)
        setNewAddress({
            label: "",
            type: "HOME",
            fullName: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "BD",
            isDefault: false
        })
    }

    const removeAddress = (id: string) => {
        setAddresses(addresses.filter(a => a.id !== id))
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN - Main Content (8/12) */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* General Information Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600">
                                <User size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">General Information</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Display Name</label>
                                <AdminInput placeholder="e.g. John Doe" {...register("name")} error={errors.name?.message} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Email Address {isEdit && '(Locked)'}</label>
                                    <AdminInput type="email" placeholder="johndoe@example.com" {...register("email")} error={errors.email?.message} disabled={isEdit} />
                                </div>
                                <div className="group">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Contact Phone {isEdit && '(Locked)'}</label>
                                    <AdminInput placeholder="+1 234..." {...register("phone")} error={errors.phone?.message} disabled={isEdit} />
                                </div>
                            </div>

                            <div className="group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
                                    {isEdit ? 'Update Password (Leave blank to keep current)' : 'Account Password'}
                                </label>
                                <AdminInput type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />
                            </div>
                        </div>
                    </div>

                    {/* Hierarchy & Permissions Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Hierarchy & Access</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">RBAC Permission Group</label>
                                <AdminInput as="select" {...register("roleId")} error={errors.roleId?.message} disabled={fetchingRoles}>
                                    <option value="">Select a role...</option>
                                    {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                                </AdminInput>
                            </div>
                            <div className="group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">System Classification</label>
                                <AdminInput as="select" {...register("systemRole")} error={errors.systemRole?.message}>
                                    <option value="CUSTOMER">Customer</option>
                                    <option value="VENDOR">Vendor</option>
                                    <option value="ADMIN">Admin</option>
                                    <option value="SUPER_ADMIN">Super Admin</option>
                                </AdminInput>
                            </div>
                        </div>
                    </div>

                    {/* Address Book Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Address Book</h3>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setShowAddressModal(true)}
                                className="px-5 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-2"
                            >
                                <Plus size={14} /> Add Address
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addresses.length === 0 ? (
                                <div className="col-span-full py-12 bg-gray-50 dark:bg-gray-800/30 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-700 text-center">
                                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest italic">No addresses saved yet.</p>
                                </div>
                            ) : (
                                addresses.map((addr) => (
                                    <div key={addr.id} className="p-6 bg-gray-50/50 dark:bg-gray-800/30 rounded-[2rem] border border-gray-100 dark:border-gray-800 relative group">
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button type="button" onClick={() => removeAddress(addr.id)} className="w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center hover:bg-rose-600">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md">{addr.label || addr.type}</span>
                                            {addr.isDefault && <span className="text-[9px] font-black uppercase tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-md">Default</span>}
                                        </div>
                                        <p className="font-bold text-gray-900 dark:text-white text-sm">{addr.fullName}</p>
                                        <p className="text-xs text-gray-500 mt-1">{addr.street}, {addr.city}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN - Sidebar (4/12) */}
                <div className="lg:col-span-4 space-y-8">
                    
                    {/* User Profile Thumbnail Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
                                <ImageIcon size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Thumbnail</h3>
                        </div>

                        <div className="space-y-6">
                            {imagePreview ? (
                                <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-inner bg-gray-50 dark:bg-gray-800">
                                    <img 
                                        src={getImageUrl(imagePreview)} 
                                        className="w-full h-full object-cover" 
                                        alt="Avatar Preview"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null)
                                            setImagePreview("")
                                        }}
                                        className="absolute top-4 right-4 w-10 h-10 bg-rose-500 text-white rounded-xl shadow-xl flex items-center justify-center hover:bg-rose-600 transition-all active:scale-90"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ) : (
                                <label className="aspect-square rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-orange-500 hover:bg-orange-50/30 transition-all">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                                        <Upload size={32} />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Upload Photo</span>
                                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Max 2MB (WebP Preferred)</span>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    {/* Demographics Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600">
                                <UserCircle size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">User Profile</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Gender Identification</label>
                                <AdminInput as="select" {...register("gender")}>
                                    <option value="">Not Specified</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                    <option value="OTHER">Other</option>
                                    <option value="PREFER_NOT_TO_SAY">Prefer Not to Say</option>
                                </AdminInput>
                            </div>

                            <Controller
                                name="dateOfBirth"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <BirthdayPicker
                                        label="Date of Birth"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={error?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Account Settings (SEO Style) Card */}
                    <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center text-rose-600">
                                <Shield size={20} />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Account Status</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Lifecycle Status</label>
                                <AdminInput as="select" {...register("status")}>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                    <option value="SUSPENDED">SUSPENDED</option>
                                    <option value="PENDING_VERIFICATION">PENDING VERIFICATION</option>
                                </AdminInput>
                            </div>

                            <div className="space-y-3 pt-2">
                                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all border border-transparent hover:border-emerald-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">Email Verified</span>
                                    <input type="checkbox" {...register("emailVerified")} className="w-5 h-5 rounded-lg border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                                </label>
                                <label className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all border border-transparent hover:border-emerald-100">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">Phone Verified</span>
                                    <input type="checkbox" {...register("phoneVerified")} className="w-5 h-5 rounded-lg border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-[2rem] font-black shadow-xl shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-80"
                        >
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                            <span className="uppercase tracking-widest text-sm">{isEdit ? 'Save Changes' : 'Create User'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Address Modal (remains the same) */}
            <Modal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} title="Add New Address" maxWidth="lg">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Address Label</label>
                        <input value={newAddress.label} onChange={(e) => setNewAddress({...newAddress, label: e.target.value})} placeholder="e.g. My Home, Main Office" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Recipient Name</label>
                        <input value={newAddress.fullName} onChange={(e) => setNewAddress({...newAddress, fullName: e.target.value})} placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Contact Phone</label>
                        <input value={newAddress.phone} onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})} placeholder="+1 234..." className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div className="col-span-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Street Address</label>
                        <input value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} placeholder="123 Street Name" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">City</label>
                        <input value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} placeholder="Dhaka" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">State / Province</label>
                        <input value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} placeholder="Dhaka" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Zip Code</label>
                        <input value={newAddress.zipCode} onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})} placeholder="1000" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Country</label>
                        <input value={newAddress.country} onChange={(e) => setNewAddress({...newAddress, country: e.target.value})} placeholder="Bangladesh" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-sm border-0 focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <div className="col-span-2 pt-4">
                        <button type="button" onClick={handleAddAddress} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">Add to Address Book</button>
                    </div>
                </div>
            </Modal>
        </form>
    )
}
