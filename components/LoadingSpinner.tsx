"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex min-h-[50dvh] items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-10 w-10 rounded-full border-4 border-rose-200 border-t-rose-500 dark:border-rose-800 dark:border-t-rose-400"
      />
    </div>
  );
}
