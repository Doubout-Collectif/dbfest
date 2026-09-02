import type { Variants } from "motion/react";

// easeOutCubic: deceleration spread across the whole duration, instead of
// front-loading almost all the motion into the first fraction of it.
export const REVEAL_EASE = [0.33, 1, 0.68, 1] as const;

/** Opacity-only fade. Pass the numeric delay (seconds) via the `custom` prop. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.6, ease: REVEAL_EASE, delay },
  }),
};

/** Fade + slight upward slide (bottom -> top). Pass the delay via `custom`. */
export const fadeSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: REVEAL_EASE, delay },
  }),
};

/** Word "staircase": fade + slight move up-and-right. Pass the delay via `custom`. */
export const staircaseWordVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.25, ease: REVEAL_EASE, delay },
  }),
};
