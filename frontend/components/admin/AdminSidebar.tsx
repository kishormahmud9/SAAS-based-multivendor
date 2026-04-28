"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/lib/contexts/AuthContext"
import { toast } from "react-hot-toast"
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Tag,
    Award,
    Users,
    Settings,
    BarChart3,
    Image as ImageIcon,
    LogOut,
    Gift,
    Bot,
    HeartHandshake,
    FileText,
    LayoutTemplate,
    ExternalLink,
    BookOpen,
    Hash,
    Sliders,
    Boxes,
    Ticket,
    PlusCircle,
    RefreshCw,
    Shield,
    Layers,
    MessageSquare,
    Mail,
    MessageCircle,
    FolderTree,
    Layout,
    Mic,
    Brain,
    Zap,
    Palette,
    LayoutGrid,
    Instagram,
    Sparkles,
    Files,
    HelpCircle,
    ShieldCheck,
    Truck,
    Phone,
    Lock,
    Ruler,
    Globe,
    Bell,
    Building2,
    Search,
    CreditCard,
    Terminal,
    TrendingUp,
    History,
    Store,
    Wallet
} from "lucide-react"

// Define our new grouped navigation structure
const navGroups = [
    {
        id: "overview",
        name: "Overview",
        icon: LayoutDashboard,
        items: [
            { name: "Main Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
            { name: "Traffic Analytics", href: "/admin/analytics/traffic", icon: BarChart3 },
            { name: "CRM Dashboard", href: "/admin/crm", icon: Users },
            { name: "AI Automation Engine", href: "/admin/ai/manage", icon: Bot },
        ]
    },
    {
        id: "ai-engine",
        name: "AI Engine",
        icon: Bot,
        items: [
            { name: "Chatbot", href: "/admin/ai/chatbot", icon: MessageSquare },
            { name: "Voice AI Agents", href: "/admin/ai/voice", icon: Mic },
            { name: "Configure AI", href: "/admin/ai/configure", icon: Zap },
            { name: "AI Behavior", href: "/admin/ai/behavior", icon: Brain },
        ]
    },
    {
        id: "marketplace",
        name: "Marketplace",
        icon: Building2,
        items: [
            { name: "Vendor Partners", href: "/admin/vendors/manage", icon: Store },
            { name: "Withdrawals", href: "/admin/withdrawals", icon: Wallet },
            { name: "Subscription Plans", href: "/admin/subscriptions/plans", icon: Zap },
        ]
    },
    {
        id: "catalog",
        name: "Catalog Hub",
        icon: Package,
        items: [
            { name: "Manage Products", href: "/admin/products", icon: Package },
            { name: "Create Product", href: "/admin/products/create", icon: PlusCircle },
            { name: "Categories", href: "/admin/categories", icon: FolderTree },
            { name: "Brands Manager", href: "/admin/brands", icon: Award },
            { name: "Inventory Control", href: "/admin/inventory", icon: Boxes },
            { name: "Product Reviews", href: "/admin/product-reviews", icon: MessageSquare },
            { name: "Attributes", href: "/admin/product-attributes", icon: Sliders },
            { name: "Tags & SEO", href: "/admin/product-tags", icon: Hash },
        ]
    },
    {
        id: "sales",
        name: "Sales Hub",
        icon: ShoppingBag,
        items: [
            { name: "All Orders", href: "/admin/orders", icon: ShoppingBag },
            { name: "Create Order", href: "/admin/orders/create", icon: PlusCircle },
            { name: "Returns & Refunds", href: "/admin/orders/returns", icon: RefreshCw },
            { name: "Refund Requests", href: "/admin/refunds", icon: RefreshCw },
        ]
    },
    {
        id: "finance",
        name: "Finance Hub",
        icon: CreditCard,
        items: [
            { name: "Revenue Overview", href: "/admin/finance/revenue", icon: TrendingUp },
            { name: "Payout History", href: "/admin/finance/payouts", icon: History },
            { name: "Tax & Invoices", href: "/admin/finance/taxes", icon: FileText },
        ]
    },
    {
        id: "support",
        name: "Help Center",
        icon: MessageSquare,
        items: [
            { name: "Support Tickets", href: "/admin/support/tickets", icon: Ticket },
            { name: "FAQ Manager", href: "/admin/support/faq", icon: HelpCircle },
        ]
    },
    {
        id: "promotions",
        name: "Promotions",
        icon: Gift,
        items: [
            { name: "Offers & Deals", href: "/admin/offers/manage", icon: Gift },
            { name: "Apply Offer", href: "/admin/offers/apply", icon: Tag },
            { name: "Coupons Manager", href: "/admin/offers/coupons", icon: Ticket },
        ]
    },
    {
        id: "customers",
        name: "Audience",
        icon: Users,
        items: [
            { name: "Users Directory", href: "/admin/users", icon: Users },
            { name: "Roles & Permissions", href: "/admin/users/roles", icon: Shield },
            { name: "Customer Segments", href: "/admin/users/segments", icon: Layers },
            { name: "Reviews & Feedback", href: "/admin/users/reviews", icon: MessageSquare },
            { name: "Email Marketing", href: "/admin/users/email", icon: Mail },
            { name: "SMS Marketing", href: "/admin/users/sms", icon: MessageCircle },
        ]
    },
    {
        id: "blogs",
        name: "Blogs",
        icon: BookOpen,
        items: [
            { name: "All Posts", href: "/admin/blogs/posts", icon: FileText },
            { name: "Create Post", href: "/admin/blogs/create", icon: PlusCircle },
            { name: "Blog Categories", href: "/admin/blogs/categories", icon: FolderTree },
            { name: "Comments Moderation", href: "/admin/blogs/comments", icon: MessageSquare },
        ]
    },
    {
        id: "appearance",
        name: "Appearance",
        icon: Palette,
        items: [
            { name: "Home Banners", href: "/admin/ui-settings/banners", icon: ImageIcon },
            { name: "Deal of the Day", href: "/admin/ui-settings/deals", icon: Tag },
            { name: "Curated Collections", href: "/admin/ui-settings/collections", icon: LayoutGrid },
            { name: "Comfort Innovation", href: "/admin/ui-settings/innovation", icon: Sparkles },
            { name: "Shop the Look", href: "/admin/ui-settings/shop-look", icon: Instagram },
        ]
    },
    {
        id: "pages",
        name: "Page Manager",
        icon: Files,
        items: [
            { name: "Page Blueprints", href: "/admin/content", icon: Layout },
            { name: "About Us", href: "/admin/pages/about", icon: FileText },
            { name: "Contact Page", href: "/admin/pages/contact", icon: Phone },
            { name: "FAQ Management", href: "/admin/pages/faq", icon: HelpCircle },
            { name: "Size Guide", href: "/admin/pages/size-guide", icon: Ruler },
            { name: "Terms & Conditions", href: "/admin/pages/terms", icon: ShieldCheck },
            { name: "Privacy Policy", href: "/admin/pages/privacy", icon: Lock },
            { name: "Shipping Policy", href: "/admin/pages/shipping", icon: Truck },
            { name: "Returns Policy", href: "/admin/pages/returns", icon: RefreshCw },
        ]
    },
    {
        id: "system",
        name: "Settings Hub",
        icon: Settings,
        items: [
            { name: "Global Settings", href: "/admin/settings/general", icon: Globe },
            { name: "Security & Auth", href: "/admin/settings/security", icon: ShieldCheck },
            { name: "Notification Hub", href: "/admin/settings/notifications", icon: Bell },
            { name: "Business Profile", href: "/admin/settings/business", icon: Building2 },
            { name: "SEO & Analytics", href: "/admin/settings/seo", icon: Search },
            { name: "Payment Gateway", href: "/admin/settings/payments", icon: CreditCard },
            { name: "Shipping & Tax", href: "/admin/settings/logistics", icon: Truck },
            { name: "Activity Logs", href: "/admin/settings/logs", icon: Terminal },
            { name: "API & Developers", href: "/admin/settings/api", icon: Terminal },
        ]
    }
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useAuth()

    // Find which group contains the currently viewed page
    const initialGroup = navGroups.find(group => 
        group.items.some(item => pathname === item.href || pathname?.startsWith(item.href + "/"))
    ) || navGroups[0];

    const [activeGroup, setActiveGroup] = useState(initialGroup)

    // Keep active group in sync with URL if user navigates via other means
    useEffect(() => {
        const currentGroup = navGroups.find(group => 
            group.items.some(item => pathname === item.href || pathname?.startsWith(item.href + "/"))
        )
        if (currentGroup) setActiveGroup(currentGroup)
    }, [pathname])

    const handleLogout = async () => {
        try {
            await logout()
            toast.success("Successfully logged out")
            router.push("/login")
        } catch (error) {
            toast.error("Logout failed")
        }
    }

    return (
        <aside className="flex h-screen overflow-hidden shadow-2xl z-20">
            {/* THIN COLUMN - Group Selector */}
            <div className="w-[72px] md:w-20 bg-blue-950 dark:bg-gray-950 flex flex-col items-center py-6 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.5)] z-20 transition-colors shrink-0">
                
                {/* Minimal Logo */}
                <Link href="/admin/dashboard" className="mb-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center text-white font-extrabold text-xl md:text-2xl shadow-lg ring-2 ring-orange-500/30 transform hover:scale-110 transition-transform">
                        R
                    </div>
                </Link>

                {/* Primary Icons List */}
                <nav className="flex-1 w-full space-y-4 overflow-y-auto hide-scrollbar flex flex-col items-center">
                    {navGroups.map((group) => {
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
                                        ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[0_4px_12px_rgba(249,115,22,0.4)]" 
                                        : "text-blue-300 hover:bg-blue-900/50 hover:text-white dark:hover:bg-gray-800"
                                    }
                                `}
                            >
                                <GroupIcon size={22} className={`transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`} />
                                
                                {/* Active Indicator Dot */}
                                {isSelected && (
                                    <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-orange-500 rounded-r-md" />
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
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-blue-300 hover:bg-blue-900/50 hover:text-orange-400 dark:hover:bg-gray-800 transition-colors group"
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
            <div className="w-56 md:w-64 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col shadow-inner transition-colors z-10 border-l border-blue-800/50 dark:border-gray-800 shrink-0 hidden sm:flex">
                {/* Header Context */}
                <div className="h-24 px-6 flex flex-col justify-center border-b border-blue-700/50 dark:border-gray-800/80 bg-black/10">
                    <h3 className="text-[10px] font-bold text-orange-400 tracking-widest uppercase mb-1">
                        ReadyMart
                    </h3>
                    <h2 className="text-xl font-bold text-white tracking-wide">
                        {activeGroup.name}
                    </h2>
                </div>

                {/* Link Items */}
                <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                    {activeGroup.items.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
                        const ItemIcon = item.icon

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                                    flex items-center space-x-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group
                                    ${isActive
                                        ? "bg-white/10 text-white shadow-sm ring-1 ring-white/20 backdrop-blur-sm"
                                        : "text-blue-100/70 hover:bg-white/5 hover:text-white"
                                    }
                                `}
                            >
                                <ItemIcon size={18} className={isActive ? "text-orange-400" : "text-blue-300/50 group-hover:text-blue-200"} />
                                <span className={isActive ? "font-semibold" : "font-normal"}>{item.name}</span>
                                
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Contextual Footer Image or Data element here if desired */}
                <div className="p-6 mt-auto">
                     <div className="w-full h-32 rounded-2xl bg-gradient-to-tr from-blue-800 to-blue-600 dark:from-gray-800 dark:to-gray-700 opacity-50 flex items-center justify-center border border-white/10">
                         <LayoutDashboard className="w-12 h-12 text-white/20" />
                     </div>
                </div>
            </div>
        </aside>
    )
}
