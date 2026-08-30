import type { RevealMode } from "@/components/revealAnimation/RevealText";

export const splitByMode = (
  text: string,
  mode: RevealMode
): string[] => {
  switch (mode) {
    case "lines":
      return text
        .split(/\r?\n/)
        .filter((line) => line.length > 0);

    case "words":
      return text.match(/\s+|[^\s]+/g) ?? [];

    case "characters":
      return [...text];

    default:
      return [text];
  }
};