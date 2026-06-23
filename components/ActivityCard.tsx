"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ActivityCardProps = {
  emoji: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function ActivityCard({
  emoji,
  label,
  selected,
  onSelect,
}: ActivityCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-2xl p-4",
        "border-2 transition-all duration-200",
        "min-h-[100px]",
        selected
          ? "border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 shadow-md shadow-rose-200/50 dark:from-rose-900/50 dark:to-pink-900/30 dark:border-rose-400 dark:shadow-rose-900/30"
          : "border-rose-100 bg-white/80 hover:border-rose-300 hover:shadow-sm dark:border-rose-800 dark:bg-rose-950/50 dark:hover:border-rose-600"
      )}
    >
      <span className="text-2xl">{emoji}</span>
      <span
        className={cn(
          "text-xs font-semibold text-center leading-tight",
          selected
            ? "text-rose-600 dark:text-rose-300"
            : "text-rose-500 dark:text-rose-400"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
