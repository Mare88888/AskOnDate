"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AvoidingNoButtonProps = {
  className?: string;
};

export function AvoidingNoButton({ className }: AvoidingNoButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const moveCountRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const moveButton = useCallback(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const padding = 8;

    const maxX = containerRect.width - buttonRect.width - padding * 2;
    const maxY = containerRect.height - buttonRect.height - padding * 2;

    if (maxX <= 0 || maxY <= 0) return;

    moveCountRef.current += 1;
    const angle = (moveCountRef.current * 137.5 * Math.PI) / 180;
    const radius = Math.min(maxX, maxY) * 0.4;
    const centerX = maxX / 2;
    const centerY = maxY / 2;

    let newX = centerX + Math.cos(angle) * radius;
    let newY = centerY + Math.sin(angle) * radius;

    newX = Math.max(0, Math.min(maxX, newX));
    newY = Math.max(0, Math.min(maxY, newY));

    setPosition({ x: newX, y: newY });
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (isMobile) return;

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        moveButton();
      }
    },
    [isMobile, moveButton]
  );

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [isMobile, handlePointerMove]);

  const handleMobileTap = () => {
    if (!isMobile) return;
    moveButton();
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-4 h-16 w-full"
      onPointerMove={handlePointerMove}
    >
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleMobileTap}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "absolute left-2 top-0 z-10",
          "rounded-2xl border-2 border-rose-200 bg-white px-6 py-3",
          "text-sm font-semibold text-rose-500",
          "shadow-sm select-none",
          "dark:border-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
          className
        )}
      >
        No 🙈
      </motion.button>
    </div>
  );
}
