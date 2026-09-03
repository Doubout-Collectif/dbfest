"use client";

import ProgList from "./ProgList";
import type { Event as EventType } from "@/sanity.types";
import { useShuffledDelays } from "@/components/revealAnimation/useShuffledDelays";
import { DATE_STEP, DATE_DURATION, ITEM_STEP, ITEM_JITTER } from "./prog-timing";

const colStarts = ["md:col-start-1", "md:col-start-4", "md:col-start-7"];

type ProgProps = {
  schedule: EventType["schedule"];
  active: boolean;
  startDelay: number;
};

const Prog = ({ schedule, active, startDelay }: ProgProps) => {
  const days = schedule ?? [];
  const totalItems = days.reduce(
    (sum, day) => sum + (day.items?.length ?? 0),
    0
  );
  const itemDelays = useShuffledDelays(totalItems, ITEM_STEP, ITEM_JITTER);

  if (!schedule?.length) return null;

  const datesFinishAt =
    days.length > 0 ? (days.length - 1) * DATE_STEP + DATE_DURATION : 0;
  const itemsBaseDelay = startDelay + datesFinishAt;

  const dayItemCounts = days.map((day) => day.items?.length ?? 0);
  const dayOffsets = dayItemCounts.map((_, i) =>
    dayItemCounts.slice(0, i).reduce((sum, n) => sum + n, 0)
  );

  return (
    <div
      aria-label="Prog"
      className="flex-1 grid grid-cols-1 md:grid-cols-8 w-full mt-8 sm:mt-12 md:mt-16 gap-y-8 sm:gap-y-12 gap-x-6"
    >
      {schedule.map((day, index) => {
        const dayItemCount = dayItemCounts[index];
        const dayOffset = dayOffsets[index];
        const dayItemDelays = itemDelays.slice(dayOffset, dayOffset + dayItemCount);

        return (
          <ProgList
            key={day._key}
            date={day.date}
            items={day.items}
            colStart={colStarts[index % colStarts.length]}
            active={active}
            dateDelay={startDelay + index * DATE_STEP}
            itemsBaseDelay={itemsBaseDelay}
            itemDelays={dayItemDelays}
          />
        );
      })}
    </div>
  );
};

export default Prog;