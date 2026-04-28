"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
    User, 
    ShoppingBag, 
    Heart, 
    Settings, 
    LogOut,
    ChevronRight,
    LayoutDashboard
} from "lucide-react"
import { useAuth } from "@/lib/contexts/AuthContext"
import Image from "next/image"

const menuItems = [
    { name: "Overview", href: "/user/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/user/profile", icon: User },
    { name: "Orders", href: "/user/orders", icon: ShoppingBag },
    { name: "Favorites", href: "/user/wishlist", icon: Heart },
    { name: "Settings", href: "/user/settings", icon: Settings },
]

export default function UserSidebar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()

    return (
        <aside className="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* User Profile Header */}
            <div className="p-8 text-center border-b border-gray-50 dark:border-gray-800">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-gray-50 dark:ring-gray-800 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Image 
                            src={(user as any)?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&q=80"} 
                            alt={user?.name || "User"}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                </div>
                <h2 className="text-xl font-bold text-gray-950 dark:text-white truncate">
                    {user?.name || "Kishor Mahmud"}
                </h2>
                <p className="text-sm text-gray-500 truncate mt-1">
                    {user?.email || "kishor.betopia@gmail.com"}
                </p>
            </div>
            
            <nav className="p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-200 group ${
                                isActive 
                                    ? "bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold" 
                                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span>{item.name}</span>
                            </div>
                            <ChevronRight size={18} className={`${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600"} transition-colors`} />
                        </Link>
                    )
                })}

            <div className="p-4 border-t border-gray-50 dark:border-gray-800">
                <button
                    onClick={() => logout()}
                    className="w-full h-14 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white transition-all duration-300 shadow-sm shadow-red-500/5 group"
                >
                    <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span>Logout Account</span>
                </button>
            </div>
            </nav>
        </aside>
    )
}
