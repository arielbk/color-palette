export const adjustLuminosity = (color: string, amount: number) => {
  // receives a hex color in the form #rrggbb
  const split = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
  const adjusted = {
    r:
      amount > 0
        ? Math.min(255, split.r + amount)
        : Math.max(0, split.r + amount),
    g:
      amount > 0
        ? Math.min(255, split.g + amount)
        : Math.max(0, split.g + amount),
    b:
      amount > 0
        ? Math.min(255, split.b + amount)
        : Math.max(0, split.b + amount),
  };
  return `#${adjusted.r.toString(16).padStart(2, "0")}${adjusted.g
    .toString(16)
    .padStart(2, "0")}${adjusted.b.toString(16).padStart(2, "0")}`;
};

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
    50: adjustLuminosity(color, 220),
    100: adjustLuminosity(color, 180),
    200: adjustLuminosity(color, 140),
    300: adjustLuminosity(color, 80),
    400: adjustLuminosity(color, 40),
    500: color,
    600: adjustLuminosity(color, -30),
    700: adjustLuminosity(color, -60),
    800: adjustLuminosity(color, -100),
    900: adjustLuminosity(color, -140),
  };
};
