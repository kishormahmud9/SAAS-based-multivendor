"use client"

import { useState } from "react"
import { 
    ShieldCheck, 
    Upload, 
    FileText, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    ArrowRight,
    Camera,
    Info,
    Check
} from "lucide-react"

export default function VerificationPage() {
    const [step, setStep] = useState(1)
    const [status, setStatus] = useState("pending_submission") // pending_submission, under_review, verified, rejected

    return (
        <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[2rem] flex items-center justify-center text-blue-600 mx-auto shadow-inner">
                    <ShieldCheck size={40} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Identity & Business Verification</h1>
                <p className="text-gray-500 font-medium max-w-lg mx-auto">Complete your verification to unlock higher withdrawal limits, premium badges, and trust among shoppers.</p>
            </div>

            {/* Status Tracker */}
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { id: 1, label: "Personal Info", completed: step > 1 },
                        { id: 2, label: "Identity Doc", completed: step > 2 },
                        { id: 3, label: "Business License", completed: step > 3 },
                        { id: 4, label: "Final Review", completed: status === 'verified' },
                    ].map((s, i) => (
                        <div key={s.id} className="relative flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black border-2 z-10 transition-all ${
                                s.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 
                                step === s.id ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-800 text-gray-400'
                            }`}>
                                {s.completed ? <Check size={20} /> : s.id}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${step === s.id ? 'text-blue-600' : 'text-gray-400'}`}>{s.label}</span>
                            
                            {i < 3 && (
                                <div className={`hidden md:block absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 ${s.completed ? 'bg-emerald-500' : 'bg-gray-100 dark:bg-gray-800'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-10 border border-gray-100 dark:border-gray-800 shadow-xl space-y-10">
                {step === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Step 1: Account Holder Information</h3>
                            <p className="text-sm text-gray-500 font-medium">Please provide your legal name as it appears on your identity documents.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Full Legal Name</label>
                                <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Date of Birth</label>
                                <input type="date" className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Residential Address</label>
                                <textarea placeholder="Full address..." rows={2} className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-bold focus:outline-none resize-none" />
                            </div>
                        </div>

                        <button onClick={() => setStep(2)} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
                            Next: Identity Document <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Step 2: Identity Document</h3>
                            <p className="text-sm text-gray-500 font-medium">Upload a clear photo of your National ID, Passport or Driving License.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="aspect-video rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 group hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer">
                                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Camera size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">Front Side</p>
                                    <p className="text-[10px] text-gray-400 mt-1">Tap to upload or drag & drop</p>
                                </div>
                            </div>
                            <div className="aspect-video rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 group hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all cursor-pointer">
                                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Camera size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-500">Back Side</p>
                                    <p className="text-[10px] text-gray-400 mt-1">Tap to upload or drag & drop</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 flex gap-4">
                            <Info className="text-blue-600 shrink-0" size={20} />
                            <p className="text-[11px] text-blue-700/70 dark:text-blue-300/70 font-medium leading-relaxed">Make sure the document is not expired and all text is clearly visible without glare or shadows. All edges of the document must be visible.</p>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="flex-1 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                            <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2">Next Step <ArrowRight size={18} /></button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">Step 3: Business License</h3>
                            <p className="text-sm text-gray-500 font-medium">Upload your Trade License, Tax Certificate (TIN/VAT) or Company Incorporation docs.</p>
                        </div>

                        <div className="p-12 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-6 group hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-all cursor-pointer">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-[2rem] flex items-center justify-center text-gray-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                <Upload size={32} />
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-black text-gray-900 dark:text-white">Upload Documents</h4>
                                <p className="text-sm font-medium text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max 10MB)</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(2)} className="flex-1 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">Back</button>
                            <button onClick={() => { setStep(4); setStatus("under_review"); }} className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2">Submit for Review <CheckCircle2 size={18} /></button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="py-12 text-center space-y-8 animate-in zoom-in duration-500">
                        <div className="w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-[3rem] flex items-center justify-center text-blue-600 mx-auto">
                            <Clock size={64} className="animate-spin-slow" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-gray-900 dark:text-white">Documents Received!</h3>
                            <p className="text-lg font-medium text-gray-500">Our compliance team is now reviewing your information.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl max-w-sm mx-auto border border-gray-100 dark:border-gray-800">
                             <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest mb-4">
                                <span className="text-gray-400">Current Status</span>
                                <span className="text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">Under Review</span>
                             </div>
                             <div className="flex items-center justify-between text-[10px] font-bold text-gray-500">
                                <span>Estimated Completion</span>
                                <span className="text-gray-900 dark:text-white">24 - 48 Hours</span>
                             </div>
                        </div>
                        <button onClick={() => setStep(1)} className="text-sm font-black text-blue-600 hover:underline">Want to re-submit? Start over</button>
                    </div>
                )}
            </div>

        </div>
    )
}
