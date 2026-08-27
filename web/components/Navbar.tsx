"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useLogoDock } from "./Logo-dock-context";

const TARGET_DATE = "2026-09-28T00:00:00-03:00";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Navbar() {
  const { isDocked } = useLogoDock();

  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [hasReachedDate, setHasReachedDate] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const target = new Date(TARGET_DATE).getTime();

    const update = () => {
      const now = Date.now();
      const difference = target - now;

      if (difference <= 0) {
        setHasReachedDate(true);

        const time = new Intl.DateTimeFormat("fr-FR", {
          timeZone: "America/Cayenne",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());

        setCurrentTime(time);
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      setCountdown({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
      });
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-18 flex items-top justify-between pt-8 px-8">
      <div className="flex flex-col uppercase font-thunder tracking-wide tabular-nums text-[#002518] leading-none">
        <span className="text-xs sm:text-base tracking-wider text-figma">
          {hasReachedDate && currentTime
            ? currentTime
            : countdown
              ? `J-${String(countdown.days).padStart(2, "0")} H-${String(
                  countdown.hours
                ).padStart(2, "0")} Min-${String(countdown.minutes).padStart(
                  2,
                  "0"
                )}`
              : "J-- H-- Min--"}
        </span>

        <span className="text-xs tracking-widest mt-2 font-thunder uppercase text-[#002518] text-figma">
          [UTC-3]
        </span>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2flex items-center justify-center">
        {isDocked && (
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
              width={32}
              height={32}
            />
          </motion.div>
        )}
      </div>

      <a href="https://doubout-collectif.pepsup.com/" target="_blank" className="font-thunder font-medium text-base text-[#002518] tracking-[0.04em] uppercase text-figma">Doubout Collectif</a>
    </header>
  );
}