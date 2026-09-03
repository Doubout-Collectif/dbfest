"use client";

import { useState } from "react";

const shuffleDelays = (count: number, step: number, jitter: number): number[] => {
  if (count <= 0) return [];

  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const delays = new Array<number>(count).fill(0);
  order.forEach((originalIndex, rank) => {
    const jitterOffset = jitter > 0 ? (Math.random() * 2 - 1) * jitter : 0;
    delays[originalIndex] = Math.max(0, rank * step + jitterOffset);
  });

  return delays;
};

/**
 * Returns per-index delays (seconds) that reveal `count` items in a random
 * order. The shuffle is computed once via a lazy state initializer (React's
 * sanctioned escape hatch for one-time non-deterministic values) so it stays
 * stable across re-renders.
 */
export const useShuffledDelays = (
  count: number,
  step = 0.07,
  jitter = 0.03
): number[] => {
  const [delays] = useState(() => shuffleDelays(count, step, jitter));
  return delays;
};
