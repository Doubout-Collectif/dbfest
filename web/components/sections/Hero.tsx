import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Hero as HeroType } from "@/sanity.types";
import { HeroLogo } from "@/components/Hero-logo";

const Hero = ({ hero }: { hero: HeroType | null }) => {
  if (!hero) return null;

  const { dates, title, subtitle, image } = hero;
  const imageUrl = image?.asset
    ? urlFor(image).width(1000).url()
    : "/Illustrations/illu.png";

  return (
    <section
      aria-label="Hero"
      className="flex w-full min-h-dvh flex-col items-center justify-center md:justify-end gap-6 sm:gap-8 px-4 sm:px-6 py-16 sm:py-24 text-center"
    >
      <Image
        src={imageUrl}
        alt={title ?? "Background"}
        width={1000}
        height={1000}
        className="md:-z-10 md:absolute w-full h-auto scale-95"
        priority
      />
      <div className="flex flex-col gap-2 sm:gap-3">
        <HeroLogo />
        {dates && (
          <p className="text-sm sm:text-base md:text-xl font-thunder font-medium uppercase tracking-widest text-white">
            {dates}
          </p>
        )}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white uppercase text-center font-grindyBrush leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm md:text-base font-thunder font-light uppercase tracking-widest text-white mt-2 sm:mt-4">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;