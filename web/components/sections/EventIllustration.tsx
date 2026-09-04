import Image from "next/image";

type EventIllustrationProps = {
    index: number;
  };
  
  const illustrations = [
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
    "/Illustrations/event/bg.webp",
  ];
  
  export default function EventIllustration({
    index,
  }: EventIllustrationProps) {
    const illustration = illustrations[index];
  
    if (!illustration) return null;
  
    return (
      <section
        className="relative w-full h-[10vh] md:h-[30vh] overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #A2D0C0 20%, #A2D0C0 70%, transparent 100%)",
        }}
      >
        <div className="absolute inset-0 flex items-center overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <Image
                key={copy}
                src={illustration}
                alt=""
                width={3750}
                height={750}
                className="opacity-50 shrink-0"
                priority
              />
            ))}
          </div>
        </div>
      </section>
    );
  }