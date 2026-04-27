"use client"

import { useState } from "react"
import { MapPin, Plus, Trash2, Edit2, Home, Briefcase, Globe } from "lucide-react"

export default function AddressesPage() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            name: "John Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
            isDefault: true
        },
        {
            id: 2,
            type: "Office",
            name: "John Doe",
            street: "456 Business Ave",
            city: "Brooklyn",
            state: "NY",
            zip: "11201",
            country: "USA",
            isDefault: false
        }
    ])

    return (
        <div className="p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Addresses</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your shipping and billing addresses.</p>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-xl font-bold hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white transition-all shadow-lg shadow-black/10">
                    <Plus size={20} />
                    Add New Address
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <div 
                        key={address.id} 
                        className={`p-6 rounded-2xl border transition-all ${
                            address.isDefault 
                                ? "border-orange-200 dark:border-orange-500/30 bg-orange-50/30 dark:bg-orange-500/5 ring-1 ring-orange-100 dark:ring-orange-500/20" 
                                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50"
                        }`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                    address.isDefault ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                                }`}>
                                    {address.type === "Home" ? <Home size={20} /> : address.type === "Office" ? <Briefcase size={20} /> : <Globe size={20} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{address.type}</h3>
                                    {address.isDefault && <span className="text-[10px] bg-orange-100 dark:bg-orange-500/20 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Default</span>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                    <Edit2 size={18} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                            <p className="font-medium text-gray-900 dark:text-white">{address.name}</p>
                            <p>{address.street}</p>
                            <p>{address.city}, {address.state} {address.zip}</p>
                            <p>{address.country}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
