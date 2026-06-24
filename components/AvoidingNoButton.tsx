"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AVOID_RADIUS = 100;
const FLEE_DISTANCE = 90;
const MOVE_COOLDOWN_MS = 120;
const VIEWPORT_PADDING = 8;

type AvoidingNoButtonProps = {
  slotRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

export function AvoidingNoButton({ slotRef, className }: AvoidingNoButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const lastMoveRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (position) {
      positionRef.current = position;
    }
  }, [position]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const getViewportBounds = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return null;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    if (buttonWidth === 0 || buttonHeight === 0) return null;

    return {
      minX: VIEWPORT_PADDING,
      minY: VIEWPORT_PADDING,
      maxX: Math.max(
        VIEWPORT_PADDING,
        window.innerWidth - buttonWidth - VIEWPORT_PADDING
      ),
      maxY: Math.max(
        VIEWPORT_PADDING,
        window.innerHeight - buttonHeight - VIEWPORT_PADDING
      ),
      buttonWidth,
      buttonHeight,
    };
  }, []);

  const setClampedPosition = useCallback(
    (x: number, y: number) => {
      const bounds = getViewportBounds();
      if (!bounds) return false;

      const newX = Math.max(bounds.minX, Math.min(bounds.maxX, x));
      const newY = Math.max(bounds.minY, Math.min(bounds.maxY, y));
      positionRef.current = { x: newX, y: newY };
      setPosition({ x: newX, y: newY });
      return true;
    },
    [getViewportBounds]
  );

  const placeInSlot = useCallback(() => {
    const slot = slotRef.current;
    const button = buttonRef.current;
    if (!slot || !button) return false;

    const slotRect = slot.getBoundingClientRect();
    if (slotRect.width === 0 || slotRect.height === 0) return false;

    const x = slotRect.left + (slotRect.width - button.offsetWidth) / 2;
    const y = slotRect.top + (slotRect.height - button.offsetHeight) / 2;

    return setClampedPosition(x, y);
  }, [slotRef, setClampedPosition]);

  useLayoutEffect(() => {
    if (!mounted) return;

    let attempts = 0;
    const maxAttempts = 30;

    const tryPlace = () => {
      if (placeInSlot()) return;
      attempts += 1;
      if (attempts < maxAttempts) {
        requestAnimationFrame(tryPlace);
      }
    };

    tryPlace();

    const slot = slotRef.current;
    if (!slot) return;

    const observer = new ResizeObserver(() => {
      if (!lastMoveRef.current) {
        placeInSlot();
      }
    });
    observer.observe(slot);

    const onResize = () => {
      if (!lastMoveRef.current) {
        placeInSlot();
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, placeInSlot, slotRef]);

  const moveAwayFrom = useCallback(
    (clientX: number, clientY: number) => {
      const now = Date.now();
      if (now - lastMoveRef.current < MOVE_COOLDOWN_MS) return;

      const bounds = getViewportBounds();
      if (!bounds) return;

      const { x: curX, y: curY } = positionRef.current;

      const btnCenterX = curX + bounds.buttonWidth / 2;
      const btnCenterY = curY + bounds.buttonHeight / 2;

      let dx = btnCenterX - clientX;
      let dy = btnCenterY - clientY;
      const dist = Math.hypot(dx, dy) || 1;

      if (dist < 20) {
        const angle = Math.random() * Math.PI * 2;
        dx = Math.cos(angle);
        dy = Math.sin(angle);
      } else {
        dx /= dist;
        dy /= dist;
      }

      let newX = curX + dx * FLEE_DISTANCE;
      let newY = curY + dy * FLEE_DISTANCE;

      if (Math.abs(newX - curX) < 8 && Math.abs(newY - curY) < 8) {
        newX =
          bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
        newY =
          bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
      }

      lastMoveRef.current = now;
      setClampedPosition(newX, newY);
    },
    [getViewportBounds, setClampedPosition]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isMobile || !position) return;

      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < AVOID_RADIUS) {
        moveAwayFrom(e.clientX, e.clientY);
      }
    },
    [isMobile, moveAwayFrom, position]
  );

  useEffect(() => {
    if (isMobile || !position) return;

    document.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    return () =>
      document.removeEventListener("pointermove", handlePointerMove);
  }, [isMobile, handlePointerMove, position]);

  const handleMobileTap = () => {
    const bounds = getViewportBounds();
    if (!bounds) return;

    lastMoveRef.current = Date.now();
    setClampedPosition(
      bounds.minX + Math.random() * (bounds.maxX - bounds.minX),
      bounds.minY + Math.random() * (bounds.maxY - bounds.minY)
    );
  };

  if (!mounted) return null;

  return createPortal(
    <motion.button
      ref={buttonRef}
      type="button"
      onPointerDown={(e) => {
        e.preventDefault();
        if (!position) return;
        if (isMobile) {
          handleMobileTap();
        } else {
          moveAwayFrom(e.clientX, e.clientY);
        }
      }}
      style={{ position: "fixed" }}
      initial={false}
      animate={
        position
          ? { left: position.x, top: position.y, opacity: 1 }
          : { opacity: 0 }
      }
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className={cn(
        "z-100 cursor-default",
        "rounded-2xl border-2 border-rose-200 bg-white px-6 py-3",
        "text-sm font-semibold whitespace-nowrap text-rose-500",
        "shadow-sm select-none",
        "dark:border-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
        className
      )}
    >
      No 🙈
    </motion.button>,
    document.body
  );
}
