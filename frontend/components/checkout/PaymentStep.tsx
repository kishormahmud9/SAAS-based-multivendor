"use client"

import { CreditCard, Wallet, Truck, Check } from "lucide-react"
import { toast } from "react-hot-toast"

interface PaymentStepProps {
    selectedMethod: string
    onSelectMethod: (method: string) => void
}

export default function PaymentStep({ selectedMethod, onSelectMethod }: PaymentStepProps) {
    const methods = [
        {
            id: "COD",
            name: "Cash on Delivery",
            icon: Truck,
            description: "Pay with cash when your order is delivered to your doorstep.",
            available: true,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            id: "BKASH",
            name: "bKash Payment",
            icon: Wallet,
            description: "Fast and secure payment using your bKash account.",
            available: false,
            color: "text-pink-600",
            bgColor: "bg-pink-50"
        },
        {
            id: "CARD",
            name: "Card Payment",
            icon: CreditCard,
            description: "Pay using your Visa, Mastercard, or other debit/credit cards.",
            available: false,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50"
        },
    ]

    const handleMethodSelect = (method: typeof methods[0]) => {
        if (!method.available) {
            toast.error(`${method.name} feature is not available yet.`)
            return
        }
        onSelectMethod(method.id)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                {methods.map((method) => (
                    <div
                        key={method.id}
                        onClick={() => handleMethodSelect(method)}
                        className={`
                            group relative p-5 rounded-2xl border-2 transition-all duration-300 flex items-start gap-4 cursor-pointer
                            ${selectedMethod === method.id
                                ? "border-orange-500 bg-orange-50/50 shadow-md ring-1 ring-orange-500"
                                : "border-gray-100 bg-white hover:border-orange-200 hover:shadow-sm"
                            }
                            ${!method.available ? "opacity-75" : ""}
                        `}
                    >
                        <div className={`
                            p-3 rounded-xl transition-colors duration-300
                            ${selectedMethod === method.id ? "bg-orange-500 text-white" : `${method.bgColor} ${method.color}`}
                        `}>
                            <method.icon size={24} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    {method.name}
                                    {!method.available && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                            Coming Soon
                                        </span>
                                    )}
                                </h3>
                                {selectedMethod === method.id && (
                                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                                        <Check size={12} className="text-white font-bold" />
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-[90%]">
                                {method.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
