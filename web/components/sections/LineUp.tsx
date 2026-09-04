"use client";

import { useRef } from "react";
import SectTitle from "../SectTitle";
import LineUpList from "@/components/LineUpList";
import { usePinOnFullyVisible } from "@/components/revealAnimation/usePinOnFullyVisible";
import type { LineUp as LineUpType } from "@/sanity.types";

const LineUp = ({ lineUp }: { lineUp: LineUpType | null }) => {
  const sectionRef = useRef<HTMLElement>(null);
  usePinOnFullyVisible(sectionRef);

  if (!lineUp) return null;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col justify-between px-4 sm:px-6 py-12 sm:py-16"
    >
      <SectTitle title={lineUp.title ?? "Line Up"} color="dark" />
      <div className="flex-1 flex flex-col md:flex-row justify-around items-center gap-12 md:gap-6 flex-wrap content-center py-12">
        {lineUp.columns?.map((column) => (
          <LineUpList
            key={column._key}
            artists={column.artists ?? []}
            isIllu={column.showIllustration ?? false}
          />
        ))}
      </div>
    </section>
  );
};

export default LineUp;