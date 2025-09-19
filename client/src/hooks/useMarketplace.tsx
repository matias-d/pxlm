import { MarketplaceContext } from "../context/marketplace-provider";
import { useContext } from "react";

export default function useMarketplace() {
  const context = useContext(MarketplaceContext);

  if (!context)
    throw new Error(
      "PROVIDER ERROR: useMarketplace must be used within a MarketplaceContext"
    );

  return useContext(MarketplaceContext);
}
