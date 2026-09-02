"use client";

import { motion } from "motion/react";
import { splitByMode } from "@/utils/reveal-text-utils";
import { staircaseWordVariants } from "./reveal-variants";

type RevealParagraphProps = {
  text?: string;
  active: boolean;
  startDelay?: number;
  wordStep?: number;
  className?: string;
};

const isWhitespace = (unit: string) => /^\s+$/.test(unit);

export const RevealParagraph = ({
  text,
  active,
  startDelay = 0,
  wordStep = 0.035,
  className,
}: RevealParagraphProps) => {
  if (!text) return null;

  const lines = splitByMode(text, "lines");
  const lineUnits = lines.map((line) => splitByMode(line, "words"));
  const lineWordCounts = lineUnits.map(
    (units) => units.filter((unit) => !isWhitespace(unit)).length
  );
  const lineWordOffsets = lineWordCounts.map((_, i) =>
    lineWordCounts.slice(0, i).reduce((sum, n) => sum + n, 0)
  );

  return (
    <p className={className}>
      {lineUnits.map((units, lineIndex) => {
        const lineOffset = lineWordOffsets[lineIndex];

        return (
          <span key={`${lineIndex}-${lines[lineIndex]}`} className="block">
            {units.map((unit, unitIndex) => {
              if (isWhitespace(unit)) {
                return <span key={`${lineIndex}-${unitIndex}-space`}>{unit}</span>;
              }

              const wordIndexInLine = units
                .slice(0, unitIndex)
                .filter((u) => !isWhitespace(u)).length;
              const delay =
                startDelay + (lineOffset + wordIndexInLine) * wordStep;

              return (
                <motion.span
                  key={`${lineIndex}-${unitIndex}-${unit}`}
                  className="inline-block"
                  variants={staircaseWordVariants}
                  custom={delay}
                  initial="hidden"
                  animate={active ? "visible" : "hidden"}
                >
                  {unit}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default RevealParagraph;
