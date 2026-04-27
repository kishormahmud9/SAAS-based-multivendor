"use client"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
}

export default function Modal({ isOpen, onClose, title, children, maxWidth = "2xl" }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-${maxWidth} overflow-hidden animate-in zoom-in-95 duration-300 transition-colors`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                {/* Body */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
