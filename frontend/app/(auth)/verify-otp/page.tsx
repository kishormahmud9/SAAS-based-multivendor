"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, Loader2, CheckCircle, Timer, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getRedirectPath } from "@/lib/auth/authRedirect";
import { toast } from "react-hot-toast";

export default function VerifyOTPPage() {
    const { verifyOtp } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const email = searchParams.get("email") || "";
    // URL carries 'type' param (EMAIL_VERIFICATION or PASSWORD_RESET), we map to backend's 'purpose'
    const typeParam = searchParams.get("type") || "EMAIL_VERIFICATION";
    const redirect = searchParams.get("redirect");

    // Map frontend URL param → backend purpose field
    const purpose: "EMAIL_VERIFY" | "PASSWORD_RESET" =
        typeParam === "PASSWORD_RESET" ? "PASSWORD_RESET" : "EMAIL_VERIFY";

    const isEmailVerification = purpose === "EMAIL_VERIFY";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Countdown timer (120 seconds = 2 minutes)
    const [timeLeft, setTimeLeft] = useState(120);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    // Auto-focus first input on mount
    useEffect(() => {
        const firstInput = document.getElementById("otp-0");
        if (firstInput) firstInput.focus();
    }, []);

    const handleChange = (index: number, value: string) => {
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        const lastIndex = Math.min(pastedData.length, 5);
        const lastInput = document.getElementById(`otp-${lastIndex}`);
        if (lastInput) lastInput.focus();
    };

    const handleResend = async () => {
        if (!canResend) return;

        setResending(true);
        setError("");

        try {
            if (isEmailVerification) {
                // Use the dedicated resend endpoint for email verification
                const result = await authService.resendVerificationOtp(email);
                if (result.success) {
                    toast.success("New verification code sent to your email");
                } else {
                    setError(result.message || "Failed to resend OTP");
                    return;
                }
            } else {
                // Password reset uses forgotPassword
                const result = await authService.forgotPassword(email);
                if (result.success) {
                    toast.success("New OTP sent to your email");
                } else {
                    setError(result.message || "Failed to resend OTP");
                    return;
                }
            }

            setTimeLeft(120);
            setCanResend(false);
            setOtp(["", "", "", "", "", ""]);
            const firstInput = document.getElementById("otp-0");
            if (firstInput) firstInput.focus();
        } catch (err: any) {
            setError(err.message || "Failed to resend OTP. Please try again.");
        } finally {
            setResending(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join("");
        if (otpCode.length !== 6) {
            setError("Please enter all 6 digits");
            return;
        }

        if (timeLeft === 0) {
            setError("OTP has expired. Please resend code.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            // Use AuthContext's verifyOtp to handle session/state
            const result = await verifyOtp(email, otpCode, purpose);

            if (!result.success) {
                setError(result.message || "Verification failed");
                setLoading(false);
                return;
            }

            setSuccess(true);

            if (purpose === "PASSWORD_RESET") {
                toast.success("OTP Verified! Redirecting to reset password...");
                const resetToken = result.data?.resetToken || "";
                setTimeout(() => {
                    router.push(
                        `/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(resetToken)}${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`
                    );
                }, 1500);
            } else {
                // EMAIL_VERIFY success
                toast.success("Email verified successfully!");
                
                // Get user from result to check role
                const user = result.data?.user;
                const userRole = user?.role?.toUpperCase();

                setTimeout(() => {
                    // Admins/SuperAdmins always go to dashboard
                    if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
                        router.push("/admin/dashboard");
                    } else {
                        router.push(redirect || getRedirectPath(user));
                    }
                }, 1500);
            }
        } catch (err: any) {
            setError(err.message || "Verification failed. Please try again.");
            setLoading(false);
        }
    };

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
                        <h2 className="text-3xl font-bold text-white mb-4">Verified!</h2>
                        <p className="text-gray-200 mb-6">
                            {purpose === "PASSWORD_RESET"
                                ? "Identity verified. You can now reset your password."
                                : "Your email has been successfully verified. Welcome to ReadyMart!"}
                        </p>
                        <p className="text-orange-400 animate-pulse text-sm">
                            {purpose === "PASSWORD_RESET"
                                ? "Redirecting to Reset Password..."
                                : "Redirecting..."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {isEmailVerification ? "Verify Email" : "Verify OTP"}
                            </h2>
                            <p className="text-gray-200 mb-1">We've sent a 6-digit code to</p>
                            <p className="text-orange-400 font-semibold">{email}</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center gap-2 mb-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={index === 0 ? handlePaste : undefined}
                                        disabled={loading || resending}
                                        className="w-11 h-13 md:w-12 md:h-14 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition disabled:opacity-50"
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-center space-x-2 mb-8 text-gray-300">
                                <Timer size={18} className={timeLeft < 30 ? "text-red-400 animate-pulse" : ""} />
                                <span className={`font-mono font-medium ${timeLeft < 30 ? "text-red-400" : ""}`}>
                                    {formatTime(timeLeft)}
                                </span>
                            </div>

                            <Button
                                type="submit"
                                fullWidth
                                icon={loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                                disabled={loading || otp.some((d) => !d) || timeLeft === 0 || resending}
                            >
                                {loading ? "Verifying..." : "Verify Code"}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-400 text-sm mb-3">Didn't receive the code?</p>
                            <button
                                type="button"
                                onClick={handleResend}
                                className={`flex items-center justify-center mx-auto space-x-2 font-bold text-sm transition-all duration-200 ${canResend ? "text-orange-500 hover:text-orange-400" : "text-gray-600 cursor-not-allowed grayscale"}`}
                                disabled={!canResend || resending}
                            >
                                {resending ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                                <span>{resending ? "Sending..." : "Resend New Code"}</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        purpose === "PASSWORD_RESET"
                                            ? `/forgot-password${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`
                                            : `/register${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ""}`
                                    )
                                }
                                className="text-gray-400 hover:text-white text-sm transition"
                                disabled={loading || resending}
                            >
                                ← Back to {purpose === "PASSWORD_RESET" ? "Forgot Password" : "Registration"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
