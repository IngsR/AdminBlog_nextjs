import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming I need a cn utility, I'll create it if not exists

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'premium';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none active:scale-95";
    
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 focus:ring-indigo-500",
      secondary: "bg-secondary text-secondary-foreground hover:bg-muted focus:ring-secondary",
      outline: "bg-transparent border border-border text-foreground hover:bg-secondary focus:ring-secondary",
      ghost: "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground focus:ring-secondary",
      danger: "bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground focus:ring-destructive",
      premium: "bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-5 py-2.5 text-sm",
      lg: "px-8 py-4 text-base",
      icon: "p-2.5 rounded-xl"
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
