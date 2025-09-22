import type { COLORS_VALUE_HEX } from "@/helpers/consts/pxl-config";

export interface IAttribute {
  trait_type: string;
  color?: keyof typeof COLORS_VALUE_HEX;
  value: string;
  mode?: string;
  display_type?: string;
}
