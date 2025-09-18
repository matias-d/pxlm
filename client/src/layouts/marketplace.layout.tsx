import { Outlet } from "react-router";
import Header from "../components/widgets/header";

export default function MarketplaceLayout() {
  return (
    <div className="max-container pt-4 space-y-12">
      <Header />
      <main className="w-full ">
        <Outlet />
      </main>
    </div>
  );
}
