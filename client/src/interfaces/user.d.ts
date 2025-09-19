import type { ethers } from "ethers";

export interface IUser {
  address: string;
  signer: ethers.Signer;
  provider: ethers.Provider;
  balance: string;
}
