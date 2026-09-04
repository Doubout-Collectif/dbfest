"use client";

import { useRef } from "react";
import Image from "next/image";
import { usePinOnFullyVisible } from "@/components/revealAnimation/usePinOnFullyVisible";
import type { Footer as FooterType } from "@/sanity.types";

const Footer = ({ footer }: { footer: FooterType | null }) => {
  const sectionRef = useRef<HTMLElement>(null);
  usePinOnFullyVisible(sectionRef);

  const socialLinks = footer?.socialLinks ?? [];

  return (
    <footer
      ref={sectionRef}
      className="flex h-[60vh] max-h-[60vh] w-full flex-col items-center justify-between mt-8 px-4 sm:px-6 pt-12 sm:pt-16 pb-4 md:pb-8"
    >
      <div className="flex flex-1 items-center justify-center">
        <Image
          src="/logos/dbc-10-ans.svg"
          alt="DBC Fest — 10 ans"
          width={418}
          height={410}
          className="h-auto w-40 sm:w-56 md:w-64"
        />
      </div>

      {socialLinks.length > 0 && (
        <ul className="flex flex-wrap w-full items-center justify-end px-4 gap-x-6 gap-y-2 text-sm sm:text-base font-thunder uppercase tracking-widest text-[#002518]">
          {socialLinks.map((link) => (
            <li key={link._key}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
};

export default Footer;
