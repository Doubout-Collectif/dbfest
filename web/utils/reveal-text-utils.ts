import type { RevealMode } from "@/components/revealAnimation/RevealText";

export const splitByMode = (
  text: string,
  mode: RevealMode
): string[] => {
  switch (mode) {
    case "lines":
      return text
        .split("\n")
        .filter((line) => line.length > 0);

    case "words":
      return text.match(/\S+/g) ?? [];

    case "characters":
      return [...text];
  }
};