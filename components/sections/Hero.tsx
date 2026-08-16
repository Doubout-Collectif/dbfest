import Image from "next/image";

const Hero = () => {
  return (
    <section aria-label="Hero" className="flex w-full min-h-screen flex-col items-center justify-center gap-0 px-6 py-24 text-center">
        <Image src="/Illustrations/illu.png" alt="Background" width={1000} height={1000} />
        <div>
            <p className="text-xl font-thunder font-medium uppercase tracking-widest text-white">21 - 22 - 23 Oct</p>
            <h1 className="text-9xl text-white uppercase text-center font-grindyBrush">DbFest</h1>
            <p className="text-base font-thunder font-light uppercase tracking-widest text-white mt-4">10 ans de Doubout Collectif</p>
        </div>
    </section>
  );
};

export default Hero;