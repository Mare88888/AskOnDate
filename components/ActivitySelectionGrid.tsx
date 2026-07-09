"use client";

import { motion } from "framer-motion";
import { ActivityCard } from "@/components/ActivityCard";
import { cn } from "@/lib/utils";

type ActivitySelectionGridProps = {
  items: ReadonlyArray<{ id: string; label: string; emoji: string }>;
  selected: string;
  onSelect: (id: string) => void;
  animated?: boolean;
};

export function ActivitySelectionGrid({
  items,
  selected,
  onSelect,
  animated = false,
}: ActivitySelectionGridProps) {
  const isLastOdd = (index: number) =>
    items.length % 2 === 1 && index === items.length - 1;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      {items.map((item, index) => {
        const card = (
          <ActivityCard
            emoji={item.emoji}
            label={item.label}
            selected={selected === item.id}
            onSelect={() => onSelect(item.id)}
          />
        );

        const wrapperClass = cn(
          isLastOdd(index) && "col-span-2 flex justify-center"
        );

        const innerClass = cn(
          "w-full",
          isLastOdd(index) && "max-w-[calc((100%-0.75rem)/2)]"
        );

        if (animated) {
          return (
            <motion.div
              key={item.id}
              className={wrapperClass}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={innerClass}>{card}</div>
            </motion.div>
          );
        }

        return (
          <div key={item.id} className={wrapperClass}>
            <div className={innerClass}>{card}</div>
          </div>
        );
      })}
    </div>
  );
}
