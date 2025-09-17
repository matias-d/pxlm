import { Link } from "react-router";
import Tabs from "../../components/marketplace/create/tabs";

export default function Create() {
  return (
    <section>
      <div className="flex items-center gap-x-2 text-sm font-display mb-10">
        <Link
          to="/marketplace"
          className="text-text-secondary hover:text-text-primary transition-all hover:underline"
        >
          Marketplace
        </Link>
        <span className="text-text-secondary">/</span>
        <p className="text-accent">Create</p>
      </div>

      <section>
        <Tabs />
      </section>
    </section>
  );
}
