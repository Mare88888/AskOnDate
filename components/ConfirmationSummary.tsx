"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { formatDate, formatTime } from "@/lib/utils";
import {
  getActivityLabel,
  getActivityOptionLabel,
} from "@/lib/activities";

type ConfirmationSummaryProps = {
  dateTime: Date;
  activity: string;
  activityOption: string;
  customMessage: string | null;
};

export function ConfirmationSummary({
  dateTime,
  activity,
  activityOption,
  customMessage,
}: ConfirmationSummaryProps) {
  const [hearts, setHearts] = useState<
    { id: number; left: number; delay: number; emoji: string }[]
  >([]);

  useEffect(() => {
    const fireConfetti = () => {
      const count = 120;
      const defaults = { origin: { y: 0.7 }, zIndex: 9999 };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          colors: ["#f43f5e", "#fb7185", "#fda4af", "#ec4899", "#f9a8d4"],
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    };

    fireConfetti();

    const heartEmojis = ["❤️", "💕", "💖", "💗", "💝"];
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
    setHearts(newHearts);
  }, []);

  const summaryItems = [
    { label: "Date", value: formatDate(dateTime) },
    { label: "Time", value: formatTime(dateTime) },
    { label: "Activity", value: getActivityLabel(activity) },
    { label: "Choice", value: getActivityOptionLabel(activity, activityOption) },
    ...(customMessage
      ? [{ label: "Your message", value: customMessage }]
      : []),
  ];

  return (
    <div className="relative">
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="animate-float-up absolute bottom-0 text-2xl opacity-80"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="mb-6 text-center"
      >
        <span className="text-6xl">💌</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6 text-center font-display text-3xl font-bold text-rose-600 dark:text-rose-300"
      >
        Thank you ❤️
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-6 space-y-3 rounded-2xl bg-rose-50/80 p-4 dark:bg-rose-900/30"
      >
        {summaryItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
          >
            <span className="text-sm font-semibold text-rose-500 dark:text-rose-400">
              {item.label}:
            </span>
            <span className="text-sm text-rose-700 dark:text-rose-200">
              {item.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mb-3 text-center text-rose-600 dark:text-rose-300"
      >
        I&apos;m looking forward to seeing you 😊
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-center text-sm font-medium text-rose-500 dark:text-rose-400"
      >
        I&apos;ll pick you up at the agreed time ❤️
      </motion.p>
    </div>
  );
}
