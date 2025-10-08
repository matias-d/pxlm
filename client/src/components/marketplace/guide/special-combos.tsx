import { combos } from "@/helpers/consts/guide";
import { IconArrow } from "./icon-arrow";
import Card from "@/components/ui/card";
import { Dot } from "lucide-react";
import { cn } from "@/lib/cn";

export default function SpecialCombos() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-accent font-bold font-accent text-2xl lg:text-4xl flex items-center gap-x-2 ">
          <Dot size={56} className="-mr-4 lg:block hidden" />
          Special Combos
        </h3>
        <p className="text-sm lg:text-base lg:max-w-3xl text-text-secondary lg:ml-12 font-display">
          Certain attribute combinations unlock special bonuses that increase
          your NFT’s overall value. Below, you’ll find the three unique combo
          types and the advantages they provide.
        </p>
      </div>
      <section className="flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-2">
        {combos.map((combo) => (
          <div key={combo.id} className="flex flex-col gap-y-2">
            <img
              src={combo.image}
              className="size-48 lg:size-56 rounded-md shadow"
            />
            <div className="flex flex-col items-center">
              <div
                className={cn("px-2 py-1 rounded-md flex items-center gap-x-2")}
              >
                <img src={combo.icon} className="size-6" />
                <p className="text-xl font-accent font-bold capitalize">
                  {combo.combo}
                </p>
              </div>
              {combo.desc && (
                <p className="text-xs text-text-secondary">{combo.desc}</p>
              )}
              <div className="size-12 mt-6">
                <IconArrow />
              </div>
              <Card className="flex flex-col items-center p-2">
                <p className="text-sm font-display mb-1 text-text-secondary">
                  Bonus price
                </p>
                <p
                  className={cn(
                    "bg-card-super-light px-2 rounded-md text-sm py-1 text-emerald-400"
                  )}
                >
                  +{combo.bonus}
                </p>
              </Card>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
