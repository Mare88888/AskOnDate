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
        "relative flex w-full flex-col items-center justify-center gap-2.5 rounded-2xl p-4",
        "border-2 transition-all duration-200",
        "min-h-[108px]",
        selected
          ? "border-rose-500 bg-linear-to-br from-rose-100/90 to-pink-50 shadow-md shadow-rose-300/40 ring-2 ring-rose-200/60 dark:from-rose-900/60 dark:to-pink-900/40 dark:border-rose-400 dark:shadow-rose-900/30 dark:ring-rose-700/40"
          : "border-rose-100/90 bg-linear-to-br from-white to-rose-50/40 hover:border-rose-300 hover:shadow-sm dark:border-rose-800 dark:from-rose-950/60 dark:to-rose-900/20 dark:hover:border-rose-600"
      )}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white shadow-sm">
          ✓
        </span>
      )}

      <span
        className={cn(
          "text-3xl leading-none transition-transform duration-200",
          selected && "scale-110"
        )}
        aria-hidden
      >
        {emoji}
      </span>

      <span
        className={cn(
          "text-xs font-semibold text-center leading-tight",
          selected
            ? "text-rose-700 dark:text-rose-200"
            : "text-rose-500 dark:text-rose-400"
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
