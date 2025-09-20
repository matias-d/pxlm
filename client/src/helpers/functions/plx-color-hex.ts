import { COLORS_VALUE } from "../consts/pxl-config";

export function getColorHex(
  colorName?: keyof typeof COLORS_VALUE
): string | null {
  return colorName ? COLORS_VALUE[colorName] ?? null : null;
}
