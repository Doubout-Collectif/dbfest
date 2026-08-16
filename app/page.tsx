import Hero from "@/components/sections/Hero";
import Footer from "@/components/sections/Footer";
import Background from "@/components/Background";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Background />
      <Hero />
      <Footer />
    </div>
  );
}
