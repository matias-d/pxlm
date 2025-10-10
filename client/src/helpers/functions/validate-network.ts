import { ethers } from "ethers";
import { toast } from "sonner";

export const TBNB_CHAIN_ID = 97; // BSC Testnet
export const WRONG_NETWORK = "Wrong network";

export async function validateNetwork(signer: ethers.Signer) {
  const provider = signer.provider;
  if (!provider) throw new Error("No provider found");

  const network = await provider.getNetwork();

  if (network.chainId !== BigInt(TBNB_CHAIN_ID)) {
    toast.error(
      "This DApp only works on BSC Testnet (tBNB). Please switch your network in MetaMask.",
      { icon: "⚠️" }
    );
    throw new Error(WRONG_NETWORK);
  }

  return true;
}
