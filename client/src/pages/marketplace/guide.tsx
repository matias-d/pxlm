import SpecialCombos from "@/components/marketplace/guide/special-combos";
import Attributes from "@/components/marketplace/guide/attributes";
import Rarities from "@/components/marketplace/guide/rarities";
import NavigationTrail from "@/components/ui/navigation-trail";
import { useTitle } from "@/hooks/useTitle";

export default function Guide() {
  useTitle("Guide - PXLM");
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
        <Rarities />
        {/* Combos */}
        <SpecialCombos />

        {/* Attributes */}
        <Attributes />
      </section>
    </section>
  );
}
