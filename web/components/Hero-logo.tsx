"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLogoDock } from "./Logo-dock-context";

const NAVBAR_HEIGHT = 72;

export default function HeroLogo() {
  const ref = useRef<HTMLDivElement>(null);
  const { isDocked, setIsDocked } = useLogoDock();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDocked(!entry.isIntersecting);
      },
      {
        rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [setIsDocked]);

  return (
    <div
      ref={ref}
      className="h-13.5 flex items-center justify-center"
    >
      {!isDocked && (
        <motion.div
          layoutId="dbc-logo"
          transition={{
            layout: {
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 0.8,
            },
          }}
        >
          <Image
            src="/logos/dbc-mini-logo.svg"
            alt="DBC mini logo"
            width={54}
            height={54}
          />
        </motion.div>
      )}
    </div>
  );
}