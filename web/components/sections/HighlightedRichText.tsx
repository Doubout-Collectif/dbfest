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
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-8 md:px-12 text-2xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight font-thunder uppercase text-center">
        <RevealText
          texts={highlightedRichText.texts}
          mode="lines"
          progress={smoothProgress}
          isFirstAlreadyVisible
          showPreviousTexts={false}
        />
      </div>
    </section>
  );
};

export default HighlightedRichText;