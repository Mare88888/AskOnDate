"use client";

import { cn } from "@/lib/utils";

type DateTimePickerProps = {
  date: string;
  time: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
};

export function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          htmlFor="date"
          className="mb-2 block text-sm font-medium text-rose-600 dark:text-rose-300"
        >
          Pick a date 📅
        </label>
        <input
          id="date"
          type="date"
          value={date}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          className={cn(
            "w-full rounded-2xl border-2 border-rose-200 bg-white px-4 py-3",
            "text-rose-700 outline-none transition-colors",
            "focus:border-rose-400 focus:ring-2 focus:ring-rose-200",
            "dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
            "dark:focus:border-rose-500 dark:focus:ring-rose-800"
          )}
        />
      </div>
      <div>
        <label
          htmlFor="time"
          className="mb-2 block text-sm font-medium text-rose-600 dark:text-rose-300"
        >
          Pick a time ⏰
        </label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className={cn(
            "w-full rounded-2xl border-2 border-rose-200 bg-white px-4 py-3",
            "text-rose-700 outline-none transition-colors",
            "focus:border-rose-400 focus:ring-2 focus:ring-rose-200",
            "dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-200",
            "dark:focus:border-rose-500 dark:focus:ring-rose-800"
          )}
        />
      </div>
    </div>
  );
}
