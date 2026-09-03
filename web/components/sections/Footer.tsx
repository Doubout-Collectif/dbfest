"use client";

import { useRef } from "react";
import { usePinOnFullyVisible } from "@/components/revealAnimation/usePinOnFullyVisible";

/** Placeholder footer section for the festival landing page. */
const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  usePinOnFullyVisible(sectionRef);

  return (
    <footer
      ref={sectionRef}
      className="w-full border-t border-zinc-200 px-6 py-12 dark:border-zinc-800"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Placeholder
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Footer — contenu à venir.</p>
      </div>
    </footer>
  );
};

export default Footer;