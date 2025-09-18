import NavigationTrail from "../../components/ui/navigation-trail";
import Tabs from "../../components/marketplace/collection/tabs";
import { shortenAddress } from "../../utils/shorten-address";
import AvatarUI from "../../components/ui/avatar-ui";

export default function Collection() {
  const error = false;
  const loading = false;

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
            loading={loading}
            error={error}
            username="Matias"
            size={72}
            className="ring-2 rounded-full"
          />
          <h3 className="font-accent text-xl font-semibold text-accent">
            {error
              ? "Wallet Error"
              : shortenAddress("0x4e60C4f2b6C987562e8529a103824EE4ab14a94C")}
          </h3>
        </div>

        <section>
          <Tabs />
        </section>
      </section>
    </section>
  );
}
