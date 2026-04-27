"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { resetPassword } from "@/lib/api/auth";

export default function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const email = searchParams.get("email") || "";
    const otp = searchParams.get("otp") || "";
    const redirect = searchParams.get("redirect");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { password: "", confirmPassword: "" };

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const result = await resetPassword(email, otp, password);

            if (result.success) {
                setSuccess(true);
                toast.success("Password reset successfully!");
                setTimeout(() => {
                    router.push(`/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`);
                }, 3000);
            } else {
                toast.error(result.error || "Failed to reset password");
            }
        } catch (err: any) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (!email || !otp) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Session</h2>
                    <p className="text-gray-600 mb-6">Redirecting you to forgot password page...</p>
                    <Button onClick={() => router.push("/forgot-password")}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-4">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8 md:p-12 relative z-10">
                {success ? (
                    <div className="text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-12 h-12 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
                        <p className="text-gray-200 mb-6">Your password has been reset successfully.</p>
                        <p className="text-gray-300 text-sm">Redirecting to login...</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">New Password</h2>
                            <p className="text-gray-200">Please enter a new strong password for your account.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                icon={Lock}
                                placeholder="New Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                error={errors.password}
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                }
                            />

                            <Input
                                icon={Lock}
                                placeholder="Confirm New Password"
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                                error={errors.confirmPassword}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                icon={loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
