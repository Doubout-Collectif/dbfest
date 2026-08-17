"use client";

import type { MotionValue } from "motion/react";
import { AccumulatingText } from "./AccumulatingText";
import { SingleText } from "./SingleText";

export type RevealMode = "lines" | "words" | "characters";

type RevealTextProps = {
  texts: string[];
  mode?: RevealMode;
  progress: MotionValue<number>;
  isFirstAlreadyVisible?: boolean;
  showPreviousTexts?: boolean;
};

/**
 * Reveals a list of texts driven by scroll progress.
 * - `showPreviousTexts: true` accumulates texts in the flow, each fading in over its slice of `progress`.
 * - `showPreviousTexts: false` overlays all texts, showing one at a time.
 */
export const RevealText = ({
  texts,
  mode = "lines",
  progress,
  isFirstAlreadyVisible = false,
  showPreviousTexts = true,
}: RevealTextProps) => {
  if (showPreviousTexts) {
    return (
      <div
        role="group"
        aria-label={texts.join(" ")}
        className="mx-auto w-full max-w-[24ch] text-center"
      >
        {texts.map((text, textIndex) => (
          <AccumulatingText
            key={`${textIndex}-${text}`}
            text={text}
            textIndex={textIndex}
            textsCount={texts.length}
            mode={mode}
            progress={progress}
            isStatic={isFirstAlreadyVisible && textIndex === 0}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={texts.join(" ")}
      className="relative mx-auto min-h-[1.5em] w-full max-w-[24ch] text-center"
    >
      {texts.map((text, textIndex) => (
        <SingleText
          key={`${textIndex}-${text}`}
          text={text}
          textIndex={textIndex}
          textsCount={texts.length}
          mode={mode}
          progress={progress}
          isFirstAlreadyVisible={isFirstAlreadyVisible}
        />
      ))}
    </div>
  );
};