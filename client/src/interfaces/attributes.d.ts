import type { COLORS_VALUE_HEX } from "@/helpers/consts/pxl-config";

export interface IAttributes {
  trait_type: "Beard" | "Accessory" | "Hat" | "Glasses";

  value: string;
  color?: keyof typeof COLORS_VALUE_HEX;
  mode?: string;
}
