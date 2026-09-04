// Shared durations/springs for the intro sequence and viewport frame, so
// IntroSequence.tsx and ViewportFrame.tsx can't drift apart.

export const BAR_FILL_DURATION_MS = 1600;
export const BAR_FILL_DURATION_S = BAR_FILL_DURATION_MS / 1000;

// Settle time for the fill's trailing-edge spring once the leading edge stops.
export const BAR_SETTLE_BUFFER_MS = 400;

// Drives the frame's geometry morphs: bar -> full -> hero, and the ongoing
// hero <-> full toggle while scrolling.
export const MORPH_SPRING = {
  type: "spring",
  stiffness: 150,
  damping: 26,
  mass: 0.8,
} as const;

// Estimated settle time for MORPH_SPRING, used to pace the scripted timeline.
export const MORPH_SETTLE_MS = 700;

// Border "stretch": the frame elongates in the direction of scroll travel,
// scaled by Lenis's own velocity, then relaxes back to its base shape once
// that velocity decays to 0 (Lenis resets it shortly after scrolling stops).
export const VELOCITY_STRETCH_FACTOR = 0.8;
export const VELOCITY_STRETCH_MAX_PX = 40;
export const VELOCITY_STRETCH_SPRING = {
  type: "spring",
  stiffness: 350,
  damping: 22,
  mass: 0.5,
} as const;

// How much earlier (ms) the Hero reveal starts before the border's hero-morph
// fully settles, so they overlap instead of visibly waiting on each other.
export const CONTENT_REVEAL_LEAD_MS = 750;

// Spring driving the fill bar's trailing edge as it chases the leading edge.
export const FILL_TRAIL_SPRING = {
  stiffness: 250,
  damping: 22,
  mass: 1,
} as const;

// Stagger delays (seconds) for the Hero content cascade once revealed.
export const CONTENT_DELAYS = {
  illustration: 0,
  logo: 0.35,
  dates: 0.5,
  title: 0.35,
  subtitle: 1,
} as const;

// Hero fade-in duration — scoped locally rather than reusing
// reveal-variants.ts, so it can run slower without affecting other sections.
export const HERO_REVEAL_DURATION_S = 2.1;

export const SESSION_STORAGE_KEY = "dbfest-intro-seen";
