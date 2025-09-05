import React, { type FC, type ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/constants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  variant?: "ghost" | "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button: FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center gap-2 outline-0 justify-center cursor-pointer text-app-200 hover:bg-secondary rounded-md disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = cn({
    "bg-app-400 text-white hover:bg-app-400/50": variant === "default",
    "bg-transparent": variant === "ghost",
    "border border-border-200": variant === "outline",
  });

  const sizeClasses = cn({
    "px-2 py-1 text-xs": size === "sm",
    "px-3 py-2 text-sm": size === "md",
    "px-4 py-3 text-base": size === "lg",
  });

  return (
    <button
      type="button"
      className={cn(baseClasses, variantClasses, sizeClasses, className)}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
