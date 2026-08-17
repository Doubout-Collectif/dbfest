"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
} from "motion/react";

import { RevealText } from "../revealAnimation/RevealText";

const HighlightedRichText = () => {
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

  return (
    <section
      ref={sectionRef}
      className="relative h-[200vh]"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center text-7xl font-thunder uppercase">
        <RevealText
          texts={[
            "Doubout collectif fête ses 10 ans, avec des artistes des ateliers",
            "pour continuer de célébrer l’art et la musique de qualité",
          ]}
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