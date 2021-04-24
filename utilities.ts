export type Palette = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

export const createPalette = (color: string): Palette => {
  return {
    50: createColorShade(color, 50),
    100: createColorShade(color, 100),
    200: createColorShade(color, 200),
    300: createColorShade(color, 300),
    400: createColorShade(color, 400),
    500: createColorShade(color, 500),
    600: createColorShade(color, 600),
    700: createColorShade(color, 700),
    800: createColorShade(color, 800),
    900: createColorShade(color, 900),
  };
};

const calculateChannelTarget = (origin: number, shade: number) => {
  const isTargetLighter = shade < 500;
  const target = isTargetLighter
    ? origin + ((256 - origin) / 500) * (500 - shade)
    : origin - (origin / 500) * (shade - 500);
  return Math.floor(target);
};

const createColorShade = (color: string, shade: number) => {
  /**
   * white = 0
   * original = 500
   * black = 1000
   */

  // receives a hex color in the form #rrggbb
  const split = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
  const target = {
    r: calculateChannelTarget(split.r, shade),
    g: calculateChannelTarget(split.g, shade),
    b: calculateChannelTarget(split.b, shade),
  };
  return `#${target.r.toString(16).padStart(2, "0")}${target.g
    .toString(16)
    .padStart(2, "0")}${target.b.toString(16).padStart(2, "0")}`;
};
