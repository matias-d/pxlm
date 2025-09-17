import NavigationTrail from "../../components/ui/navigation-trail";
import Tabs from "../../components/marketplace/create/tabs";

export default function Create() {
  return (
    <section>
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
