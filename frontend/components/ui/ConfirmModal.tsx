"use client"

import Modal from "./Modal"
import Button from "./Button"
import { AlertTriangle } from "lucide-react"

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
    confirmText?: string
    cancelText?: string
    variant?: "danger" | "primary"
    isLoading?: boolean
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    isLoading = false
}: ConfirmModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="md">
            <div className="flex flex-col items-center text-center py-2">
                {/* Icon Container */}
                <div className={`mb-6 p-4 rounded-full ${
                    variant === "danger" 
                        ? "bg-red-50 text-red-600" 
                        : "bg-blue-50 text-blue-600"
                }`}>
                    <div className={`p-3 rounded-full ${
                        variant === "danger"
                            ? "bg-red-100"
                            : "bg-blue-100"
                    }`}>
                        <AlertTriangle size={36} strokeWidth={2.5} />
                    </div>
                </div>
                
                {/* Message */}
                <div className="mb-8 px-2">
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="py-4 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 font-bold transition-all"
                    >
                        {cancelText}
                    </Button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed text-white shadow-xl ${
                            variant === "danger" 
                            ? "bg-red-600 hover:bg-red-700 shadow-red-500/20" 
                            : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
                        }`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <span>{confirmText}</span>
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    )
}
