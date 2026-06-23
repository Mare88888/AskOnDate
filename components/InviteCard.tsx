"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type InviteCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function InviteCard({ children, className }: InviteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "relative w-full max-w-[420px] overflow-hidden rounded-3xl",
        "bg-white/90 shadow-xl shadow-rose-200/50 backdrop-blur-sm",
        "border border-rose-100/80",
        "dark:bg-rose-950/90 dark:shadow-rose-900/30 dark:border-rose-800/50",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
