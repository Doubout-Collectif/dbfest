"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export type FrameMode = "bar" | "full" | "hero";

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
  // One-shot handoff: lets the scroll observer below start driving
  // frameTarget once the intro (or its skip path) is done.
  enableScrollDrivenMode: () => void;
};

const FrameContext = createContext<FrameContextType | null>(null);

export function FrameProvider({ children }: { children: React.ReactNode }) {
  const [frameTarget, setFrameTargetState] = useState<FrameTarget>({
    mode: "bar",
    instant: true,
  });
  const [contentRevealed, setContentRevealed] = useState(false);

  const heroSectionRef = useRef<HTMLElement | null>(null);
  const heroIllustrationRef = useRef<HTMLImageElement | null>(null);
  const scrollDrivenRef = useRef(false);

  const setFrameTarget = useCallback((mode: FrameMode, instant = false) => {
    setFrameTargetState({ mode, instant });
  }, []);

  const enableScrollDrivenMode = useCallback(() => {
    scrollDrivenRef.current = true;
  }, []);

  // Once handed off, keeps the frame hugging Hero while it's in view and
  // expands it to full-viewport the instant Hero scrolls out.
  useEffect(() => {
    const section = heroSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!scrollDrivenRef.current) return;
        setFrameTarget(entry.isIntersecting ? "hero" : "full");
      },
      { threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [setFrameTarget]);

  return (
    <FrameContext.Provider
      value={{
        frameTarget,
        setFrameTarget,
        contentRevealed,
        setContentRevealed,
        heroSectionRef,
        heroIllustrationRef,
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
