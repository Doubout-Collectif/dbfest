"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "motion/react";

import { splitByMode } from "@/utils/reveal-text-utils";

export type RevealMode = "lines" | "words" | "characters";

type RevealTextProps = {
  texts: string[];
  mode?: RevealMode;
  progress: MotionValue<number>;
  isFirstAlreadyVisible?: boolean;
};

export const RevealText = ({
  texts,
  mode = "words",
  progress,
  isFirstAlreadyVisible = false,
}: RevealTextProps) => {
  if (!texts.length) return null;

  const textCount = texts.length;

  return (
    <div
      role="group"
      aria-label={texts.join(" ")}
      className="relative mx-auto w-full max-w-[24ch] text-center"
    >
      {texts.map((text, textIndex) => {
        const units = splitByMode(text, mode);
        const textStart = textIndex / textCount;
        const textEnd = (textIndex + 1) / textCount;

        const fadeOutDuration =
          (textEnd - textStart) * 0.15;

        const revealEnd =
          textEnd - fadeOutDuration;

        const textOpacity = useTransform(
          progress,
          [
            textStart,
            revealEnd,
            textEnd,
          ],
          [
            textIndex === 0 && isFirstAlreadyVisible ? 1 : 0,
            1,
            textIndex === textCount - 1 ? 1 : 0,
          ]
        );

        return (
          <motion.div
            key={`${textIndex}-${text}`}
            className="absolute inset-x-0 top-0"
            style={{
              opacity: textOpacity,
            }}
          >
            {units.map((unit, unitIndex) => {
              if (/^\s+$/.test(unit)) {
                return (
                  <span key={`${unitIndex}-space`}>
                    {unit}
                  </span>
                );
              }

              const revealDuration =
                (revealEnd - textStart) / units.length;

              const start =
                textStart +
                unitIndex * revealDuration;

              const end =
                start + revealDuration;


              const fadeInEnd =
                start + revealDuration * 0.7;

              const opacity = useTransform(
                progress,
                [start, fadeInEnd],
                [
                  textIndex === 0 &&
                  unitIndex === 0 &&
                  isFirstAlreadyVisible
                    ? 1
                    : 0,
                  1,
                ]
              );

              const y = useTransform(
                progress,
                [start, fadeInEnd],
                [8, 0]
              );

              return (
                <motion.span
                  key={`${unitIndex}-${unit}`}
                  className="inline-block"
                  style={{
                    opacity,
                    y,
                  }}
                >
                  {unit}
                </motion.span>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};