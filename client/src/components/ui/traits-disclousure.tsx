import type { IAttribute } from "@/interfaces/attributes";
import TraitCard from "../marketplace/create/trait-card";
import DisclousureUI from "./disclousure-ui";
import { cn } from "@/lib/cn";
import Card from "./card";

interface Props {
  attributes: IAttribute[];
}

export default function TraitsDisclousure({ attributes }: Props) {
  return (
    <DisclousureUI
      title="TRAITS"
      classNamePanel={cn(
        "absolute w-full -bottom-[10rem] left-0 z-20",
        attributes.length > 2 ? "-bottom-[10rem]" : "-bottom-[6rem]"
      )}
    >
      {attributes.length > 0 ? (
        <Card>
          <div className="grid grid-cols-2 gap-2 ">
            {attributes.map((trait) => (
              <TraitCard
                trait={trait}
                key={trait.trait_type}
                className="p-2 w-auto"
              />
            ))}
          </div>
        </Card>
      ) : (
        <Card className="">
          <div className="h-[3.563rem] flex items-center justify-center">
            <p className="text-text-secondary">This PXL has no traits.</p>
          </div>
        </Card>
      )}
    </DisclousureUI>
  );
}
