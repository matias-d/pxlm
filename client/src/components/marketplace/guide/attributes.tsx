import { PREMIUM_COLORS } from "@/helpers/consts/pxl-config";
import { attributes } from "@/helpers/consts/guide";
import { Cuboid, Dot } from "lucide-react";
import Card from "@/components/ui/card";

export default function Attributes() {
  return (
    <section>
      <div className="mb-6">
        <h3 className="text-accent font-bold font-accent text-2xl lg:text-4xl flex items-center gap-x-2 ">
          <Dot size={56} className="-mr-4 hidden lg:block" />
          Attributes
        </h3>
        <p className="text-sm lg:text-base max-w-2xl text-text-secondary font-display lg:ml-12">
          PXLs feature a wide range of attributes such as hats, accessories,
          glasses, and beards, each with its own variations and probabilities.
          Some items, like Gold and Silver, are premium traits that add
          significant extra value to your NFT.
        </p>
      </div>
      <section className="space-y-2">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {attributes.map((attr) => (
            <Card className="w-full space-y-2" key={attr.type}>
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-accent font-accent">
                  {attr.type}
                </h4>
                <p className="bg-card-super-light px-2 text-sm font-display rounded-md font-medium text-accent-firthy">
                  {attr.probability}
                </p>
              </div>

              <div className="flex flex-col gap-y-2">
                {attr.variants.map((variant) => (
                  <Card className="bg-card-super-light p-3 group">
                    <p className="text-text-secondary group-hover:text-text-primary transition-colors">
                      {variant}
                    </p>
                  </Card>
                ))}
              </div>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-2 w-full gap-2">
          {Object.entries(PREMIUM_COLORS).map(([color, item]) => (
            <Card
              className=" flex items-center justify-between"
              key={item.name}
            >
              <div>
                <h3
                  className="text-lg lg:text-2xl font-semibold uppercase font-display"
                  style={{ color: `#${color}` }}
                >
                  {item.name} item
                </h3>
                <p className="text-lg font-display font-bold text-emerald-300">
                  +{item.bonus}
                </p>
              </div>
              <Card className="bg-card-super-light p-2">
                <div className="p-2 bg-card-dark rounded-md border border-border">
                  <Cuboid size={20} color={`#${color}`} />
                </div>
              </Card>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
