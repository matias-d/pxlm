import { attributes, combos, rarities } from "@/helpers/consts/guide";
import { getRarityMapper } from "@/helpers/functions/pxl-get-rarity";
import NavigationTrail from "@/components/ui/navigation-trail";
import { PREMIUM_COLORS } from "@/helpers/consts/pxl-config";
import { Cuboid, Dot } from "lucide-react";
import Card from "@/components/ui/card";
import { cn } from "@/lib/cn";

export default function Guide() {
  return (
    <section className="pb-16">
      <NavigationTrail
        items={[
          { href: "/marketplace", label: "Marketplace" },
          { label: "Guide" },
        ]}
      />
      <section className="flex flex-col space-y-20">
        {/* Rarity */}
        <section>
          <div className="mb-6">
            <h3 className="text-accent font-bold font-accent text-4xl flex items-center gap-x-2 ">
              <Dot size={56} className="-mr-4" />
              Rarities
            </h3>
            <p className="text-sm max-w-2xl text-text-secondary ml-12">
              Each PXL comes with a rarity level that defines not only its
              exclusivity but also its chances within the market. Below, you’ll
              find the different rarity tiers and the probabilities of obtaining
              each one.
            </p>
          </div>
          <section className="flex items-center gap-x-2 justify-center">
            {rarities.map((rarity) => {
              const config = getRarityMapper(rarity.score);

              return (
                <div
                  key={rarity.id}
                  className="flex items-center flex-col gap-y-2"
                >
                  <img
                    src={rarity.image}
                    alt={config.label}
                    className="size-56 rounded-md  shadow"
                  />
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "px-2 py-1 rounded-md border",
                        config.class
                      )}
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
        {/* Combos */}
        <section>
          <div className="mb-6">
            <h3 className="text-accent font-bold font-accent text-4xl flex items-center gap-x-2 ">
              <Dot size={56} className="-mr-4" />
              Special Combos
            </h3>
            <p className="text-sm max-w-2xl text-text-secondary ml-12">
              Certain attribute combinations unlock special bonuses that
              increase your NFT’s overall value. Below, you’ll find the three
              unique combo types and the advantages they provide.
            </p>
          </div>
          <section className="flex items-center justify-center gap-x-2">
            {combos.map((combo) => (
              <div key={combo.id} className="flex flex-col gap-y-2">
                <img src={combo.image} className="size-56 rounded-md shadow" />
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "px-2 py-1 rounded-md flex items-center gap-x-2"
                    )}
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

        {/* Attributes */}
        <section>
          <div className="mb-6">
            <h3 className="text-accent font-bold font-accent text-4xl flex items-center gap-x-2 ">
              <Dot size={56} className="-mr-4" />
              Attributes
            </h3>
            <p className="text-sm max-w-2xl text-text-secondary ml-12">
              PXLs feature a wide range of attributes such as hats, accessories,
              glasses, and beards, each with its own variations and
              probabilities. Some items, like Gold and Silver, are premium
              traits that add significant extra value to your NFT.
            </p>
          </div>
          <section className="space-y-2">
            <section className="grid grid-cols-4 gap-2">
              {attributes.map((attr) => (
                <Card className="w-full space-y-2">
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
                <Card className=" flex items-center justify-between">
                  <div>
                    <h3
                      className="text-2xl font-semibold uppercase font-display"
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
      </section>
    </section>
  );
}

const IconArrow = () => {
  return (
    <svg
      color="#f4f4ee"
      viewBox="0 0 110 33"
      className="rotate-[100deg]"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <path
        d="M0.734436 32.0433C28.1185 20.8631 58.321 14.4162 87.6991 11.2271C93.6909 10.5767 99.7856 10.1329 105.681 8.82643C106.565 8.6305 107.666 8.45126 108.257 7.71167"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />{" "}
      <path
        d="M105.295 7.55369C103.251 6.41332 98.0697 4.73081 97.3989 2.01718C97.3762 1.92544 97.3095 1.31771 97.3374 1.37859C98.1737 3.20315 97.6004 7.32036 97.4208 9.32238C97.3735 9.84973 96.396 15.3811 96.8612 15.1485C101.235 12.9619 105.361 8.83254 109.442 6.05271"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
