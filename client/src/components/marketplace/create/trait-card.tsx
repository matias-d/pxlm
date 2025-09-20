import { COLORS_VALUE_HEX } from "@/helpers/consts/pxl-config";
import type { IAttributes } from "@/interfaces/attributes";
import { cn } from "../../../lib/cn";
import Card from "../../ui/card";

interface Props {
  trait: IAttributes;

  className?: string;
  classNameValue?: string;
}

export default function TraitCard({ className, classNameValue, trait }: Props) {
  return (
    <Card className={cn("bg-card-dark relative  ", className)}>
      <p className="text-xs uppercase text-text-secondary font-display font-semibold">
        {trait.trait_type}
      </p>

      <div className="flex items-center justify-between">
        <p className={cn("text-sm", classNameValue)}>{trait.value}</p>

        <p
          className="p-1 rounded-sm text-[10px] font-semibold font-display"
          style={{
            backgroundColor: trait.color
              ? COLORS_VALUE_HEX[trait.color] + "30"
              : "transparent",
            color: trait.color ? COLORS_VALUE_HEX[trait.color] : "inherit",
          }}
        >
          {trait.color || "-"}
        </p>
      </div>
    </Card>
  );
}
