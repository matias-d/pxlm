import Header from "@/components/widgets/header/header";
import useMarketplace from "@/hooks/useMarketplace";
import { Outlet } from "react-router";
import { useEffect } from "react";

export default function MarketplaceLayout() {
  const { getAccount, account, loading, error } = useMarketplace();

  useEffect(() => {
    if (!loading && !error && !account) getAccount();
  }, [loading, error, account]);

  return (
    <div className="max-container pt-4 space-y-12">
      <Header />
      <main className="w-full ">
        <Outlet />
      </main>
    </div>
  );
}
