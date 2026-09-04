"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRevealInView } from "@/components/revealAnimation/useRevealInView";
import { useShuffledDelays } from "@/components/revealAnimation/useShuffledDelays";
import { fadeVariants } from "@/components/revealAnimation/reveal-variants";

type LineUpListeProps = {
  artists: string[];
  isIllu?: boolean;
  illuSrc?: string;
  color?: string;
};

const LineUpList = ({
  artists,
  isIllu = false,
  illuSrc = "/Illustrations/dbc-chara-1.png",
  color = "text-black",
}: LineUpListeProps) => {
  const { ref, inView } = useRevealInView<HTMLUListElement>({ amount: 1 });
  const delays = useShuffledDelays(artists.length);

  return (
    <ul
      ref={ref}
      className="relative h-fit flex gap-x-3 sm:gap-x-4 gap-y-2 flex-wrap justify-center max-w-[240px] sm:max-w-3xs"
    >
      {isIllu && (
        <Image
          src={illuSrc}
          alt="artist"
          width={272}
          height={397}
          className="-z-10 absolute top-1/2 left-1/2 -translate-1/2 w-32 sm:w-44 md:w-[272px] h-auto opacity-20"
        />
      )}
      {artists.map((artist, index) => (
        <motion.li
          key={`${artist}-${index}`}
          variants={fadeVariants}
          custom={delays[index]}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`font-thunder text-lg sm:text-xl md:text-2xl font-normal uppercase ${color}`}
        >
          {artist}
        </motion.li>
      ))}
    </ul>
  );
};

export default LineUpList;