"use client"

import { Home, Compass, ShoppingCart, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/contexts/CartContext";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getRedirectPath } from "@/lib/auth/authRedirect";

export default function BottomNav() {
    const pathname = usePathname();
    const { itemCount } = useCart();
    const { user } = useAuth();
    const isMenuPage = pathname === "/user/menu";

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/shop", icon: Compass, label: "Explore" },
        { href: "/cart", icon: ShoppingCart, label: "Cart", badge: itemCount },
        { href: "/user/wishlist", icon: Heart, label: "Favorites" },
        { href: getRedirectPath(user), icon: User, label: "Account" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between md:hidden z-50 transition-all duration-300">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === "/user/menu" && isMenuPage);
                const Icon = item.icon;
                
                return (
                    <Link 
                        key={item.href}
                        href={item.href} 
                        className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                            isActive 
                                ? "text-orange-600 font-bold scale-110" 
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        }`}
                    >
                        <div className="relative">
                            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            {item.badge !== undefined && (
                                <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-950 shadow-sm">
                                    {item.badge}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
