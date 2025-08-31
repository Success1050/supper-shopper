"use client";

import { ReactNode } from "react";
interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export default function Button({
  variant,
  size = "md",
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = "right",
}: ButtonProps) {
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm md:text-base",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  const variantClasses = {
    primary: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white focus:ring-[#2563EB]",
    secondary:
      "bg-white text-[#2563EB] hover:bg-gray-50 border border-[#2563EB] focus:ring-[#2563EB]",
    outline:
      "bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2563EB] focus:ring-white",
  };

  const widthClasses = fullWidth ? "w-full" : "w-full sm:w-auto";

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClasses} ${disabledClasses}`}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
