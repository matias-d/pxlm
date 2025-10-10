import { TBNB_CHAIN_ID } from "@/helpers/functions/validate-network";
import { useEffect, useState } from "react";
import Button from "../ui/button";
import { X } from "lucide-react";
import { ethers } from "ethers";

export default function NetworkMessage() {
  const [open, setOpen] = useState(true);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.ethereum) return;

    const checkNetwork = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();

      const isWrongNetwork = network.chainId !== BigInt(TBNB_CHAIN_ID);
      setWrongNetwork(isWrongNetwork);

      if (isWrongNetwork) {
        setTimeout(() => {
          setVisible(true);
        }, 500);
      } else {
        setVisible(false);
      }
    };

    checkNetwork();

    window.ethereum.on("chainChanged", () => {
      setVisible(false);
      checkNetwork();
    });

    return () => {
      window.ethereum.removeAllListeners("chainChanged");
    };
  }, []);

  if (!wrongNetwork || !open) return null;

  return (
    <div
      className={`bg-card border border-border fixed p-4 lg:p-6 left-1/2 -translate-x-1/2 top-4 lg:-translate-x-0 lg:left-auto lg:right-4 rounded-md w-90 md:min-w-lg font-display mb-2 shadow-lg z-50 transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 -translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <div className="flex items-start justify-between w-full mb-2">
        <h2 className="font-semibold text-white">
          You must be on the BSC Testnet (TBNB)
        </h2>
        <button
          className="bg-card-light rounded-full p-1 border border-border cursor-pointer hover:bg-card-super-light transition-colors -mt-2"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>
      </div>
      <p className="text-gray-300 mb-4 text-xs md:text-sm">
        To interact with this marketplace, you need to connect to the Binance
        Smart Chain Testnet (TBNB). Please switch your wallet network to TBNB to
        list, buy, or sell NFTs. This ensures that all transactions are properly
        processed and visible on the test network.
      </p>
      <Button asChild className="h-10 text-sm btn-secondary">
        <a
          className="flex gap-x-2 justify-center items-center"
          href="https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="metamask.svg" className="size-8" /> Add BSC Testnet network
        </a>
      </Button>
    </div>
  );
}
