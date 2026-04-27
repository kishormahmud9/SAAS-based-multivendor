"use client"

import { useState } from "react"
import { Zap, Plus, Check, X, MoreHorizontal, Edit3, Trash2, Users, DollarSign, Activity, Star, Rocket, Building, ShieldCheck } from "lucide-react"

interface Plan {
    id: string
    name: string
    price: number
    interval: 'monthly' | 'yearly'
    description: string
    features: string[]
    activeSubscribers: number
    status: 'ACTIVE' | 'ARCHIVED'
    color: string
    icon: any
}

const mockPlans: Plan[] = [
    {
        id: "1",
        name: "Starter",
        price: 29.00,
        interval: 'monthly',
        description: "Perfect for new individual vendors starting their journey.",
        features: ["Up to 50 Products", "10% Platform Commission", "Standard Support", "Basic Analytics"],
        activeSubscribers: 84,
        status: 'ACTIVE',
        color: "blue",
        icon: Rocket
    },
    {
        id: "2",
        name: "Professional",
        price: 79.00,
        interval: 'monthly',
        description: "Ideal for established businesses looking for scale.",
        features: ["Unlimited Products", "8% Platform Commission", "Priority Support", "Advanced Analytics", "Custom Themes", "API Access"],
        activeSubscribers: 156,
        status: 'ACTIVE',
        color: "orange",
        icon: Star
    },
    {
        id: "3",
        name: "Enterprise",
        price: 249.00,
        interval: 'monthly',
        description: "Custom solutions for large-scale retail brands.",
        features: ["Dedicated Account Manager", "5% Platform Commission", "White-label Domain", "Custom Integrations", "Advanced Fraud Protection", "SLA Guarantee"],
        activeSubscribers: 12,
        status: 'ACTIVE',
        color: "purple",
        icon: Building
    }
]

export default function SubscriptionPlansPage() {
    const [plans, setPlans] = useState<Plan[]>(mockPlans)

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
                        <Zap className="text-orange-500" size={32} />
                        SaaS Subscription Plans
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Configure pricing tiers, features, and manage vendor subscriptions.</p>
                </div>
                <button className="bg-orange-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center gap-2 shadow-xl shadow-orange-600/20 active:scale-95">
                    <Plus size={18} /> Create New Plan
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Active Subscriptions", value: "252", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Monthly Recurring", value: "$18,420", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                    { label: "Conversion Rate", value: "8.4%", icon: Activity, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
                    { label: "Churn Rate", value: "1.2%", icon: Activity, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-900/20" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                            <stat.icon size={16} className={stat.color} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500">
                        <div className="p-8 pb-0">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                                    plan.color === 'blue' ? 'bg-blue-600 shadow-blue-600/20' :
                                    plan.color === 'orange' ? 'bg-orange-600 shadow-orange-600/20' :
                                    'bg-purple-600 shadow-purple-600/20'
                                }`}>
                                    <plan.icon size={28} />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all"><Edit3 size={16} /></button>
                                    <button className="p-2 text-gray-400 hover:text-rose-600 bg-gray-50 dark:bg-gray-800 rounded-xl transition-all"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                                {plan.description}
                            </p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black text-gray-900 dark:text-white">${plan.price}</span>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">/ {plan.interval}</span>
                            </div>
                        </div>

                        <div className="flex-1 px-8 pb-8 space-y-4">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 dark:border-gray-800 pb-2">Plan Features</h4>
                            <div className="space-y-3">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                                            <Check size={12} className="text-emerald-600" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-gray-50/50 dark:bg-gray-800/30 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users size={14} className="text-gray-400" />
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{plan.activeSubscribers} Subscribers</span>
                            </div>
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View Subscribers</button>
                        </div>
                    </div>
                ))}

                {/* Add New Plan Placeholder */}
                <button className="bg-gray-50/50 dark:bg-gray-800/20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-[2.5rem] flex flex-col items-center justify-center p-8 group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all border-spacing-4">
                    <div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 shadow-sm transition-colors mb-4">
                        <Plus size={32} />
                    </div>
                    <p className="text-sm font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">Add Custom Plan</p>
                </button>
            </div>

            {/* Plan Settings Tip */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <ShieldCheck size={180} />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-orange-600 text-white rounded-3xl flex items-center justify-center shadow-xl shadow-orange-600/20 shrink-0">
                        <Zap size={40} />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-black mb-2">Automated Billing & Churn Analytics</h3>
                        <p className="text-gray-400 text-lg font-medium leading-relaxed">
                            Integrate with <span className="text-white font-bold">Stripe Billing</span> to automatically handle subscription renewals, failed payments, and dunning management.
                        </p>
                    </div>
                    <button className="bg-white text-gray-900 font-black px-10 py-4 rounded-2xl hover:bg-gray-100 transition-all active:scale-95 shadow-xl uppercase tracking-widest text-[10px] whitespace-nowrap">
                        Configure Billing
                    </button>
                </div>
            </div>
        </div>
    )
}
