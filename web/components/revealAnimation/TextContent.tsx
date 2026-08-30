import type { RevealMode } from "./RevealText";
import { splitByMode } from "@/utils/reveal-text-utils";

type TextContentProps = {
  text: string;
  mode: RevealMode;
};

/** Renders text split into lines, words, or characters according to `mode`. */
export const TextContent = ({ text, mode }: TextContentProps) => {
  const units = splitByMode(text, mode);

  if (mode === "lines") {
    return (
      <>
        {units.map((line, index) => (
          <span key={`${index}-${line}`} className="block">
            {line}
          </span>
        ))}
      </>
    );
  }

  if (mode === "words") {
    return (
      <>
        {units.map((word, index) => (
          <span key={`${index}-${word}`}>
            {index > 0 ? " " : ""}
            {word}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {units.map((char, index) => (
        <span key={`${index}-${char}`} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
};