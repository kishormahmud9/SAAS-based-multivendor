"use client"

import { useState } from "react"
import { Lock, Save, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { userService } from "@/src/services/user.service"

export default function ChangePasswordPage() {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match")
            return
        }

        setLoading(true)

        try {
            const data = await userService.changePassword({
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword
            })

            if (data.success) {
                toast.success(data.message || "Password updated successfully!")
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                })
            } else {
                toast.error(data.message || "Failed to update password")
            }
        } catch (error: any) {
            toast.error(error || "Failed to update password")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Change Password</h1>
                <p className="text-gray-600 dark:text-gray-400">Update your password to keep your account secure</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                minLength={6}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
                                required
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters</p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="text-gray-400" size={20} />
                            </div>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                minLength={6}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Updating...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Update Password
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
