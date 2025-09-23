import ButtonConnect from "@/components/auth/button-connect";
import useMarketplace from "@/hooks/useMarketplace";
import Footer from "@/components/ui/footer";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Logo from "@/components/ui/logo";

import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Auth() {
  const { account, error, loading, getAccount } = useMarketplace();

  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!loading && account !== null) {
      // Interval para ir bajando el contador
      const interval = setInterval(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Timer para redirigir
      const timer = setTimeout(() => {
        navigate("/marketplace");
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [loading, account, navigate]);

  return (
    <>
      <main className="max-container overflow-hidden flex flex-col items-center justify-center h-screen space-y-4 relative">
        <Logo />

        {!account && !error && (
          <>
            <ButtonConnect onGetAccount={getAccount} loading={loading} />

            {loading && (
              <p className="relative text-text-secondary after:content-[''] after:absolute after:ml-1 after:animate-dots">
                Connecting to your wallet
              </p>
            )}
          </>
        )}

        {!loading && !account && (
          <Card className="h-[4.875rem] w-[24.375rem] flex items-center justify-center">
            <p className="font-display text-text-secondary font-semibold">
              Getting data...
            </p>
          </Card>
        )}

        {!loading && account && (
          <section>
            <Card className="mb-6">
              <h3 className="font-display font-semibold">
                Connected wallet<span className="font-normal">:</span>
              </h3>
              <p className="text-sm text-accent">{account.address}</p>
            </Card>
            <div className="text-text-secondary flex items-center justify-center text-sm gap-x-1">
              <p>Redirecting to PXLM {count}</p>
              <LoaderCircle className="animate-spin" size={16} />
            </div>
          </section>
        )}

        {!loading && error && (
          <section className="flex items-center flex-col">
            <Card className="mb-6">
              <h3 className="font-display font-semibold text-accent-tertiary">
                Error<span className="font-normal">:</span>
              </h3>
              <p className=" text-text-secondary">
                There was an error connecting your wallet.
              </p>
            </Card>
            <Button className="text-sm  h-6 ">Try again</Button>
          </section>
        )}

        <div className="flex flex-col items-center gap-2 absolute bottom-24 px-4 text-center opacity-40">
          <img className="size-8" src="/bnb-logo.svg" alt="BNB Logo" />
          <p className="text-sm text-text-secondary">
            This DApp only works on the BNB Testnet <br /> (BSC Testnet)
          </p>
        </div>

        <div className="absolute -bottom-4 left-0">
          <img src="/pxl-examples/4.svg" className="size-48 opacity-10 " />
        </div>
        <div className="absolute bottom-0 right-0">
          <img src="/pxl-examples/5.svg" className="size-48 opacity-10" />
        </div>
      </main>

      <Footer />
    </>
  );
}
