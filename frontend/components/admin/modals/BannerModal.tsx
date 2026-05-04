"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/src/lib/api-client"
import { Save, X, Loader2, Upload, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface BannerModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    initialData?: any // Banner object
}

const gradientOptions = [
    "bg-gradient-to-r from-orange-400 to-red-500",
    "bg-gradient-to-r from-blue-900 to-blue-600",
    "bg-gradient-to-r from-pink-500 to-purple-600",
    "bg-gradient-to-r from-emerald-500 to-teal-700",
    "bg-gradient-to-r from-purple-500 to-indigo-600",
    "bg-gradient-to-r from-yellow-400 to-orange-500",
    "bg-gradient-to-r from-cyan-500 to-blue-500",
];

export default function BannerModal({ isOpen, onClose, onSuccess, initialData }: BannerModalProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        link: "",
        backgroundType: "SOLID", // SOLID or IMAGE
        targetDate: "",
        image: "",
        type: "CAROUSEL",
        order: 0,
    })
    const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string } | null>(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                subtitle: initialData.subtitle || "",
                link: initialData.link || "",
                backgroundType: initialData.backgroundType || "SOLID",
                targetDate: initialData.targetDate ? new Date(initialData.targetDate).toISOString().split('T')[0] : "",
                image: initialData.image || "",
                type: initialData.type || "CAROUSEL",
                order: initialData.order || 0,
            })
        } else {
            setFormData({
                title: "",
                subtitle: "",
                link: "",
                backgroundType: "SOLID",
                targetDate: "",
                image: "",
                type: "CAROUSEL",
                order: 0,
            })
        }
        setSelectedFile(null)
    }, [initialData, isOpen])

    if (!isOpen) return null

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setSelectedFile({
            file,
            preview: URL.createObjectURL(file)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const submitData = new FormData()
            
            // Append all form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    submitData.append(key, value.toString())
                }
            })

            // Append file if selected
            if (selectedFile) {
                submitData.append('image', selectedFile.file)
            }

            const endpoint = initialData ? `/home-banners/${initialData.id}` : "/home-banners"
            const method = initialData ? "PATCH" : "POST"

            const data = await apiClient(endpoint, {
                method,
                body: submitData
            })

            if (data.success) {
                toast.success(initialData ? "Banner updated" : "Banner created")
                onSuccess()
                onClose()
            }
        } catch (error: any) {
            toast.error(error.message || "Error saving banner")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-[#0A0A0B] rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col border border-transparent dark:border-gray-800 animate-in fade-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/20">
                    <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 dark:text-white italic">{initialData ? "Edit Banner Slide" : "Add New Slide"}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 dark:text-gray-500">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Title</label>
                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white font-medium transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
                                required={formData.backgroundType === 'SOLID'}
                                placeholder="Enter compelling title..."
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Subtitle</label>
                            <textarea
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white font-medium transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700"
                                rows={2}
                                placeholder="Add a short description..."
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Link URL</label>
                            <input
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white font-medium transition-all"
                                placeholder="/shop/category"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Target Date</label>
                            <input
                                type="date"
                                name="targetDate"
                                value={formData.targetDate}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white font-medium transition-all [color-scheme:light] dark:[color-scheme:dark]"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Background Type</label>
                            <select
                                name="backgroundType"
                                value={formData.backgroundType}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white font-medium transition-all"
                            >
                                <option value="SOLID">Solid Color Gradient</option>
                                <option value="IMAGE">Image Background</option>
                            </select>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Display Order</label>
                            <input
                                type="number"
                                name="order"
                                value={formData.order}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white dark:bg-gray-900/50 text-gray-900 dark:text-white font-medium transition-all"
                                min="0"
                            />
                        </div>
                    </div>

                    {formData.backgroundType === 'IMAGE' ? (
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Banner Image</label>
                            <div className="flex items-center gap-6 p-6 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/30 transition-colors hover:border-blue-500/50">
                                <div className="relative w-40 h-24 bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex items-center justify-center shadow-inner">
                                    {(selectedFile?.preview || formData.image) ? (
                                        <img 
                                            src={selectedFile?.preview || (formData.image.startsWith('bg-') ? '' : formData.image)} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                                        />
                                    ) : (
                                        <Upload className="text-gray-300 dark:text-gray-700" size={32} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="cursor-pointer inline-flex items-center px-6 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-xs font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm">
                                        <Upload size={16} className="mr-2 text-blue-600" />
                                        {uploading ? "Uploading..." : "Select Image"}
                                        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                    </label>
                                    <p className="mt-2 text-[9px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-tight">Recommended: 1920x800px (Max 2MB)</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 mb-2 ml-1">Background Color</label>
                            <div className="flex flex-wrap gap-4 p-6 border border-gray-200 dark:border-gray-800 rounded-[2rem] bg-gray-50/50 dark:bg-gray-900/30">
                                {gradientOptions.map((gradient, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: gradient }))}
                                        className={`w-12 h-12 rounded-2xl cursor-pointer transition-all hover:scale-110 shadow-lg ${gradient} ${formData.image === gradient ? 'ring-4 ring-offset-4 ring-blue-600 dark:ring-offset-gray-950 scale-110' : 'ring-1 ring-black/10 hover:shadow-blue-500/20'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </form>

                <div className="p-8 border-t border-gray-100 dark:border-gray-900 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900/20">
                    <button onClick={onClose} className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit} 
                        disabled={loading || uploading}
                        className="px-8 py-2.5 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/30 text-xs font-black uppercase tracking-widest active:scale-95 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Slide
                    </button>
                </div>
            </div>
        </div>
    )
}
