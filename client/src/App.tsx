import { Route, Routes } from "react-router";

// Layouts
import MarketplaceProvider from "./context/marketplace-provider";
import MarketplaceLayout from "./layouts/marketplace.layout";

// Pages
import Collection from "./pages/marketplace/collection";
import Create from "./pages/marketplace/create";
import Home from "./pages/marketplace/home";
import Auth from "./pages/auth";

export default function App() {
  return (
    <>
      <MarketplaceProvider>
        <Routes>
          <Route path="/" element={<Auth />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<MarketplaceLayout />}>
            <Route index element={<Home />} />

            <Route path="create" element={<Create />} />
            <Route path="collection" element={<Collection />} />
          </Route>
        </Routes>
      </MarketplaceProvider>
    </>
  );
}
