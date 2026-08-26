import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import Background from "@/components/Background";
import HighlightedRichText from "@/components/sections/HighlightedRichText";
import LineUp from "@/components/sections/LineUp";
import Event from "@/components/sections/Event";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Background />
      <Hero />
      <HighlightedRichText />
      <LineUp />
      <Event />
      <Event />
      <Event />
      <Footer />
    </div>
  );
}
