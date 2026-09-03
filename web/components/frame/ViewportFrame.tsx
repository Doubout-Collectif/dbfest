"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { useFrame } from "./Frame-context";
import { getBarRect, getFullRect, getHeroRect, type FrameRect } from "./frame-geometry";
import { MORPH_SPRING } from "./frame-timing";

const FRAME_STROKE_COLOR = "#139367";
const FRAME_STROKE_WIDTH = 3;

// Persistent, always-mounted decorative border. Purely presentational — it
// animates toward whatever geometry `frameTarget` asks for; IntroSequence
// and the provider's scroll observer decide *when* that changes.
//
// Each dimension is a spring chained off a "raw" value that's always kept
// immediately up to date, rather than a one-off animate() toward a
// snapshot — otherwise, while pinned to the Hero illustration, a snapshot
// taken mid-scroll goes stale and the next re-measurement has to
// hard-correct with a visible pop. A raw value re-set every frame avoids
// that: big jumps (bar -> full -> hero) still read as a smooth morph, and
// small continuous updates (following scroll) settle fast enough to read
// as glued 1:1 tracking.
export default function ViewportFrame() {
  const { frameTarget, heroIllustrationRef } = useFrame();
  const prefersReducedMotion = useReducedMotion();

  const rawTop = useMotionValue(0);
  const rawLeft = useMotionValue(0);
  const rawWidth = useMotionValue(0);
  const rawHeight = useMotionValue(0);

  const top = useSpring(rawTop, MORPH_SPRING);
  const left = useSpring(rawLeft, MORPH_SPRING);
  const width = useSpring(rawWidth, MORPH_SPRING);
  const height = useSpring(rawHeight, MORPH_SPRING);

  // Mirrored into a ref so trackHero (below) can stay a stable callback —
  // useLenis re-invokes its callback on every identity change, so an inline
  // arrow would fire on every render, not just real scroll ticks.
  const frameTargetRef = useRef(frameTarget);
  useEffect(() => {
    frameTargetRef.current = frameTarget;
  }, [frameTarget]);

  // instant=true also jumps the spring value directly, bypassing lag —
  // used for the repeat-visit / reduced-motion skip path.
  const applyRect = useCallback(
    (rect: FrameRect, instant: boolean) => {
      const jump = instant || prefersReducedMotion;
      const pairs: Array<[typeof rawTop, typeof top, number]> = [
        [rawTop, top, rect.top],
        [rawLeft, left, rect.left],
        [rawWidth, width, rect.width],
        [rawHeight, height, rect.height],
      ];
      for (const [raw, rendered, target] of pairs) {
        raw.set(target);
        if (jump) rendered.jump(target);
      }
    },
    [rawTop, rawLeft, rawWidth, rawHeight, top, left, width, height, prefersReducedMotion]
  );

  const measureHero = useCallback(
    (): FrameRect | null =>
      heroIllustrationRef.current
        ? getHeroRect(heroIllustrationRef.current)
        : null,
    [heroIllustrationRef]
  );

  // Mode change: recompute the target rect and apply it.
  useEffect(() => {
    const rect =
      frameTarget.mode === "bar"
        ? getBarRect(window.innerWidth, window.innerHeight)
        : frameTarget.mode === "full"
          ? getFullRect(window.innerWidth, window.innerHeight)
          : measureHero();

    if (rect) applyRect(rect, frameTarget.instant);
  }, [frameTarget, applyRect, measureHero]);

  // Hero is a normal in-flow element, so its position changes on every
  // scroll frame, not just on resize.
  const trackHero = useCallback(() => {
    if (frameTargetRef.current.mode !== "hero") return;
    const rect = measureHero();
    if (rect) applyRect(rect, false);
  }, [measureHero, applyRect]);

  useLenis(trackHero);

  useEffect(() => {
    if (frameTarget.mode !== "hero") return;
    const onResize = () => {
      const rect = measureHero();
      if (rect) applyRect(rect, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [frameTarget.mode, applyRect, measureHero]);

  return (
    <motion.div
      aria-hidden
      className="fixed z-40 pointer-events-none"
      style={{
        top,
        left,
        width,
        height,
        borderRadius: 0,
        border: `${FRAME_STROKE_WIDTH}px solid ${FRAME_STROKE_COLOR}`,
      }}
    />
  );
}
