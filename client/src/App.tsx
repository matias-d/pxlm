import { Route, Routes } from "react-router";

// Layouts
import MarketplaceProvider from "./context/marketplace-provider";
import MarketplaceLayout from "./layouts/marketplace.layout";
import CartProvider from "./context/cart-provider";

// Pages
import Collection from "./pages/marketplace/collection";
import Create from "./pages/marketplace/create";
import Guide from "./pages/marketplace/guide";
import Home from "./pages/marketplace/home";
import NotFound from "./pages/not-found";
import Auth from "./pages/auth";

export default function App() {
  return (
    <>
      <MarketplaceProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<NotFound />} />

            {/* Marketplace */}
            <Route path="/marketplace" element={<MarketplaceLayout />}>
              <Route index element={<Home />} />

              <Route path="create" element={<Create />} />
              <Route path="collection" element={<Collection />} />
              <Route path="guide" element={<Guide />} />
            </Route>
          </Routes>
        </CartProvider>
      </MarketplaceProvider>
    </>
  );
}
