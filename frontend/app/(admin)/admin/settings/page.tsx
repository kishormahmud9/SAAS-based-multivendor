"use client"

import Link from "next/link"
import { 
    Settings, 
    Globe, 
    ShieldCheck, 
    Bell, 
    Building2, 
    Search, 
    CreditCard, 
    Truck, 
    Terminal, 
    Mail, 
    Coins, 
    Languages, 
    Palette, 
    Lock, 
    Activity,
    ChevronRight,
    Wrench
} from "lucide-react"

const settingGroups = [
    {
        title: "Store Configuration",
        desc: "Manage your store's identity, localization, and primary assets.",
        items: [
            { name: "General Settings", href: "/admin/settings/general", icon: Globe, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { name: "Business Profile", href: "/admin/settings/business", icon: Building2, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
            { name: "Currency & Units", href: "/admin/settings/general", icon: Coins, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
            { name: "Languages", href: "/admin/settings/general", icon: Languages, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
        ]
    },
    {
        title: "Security & Access",
        desc: "System-wide security policies, authentication, and logs.",
        items: [
            { name: "Security & Auth", href: "/admin/settings/security", icon: ShieldCheck, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
            { name: "Login Policies", href: "/admin/settings/security", icon: Lock, color: "text-gray-600", bg: "bg-gray-100 dark:bg-gray-800" },
            { name: "Activity Logs", href: "/admin/settings/logs", icon: Terminal, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
        ]
    },
    {
        title: "Communication & Marketing",
        desc: "Manage email servers, push notifications, and SEO.",
        items: [
            { name: "Email SMTP", href: "/admin/settings/general", icon: Mail, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { name: "Notification Hub", href: "/admin/settings/notifications", icon: Bell, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" },
            { name: "SEO & Analytics", href: "/admin/settings/seo", icon: Search, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
        ]
    },
    {
        title: "Financials & Logistics",
        desc: "Payment gateways, tax rules, and shipping providers.",
        items: [
            { name: "Payment Gateway", href: "/admin/settings/payments", icon: CreditCard, color: "text-blue-700", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { name: "Shipping & Tax", href: "/admin/settings/logistics", icon: Truck, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
        ]
    }
]

export default function SettingsHubPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                    <Settings className="text-blue-600" size={32} />
                    Settings Command Center
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Configure every aspect of your multivendor ecosystem from a central hub.</p>
            </div>

            {/* Maintenance Banner */}
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-3xl p-6 flex items-center justify-between gap-6 group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 animate-pulse">
                         <Activity size={24} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-amber-900 dark:text-amber-400 uppercase tracking-widest leading-none mb-1">Maintenance Mode</h4>
                        <p className="text-xs text-amber-700 dark:text-amber-500 font-medium">When active, only admins can access the storefront.</p>
                    </div>
                </div>
                <button className="bg-amber-500 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95">
                    Enable System Lock
                </button>
            </div>

            {/* Setting Groups Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {settingGroups.map((group, i) => (
                    <div key={i} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-black text-gray-900 dark:text-white leading-none mb-2">{group.title}</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{group.desc}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {group.items.map((item, j) => (
                                <Link 
                                    key={j} 
                                    href={item.href}
                                    className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-[1.5rem] flex items-center gap-4 hover:shadow-xl hover:border-blue-500/20 transition-all duration-300 group"
                                >
                                    <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Configuration Module</p>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Branding Tip */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <Palette size={180} />
                </div>
                <div className="relative z-10 space-y-4">
                    <h3 className="text-2xl font-black leading-tight">Platform Branding & Themes</h3>
                    <p className="text-blue-100 text-lg opacity-80 max-w-xl font-medium">Customize logos, colors, and typography for your storefront and dashboard to match your brand identity.</p>
                </div>
                <Link href="/admin/ui-settings/banners" className="relative z-10 bg-white text-blue-900 font-black px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all flex items-center gap-2 active:scale-95 shadow-xl whitespace-nowrap text-[10px] uppercase tracking-widest">
                    Manage Branding
                </Link>
            </div>
        </div>
    )
}
