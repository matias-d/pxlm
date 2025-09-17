import ButtonConnect from "../components/auth/button-connect";
import Footer from "../components/ui/footer";
import Logo from "../components/ui/logo";

export default function Auth() {
  return (
    <>
      <main className="max-container overflow-hidden flex flex-col items-center justify-center h-screen space-y-4 relative">
        <Logo />
        <ButtonConnect />

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
