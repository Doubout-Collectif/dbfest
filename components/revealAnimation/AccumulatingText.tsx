import { motion, useTransform, type MotionValue } from "motion/react";
import type { RevealMode } from "./RevealText";
import { TextContent } from "./TextContent";

type AccumulatingTextProps = {
  text: string;
  textIndex: number;
  textsCount: number;
  mode: RevealMode;
  progress: MotionValue<number>;
  isStatic: boolean;
};

/** Fades in a text at its position in the accumulating (non-overlapping) reveal flow. */
export const AccumulatingText = ({
  text,
  textIndex,
  textsCount,
  mode,
  progress,
  isStatic,
}: AccumulatingTextProps) => {
  if (isStatic) {
    return (
      <div className="block">
        <TextContent text={text} mode={mode} />
      </div>
    );
  }

  const start = textIndex / textsCount;
  const end = (textIndex + 1) / textsCount;

  return (
    <motion.div
      className="block"
      style={{ opacity: useTransform(progress, [start, end], [0, 1]) }}
    >
      <TextContent text={text} mode={mode} />
    </motion.div>
  );
};