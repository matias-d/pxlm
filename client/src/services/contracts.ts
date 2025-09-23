/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadImageToPinata, uploadMetadataToPinata } from "@/lib/pinata";
import type {
  IPxl,
  IPxlContract,
  IPxlCreate,
  PinataPXLResponse,
} from "@/interfaces/pxl";
import { generateNFTMetadata } from "./generate-pxl";
import { downloadSVG } from "@/utils/download-svg";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

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

  const item: IPxlContract = await marketplaceContract.getItem(tokenId);
  const tokenUri = `https://${import.meta.env.VITE_GATEWAY}/${item.tokenURI}`;

  const result: PinataPXLResponse = await fetch(tokenUri).then((res) =>
    res.json()
  );

  const priceFormat = await marketplaceContract.getTotalPrice(tokenId);
  const priceParse2 = ethers.formatEther(priceFormat);

  const nft = NFTMapper({
    item,
    metadata: result,
    price: priceParse2,
  });

  return nft;
}

interface NFTMapperParams {
  item: IPxlContract;
  metadata: PinataPXLResponse;
  price: string;
}

export async function getAllNFTs(signer: ethers.Signer): Promise<IPxl[]> {
  const { marketplaceContract } = await getMarketplaceContract(signer);

  const itemCountBN: bigint = await marketplaceContract.itemCount();
  const itemCount = Number(itemCountBN);

  const nftPromises = [];
  for (let i = 1; i <= itemCount; i++) {
    nftPromises.push(_getNFT(i, signer));
  }

  const nfts = await Promise.all(nftPromises);

  return nfts;
}

export async function _getNFT(
  tokenId: number,
  signer: ethers.Signer
): Promise<IPxl> {
  const { marketplaceContract } = await getMarketplaceContract(signer);
  const item: IPxlContract = await marketplaceContract.getItem(tokenId);

  // Get metadata from IPFS
  const tokenUri = `https://${import.meta.env.VITE_GATEWAY}/${item.tokenURI}`;

  const result: PinataPXLResponse = await fetch(tokenUri).then((res) =>
    res.json()
  );

  const priceRaw = await marketplaceContract.getTotalPrice(tokenId);
  const price = ethers.formatEther(priceRaw);

  const nft = NFTMapper({ item, metadata: result, price });

  return nft;
}

export function NFTMapper({ item, metadata, price }: NFTMapperParams): IPxl {
  const image = `https://${import.meta.env.VITE_GATEWAY}/${metadata.image}`;
  const rarity_score =
    Number(
      metadata.attributes.find((attr) => attr.trait_type === "Rarity Score")
        ?.value
    ) || 0;
  const rarity_tier =
    String(
      metadata.attributes.find((attr) => attr.trait_type === "Rarity Tier")
        ?.value
    ) || "";

  const minted_at = Number(
    metadata.attributes.find((attr) => attr.trait_type === "Minted At")?.value
  );

  const nft: IPxl = {
    generatedFrom: metadata.properties.generated_from,
    description: metadata.description,
    tokenId: Number(item.tokenId),
    attributes: metadata.attributes,
    nftAddress: item.nft,
    seller: item.seller,
    name: metadata.name,
    sold: item.sold,
    rarity_score,
    rarity_tier,
    price,
    image,
    minted_at,
  };

  return nft;
}

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
