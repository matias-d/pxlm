/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadImageToPinata, uploadMetadataToPinata } from "@/lib/pinata";
import { NFTMapper } from "@/helpers/functions/nft-mapper";
import type {
  IPxl,
  IPxlContract,
  IPxlCreate,
  PinataPXLResponse,
} from "@/interfaces/pxl";
import type { MarketplaceNFTs } from "@/interfaces/contracts";
import { generateNFTMetadata } from "./generate-pxl";
import { downloadSVG } from "@/utils/download-svg";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Handles retrieving the current user's Ethereum account data.
export async function _getAccount() {
  if (typeof window.ethereum === "undefined") {
    throw new Error("You need to install MetaMask to continue.");
  }

  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

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

interface CreateNFTParams {
  pxl: IPxlCreate;
  onStepChange?: (step: number) => void;
  signer: ethers.Signer;
  address: string;
}

// Handles the full process of creating an NFT with pinata sdk funcionalities.
export async function _createNFT({
  pxl,
  onStepChange,
  signer,
  address,
}: CreateNFTParams): Promise<IPxl> {
  onStepChange?.(0);
  const { attributes, bonuses, rarity_score, rarity_tier, url, price } = pxl;

  // Get next token ID
  onStepChange?.(1);
  const { nftAddress, nftContract } = await getNFTContract(signer);
  const tokenId = Number(await nftContract.tokenCount()) + 1;

  //  Download SVG from DiceBear
  onStepChange?.(2);
  const imageFile = await downloadSVG(url, `PXL-ART-${tokenId}.svg`);

  // Upload SVG to Pinata
  onStepChange?.(3);
  const imageUpload = await uploadImageToPinata(imageFile, tokenId);
  const imageIpfsUrl = `ipfs/${imageUpload.cid}`;

  // Generate metadata
  onStepChange?.(4);
  const metadata = generateNFTMetadata({
    tokenId,
    image: imageIpfsUrl,
    address,
    rarity_score,
    rarity_tier,
    attributes,
    bonuses,
  });

  // Upload metadata to Pinata
  onStepChange?.(5);
  const metadataUpload = await uploadMetadataToPinata(metadata, tokenId, {
    rarity: rarity_tier,
  });
  const metadataIpfsUrl = `ipfs/${metadataUpload.cid}`;

  // Minting NFTs
  onStepChange?.(6);
  const mintTx = await nftContract.mint(metadataIpfsUrl);
  await mintTx.wait();

  // Approve marketplace for transferring NFTs
  onStepChange?.(7);
  const { marketplaceAddress, marketplaceContract } =
    await getMarketplaceContract(signer);

  const approveTx = await nftContract.setApprovalForAll(
    marketplaceAddress,
    true
  );
  await approveTx.wait();
  // List on marketplace
  onStepChange?.(8);

  const priceParse = ethers.parseEther(price.toString());
  const listTx = await marketplaceContract.makeItem(
    nftAddress,
    tokenId,
    priceParse
  );
  await listTx.wait();

  const itemCountBN: bigint = await marketplaceContract.itemCount();
  const itemId = Number(itemCountBN);

  const nft = _getNFT(itemId, signer);

  return nft;
}

// Relist an existing NFT on the marketplace.
export async function _relistNFT({
  signer,
  tokenId,
  price,
}: {
  tokenId: number;
  price: string;
  signer: ethers.Signer;
}) {
  const { marketplaceContract, marketplaceAddress } =
    await getMarketplaceContract(signer);
  const { nftAddress, nftContract } = await getNFTContract(signer);

  const approved = await nftContract.getApproved(tokenId);

  if (approved.toLowerCase() !== marketplaceAddress.toLowerCase()) {
    const tx = await nftContract.approve(marketplaceAddress, tokenId);
    await tx.wait();
  }

  const priceParse = ethers.parseEther(price);

  const listTx = await marketplaceContract.makeItem(
    nftAddress,
    tokenId,
    priceParse
  );

  const receipt = await listTx.wait();
  const event = receipt.events?.find((e: any) => e.event === "Offered");
  const itemId = event?.args?.itemId;
  return { tokenId, itemId };
}

// Handles purchasing an NFT from the marketplace.
export async function _purchaseNFT({
  itemId,
  signer,
}: {
  itemId: number;
  signer: ethers.Signer;
}) {
  const { marketplaceContract } = await getMarketplaceContract(signer);

  const totalPrice = await marketplaceContract.getTotalPrice(itemId);

  const tx = await marketplaceContract.purchaseItem(itemId, {
    value: totalPrice,
  });

  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log: any) => {
      try {
        return marketplaceContract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .filter((e: any) => e?.name === "Bought")[0];

  if (!event) throw new Error("Bought event not found");

  const { buyer } = event.args;

  return { itemId, buyer };
}

// Fetches and organizes all NFT data from the marketplace.
export async function loadAllNFTs(
  signer: ethers.Signer,
  address: string
): Promise<MarketplaceNFTs> {
  const { marketplaceContract } = await getMarketplaceContract(signer);
  const itemCountBN: bigint = await marketplaceContract.itemCount();
  const itemCount = Number(itemCountBN);

  const allNFTs = await Promise.all(
    Array.from({ length: itemCount }, (_, i) => _getNFT(i + 1, signer))
  );

  const processedListedNFTS = allNFTs.filter(
    (nft) => !nft.sold && BigInt(nft.boughtAt) === 0n
  );

  const processedUserNFTS = allNFTs.filter((nft) => {
    const isOwner = nft.owner.toLowerCase() === address.toLowerCase();
    const isSeller = nft.seller.toLowerCase() === address.toLowerCase();
    const isBuyer = nft.buyer.toLowerCase() === address.toLowerCase();

    if (isOwner && (isSeller || isBuyer)) {
      return true;
    }

    if (isSeller && !isOwner) {
      return true;
    }

    return false;
  });
  return {
    allNFTs,
    marketplaceNFTs: processedListedNFTS,
    userNFTs: processedUserNFTS,
  };
}

// Get a single NFT by its itemId.
export async function _getNFT(
  itemId: number,
  signer: ethers.Signer
): Promise<IPxl> {
  const { marketplaceContract } = await getMarketplaceContract(signer);
  const { nftContract } = await getNFTContract(signer);
  const item: IPxlContract = await marketplaceContract.getItem(itemId);

  const owner = await nftContract.ownerOf(item.tokenId);

  // Get metadata from IPFS
  const tokenUri = `https://${import.meta.env.VITE_GATEWAY}/${item.tokenURI}`;

  const result: PinataPXLResponse = await fetch(tokenUri).then((res) =>
    res.json()
  );

  const priceRaw = await marketplaceContract.getTotalPrice(itemId);
  const price = ethers.formatEther(priceRaw);

  const nft = NFTMapper({ item, metadata: result, price, owner });

  return nft;
}

// Get the NFT contract ABI and address, then returns an ethers.Contract instance connected to the provided signer.
export async function getNFTContract(signer: ethers.Signer) {
  // ABI
  const nftJson = await fetch("/abi/NFT.json").then((res) => res.json());

  // Address
  const nftAddressJSON = await fetch("/abi/NFT-address.json").then((res) =>
    res.json()
  );
  const nftAddress = nftAddressJSON.address;

  if (!nftAddress) {
    throw new Error(
      "NFT address not found. Make sure nft-address.json exists in /public/abi."
    );
  }

  const nftContract = new ethers.Contract(nftAddress, nftJson.abi, signer);

  return { nftContract, nftAddress };
}

// Get the Marketplace contract ABI and address, then returns an ethers.Contract instance connected to the provided signer.
export async function getMarketplaceContract(signer: ethers.Signer) {
  // ABI
  const marketplaceJson = await fetch("/abi/Marketplace.json").then((res) =>
    res.json()
  );

  // Address
  const marketplaceAddressJSON = await fetch(
    "/abi/Marketplace-address.json"
  ).then((res) => res.json());

  const marketplaceAddress = marketplaceAddressJSON.address;

  if (!marketplaceAddress) {
    throw new Error(
      "Marketplace address not found. Make sure marketplace-address.json exists in /public/abi."
    );
  }

  const marketplaceContract = new ethers.Contract(
    marketplaceAddress,
    marketplaceJson.abi,
    signer
  );

  return { marketplaceContract, marketplaceAddress };
}

export async function getMarketplaceAddress() {
  const marketplaceAddressJSON = await fetch(
    "/abi/Marketplace-address.json"
  ).then((res) => res.json());

  const marketplaceAddress = marketplaceAddressJSON.address;

  return marketplaceAddress;
}
