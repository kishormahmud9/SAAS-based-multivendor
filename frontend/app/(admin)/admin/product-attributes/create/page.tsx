"use client"

import AttributeForm from "@/components/admin/AttributeForm"
import { ChevronLeft, Sliders } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateAttributePage() {
    const router = useRouter()
    
    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-4">
                <Link 
                    href="/admin/product-attributes"
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-orange-500 transition-all shadow-sm group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                        <Sliders size={12} />
                        Global Attributes
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Register Attribute</h1>
                </div>
            </div>

            <AttributeForm onSuccess={() => router.push("/admin/product-attributes")} onCancel={() => router.back()} />
        </div>
    )
}
