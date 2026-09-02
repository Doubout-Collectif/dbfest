// Pure geometry helpers for the viewport frame's three states.

export type FrameRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  radius: number;
};

// Shared by the bar and full-viewport frame so a bar -> full morph only
// needs to animate the top edge (left/width/bottom stay pinned).
export const getFrameMargin = (viewportWidth: number) =>
  viewportWidth < 640 ? 16 : viewportWidth < 1024 ? 24 : 32;

export const getBarHeight = (viewportWidth: number) =>
  24

export const getFullRadius = (viewportWidth: number) =>
  viewportWidth < 640 ? 16 : 24;

export const getBarRect = (
  viewportWidth: number,
  viewportHeight: number
): FrameRect => {
  const margin = getFrameMargin(viewportWidth);
  const barHeight = getBarHeight(viewportWidth);
  return {
    left: margin,
    width: viewportWidth - margin * 2,
    top: viewportHeight - margin - barHeight,
    height: barHeight,
    radius: 0,
  };
};

export const getFullRect = (
  viewportWidth: number,
  viewportHeight: number
): FrameRect => {
  const margin = getFrameMargin(viewportWidth);
  return {
    left: margin,
    width: viewportWidth - margin * 2,
    top: margin * 2.5,
    height: viewportHeight - margin * 4.5,
    radius: 0,
  };
};

export const getHeroRect = (illustration: Element): FrameRect => {
  const rect = illustration.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    radius: 0,
  };
};
