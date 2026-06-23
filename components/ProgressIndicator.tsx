"use client";

import { motion } from "framer-motion";

type ProgressIndicatorProps = {
  currentStep: number;
  totalSteps?: number;
};

export function ProgressIndicator({
  currentStep,
  totalSteps = 5,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-6 w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-rose-400 dark:text-rose-300">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-rose-100 dark:bg-rose-900/50">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
