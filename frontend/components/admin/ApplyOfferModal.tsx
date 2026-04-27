"use client"

import { useState } from "react"
import { Tag, LayoutGrid, Package, LayoutList } from "lucide-react"
import SearchableSelect from "@/components/ui/SearchableSelect"

export default function ApplyOfferModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        offerId: "",
        targetType: "PRODUCTS",
        targetIds: [] as string[]
    })

    // Mock data for UI design purposes
    const mockOffers = [
        { id: "1", name: "Summer Flash Sale - 20%" },
        { id: "2", name: "Clearance - $50 Off" }
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Apply Offer Data:", formData)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
                {/* Select Offer */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Tag size={16} className="text-orange-500" />
                        Select Offer to Apply *
                    </label>
                    <SearchableSelect 
                        options={mockOffers}
                        value={formData.offerId}
                        onChange={(val) => setFormData({...formData, offerId: val})}
                        placeholder="Search for an active offer..."
                        className="shadow-sm"
                    />
                </div>

                {/* Target Type Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <LayoutGrid size={16} className="text-blue-500" />
                        Where should this apply? *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, targetType: "PRODUCTS"})}
                            className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all gap-2 ${
                                formData.targetType === "PRODUCTS"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold"
                                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                        >
                            <Package size={24} className={formData.targetType === "PRODUCTS" ? "text-blue-500" : "text-gray-400"} />
                            <span className="text-xs text-center">Specific Products</span>
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, targetType: "CATEGORIES"})}
                            className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all gap-2 ${
                                formData.targetType === "CATEGORIES"
                                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold"
                                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                        >
                            <LayoutList size={24} className={formData.targetType === "CATEGORIES" ? "text-blue-500" : "text-gray-400"} />
                            <span className="text-xs text-center">Specific Categories</span>
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => setFormData({...formData, targetType: "STOREWIDE"})}
                            className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all gap-2 ${
                                formData.targetType === "STOREWIDE"
                                    ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 font-bold"
                                    : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                        >
                            <LayoutGrid size={24} className={formData.targetType === "STOREWIDE" ? "text-orange-500" : "text-gray-400"} />
                            <span className="text-xs text-center">Storewide (All)</span>
                        </button>
                    </div>
                </div>

                {/* Sub-Selection (Appears conditionally based on targetType) */}
                {formData.targetType !== "STOREWIDE" && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50 animate-in fade-in duration-300">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Select the {formData.targetType === "PRODUCTS" ? "Products" : "Categories"} *
                        </label>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 italic">
                            (Multiple selection component to be integrated based on exact backend spec)
                        </p>
                        <div className="w-full h-12 dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
                            Click to add {formData.targetType.toLowerCase()}...
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-6 mt-6 border-t dark:border-gray-800">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                >
                    Apply Now
                </button>
            </div>
        </form>
    )
}
