import NavigationTrail from "@/components/ui/navigation-trail";
import Tabs from "@/components/marketplace/create/tabs/tabs";
import { useTitle } from "@/hooks/useTitle";

export default function Create() {
  useTitle("Create - PXLM");
  return (
    <section className="pb-12">
      <NavigationTrail
        className="mb-16"
        items={[
          { href: "/marketplace", label: "Marketplace" },
          { label: "Create" },
        ]}
      />

      <section>
        <Tabs />
      </section>
    </section>
  );
}
