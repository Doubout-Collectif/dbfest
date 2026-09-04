"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import type Lenis from "lenis";
import { useFrame } from "./Frame-context";
import type { FrameMode } from "./Frame-context";
import { getBarRect, getFullRect, getElementRect, type FrameRect } from "./frame-geometry";
import {
  MORPH_SPRING,
  VELOCITY_STRETCH_FACTOR,
  VELOCITY_STRETCH_MAX_PX,
  VELOCITY_STRETCH_SPRING,
} from "./frame-timing";

const FRAME_STROKE_COLOR = "#139367";
const FRAME_STROKE_WIDTH = 4;

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
const PINNED_MODES: readonly FrameMode[] = ["hero", "map"];

export default function ViewportFrame() {
  const { frameTarget, heroIllustrationRef, mapTargetRef } = useFrame();
  const prefersReducedMotion = useReducedMotion();

  const rawTop = useMotionValue(0);
  const rawLeft = useMotionValue(0);
  const rawWidth = useMotionValue(0);
  const rawHeight = useMotionValue(0);

  const top = useSpring(rawTop, MORPH_SPRING);
  const left = useSpring(rawLeft, MORPH_SPRING);
  const width = useSpring(rawWidth, MORPH_SPRING);
  const height = useSpring(rawHeight, MORPH_SPRING);

  // Scroll-velocity "stretch": elongates the frame in the direction of
  // travel, independent of whatever geometry `frameTarget` asks for above —
  // relaxes back to 0 on its own once Lenis's velocity decays.
  const rawVelocity = useMotionValue(0);
  const velocity = useSpring(rawVelocity, VELOCITY_STRETCH_SPRING);
  const stretchTop = useTransform(velocity, (v) => Math.max(0, -v));
  const stretchBottom = useTransform(velocity, (v) => Math.max(0, v));
  const displayTop = useTransform(
    [top, stretchTop],
    ([t, s]: number[]) => t - s
  );
  const displayHeight = useTransform(
    [height, stretchTop, stretchBottom],
    ([h, st, sb]: number[]) => h + st + sb
  );

  // Mirrored into a ref so trackTarget/trackVelocity (below) can stay stable
  // callbacks — useLenis re-invokes its callback on every identity change,
  // so an inline arrow would fire on every render, not just real scroll ticks.
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

  // Reads whatever element the current mode is pinned to (Hero illustration,
  // Map, ...) straight off the DOM.
  const measureTarget = useCallback(
    (mode: FrameMode): FrameRect | null => {
      const el = mode === "map" ? mapTargetRef.current : heroIllustrationRef.current;
      return el ? getElementRect(el) : null;
    },
    [heroIllustrationRef, mapTargetRef]
  );

  // Mode change: recompute the target rect and apply it.
  useEffect(() => {
    const rect =
      frameTarget.mode === "bar"
        ? getBarRect(window.innerWidth, window.innerHeight)
        : frameTarget.mode === "full"
          ? getFullRect(window.innerWidth, window.innerHeight)
          : measureTarget(frameTarget.mode);

    if (rect) applyRect(rect, frameTarget.instant);
  }, [frameTarget, applyRect, measureTarget]);

  // Pinned targets are normal in-flow elements, so their position changes on
  // every scroll frame, not just on resize. Velocity tracking runs
  // regardless of mode, so the stretch reacts everywhere, not just while pinned.
  const trackTarget = useCallback(() => {
    const mode = frameTargetRef.current.mode;
    if (!PINNED_MODES.includes(mode)) return;
    const rect = measureTarget(mode);
    if (rect) applyRect(rect, false);
  }, [measureTarget, applyRect]);

  const trackVelocity = useCallback(
    (lenis: Lenis) => {
      if (prefersReducedMotion) return;
      const clamped = Math.max(
        -VELOCITY_STRETCH_MAX_PX,
        Math.min(VELOCITY_STRETCH_MAX_PX, lenis.velocity * VELOCITY_STRETCH_FACTOR)
      );
      rawVelocity.set(clamped);
    },
    [rawVelocity, prefersReducedMotion]
  );

  useLenis(trackTarget);
  useLenis(trackVelocity);

  useEffect(() => {
    if (!PINNED_MODES.includes(frameTarget.mode)) return;
    const onResize = () => {
      const rect = measureTarget(frameTarget.mode);
      if (rect) applyRect(rect, false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [frameTarget.mode, applyRect, measureTarget]);

  return (
    <motion.div
      aria-hidden
      className="fixed z-40 pointer-events-none"
      style={{
        top: displayTop,
        left,
        width,
        height: displayHeight,
        borderRadius: 0,
        border: `${FRAME_STROKE_WIDTH}px solid ${FRAME_STROKE_COLOR}`,
      }}
    />
  );
}
