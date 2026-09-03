import Image from "next/image";

type EventIllustrationProps = {
    index: number;
  };
  
  const illustrations = [
    "/Illustrations/event/dbc-event-illu-6.png",
    "/Illustrations/event/dbc-event-illu-6.png",
  ];
  
  export default function EventIllustration({
    index,
  }: EventIllustrationProps) {
    const illustration = illustrations[index];
  
    if (!illustration) return null;
  
    return (
      <section
        className="flex items-center justify-center w-full min-h-screen my-16 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #A2D0C0 20%, #A2D0C0 70%, transparent 100%)",
        }}
      >
        <Image src={illustration} alt="" width={900} height={500} className="scale-250 opacity-80" />
      </section>
    );
  }