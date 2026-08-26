import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Hero as HeroType } from "@/sanity.types";

const Hero = ({ hero }: { hero: HeroType | null }) => {
  if (!hero) return null;

  const { dates, title, subtitle, image } = hero;
  const imageUrl = image?.asset
    ? urlFor(image).width(1000).url()
    : "/Illustrations/illu.png";

  return (
    <section aria-label="Hero" className="flex w-full min-h-screen flex-col items-center justify-center gap-0 px-6 py-24 text-center">
      <Image src={imageUrl} alt={title ?? "Background"} width={1000} height={1000} />
      <div>
        {dates && (
          <p className="text-xl font-thunder font-medium uppercase tracking-widest text-white">{dates}</p>
        )}
        <h1 className="text-9xl text-white uppercase text-center font-grindyBrush">{title}</h1>
        {subtitle && (
          <p className="text-base font-thunder font-light uppercase tracking-widest text-white mt-4">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;