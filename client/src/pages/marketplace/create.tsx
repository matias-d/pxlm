import NavigationTrail from "@/components/ui/navigation-trail";
import Tabs from "@/components/marketplace/create/tabs/tabs";

export default function Create() {
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
