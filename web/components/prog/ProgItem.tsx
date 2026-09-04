"use client";

import { motion } from "motion/react";
import { fadeSlideUpVariants } from "@/components/revealAnimation/reveal-variants";

type ProgItemProps = {
  title?: string;
  time?: string;
  location?: string;
  address?: string;
  active: boolean;
  delay: number;
};

const ProgItem = ({
  title,
  time,
  location,
  address,
  active,
  delay,
}: ProgItemProps) => {
  return (
    <motion.li
      variants={fadeSlideUpVariants}
      custom={delay}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      className="flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-3xs text-[#002518]"
    >
      <div className="flex justify-between flex-wrap gap-2">
        <strong className="text-sm sm:text-xl font-medium font-thunder uppercase text-figma tracking-[0.04em]">
          {title}
        </strong>
        <p className="text-sm sm:text-xl font-medium font-thunder uppercase text-figma tracking-[0.04em]">
          {time}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm sm:text-base font-medium font-thunder uppercase text-figma tracking-[0.04em]">
          {location}
        </p>
        <p className="text-sm sm:text-base font-thunder text-figma tracking-[0.04em]">{address}</p>
      </div>
    </motion.li>
  );
};

export default ProgItem;