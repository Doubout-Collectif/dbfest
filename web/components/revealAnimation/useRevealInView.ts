"use client";

import { useRef, type RefObject } from "react";
import {
  useInView,
  useReducedMotion,
  type UseInViewOptions,
} from "motion/react";

type UseRevealInViewResult<T extends Element> = {
  ref: RefObject<T | null>;
  inView: boolean;
};

export const useRevealInView = <T extends Element = HTMLElement>(
  options?: UseInViewOptions
): UseRevealInViewResult<T> => {
  const ref = useRef<T>(null);
  const inViewport = useInView(ref, { once: true, amount: 0.2, ...options });
  const prefersReducedMotion = useReducedMotion() ?? false;

  return { ref, inView: inViewport || prefersReducedMotion };
};
