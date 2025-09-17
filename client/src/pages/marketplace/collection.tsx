import NavigationTrail from "../../components/ui/navigation-trail";
import Tabs from "../../components/marketplace/collection/tabs";
import AvatarUI from "../../components/ui/avatar-ui";

export default function Collection() {
  return (
    <section>
      <NavigationTrail
        items={[
          { href: "/marketplace", label: "Marketplace" },
          { label: "Collection" },
        ]}
      />
      <section className="flex flex-col">
        <div className="flex flex-col gap-y-2 items-center mb-10">
          <AvatarUI
            username="Matias"
            size={72}
            className="ring-2 rounded-full"
          />
          <h3 className="font-accent text-xl font-semibold text-accent">
            @Matias
          </h3>
        </div>

        <section>
          <Tabs />
        </section>
      </section>
    </section>
  );
}
