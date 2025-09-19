import { ethers } from "ethers";

export async function _getAccount() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("You need to install MetaMask to continue.");
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  console.log("chainID", chainId);

  const provider = new ethers.BrowserProvider(window.ethereum);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const balanceWei = await provider.getBalance(address);
  const balanceEth = parseFloat(ethers.formatEther(balanceWei));
  const balance = balanceEth.toFixed(2);

  return {
    address,
    signer,
    provider,
    balance,
  };
}
