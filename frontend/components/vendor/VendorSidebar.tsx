"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext"
import { useSidebar } from "@/lib/contexts/SidebarContext"
import { toast } from "react-hot-toast"
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    Layers,
    Boxes,
    ShoppingBag,
    RefreshCw,
    Users,
    MessageSquare,
    Ticket,
    Percent,
    Zap,
    Wallet,
    CreditCard,
    History,
    Truck,
    Store,
    BarChart3,
    Bell,
    MessageCircle,
    UserPlus,
    Gem,
    FileCheck,
    HelpCircle,
    Settings,
    LogOut,
    ExternalLink,
    Layout,
    Shield,
    ShieldCheck
} from "lucide-react"

const navGroups = [
    {
        id: "overview",
        name: "Overview",
        icon: LayoutDashboard,
        items: [
            { name: "Main Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard, permission: "dashboard.view" },
            { name: "Reports & Analytics", href: "/vendor/reports", icon: BarChart3, permission: "reports.view" },
            { name: "Notifications", href: "/vendor/notifications", icon: Bell },
        ]
    },
    {
        id: "catalog",
        name: "Catalog",
        icon: Package,
        permission: "products.view",
        items: [
            { name: "All Products", href: "/vendor/products", icon: Package, permission: "products.view" },
            { name: "Add New Product", href: "/vendor/products/add", icon: PlusCircle, permission: "products.add" },
            { name: "Categories", href: "/vendor/categories", icon: Layers, permission: "products.view" },
            { name: "Inventory Manager", href: "/vendor/inventory", icon: Boxes, permission: "products.inventory" },
            { name: "Product Reviews", href: "/vendor/reviews", icon: MessageSquare, permission: "reviews.view" },
        ]
    },
    {
        id: "sales",
        name: "Sales Hub",
        icon: ShoppingBag,
        permission: "orders.view",
        items: [
            { name: "All Orders", href: "/vendor/orders", icon: ShoppingBag, permission: "orders.view" },
            { name: "Returns & Refunds", href: "/vendor/orders/returns", icon: RefreshCw, permission: "orders.refund" },
            { name: "Customers List", href: "/vendor/customers", icon: Users, permission: "customers.view" },
        ]
    },
    {
        id: "marketing",
        name: "Marketing",
        icon: Percent,
        permission: "marketing.view",
        items: [
            { name: "Coupons", href: "/vendor/coupons", icon: Ticket, permission: "marketing.view" },
            { name: "Discounts", href: "/vendor/discounts", icon: Percent, permission: "marketing.view" },
            { name: "Flash Sales", href: "/vendor/flash-sale", icon: Zap, permission: "marketing.view" },
        ]
    },
    {
        id: "finance",
        name: "Finance",
        icon: Wallet,
        permission: "finance.view_wallet",
        items: [
            { name: "My Wallet", href: "/vendor/wallet", icon: Wallet, permission: "finance.view_wallet" },
            { name: "Withdraw Requests", href: "/vendor/withdrawals", icon: CreditCard, permission: "finance.withdraw" },
            { name: "Transactions", href: "/vendor/transactions", icon: History, permission: "finance.view_transactions" },
        ]
    },
    {
        id: "storefront",
        name: "Storefront",
        icon: Store,
        items: [
            { name: "Store Settings", href: "/vendor/store-settings", icon: Store, permission: "settings.store" },
            { name: "Shipping Settings", href: "/vendor/shipping", icon: Truck, permission: "shipping.manage" },
            { name: "Verification/KYC", href: "/vendor/verification", icon: FileCheck, permission: "verification.submit" },
        ]
    },
    {
        id: "support",
        name: "Support",
        icon: MessageCircle,
        permission: "support.view",
        items: [
            { name: "Messages Chat", href: "/vendor/messages", icon: MessageCircle, permission: "support.view" },
            { name: "Help Center", href: "/vendor/help", icon: HelpCircle },
        ]
    },
    {
        id: "team",
        name: "Team & Plan",
        icon: UserPlus,
        permission: "staff.view",
        items: [
            { name: "Staff Management", href: "/vendor/staff", icon: UserPlus, permission: "staff.view" },
            { name: "Role Permissions", href: "/vendor/roles", icon: Shield, permission: "roles.view" },
            { name: "Subscription Plan", href: "/vendor/subscription", icon: Gem },
        ]
    },
    {
        id: "config",
        name: "Configuration",
        icon: Settings,
        items: [
            { name: "Profile Settings", href: "/vendor/settings", icon: Settings },
            { name: "Security & 2FA", href: "/vendor/settings/security", icon: ShieldCheck, permission: "settings.security" },
        ]
    }
]

export default function VendorSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { logout, hasPermission } = useAuth()
    const { isOpen, close } = useSidebar()

    const filteredGroups = useMemo(() => {
        return navGroups.filter(group => {
            if ((group as any).permission && !hasPermission((group as any).permission)) return false
            return group.items.some(item => !item.permission || hasPermission(item.permission))
        })
    }, [hasPermission])

    const currentGroup = useMemo(() => {
        return filteredGroups.find(group => 
            group.items.some(item => pathname === item.href || pathname?.startsWith(item.href + "/"))
        ) || filteredGroups[0];
    }, [pathname, filteredGroups])

    const [activeGroup, setActiveGroup] = useState(currentGroup)

    useEffect(() => {
        if (currentGroup) {
            setActiveGroup(currentGroup)
        }
    }, [currentGroup])

    const handleLogout = async () => {
        try {
            await logout()
            toast.success("Successfully logged out")
            // Redirection is now handled by AuthContext logout
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    return (
        <aside className={`flex h-screen overflow-hidden shadow-2xl z-50 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative`}>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 md:hidden z-[-1]" 
                    onClick={close}
                />
            )}
            {/* THIN COLUMN - Group Selector */}
            <div className="w-[72px] md:w-20 bg-blue-950 dark:bg-gray-950 flex flex-col items-center py-6 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.5)] z-20 transition-colors shrink-0">
                
                {/* Minimal Logo */}
                <Link href="/vendor/dashboard" className="mb-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-extrabold text-xl md:text-2xl shadow-lg ring-2 ring-blue-500/30 transform hover:scale-110 transition-transform">
                        V
                    </div>
                </Link>

                {/* Primary Icons List */}
                <nav className="flex-1 w-full space-y-4 overflow-y-auto hide-scrollbar flex flex-col items-center">
                    {filteredGroups.map((group) => {
                        const isSelected = activeGroup.id === group.id
                        const GroupIcon = group.icon

                        return (
                            <button
                                key={group.id}
                                onClick={() => setActiveGroup(group)}
                                title={group.name}
                                className={`
                                    relative w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center group transition-all duration-300
                                    ${isSelected 
                                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.4)]" 
                                        : "text-blue-300 hover:bg-blue-900/50 hover:text-white dark:hover:bg-gray-800"
                                    }
                                `}
                            >
                                <GroupIcon size={22} className={`transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`} />
                                
                                {isSelected && (
                                    <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-500 rounded-r-md" />
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="w-full mt-4 space-y-3 flex flex-col items-center">
                    <Link 
                        href="/" 
                        title="View Store"
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-blue-300 hover:bg-blue-900/50 hover:text-blue-400 dark:hover:bg-gray-800 transition-colors group"
                    >
                        <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                    </Link>

                    <button 
                        onClick={handleLogout}
                        title="Logout"
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-blue-300 hover:bg-red-500/20 hover:text-red-400 dark:hover:bg-red-500/10 transition-colors group"
                    >
                        <LogOut size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* WIDE COLUMN - Submenu Panel */}
            <div className={`w-56 md:w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col shadow-inner transition-colors z-10 border-l border-blue-800/50 dark:border-gray-800 shrink-0 ${isOpen ? 'flex' : 'hidden md:flex'}`}>
                {/* Header Context */}
                <div className="h-24 px-6 flex flex-col justify-center border-b border-blue-700/50 dark:border-gray-800/80 bg-black/10">
                    <h3 className="text-[10px] font-bold text-blue-400 tracking-widest uppercase mb-1">
                        Vendor Portal
                    </h3>
                    <h2 className="text-xl font-bold text-white tracking-wide">
                        {activeGroup.name}
                    </h2>
                </div>

                {/* Link Items */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {activeGroup?.items.filter(item => !item.permission || hasPermission(item.permission)).map((item) => {
                        const isActive = item.href === '/vendor/settings' 
                            ? pathname === item.href 
                            : pathname === item.href || pathname?.startsWith(item.href + "/")
                        const ItemIcon = item.icon

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={close}
                                className={`
                                    flex items-center space-x-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group
                                    ${isActive
                                        ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20 backdrop-blur-sm"
                                        : "text-blue-100/70 hover:bg-white/5 hover:text-white"
                                    }
                                `}
                            >
                                <ItemIcon size={18} className={isActive ? "text-blue-400" : "text-blue-300/50 group-hover:text-blue-200"} />
                                <span className={isActive ? "font-semibold" : "font-normal"}>{item.name}</span>
                                
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Contextual Footer Image */}
                <div className="p-6 mt-auto">
                     <div className="w-full h-32 rounded-2xl bg-gradient-to-tr from-blue-800 to-blue-600 dark:from-gray-800 dark:to-gray-700 opacity-50 flex items-center justify-center border border-white/10">
                         <Layout className="w-12 h-12 text-white/20" />
                     </div>
                </div>
            </div>
        </aside>
    )
}
