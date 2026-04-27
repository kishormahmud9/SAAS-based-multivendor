"use client"

import { useState } from "react"
import { Calendar, Tag, Percent, DollarSign, TextCursorInput, Users } from "lucide-react"

export default function CreateCouponModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        code: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        minPurchaseMatch: "",
        usageLimit: "",
        startDate: "",
        endDate: "",
        status: "ACTIVE"
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Coupon Draft:", formData)
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                {/* Coupon Code */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <TextCursorInput size={16} className="text-green-500" />
                        Coupon Code *
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 font-bold">
                            #
                        </span>
                        <input
                            type="text"
                            required
                            value={formData.code}
                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                            className="w-full px-4 py-3 pl-8 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors uppercase font-mono tracking-widest"
                            placeholder="WELCOME20"
                        />
                    </div>
                </div>

                {/* Discount Box */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <Tag size={16} className="text-blue-500" />
                            Discount Type *
                        </label>
                        <select
                            value={formData.discountType}
                            onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                        >
                            <option value="PERCENTAGE">Percentage (%)</option>
                            <option value="FIXED">Fixed Amount ($)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            {formData.discountType === "PERCENTAGE" ? (
                                <Percent size={16} className="text-blue-500" />
                            ) : (
                                <DollarSign size={16} className="text-blue-500" />
                            )}
                            Discount Amount *
                        </label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.discountValue}
                            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 transition-colors"
                            placeholder="e.g. 20"
                        />
                    </div>
                </div>

                {/* Limits Box */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <DollarSign size={16} className="text-gray-500" />
                            Min. Spend (Optional)
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.minPurchaseMatch}
                            onChange={(e) => setFormData({ ...formData, minPurchaseMatch: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                            placeholder="e.g. 100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <Users size={16} className="text-gray-500" />
                            Total Usage Limit
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={formData.usageLimit}
                            onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                            placeholder="Leave empty for unlimited"
                        />
                    </div>
                </div>

                {/* Dates Box */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-orange-500" />
                            Start Date *
                        </label>
                        <input
                            type="datetime-local"
                            required
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors cursor-text text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-red-500" />
                            End Date *
                        </label>
                        <input
                            type="datetime-local"
                            required
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors cursor-text text-sm"
                        />
                    </div>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center space-x-3 pt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer"
                            checked={formData.status === "ACTIVE"}
                            onChange={(e) => setFormData({ ...formData, status: e.target.checked ? "ACTIVE" : "DRAFT" })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500 dark:peer-checked:bg-green-500"></div>
                    </label>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {formData.status === "ACTIVE" ? 'Active Coupon' : 'Draft / Paused'}
                    </span>
                </div>
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
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 shadow-md shadow-green-500/20 transition-all flex items-center justify-center gap-2"
                >
                    Create Coupon
                </button>
            </div>
        </form>
    )
}
