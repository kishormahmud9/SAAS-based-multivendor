"use client"

import { useState } from "react"
import { MapPin, User, Phone, Globe } from "lucide-react"

interface AddressFormProps {
    initialData?: {
        type: string
        fullName: string
        phone: string
        street: string
        city: string
        state: string
        zipCode: string
        country: string
        isDefault: boolean
    }
    onSubmit: (data: any) => Promise<void>
    onCancel?: () => void
    submitLabel?: string
}

export default function AddressForm({
    initialData,
    onSubmit,
    onCancel,
    submitLabel = "Save Address"
}: AddressFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        type: initialData?.type || "HOME",
        fullName: initialData?.fullName || "",
        phone: initialData?.phone || "",
        street: initialData?.street || "",
        city: initialData?.city || "",
        state: initialData?.state || "",
        zipCode: initialData?.zipCode || "",
        country: initialData?.country || "BD",
        isDefault: initialData?.isDefault || false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit(formData)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <User size={14} className="text-orange-500" /> Full Name
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <Phone size={14} className="text-orange-500" /> Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="017XXXXXXXX"
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                        required
                    />
                </div>
            </div>

            {/* Address Type & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Address Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all appearance-none cursor-pointer"
                        required
                    >
                        <option value="HOME">Home</option>
                        <option value="OFFICE">Office</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                        <Globe size={14} className="text-orange-500" /> Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                        required
                    />
                </div>
            </div>

            {/* Street Address */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={14} className="text-orange-500" /> Street Address
                </label>
                <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="House No, Road No, Area"
                    className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                    required
                />
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Dhaka"
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Dhaka"
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">ZIP Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="1200"
                        className="w-full h-12 px-4 bg-gray-50 border-gray-100 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
                        required
                    />
                </div>
            </div>

            {/* Set as Default */}
            <div className="flex items-center gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <input
                    type="checkbox"
                    name="isDefault"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-600 bg-white border-gray-200 rounded-lg focus:ring-orange-500/20 focus:ring-2 transition-all cursor-pointer"
                />
                <label htmlFor="isDefault" className="text-sm font-bold text-gray-600 cursor-pointer select-none">
                    Set as my default shipping address
                </label>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-14 bg-gray-900 hover:bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gray-100 disabled:opacity-50"
                >
                    {loading ? "Processing..." : submitLabel}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-8 h-14 bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    )
}
