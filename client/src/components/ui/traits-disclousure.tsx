import type { IAttribute } from "@/interfaces/attributes";
import TraitCard from "../marketplace/create/trait-card";
import DisclousureUI from "./disclousure-ui";
import { cn } from "@/lib/cn";
import Card from "./card";

interface Props {
  attributes: IAttribute[];
  classNamePanel?: string;
}

export default function TraitsDisclousure({
  attributes,
  classNamePanel,
}: Props) {
  return (
    <DisclousureUI
      title="TRAITS"
      classNamePanel={cn(
        "absolute w-full -bottom-[10rem] left-0 z-20",
        attributes.length > 2
          ? "md:-bottom-[10rem]"
          : "-bottom-[6.5rem] md:-bottom-[6rem] lg:-bottom-[7rem]",
        classNamePanel
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
          <div className="h-[3.8rem] md:h-[3.4rem]  lg:h-[4.5rem] flex items-center justify-center">
            <p className="text-text-secondary">This PXL has no traits.</p>
          </div>
        </Card>
      )}
    </DisclousureUI>
  );
}
