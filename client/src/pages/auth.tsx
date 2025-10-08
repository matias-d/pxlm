import ButtonConnect from "@/components/auth/button-connect";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import Footer from "@/components/widgets/footer";
import Logo from "@/components/widgets/logo";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Auth() {
  const { account, error, loading, getAccount } = useMarketplace();

  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && account !== null) {
      const interval = setInterval(() => {
        setCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

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
      <main className="max-container overflow-hidden flex flex-col items-center justify-center h-screen space-y-4 relative ">
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

        {loading && account && (
          <Card className="h-[4.875rem] w-[14.813rem] lg:w-[24.375rem] flex items-center justify-center">
            <p className="font-display text-text-secondary after:content-[''] after:absolute after:ml-1 after:animate-dots">
              Obtaining a user wallet
            </p>
          </Card>
        )}

        {!loading && account && (
          <section className="">
            <Card className="mb-6 flex flex-col items-center lg:block px-12 lg:px-0">
              <h3 className="font-display font-semibold">
                Connected wallet<span className="font-normal">:</span>
              </h3>
              <p className="block lg:hidden text-sm text-accent">
                {shortenAddress(account.address)}
              </p>
              <p className="text-sm text-accent hidden lg:block">
                {account.address}
              </p>
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
              <p className=" text-text-secondary text-sm lg:text-base">
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
          <img
            src="/assets/art-auth.svg"
            className="size-28 lg:size-48 opacity-10 "
          />
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            src="/assets/art-auth-2.svg"
            className="size-28 lg:size-48 opacity-10"
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
