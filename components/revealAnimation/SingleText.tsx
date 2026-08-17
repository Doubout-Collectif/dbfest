import { motion, useTransform, type MotionValue } from "motion/react";
import type { RevealMode } from "./RevealText";
import { TextContent } from "./TextContent";

type SingleTextProps = {
  text: string;
  textIndex: number;
  textsCount: number;
  mode: RevealMode;
  progress: MotionValue<number>;
  isFirstAlreadyVisible: boolean;
};

/**
 * Renders a text that occupies its own slice of the scroll progress
 * ([textIndex / textsCount, (textIndex + 1) / textsCount]), overlaid
 * on top of the other texts and fading in/out at each end of its slice.
 */
export const SingleText = ({
  text,
  textIndex,
  textsCount,
  mode,
  progress,
  isFirstAlreadyVisible,
}: SingleTextProps) => {
  const start = textIndex / textsCount;
  const end = (textIndex + 1) / textsCount;
  const transition = 0.08 / textsCount;

  const isInitiallyVisible = textIndex === 0 && isFirstAlreadyVisible;

  const fadeInStart = isInitiallyVisible ? 0 : start;
  const fadeInEnd = isInitiallyVisible ? transition : start + transition;
  const fadeOutStart = end - transition;
  const fadeOutEnd = end;

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [isInitiallyVisible ? 1 : 0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-x-0 top-0 -translate-x-1/2 flex w-[24ch] justify-center text-center"
      style={{ opacity }}
    >
      <span className="inline-block">
        <TextContent text={text} mode={mode} />
      </span>
    </motion.div>
  );
};