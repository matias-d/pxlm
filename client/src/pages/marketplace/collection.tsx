import Tabs from "../../components/marketplace/collection/tabs";
import AvatarUI from "../../components/ui/avatar-ui";
import { Link } from "react-router";

export default function Collection() {
  return (
    <section>
      <div className="flex items-center gap-x-2 text-sm font-display mb-16">
        <Link
          to="/marketplace"
          className="text-text-secondary hover:text-text-primary transition-all hover:underline"
        >
          Marketplace
        </Link>
        <span className="text-text-secondary">/</span>
        <p className="text-accent">Collection</p>
      </div>

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
