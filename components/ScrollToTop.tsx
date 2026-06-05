"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop – resets the window scroll position to the top on every
 * client-side navigation.  Must be rendered inside the App Router tree
 * (i.e. inside a Server Component layout) so that `usePathname` can
 * detect route changes.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll the window (and the document element as a fallback) to the top
    // whenever the pathname changes.  Using `instant` behaviour avoids the
    // jarring visual of a smooth-scroll animation across page transitions.
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch {
      // Fallback for older browsers that don't support ScrollToOptions
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // This component renders nothing – it is a behaviour-only side-effect.
  return null;
}
