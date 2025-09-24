import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import Button from "@/components/ui/button";
import Logo from "@/components/ui/logo";

interface Props {
  load: boolean;
  onPurchase: () => void;
}

export default function Payment({ load, onPurchase }: Props) {
  const { account } = useMarketplace();

  return (
    <div className="space-y-2">
      <Logo />
      <h2 className="text-lg font-accent text-accent font-semibold">Payment</h2>
      <div className="space-y-2 my-4 font-display">
        <div className="flex items-center justify-between">
          <p className="text-text-secondary">Wallet</p>
          <p>Metamask</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-text-secondary">Network</p>
          <p>BSC Testnet</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-text-secondary">Blockchain</p>
          <p>Etherum</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-text-secondary">Address</p>
          <p>{account?.address ? shortenAddress(account.address) : ""}</p>
        </div>
      </div>

      <hr className="w-full line-border my-4" />

      <Button
        classNameContainer="flex items-center gap-x-2 font-semibold"
        onClick={onPurchase}
        className="w-full"
        disabled={load}
        loading={load}
      >
        <img src="/metamask.svg" alt="Logo metamask" className="size-14" />
        Purchase
      </Button>
    </div>
  );
}
