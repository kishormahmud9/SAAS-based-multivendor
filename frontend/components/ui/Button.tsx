import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    fullWidth?: boolean;
    icon?: React.ReactNode;
    forceLight?: boolean;
}

export default function Button({
    children,
    className = "",
    variant = "primary",
    fullWidth = false,
    icon,
    forceLight = false,
    ...props
}: ButtonProps) {
    const baseStyles =
        "font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:cursor-not-allowed";

    const variants = {
        primary:
            "bg-gradient-to-r from-blue-900 to-blue-800 text-white hover:shadow-lg hover:scale-[1.02]",
        outline: forceLight 
            ? "border border-gray-200 hover:bg-gray-50 text-gray-700" 
            : "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
        ghost: forceLight 
            ? "hover:bg-gray-100 text-gray-600" 
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""
                } ${className}`}
            {...props}
        >
            {icon && <span>{icon}</span>}
            <span>{children}</span>
        </button>
    );
}
