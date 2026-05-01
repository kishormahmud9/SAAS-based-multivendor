"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Check, X } from "lucide-react";
import Image from "next/image";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [requirements, setRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
    });

    const calculateStrength = (pass: string) => {
        const reqs = {
            length: pass.length >= 8,
            uppercase: /[A-Z]/.test(pass),
            lowercase: /[a-z]/.test(pass),
            number: /[0-9]/.test(pass),
            special: /[^A-Za-z0-9]/.test(pass),
        };
        setRequirements(reqs);

        let strength = 0;
        if (reqs.length) strength += 20;
        if (reqs.uppercase) strength += 20;
        if (reqs.lowercase) strength += 20;
        if (reqs.number) strength += 20;
        if (reqs.special) strength += 20;
        setPasswordStrength(strength);
    };

    const getStrengthColor = () => {
        if (passwordStrength <= 20) return "bg-red-500";
        if (passwordStrength <= 40) return "bg-orange-500";
        if (passwordStrength <= 60) return "bg-yellow-500";
        if (passwordStrength <= 80) return "bg-blue-500";
        return "bg-green-500";
    };

    const getStrengthLabel = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength <= 20) return "Very Weak";
        if (passwordStrength <= 40) return "Weak";
        if (passwordStrength <= 60) return "Medium";
        if (passwordStrength <= 80) return "Strong";
        return "Very Strong";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await register(formData.name, formData.email, formData.password);
            // Redirect to OTP verification with email and preserve redirect param
            router.push(`/verify-otp?email=${encodeURIComponent(result.email)}&type=EMAIL_VERIFICATION${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`);
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === "password") {
            calculateStrength(value);
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

                {/* Left Side - Welcome Section */}
                <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-orange-500 to-red-600 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                        <Link href="/" className="text-3xl font-extrabold tracking-tight mb-8 block">
                            Ready<span className="text-blue-900">Mart</span>
                        </Link>
                        <h2 className="text-4xl font-bold mb-4 leading-tight">Join the <br /> Revolution</h2>
                        <p className="text-orange-100 text-lg mb-8">Experience premium fashion like never before. Create your account today.</p>
                    </div>
                    <div className="relative z-10">
                        <div className="flex -space-x-4 mb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-600 overflow-hidden relative">
                                    <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" fill unoptimized className="object-cover" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center text-xs font-bold text-orange-600">
                                +2k
                            </div>
                        </div>
                        <p className="text-sm text-orange-100 font-medium">Join 2,000+ happy shoppers</p>
                    </div>

                    {/* Abstract Circles */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-900/20 rounded-full blur-2xl"></div>
                </div>

                {/* Right Side - Form Section */}
                <div className="md:w-1/2 p-8 md:p-12 bg-white">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h3>
                    <p className="text-gray-500 mb-8">Enter your details to get started.</p>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            icon={User}
                            placeholder="Full Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                        <Input
                            icon={Mail}
                            placeholder="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />

                        <div className="space-y-2">
                            <Input
                                icon={Lock}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={loading}
                                rightElement={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                                        disabled={loading}
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                }
                            />

                            {/* Password Strength Bar */}
                            {formData.password && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs font-medium">
                                        <span className="text-gray-500">Password Strength</span>
                                        <span className={getStrengthColor().replace("bg-", "text-")}>{getStrengthLabel()}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                                            style={{ width: `${passwordStrength}%` }}
                                        ></div>
                                    </div>

                                    {/* Password Requirements Checklist */}
                                    <div className="grid grid-cols-2 gap-2 mt-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <RequirementItem met={requirements.length} text="At least 8 characters" />
                                        <RequirementItem met={requirements.uppercase} text="One uppercase letter" />
                                        <RequirementItem met={requirements.lowercase} text="One lowercase letter" />
                                        <RequirementItem met={requirements.number} text="One number" />
                                        <RequirementItem met={requirements.special} text="One special character" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            icon={loading ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
                            disabled={loading}
                        >
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-gray-400 text-sm">Or continue with</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button 
                            variant="outline" 
                            disabled={loading} 
                            className="w-full"
                            forceLight={true}
                            icon={
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                            }
                        >
                            <span className="font-semibold">Google</span>
                        </Button>
                        <Button 
                            variant="outline" 
                            disabled={loading} 
                            className="w-full"
                            forceLight={true}
                            icon={
                                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            }
                        >
                            <span className="font-semibold">Facebook</span>
                        </Button>
                    </div>

                    <p className="text-center mt-8 text-gray-500 text-sm">
                        Already have an account?{" "}
                        <Link href={`/login${redirect ? `?redirect=${redirect}` : ""}`} className="text-orange-600 font-bold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

function RequirementItem({ met, text }: { met: boolean; text: string }) {
    return (
        <div className="flex items-center space-x-2">
            <div className={`p-0.5 rounded-full ${met ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
                {met ? <Check size={10} /> : <X size={10} />}
            </div>
            <span className={`text-[10px] sm:text-xs ${met ? "text-green-600 font-medium" : "text-gray-400"}`}>
                {text}
            </span>
        </div>
    );
}
