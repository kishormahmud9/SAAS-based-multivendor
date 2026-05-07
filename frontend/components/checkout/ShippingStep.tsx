"use client"

import { useState, useEffect } from "react"
import { Plus, CheckCircle, MapPin, PlusCircle, Home, Briefcase, MapPinned } from "lucide-react"
import AddressForm from "@/components/user/AddressForm"
import { userService } from "@/src/services/user.service"
import { Loader2 } from "lucide-react"

interface Address {
    id: string
    type: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    isDefault: boolean
    fullName: string
    phone: string
}

interface ShippingStepProps {
    selectedAddressId: string | null
    onSelectAddress: (id: string) => void
}

export default function ShippingStep({ selectedAddressId, onSelectAddress }: ShippingStepProps) {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        fetchAddresses()
    }, [])

    const fetchAddresses = async () => {
        try {
            const data = await userService.getAddresses()
            if (data.success) {
                setAddresses(data.data)
                // Auto-select default address if none selected
                if (!selectedAddressId) {
                    const defaultAddr = data.data.find((a: Address) => a.isDefault)
                    if (defaultAddr) {
                        onSelectAddress(defaultAddr.id)
                    } else if (data.data.length > 0) {
                        onSelectAddress(data.data[0].id)
                    }
                }
            }
        } catch (error) {
            console.error("Failed to load addresses")
        } finally {
            setLoading(false)
        }
    }

    const handleAddressAdded = async (newAddress: any) => {
        setAdding(true)
        try {
            const data = await userService.addAddress(newAddress)
            if (data.success) {
                await fetchAddresses()
                setShowForm(false)
                onSelectAddress(data.data.id)
            }
        } catch (error) {
            console.error("Failed to add address")
        } finally {
            setAdding(false)
        }
    }

    const getAddressIcon = (type: string) => {
        switch (type.toUpperCase()) {
            case 'HOME': return <Home size={18} />
            case 'OFFICE': return <Briefcase size={18} />
            default: return <MapPin size={18} />
        }
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {[1, 2].map(i => (
                    <div key={i} className="h-32 bg-gray-50 rounded-2xl border border-gray-100" />
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {!showForm && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            onClick={() => onSelectAddress(address.id)}
                            className={`
                                group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                                ${selectedAddressId === address.id
                                    ? "border-orange-500 bg-orange-50/30 shadow-md ring-1 ring-orange-500"
                                    : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm"
                                }
                            `}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`
                                    p-2.5 rounded-xl 
                                    ${selectedAddressId === address.id ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-500"}
                                `}>
                                    {getAddressIcon(address.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-bold text-gray-900">{address.fullName || 'Shipping Address'}</h4>
                                        {selectedAddressId === address.id && (
                                            <CheckCircle size={18} className="text-orange-500 fill-white" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-1">
                                        {address.street}
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {address.city}, {address.state} {address.zipCode}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">
                                        {address.phone}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Decorative Background Icon */}
                            <div className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                <MapPinned size={80} />
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => setShowForm(true)}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50/30 transition-all duration-300 group min-h-[140px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500 transition-all mb-3">
                            <Plus size={24} />
                        </div>
                        <span className="text-sm font-bold text-gray-500 group-hover:text-orange-600 tracking-wide">Add New Address</span>
                    </button>
                </div>
            )}

            {showForm && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Add New Shipping Address</h3>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Please fill in the details below to continue.</p>
                        </div>
                        <button 
                            onClick={() => setShowForm(false)}
                            className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            <PlusCircle size={20} className="rotate-45" />
                        </button>
                    </div>
                    <div className="p-8">
                        {adding ? (
                            <div className="py-12 flex flex-col items-center justify-center">
                                <Loader2 className="animate-spin text-orange-500 mb-4" size={32} />
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Saving Address...</p>
                            </div>
                        ) : (
                            <AddressForm
                                onSubmit={handleAddressAdded}
                                onCancel={() => setShowForm(false)}
                                submitLabel="Save and Use This Address"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
