"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { forgotPassword } from "@/lib/api/auth";

export default function ForgotPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const result = await forgotPassword(email);

            if (result.success) {
                toast.success(result.message || "OTP sent to your email");
                router.push(`/verify-otp?email=${encodeURIComponent(email)}&type=PASSWORD_RESET${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`);
            } else {
                setError(result.error || "Failed to send reset link");
                toast.error(result.error || "Failed to send reset link");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative z-10">
                {/* Left Side - Info Section */}
                <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-orange-500 to-red-600 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <Link href="/" className="text-3xl font-extrabold tracking-tight mb-8 block">
                            Ready<span className="text-blue-900">Mart</span>
                        </Link>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">Forgot <br /> Password?</h2>
                        <p className="text-orange-100 text-lg mb-8">No worries! Enter your email address and we'll send you a 6-digit code to reset your password.</p>
                    </div>
                    
                    <div className="relative z-10">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">OTP Verification</p>
                                    <p className="text-sm text-orange-100">Secure 6-digit verification</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Abstract Circles */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-900/20 rounded-full blur-2xl"></div>
                </div>

                {/* Right Side - Form Section */}
                <div className="md:w-1/2 p-8 md:p-12 bg-white">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h3>
                    <p className="text-gray-500 mb-8">Enter the email address associated with your account.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            icon={Mail}
                            placeholder="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError("");
                            }}
                            disabled={loading}
                            error={error}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            icon={loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Verification Code"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-gray-500 text-sm">
                        Remember your password?{" "}
                        <Link href={`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="text-orange-600 font-bold hover:underline">
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
