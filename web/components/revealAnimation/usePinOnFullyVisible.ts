"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

const PIN_FREEZE_DURATION_MS = 300;

/**
 * Briefly freezes Lenis scroll the instant a section fully occupies the
 * viewport (or is itself fully contained within it), then releases it —
 * a short "pin" beat rather than a real scroll-jack/sticky pin.
 *
 * Checked against raw geometry on every Lenis scroll tick rather than
 * Motion's `useInView` ratio: a ratio-based `amount: 1` can never reach 1
 * once a section's rendered height exceeds the viewport, which real CMS
 * content on `min-h-screen` sections routinely does — that's why the
 * ratio-based version never fired.
 *
 * A fast flick can also move `rect.top` clean across the whole "fully
 * visible" window between two consecutive ticks, without either sample
 * landing inside it — so entry is detected both by a direct hit and by
 * the window having been jumped over since the last tick.
 */
export const usePinOnFullyVisible = (sectionRef: RefObject<Element | null>) => {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const prevTop = useRef<number | null>(null);
  const wasInsideZone = useRef(false);
  const pinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lenis = useLenis(
    (instance) => {
      const el = sectionRef.current;
      if (!el || prefersReducedMotion) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Range of rect.top over which the section fully occupies the
      // viewport — whichever of the two (section, viewport) is smaller
      // ends up fully contained in the other.
      const lower = Math.min(0, viewportHeight - rect.height);
      const upper = Math.max(0, viewportHeight - rect.height);
      const isInsideZone = rect.top >= lower && rect.top <= upper;

      const lastTop = prevTop.current;
      prevTop.current = rect.top;

      if (lastTop === null) {
        wasInsideZone.current = isInsideZone;
        return;
      }

      const jumpedThroughZone =
        !isInsideZone &&
        ((lastTop < lower && rect.top > upper) ||
          (lastTop > upper && rect.top < lower));
      const enteredZone = (isInsideZone && !wasInsideZone.current) || jumpedThroughZone;
      wasInsideZone.current = isInsideZone;

      if (!enteredZone) return;

      instance.stop();
      pinTimeout.current = setTimeout(() => instance.start(), PIN_FREEZE_DURATION_MS);
    },
    [prefersReducedMotion]
  );

  // Safety net: never leave scroll locked if the section unmounts mid-pin.
  useEffect(() => {
    return () => {
      if (pinTimeout.current) clearTimeout(pinTimeout.current);
      lenis?.start();
    };
  }, [lenis]);
};
