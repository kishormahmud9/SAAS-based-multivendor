import React, { InputHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    error?: string;
    rightElement?: React.ReactNode;
    forceLight?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", icon: Icon, error, rightElement, forceLight = false, ...props }, ref) => {
        
        // Define standard light mode classes
        const baseClasses = "w-full py-3 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300";
        const lightModeTheme = error
            ? "bg-gray-50 border border-red-500 focus:ring-red-500 focus:border-red-500 text-gray-900 placeholder:text-gray-400"
            : "bg-gray-50 border border-gray-200 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder:text-gray-400";
        
        // Define dark mode modifiers (only applied if not forceLight)
        const darkModeTheme = forceLight ? "" : (error 
            ? "dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500" 
            : "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-500");

        return (
            <div className="w-full flex flex-col">
                <div className="relative w-full">
                    {Icon && (
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`${baseClasses} ${lightModeTheme} ${darkModeTheme} ${Icon ? "pl-11" : "pl-4"} ${rightElement ? "pr-12" : "pr-4"} ${className}`}
                        {...props}
                    />
                    {rightElement && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                            {rightElement}
                        </div>
                    )}
                </div>
                {error && <p className="text-red-600 text-sm mt-1.5 ml-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;

