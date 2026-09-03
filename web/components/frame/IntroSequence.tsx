"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useLenis } from "lenis/react";
import { useFrame } from "./Frame-context";
import { REVEAL_EASE } from "../revealAnimation/reveal-variants";
import { getBarRect, type FrameRect } from "./frame-geometry";
import {
  BAR_FILL_DURATION_S,
  BAR_SETTLE_BUFFER_MS,
  MORPH_SETTLE_MS,
  CONTENT_REVEAL_LEAD_MS,
  FILL_TRAIL_SPRING,
  SESSION_STORAGE_KEY,
} from "./frame-timing";

// Keeps the fill inside the bar's outline (ViewportFrame), matching its stroke width.
const FILL_INSET = 2;
const FILL_COLOR = "#139367";

// Runs once, on mount, forever after: on a genuine first visit it plays the
// scripted bar -> full-viewport -> hero sequence (locking scroll), then
// hands off to FrameProvider's scroll observer. On a repeat visit (or
// reduced motion) it skips straight to the end state. Renders nothing once done.
export default function IntroSequence() {
  const { setFrameTarget, setContentRevealed, enableScrollDrivenMode } =
    useFrame();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  const [barRect, setBarRect] = useState<FrameRect | null>(null);
  const [showBar, setShowBar] = useState(false);

  const rightX = useMotionValue(0);
  const leftX = useSpring(rightX, FILL_TRAIL_SPRING);
  const fillWidth = useTransform([rightX, leftX], ([right, left]: number[]) =>
    Math.max(0, right - left)
  );

  const isLockingRef = useRef(false);

  useEffect(() => {
    const alreadySeen =
      window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "1";

    if (alreadySeen || prefersReducedMotion) {
      setFrameTarget("hero", true);
      setContentRevealed(true);
      enableScrollDrivenMode();
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
      return;
    }

    const rect = getBarRect(window.innerWidth, window.innerHeight);
    // Reveal only past hydration (sessionStorage isn't readable during SSR
    // without a mismatch) — same pattern as the rest of the reveal system.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBarRect(rect);
    setShowBar(true);
    setFrameTarget("bar", true);

    isLockingRef.current = true;
    lenis?.stop();
    document.body.classList.add("overflow-hidden");

    const trackWidth = rect.width - FILL_INSET * 2;
    const fillControls = animate(rightX, trackWidth, {
      duration: BAR_FILL_DURATION_S,
      ease: REVEAL_EASE,
    });

    const toFullMs = BAR_FILL_DURATION_S * 1000 + BAR_SETTLE_BUFFER_MS;
    const toHeroMs = toFullMs + MORPH_SETTLE_MS;
    // Starts a bit before the hero-morph's estimated full settle, so content
    // begins appearing while the border is still finishing its motion.
    const revealMs = toHeroMs + MORPH_SETTLE_MS - CONTENT_REVEAL_LEAD_MS;

    const timers = [
      setTimeout(() => setFrameTarget("full"), toFullMs),
      setTimeout(() => {
        setFrameTarget("hero");
        setShowBar(false);
      }, toHeroMs),
      setTimeout(() => {
        setContentRevealed(true);
        window.sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
        enableScrollDrivenMode();
        lenis?.start();
        document.body.classList.remove("overflow-hidden");
        isLockingRef.current = false;
      }, revealMs),
    ];

    return () => {
      fillControls.stop();
      timers.forEach(clearTimeout);
      if (isLockingRef.current) {
        lenis?.start();
        document.body.classList.remove("overflow-hidden");
        isLockingRef.current = false;
      }
    };
    // Scripted once, on mount, by design — not meant to re-run on prop/state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showBar || !barRect) return null;

  return (
    <div
      aria-hidden
      className="fixed z-40 overflow-hidden pointer-events-none"
      style={{
        top: barRect.top + FILL_INSET,
        left: barRect.left + FILL_INSET,
        width: barRect.width - FILL_INSET * 2,
        height: barRect.height - FILL_INSET * 2,
        borderRadius: 0,
      }}
    >
      <motion.div
        className="absolute inset-y-0"
        style={{ left: leftX, width: fillWidth, backgroundColor: FILL_COLOR }}
      />
    </div>
  );
}
