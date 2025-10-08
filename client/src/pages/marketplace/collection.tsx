import NavigationTrail from "@/components/ui/navigation-trail";
import Tabs from "@/components/marketplace/collection/tabs";
import { shortenAddress } from "@/utils/shorten-address";
import LoadingTop from "@/components/ui/loading-top";
import useMarketplace from "@/hooks/useMarketplace";
import AvatarUI from "@/components/ui/avatar-ui";
import { useTitle } from "@/hooks/useTitle";

export default function Collection() {
  useTitle("Collection - PXLM");

  const { account, error, loading } = useMarketplace();

  return (
    <section className="pb-16">
      <LoadingTop loading={loading} />

      <NavigationTrail
        items={[
          { href: "/marketplace", label: "Marketplace" },
          { label: "Collection" },
        ]}
      />
      <section className="flex flex-col">
        <div className="flex flex-col gap-y-2 items-center mb-10">
          <AvatarUI
            className="ring-2 rounded-full"
            username={account?.address}
            size={72}
          />
          <h3 className="font-accent text-xl font-semibold text-accent">
            {error
              ? "Wallet Error"
              : account?.address && shortenAddress(account?.address)}
          </h3>
        </div>

        <Tabs />
      </section>
    </section>
  );
}
