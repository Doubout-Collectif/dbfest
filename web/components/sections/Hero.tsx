"use client"

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { urlFor } from "@/sanity/lib/image";
import type { Hero as HeroType } from "@/sanity.types";
import dynamic from "next/dynamic";
import { useFrame } from "@/components/frame/Frame-context";
import { usePinOnFullyVisible } from "@/components/revealAnimation/usePinOnFullyVisible";
import { REVEAL_EASE } from "@/components/revealAnimation/reveal-variants";
import { CONTENT_DELAYS, HERO_REVEAL_DURATION_S } from "@/components/frame/frame-timing";

const HeroLogo = dynamic(() => import("../Hero-logo"), {
  ssr: false,
});

// Wrapped (not a wrapper div around it) so the fade-in animates the image
// itself — an extra div here would break `w-full`'s sizing, since it
// currently resolves correctly only because <Image> is a direct flex child.
const MotionImage = motion.create(Image);

// Hero-local variants (not the shared ones from reveal-variants.ts, which
// are tuned for small scroll-triggered reveals elsewhere — Event/Map/LineUp)
// so the Hero's large-scale first-impression fade-in can run slower without
// affecting every other section. A component-level `transition` prop can't
// do this: when a variant's own transition is fully specified (as the
// shared ones are), it wins outright, a prop only fills in gaps. Same
// REVEAL_EASE curve either way, just a longer duration.
const heroFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: HERO_REVEAL_DURATION_S, ease: REVEAL_EASE, delay },
  }),
};

const heroFadeSlideUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: HERO_REVEAL_DURATION_S, ease: REVEAL_EASE, delay },
  }),
};

const Hero = ({ hero }: { hero: HeroType | null }) => {
  const { heroSectionRef, heroIllustrationRef, contentRevealed } = useFrame();
  usePinOnFullyVisible(heroSectionRef);

  if (!hero) return null;

  const { dates, title, subtitle, image } = hero;
  const imageUrl = image?.asset
    ? urlFor(image).width(1000).url()
    : "/Illustrations/illu.png";
  const revealState = contentRevealed ? "visible" : "hidden";

  return (
    <section
      ref={heroSectionRef as React.RefObject<HTMLElement>}
      aria-label="Hero"
      className="flex w-full min-h-dvh flex-col items-center justify-center md:justify-end gap-6 sm:gap-8 px-4 sm:px-6 py-16 sm:py-24 text-center"
    >
      <MotionImage
        ref={heroIllustrationRef}
        src={imageUrl}
        alt={title ?? "Background"}
        width={1000}
        height={1000}
        className="md:-z-10 md:absolute w-full h-auto scale-95 md:-translate-y-10"
        priority
        variants={heroFadeVariants}
        custom={CONTENT_DELAYS.illustration}
        initial="hidden"
        animate={revealState}
      />
      <div className="relative z-50 flex flex-col gap-2 sm:gap-3 md:translate-y-10">
        <motion.div
          variants={heroFadeSlideUpVariants}
          custom={CONTENT_DELAYS.logo}
          initial="hidden"
          animate={revealState}
        >
          <HeroLogo />
        </motion.div>
        {dates && (
          <motion.p
            variants={heroFadeSlideUpVariants}
            custom={CONTENT_DELAYS.dates}
            initial="hidden"
            animate={revealState}
            className="text-sm sm:text-base md:text-xl font-thunder font-medium uppercase tracking-widest text-white"
          >
            {dates}
          </motion.p>
        )}
        <motion.h1
          variants={heroFadeSlideUpVariants}
          custom={CONTENT_DELAYS.title}
          initial="hidden"
          animate={revealState}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white uppercase text-center font-grindyBrush leading-none"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={heroFadeSlideUpVariants}
            custom={CONTENT_DELAYS.subtitle}
            initial="hidden"
            animate={revealState}
            className="text-xs sm:text-sm md:text-base font-thunder font-light uppercase tracking-widest text-white mt-2 sm:mt-4"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Hero;