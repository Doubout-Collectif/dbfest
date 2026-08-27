import Image from "next/image";

type EventIllustrationProps = {
    index: number;
  };
  
  const illustrations = [
    "/logos/dbc-10-ans.svg",
    "/logos/dbc-large-logo.svg",
  ];
  
  export default function EventIllustration({
    index,
  }: EventIllustrationProps) {
    const illustration = illustrations[index];
  
    if (!illustration) return null;
  
    return (
      <section
        className="flex items-center justify-center w-full min-h-[125vh] my-16"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #2D8869 20%, #2D8869 70%, transparent 100%)",
        }}
      >
        <Image src={illustration} alt="" width={300} height={300} />
      </section>
    );
  }