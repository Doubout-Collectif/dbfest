import Image from "next/image";

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-linear-to-b from-[#139367] to-[#AECCC2]">
      <Image src="/Background/bg-texture.png" alt="Background" fill className="object-cover opacity-20 mix-blend-darken/10" />
    </div>
  );
};

export default Background;