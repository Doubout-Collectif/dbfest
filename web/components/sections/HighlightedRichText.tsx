"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import { RevealText } from "../revealAnimation/RevealText";
import type { HighlightedRichText as HighlightedRichTextType } from "@/sanity.types";

const HighlightedRichText = ({
  highlightedRichText,
}: {
  highlightedRichText: HighlightedRichTextType | null;
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  if (!highlightedRichText?.texts?.length) return null;

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] w-full"
    >
      <div
        className="
          sticky -top-16
          flex h-screen
          items-center justify-center
          px-4 sm:px-8 md:px-12
          text-center
          text-2xl sm:text-4xl md:text-6xl lg:text-7xl
          leading-tight
          font-thunder
          uppercase
        "
      >
        <RevealText
          texts={highlightedRichText.texts}
          mode="words"
          progress={smoothProgress}
        />
      </div>
    </section>
  );
};

export default HighlightedRichText;