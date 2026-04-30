"use client"

import React from "react"
import { Loader2 } from "lucide-react"

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
    label: string
    error?: string
    isChecking?: boolean
    as?: "input" | "textarea" | "select"
    containerClassName?: string
}

const AdminInput = React.forwardRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement, AdminInputProps>(
    ({ label, error, isChecking, as = "input", containerClassName = "", className = "", children, ...props }, ref) => {
        const Component = as as any
        
        return (
            <div className={`space-y-2 ${containerClassName}`}>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">
                    {label}
                </label>
                <div className="relative">
                    <Component
                        ref={ref}
                        {...props}
                        className={`w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 transition-all rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium ${
                            error 
                            ? 'border-rose-500 bg-rose-50/30 ring-4 ring-rose-500/10' 
                            : 'border-gray-100 dark:border-gray-800'
                        } ${props.readOnly ? 'bg-gray-100 dark:bg-gray-800/80 text-gray-500 cursor-not-allowed' : 'text-gray-900 dark:text-white'} ${className}`}
                    >
                        {children}
                    </Component>
                    
                    {isChecking && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 className="animate-spin text-orange-500" size={18} />
                        </div>
                    )}
                </div>
                
                {error && (
                    <div className="flex items-center gap-1.5 mt-2.5 animate-in fade-in slide-in-from-top-1 duration-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest leading-none">
                            {error}
                        </p>
                    </div>
                )}
            </div>
        )
    }
)

AdminInput.displayName = "AdminInput"

export default AdminInput
