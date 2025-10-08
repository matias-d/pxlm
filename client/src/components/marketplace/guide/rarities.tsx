import { getRarityMapper } from "@/helpers/functions/pxl-get-rarity";
import { rarities } from "@/helpers/consts/guide";
import { IconArrow } from "./icon-arrow";
import Card from "@/components/ui/card";
import { Dot } from "lucide-react";
import { cn } from "@/lib/cn";

export default function Rarities() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-accent font-bold font-accent text-2xl lg:text-4xl flex items-center gap-x-2 ">
          <Dot size={56} className="hidden lg:block lg:size-14" />
          Rarities
        </h3>
        <p className="text-sm lg:text-base lg:max-w-2xl text-text-secondary lg:ml-12 font-display">
          Each PXL comes with a rarity level that defines not only its
          exclusivity but also its chances within the market. Below, you’ll find
          the different rarity tiers and the probabilities of obtaining each
          one.
        </p>
      </div>
      <section className="flex flex-col lg:flex-row items-center gap-6 lg:gap-2 justify-center">
        {rarities.map((rarity) => {
          const config = getRarityMapper(rarity.score);

          return (
            <div key={rarity.id} className="flex items-center flex-col gap-y-2">
              <img
                src={rarity.image}
                alt={config.label}
                className="size-48 lg:size-56 rounded-md  shadow"
              />
              <div className="flex flex-col items-center">
                <div
                  className={cn("px-2 py-1 rounded-md border", config.class)}
                >
                  <p className="text-xl font-accent font-bold capitalize">
                    {config.label}
                  </p>
                </div>
                <div className="size-12 mt-6">
                  <IconArrow />
                </div>
                <Card className="flex flex-col items-center p-2">
                  <p className="text-sm font-display mb-1 text-text-secondary">
                    Posibilities
                  </p>
                  <p
                    className={cn(
                      "bg-card-super-light px-2 rounded-md text-sm py-1",
                      config.text
                    )}
                  >
                    {config.probabilities}
                  </p>
                </Card>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}
