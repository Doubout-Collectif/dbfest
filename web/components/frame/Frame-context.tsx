"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

export type FrameMode = "bar" | "full" | "hero" | "map";

type FrameTarget = {
  mode: FrameMode;
  /** true = snap instantly (repeat visit / reduced motion), false = spring-morph. */
  instant: boolean;
};

type FrameContextType = {
  frameTarget: FrameTarget;
  setFrameTarget: (mode: FrameMode, instant?: boolean) => void;
  contentRevealed: boolean;
  setContentRevealed: (revealed: boolean) => void;
  heroSectionRef: RefObject<HTMLElement | null>;
  heroIllustrationRef: RefObject<HTMLImageElement | null>;
  mapSectionRef: RefObject<HTMLElement | null>;
  mapTargetRef: RefObject<HTMLDivElement | null>;
  // One-shot handoff: lets the scroll observer below start driving
  // frameTarget once the intro (or its skip path) is done.
  enableScrollDrivenMode: () => void;
};

type PinnedSection = {
  ref: RefObject<HTMLElement | null>;
  mode: FrameMode;
  // Both Hero and Map should only steal the frame once fully in view —
  // otherwise the border morph (full -> hero on the way back up, full ->
  // map on the way down) kicks off while the section is still sliding in,
  // well before it's actually filling the viewport.
  requireFullyVisible?: boolean;
};

// A near-1 rather than exactly-1 threshold: IntersectionObserver's ratio can
// land at e.g. 0.998 instead of a clean 1.0 due to sub-pixel layout, which
// would otherwise never cross an exact `threshold: 1` boundary and so never
// fire the callback that flips this to "fully visible".
const FULLY_VISIBLE_RATIO = 0.99;

// Wires up every pinned section (Hero, Map, ...) against one shared
// intersecting-state record, rather than one independent observer per
// section. Independent observers race: Map's IntersectionObserver reporting
// "not intersecting" would force the frame to "full" even while Hero's
// observer still reported itself as the active section (and vice versa on
// the way out), since neither observer knew about the other's state.
// Recomputing from all of them together instead picks whichever pinned
// section (in `sections` order) currently intersects, or "full" if none do.
function usePinnedSections(
  sections: readonly PinnedSection[],
  scrollDrivenRef: RefObject<boolean>,
  setFrameTarget: (mode: FrameMode, instant?: boolean) => void
) {
  useEffect(() => {
    const intersecting: Partial<Record<FrameMode, boolean>> = {};
    const observers: IntersectionObserver[] = [];
    const rafIds: number[] = [];
    let cancelled = false;

    const recompute = () => {
      if (!scrollDrivenRef.current) return;
      const active = sections.find((section) => intersecting[section.mode]);
      setFrameTarget(active ? active.mode : "full");
    };

    for (const section of sections) {
      // Heavier subtrees (e.g. Map's Leaflet import) can commit a frame or
      // two after this effect's first run, so section.ref.current may still
      // be null here — poll until it's attached rather than silently never
      // pinning.
      const attachWhenReady = () => {
        if (cancelled) return;
        const el = section.ref.current;
        if (!el) {
          rafIds.push(requestAnimationFrame(attachWhenReady));
          return;
        }
        const observer = new IntersectionObserver(
          ([entry]) => {
            intersecting[section.mode] = section.requireFullyVisible
              ? entry.intersectionRatio >= FULLY_VISIBLE_RATIO
              : entry.isIntersecting;
            recompute();
          },
          section.requireFullyVisible
            ? { threshold: [0, FULLY_VISIBLE_RATIO, 1] }
            : { threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      };
      attachWhenReady();
    }

    return () => {
      cancelled = true;
      rafIds.forEach(cancelAnimationFrame);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections, scrollDrivenRef, setFrameTarget]);
}

const FrameContext = createContext<FrameContextType | null>(null);

export function FrameProvider({ children }: { children: React.ReactNode }) {
  const [frameTarget, setFrameTargetState] = useState<FrameTarget>({
    mode: "bar",
    instant: true,
  });
  const [contentRevealed, setContentRevealed] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroIllustrationRef = useRef<HTMLImageElement | null>(null);
  const mapSectionRef = useRef<HTMLElement | null>(null);
  const mapTargetRef = useRef<HTMLDivElement | null>(null);
  const scrollDrivenRef = useRef(false);

  const setFrameTarget = useCallback((mode: FrameMode, instant = false) => {
    setFrameTargetState({ mode, instant });
  }, []);

  const enableScrollDrivenMode = useCallback(() => {
    scrollDrivenRef.current = true;
  }, []);

  // Once handed off, keeps the frame hugging Hero while it's in view and
  // expands it to full-viewport the instant Hero scrolls out — same deal
  // for Map, so the border hugs the map while it's on screen. Order here is
  // priority order if two sections were ever simultaneously "intersecting".
  // Map's trigger watches the map element itself (mapTargetRef), not the
  // whole section (mapSectionRef, also used by usePinOnFullyVisible) — the
  // section includes the title and location list, taller than the
  // viewport, so a fully-visible check on it would never fire.
  const pinnedSections = useMemo(
    () => [
      { ref: heroSectionRef, mode: "hero" as const, requireFullyVisible: true },
      { ref: mapTargetRef, mode: "map" as const, requireFullyVisible: true },
    ],
    []
  );
  usePinnedSections(pinnedSections, scrollDrivenRef, setFrameTarget);

  return (
    <FrameContext.Provider
      value={{
        frameTarget,
        setFrameTarget,
        contentRevealed,
        setContentRevealed,
        heroSectionRef,
        heroIllustrationRef,
        mapSectionRef,
        mapTargetRef,
        enableScrollDrivenMode,
      }}
    >
      {children}
    </FrameContext.Provider>
  );
}

export function useFrame() {
  const ctx = useContext(FrameContext);
  if (!ctx) throw new Error("useFrame doit être utilisé dans FrameProvider");
  return ctx;
}
