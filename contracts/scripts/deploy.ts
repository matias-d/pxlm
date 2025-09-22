import { network, artifacts } from "hardhat";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { ethers } = await network.connect({
  network: "ganache",
  chainType: "l1",
});

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying with account:", deployer.address);

  // Get the contract factories
  const NFT = await ethers.getContractFactory("NFT");
  const Marketplace = await ethers.getContractFactory("Marketplace");

  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  console.log("✅ NFT deployed to:", await nft.getAddress());

  const marketplace = await Marketplace.deploy(1); // 1% listing fee
  await marketplace.waitForDeployment();
  console.log("✅ Marketplace deployed to:", await marketplace.getAddress());

  // Save files for the client
  await saveClientFiles(nft, "NFT");
  await saveClientFiles(marketplace, "Marketplace");

  console.log("🎉 Deployment completed successfully!");
}

async function saveClientFiles(contract: any, name: string) {
  const contractAddress = await contract.getAddress();
  const abiDir = path.join(__dirname, "../../client/public/abi");

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir, { recursive: true });
  }

  // Save the contract address
  const addressPath = path.join(abiDir, `${name}-address.json`);
  fs.writeFileSync(
    addressPath,
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );
  console.log("💾 Address saved to", `client/public/abi/${name}-address.json`);

  // Save the contract ABI
  const artifact = await artifacts.readArtifact(name);
  const abiPath = path.join(abiDir, `${name}.json`);

  fs.writeFileSync(abiPath, JSON.stringify(artifact, null, 2));
  console.log("📄 ABI saved to", `client/public/abi/${name}.json`);
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
