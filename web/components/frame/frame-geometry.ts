// Pure geometry helpers for the viewport frame's states.

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
    top: margin,
    height: viewportHeight - margin * 2,
    radius: 0,
  };
};

// Generic: reads whatever element the frame is currently pinned to (the
// Hero illustration, the Map, ...) straight off the DOM.
export const getElementRect = (element: Element): FrameRect => {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    radius: 0,
  };
};
