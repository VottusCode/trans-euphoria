import chalk from "chalk";

export const RAINBOW_COLORS = [
  "red",
  "yellow",
  "green",
  "cyan",
  "blue",
  "magenta",
];

export const rainbow = (str: string) =>
  str
    .split("")
    .map((l, i) => chalk[RAINBOW_COLORS[i % RAINBOW_COLORS.length]](l))
    .join("");
