"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className,
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-300/50 hover:from-rose-600 hover:to-pink-600 dark:shadow-rose-900/50",
    secondary:
      "bg-white text-rose-600 border-2 border-rose-200 hover:bg-rose-50 dark:bg-rose-900/50 dark:text-rose-200 dark:border-rose-700 dark:hover:bg-rose-900",
    ghost:
      "bg-transparent text-rose-500 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-900/30",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.03 }}
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3",
        "text-sm font-semibold transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          Saving...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
