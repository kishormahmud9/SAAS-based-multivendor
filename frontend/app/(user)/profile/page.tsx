"use client"

import { Camera } from "lucide-react"
import { useAuth } from "@/lib/contexts/AuthContext"
import Image from "next/image"

export default function ProfilePage() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col">
            {/* Profile Header / Banner with Gradient */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            </div>

            {/* Profile Avatar & Basic Info */}
            <div className="px-6 md:px-10 -mt-12 md:-mt-16 mb-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <div className="relative group/avatar">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-xl bg-white dark:bg-gray-800">
                            <Image 
                                src={(user as any)?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&q=80"} 
                                alt={user?.name || "User"}
                                fill
                                className="object-cover rounded-full"
                            />
                        </div>
                        {/* Image Update Overlay */}
                        <button className="absolute bottom-1 right-1 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg border-2 border-white dark:border-gray-900 transition-all active:scale-95 group-hover/avatar:scale-110">
                            <Camera size={18} />
                        </button>
                    </div>
                    <div className="pb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-950 dark:text-white">
                            {user?.name || "Kishor Mahmud"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            {user?.email || "kishor.betopia@gmail.com"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Simplified Personal Information */}
            <div className="px-6 md:px-10 pb-10 space-y-8">
                <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-50 dark:border-gray-800 pb-4">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Full Name</p>
                            <p className="text-gray-900 dark:text-white font-semibold text-lg">{user?.name || "Kishor Mahmud"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Email Address</p>
                            <p className="text-gray-900 dark:text-white font-semibold text-lg">{user?.email || "kishor.betopia@gmail.com"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">Phone Number</p>
                            <p className="text-gray-900 dark:text-white font-semibold text-lg">N/A</p>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-end">
                        <button className="px-10 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-full font-bold transition-all hover:bg-orange-600 dark:hover:bg-orange-500 hover:text-white dark:hover:text-white shadow-lg">
                            Edit Profile
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
