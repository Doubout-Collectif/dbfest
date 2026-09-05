"use client";

import Image from "next/image";
import { motion } from "motion/react";
import SectTitle from "@/components/SectTitle";
import Prog from "@/components/prog/Prog";
import type { Event as EventType } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { useRevealInView } from "@/components/revealAnimation/useRevealInView";
import { usePinOnFullyVisible } from "@/components/revealAnimation/usePinOnFullyVisible";
import { useShuffledDelays } from "@/components/revealAnimation/useShuffledDelays";
import { fadeVariants } from "@/components/revealAnimation/reveal-variants";
import { RevealParagraph } from "@/components/revealAnimation/RevealParagraph";
import { estimateProgDuration, hasScheduleItems } from "@/components/prog/prog-timing";

const PROG_START_DELAY = 0.3;
const WORD_STEP = 0.05;
const SPEAKERS_START_DELAY = 0.15;
const SEQUENCE_GAP = 0.35;

const Event = ({ event }: { event: EventType }) => {
  if (!hasScheduleItems(event.schedule)) {
    return null;
  }

  const illustrationUrl =
    event.hasIllustration && event.illustration?.asset
      ? urlFor(event.illustration).width(800).url()
      : undefined;

  const { ref: sectionRef, inView } = useRevealInView<HTMLElement>({
    amount: 0.15,
  });
  usePinOnFullyVisible(sectionRef);

  const speakerNames = (event.speakers ?? "")
    .split(/\s*,\s*|\s+-\s+/)
    .map((name) => name.trim())
    .filter(Boolean);
  const speakerDelays = useShuffledDelays(speakerNames.length);

  const progFinishAt = PROG_START_DELAY + estimateProgDuration(event.schedule);
  const descriptionStartDelay = progFinishAt - SEQUENCE_GAP;
  const speakersStartDelay = descriptionStartDelay + SPEAKERS_START_DELAY;

  return (
    <section
      ref={sectionRef}
      aria-label="Event"
      className="relative flex flex-col justify-between w-full min-h-screen p-4 sm:p-6 md:p-8 overflow-hidden"
    >
      {illustrationUrl && (
        <Image
          src={illustrationUrl}
          alt=""
          width={500}
          height={700}
          className="-z-10 absolute top-1/2 left-1/2 -translate-1/2 md:left-auto md:right-0 md:translate-x-0 w-48 sm:w-56 md:w-72 lg:w-xl h-auto opacity-20"
        />
      )}
      <SectTitle title={event.title ?? "Conférence"} color="dark"/>
      <Prog schedule={event.schedule} active={inView} startDelay={PROG_START_DELAY} />
      <div className="grid grid-cols-1 md:grid-cols-8 gap-8 md:gap-0 items-start md:items-end mt-8 md:mt-0">
        {event.description && (
          <div className="md:col-start-1 md:col-span-2 flex flex-col gap-2 h-fit px-4">
            <h4 className="text-sm sm:text-base text-[#002518]/60 font-thunder font-medium tracking-[0.04em] uppercase">
              [ Description ]
            </h4>
            <RevealParagraph
              text={event.description}
              active={inView}
              startDelay={descriptionStartDelay}
              wordStep={WORD_STEP}
              className="text-base sm:text-lg font-thunder font-light leading-5 tracking-[0.04em] text-[#002518]"
            />
          </div>
        )}
        {speakerNames.length > 0 && (
          <div className="md:col-start-4 md:col-span-2 flex flex-col gap-2 h-fit px-4">
            <h4 className="text-sm sm:text-base text-[#002518]/60 font-thunder font-medium tracking-[0.04em] uppercase">
              [ Intervenants ]
            </h4>
            <ul className="flex flex-wrap gap-x-3 gap-y-1 text-base sm:text-lg font-thunder font-light leading-5 tracking-[0.04em] text-[#002518]">
              {speakerNames.map((name, index) => (
                <motion.li
                  key={`${name}-${index}`}
                  variants={fadeVariants}
                  custom={speakersStartDelay + speakerDelays[index]}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  {name}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Event;