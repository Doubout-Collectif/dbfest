import type { Event as EventType } from "@/sanity.types";

export const DATE_STEP = 0.05;
export const DATE_DURATION = 0.6;
export const ITEM_STEP = 0.07;
export const ITEM_JITTER = 0.03;
export const ITEM_DURATION = 0.35;

/** Time (seconds, relative to Prog's own startDelay) at which the last item finishes revealing. */
export const estimateProgDuration = (schedule: EventType["schedule"]): number => {
  const days = schedule ?? [];
  const totalItems = days.reduce((sum, day) => sum + (day.items?.length ?? 0), 0);

  const datesFinishAt =
    days.length > 0 ? (days.length - 1) * DATE_STEP + DATE_DURATION : 0;

  return totalItems > 0
    ? datesFinishAt + (totalItems - 1) * ITEM_STEP + ITEM_JITTER + ITEM_DURATION
    : datesFinishAt;
};
