"use client";

import { useEffect } from "react";

/**
 * On confirmation, keep the user from returning to earlier invite steps via
 * the browser back button. If the tab was opened from a link, back may exit
 * the site (and on mobile often closes the tab). Closing programmatically
 * is not allowed unless the window was opened by script — we try anyway.
 */
export function ConfirmationHistoryGuard() {
  useEffect(() => {
    const url = window.location.href;

    const handlePopState = () => {
      window.close();
      window.history.pushState(null, "", url);
    };

    window.history.pushState(null, "", url);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return null;
}
