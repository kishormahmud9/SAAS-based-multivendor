import { Bell, CreditCard, MapPin, ChevronRight, Lock, Mail } from "lucide-react"
import Link from "next/link"

export default function UserSettingsPage() {
    return (
        <div className="p-6 md:p-10 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your notification, security, and account preferences.</p>
            </div>

            <div className="grid gap-6">
                {/* Billing Info */}
                <Link href="/billing" className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center justify-between hover:border-orange-200 dark:hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 rounded-xl group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-colors">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Billing Information</h3>
                            <p className="text-sm text-gray-500">Manage your saved cards and payment methods.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-orange-600 transition-all transform group-hover:translate-x-1" />
                </Link>

                {/* Manage Addresses */}
                <Link href="/addresses" className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center justify-between hover:border-orange-200 dark:hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-xl group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-colors">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">My Addresses</h3>
                            <p className="text-sm text-gray-500">Add or edit your shipping and billing addresses.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-orange-600 transition-all transform group-hover:translate-x-1" />
                </Link>

                {/* Change Email */}
                <button className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center justify-between hover:border-orange-200 dark:hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-4 text-left">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 rounded-xl group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-colors">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Change Email Address</h3>
                            <p className="text-sm text-gray-500">Update the email address associated with your account.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-orange-600 transition-all transform group-hover:translate-x-1" />
                </button>

                {/* Change Password */}
                <button className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center justify-between hover:border-orange-200 dark:hover:border-orange-500/30 transition-all group">
                    <div className="flex items-center gap-4 text-left">
                        <div className="p-3 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl group-hover:bg-orange-50 dark:group-hover:bg-orange-500/10 group-hover:text-orange-600 transition-colors">
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Change Password</h3>
                            <p className="text-sm text-gray-500">Secure your account by updating your password periodically.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-orange-600 transition-all transform group-hover:translate-x-1" />
                </button>

                {/* Notifications */}
                <div className="bg-white dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-600 rounded-xl">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Email Notifications</h3>
                            <p className="text-sm text-gray-500">Receive order updates and promotions.</p>
                        </div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
