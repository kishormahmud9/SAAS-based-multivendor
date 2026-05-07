"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, ChevronRight, Loader2, ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react"
import { toast } from "react-hot-toast"
import ShippingStep from "@/components/checkout/ShippingStep"
import OrderSummary from "@/components/checkout/OrderSummary"
import PaymentStep from "@/components/checkout/PaymentStep"
import { useCart } from "@/lib/contexts/CartContext"
import { paymentService } from "@/src/services/payment.service"
import Link from "next/link"

export default function CheckoutPage() {
    const router = useRouter()
    const { cartItems, subtotal, refreshCart, clearCart } = useCart()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
    const [paymentMethod, setPaymentMethod] = useState("COD")

    useEffect(() => {
        // Initial load check
        if (cartItems.length === 0 && !loading) {
            router.push("/cart")
        }
        setLoading(false)
    }, [cartItems, loading, router])

    const handlePlaceOrder = async () => {
        if (!selectedAddressId) {
            toast.error("Please select or add a shipping address")
            return
        }

        setProcessing(true)
        try {
            // Using paymentService.initiateCheckout which handles order creation too
            const res = await paymentService.createPaymentIntent({
                items: cartItems.map(item => ({
                    productId: item.productId,
                    variantId: item.variantId,
                    name: item.product.name,
                    price: item.product.salePrice || item.product.price,
                    quantity: item.quantity
                })),
                addressId: selectedAddressId,
                paymentMethod: paymentMethod,
            })

            if (res.success) {
                const { order, gatewayUrl } = res.data
                
                if (paymentMethod === "COD") {
                    toast.success("Order placed successfully!")
                    // Clear cart after successful order
                    clearCart()
                    router.push(`/order-confirmation?orderId=${order.id}&orderNumber=${order.orderNumber}`)
                } else if (gatewayUrl) {
                    // Redirect to payment gateway if applicable
                    window.location.href = gatewayUrl
                } else {
                    toast.success("Order placed successfully!")
                    clearCart()
                    router.push(`/order-confirmation?orderId=${order.id}`)
                }
            } else {
                toast.error(res.message || "Failed to place order")
            }
        } catch (error: any) {
            console.error("Order placement error:", error)
            toast.error(error?.message || "Something went wrong during checkout")
        } finally {
            setProcessing(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
                <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">Preparing Checkout...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#fafafa] pb-20">
            {/* Minimalist Header */}
            <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-100">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group font-bold text-sm uppercase tracking-wider">
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Back to Cart
                    </Link>
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="text-green-600" size={20} />
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">Secure 256-bit SSL Encryption</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 mt-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Checkout</h1>
                            <p className="text-gray-500 font-medium">Complete your purchase by providing your details.</p>
                        </div>
                        {/* Step Indicator */}
                        <div className="flex items-center gap-3">
                            <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
                            <div className={`h-1.5 w-12 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        {/* Left Side: Steps */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* Step 1: Shipping */}
                            <section className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border transition-all duration-500 overflow-hidden ${step === 1 ? 'border-orange-200 ring-4 ring-orange-50' : 'border-gray-100 opacity-90'}`}>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${step === 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
                                                {step > 1 ? <CheckCircle size={24} /> : <Truck size={24} />}
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-black text-gray-900">Shipping Address</h2>
                                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">Step 01 of 02</p>
                                            </div>
                                        </div>
                                        {step > 1 && (
                                            <button onClick={() => setStep(1)} className="text-xs font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors bg-orange-50 px-4 py-2 rounded-xl">
                                                Change
                                            </button>
                                        )}
                                    </div>

                                    <div className={step !== 1 ? "pointer-events-none" : ""}>
                                        <ShippingStep
                                            selectedAddressId={selectedAddressId}
                                            onSelectAddress={setSelectedAddressId}
                                        />
                                        
                                        {step === 1 && (
                                            <button
                                                onClick={() => selectedAddressId ? setStep(2) : toast.error("Please select an address")}
                                                className="mt-10 w-full h-16 bg-gray-900 hover:bg-orange-600 text-white rounded-2xl font-black text-sm uppercase tracking-[0.15em] transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-orange-200 flex items-center justify-center gap-3 group"
                                            >
                                                Continue to Payment
                                                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Step 2: Payment */}
                            <section className={`bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border transition-all duration-500 overflow-hidden ${step === 2 ? 'border-orange-200 ring-4 ring-orange-50' : 'border-gray-100 opacity-60'}`}>
                                <div className="p-8">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-500 ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                            <CreditCard size={24} />
                                        </div>
                                        <div>
                                            <h2 className={`text-xl font-black ${step === 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment Method</h2>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Step 02 of 02</p>
                                        </div>
                                    </div>

                                    {step === 2 && (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <PaymentStep
                                                selectedMethod={paymentMethod}
                                                onSelectMethod={setPaymentMethod}
                                            />
                                            
                                            <div className="mt-10 p-6 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                                                <div className="flex gap-3">
                                                    <div className="mt-0.5 text-orange-600">
                                                        <ShieldCheck size={20} />
                                                    </div>
                                                    <p className="text-xs text-orange-800 font-medium leading-relaxed">
                                                        By clicking "Complete Order", you agree to our terms of service and acknowledge that your order will be processed immediately.
                                                    </p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handlePlaceOrder}
                                                disabled={processing}
                                                className="mt-8 w-full h-18 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-lg uppercase tracking-[0.1em] transition-all duration-300 shadow-xl shadow-orange-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={24} />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Complete Order
                                                        <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Right Side: Summary */}
                        <div className="lg:col-span-5">
                            <OrderSummary
                                items={cartItems as any}
                                subtotal={subtotal}
                                total={subtotal + (subtotal > 1000 ? 0 : 60)} 
                                shipping={subtotal > 1000 ? 0 : 60}
                            />
                            
                            {/* Trust Badges */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                        <Truck size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Fast Delivery</span>
                                    <span className="text-[9px] text-gray-400 font-bold mt-1">2-4 Business Days</span>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center">
                                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Buyer Protection</span>
                                    <span className="text-[9px] text-gray-400 font-bold mt-1">100% Satisfaction</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
