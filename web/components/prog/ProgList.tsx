"use client";

import { motion } from "motion/react";
import ProgItem from "./ProgItem";
import type { Event as EventType } from "@/sanity.types";
import { fadeVariants } from "@/components/revealAnimation/reveal-variants";

type ScheduleDay = NonNullable<EventType["schedule"]>[number];

type ProgListProps = {
  date?: string;
  items?: ScheduleDay["items"];
  colStart?: string;
  active: boolean;
  dateDelay: number;
  itemsBaseDelay: number;
  itemDelays: number[];
};

const ProgList = ({
  date,
  items,
  colStart,
  active,
  dateDelay,
  itemsBaseDelay,
  itemDelays,
}: ProgListProps) => {
  return (
    <ul className={`flex flex-col gap-8 sm:gap-10 md:gap-12 md:col-span-2 px-4 ${colStart ?? ""}`}>
      <motion.h4
        variants={fadeVariants}
        custom={dateDelay}
        initial="hidden"
        animate={active ? "visible" : "hidden"}
        className="text-xl sm:text-2xl font-grindyBrush text-[#002518]"
      >
        {date}
      </motion.h4>

      {items?.map((item, index) => (
        <ProgItem
          key={item._key}
          {...item}
          active={active}
          delay={itemsBaseDelay + (itemDelays[index] ?? 0)}
        />
      ))}
    </ul>
  );
};

export default ProgList;