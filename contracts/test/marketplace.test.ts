import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

const toWei = (num: number) => ethers.parseEther(num.toString());

describe("Marketplace", function () {
  let NFT;
  let nft: any;
  let Marketplace;
  let marketplace: any;
  let deployer: any;
  let addr1: any;
  let addr2: any;
  let addrs: any;
  let feePercent = 1;
  let URI = "sample URI";

  this.beforeEach(async function () {
    NFT = await ethers.getContractFactory("NFT");
    Marketplace = await ethers.getContractFactory("Marketplace");
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

    nft = await NFT.deploy();
    marketplace = await Marketplace.deploy(feePercent);
  });

  describe("Deployment", function () {
    it("Should track name and symbol of the nft collection", async function () {
      const nftName = "BotttsNeutralNFT";
      const nftSymbol = "BNFT";

      expect(await nft.name()).to.equal(nftName);
      expect(await nft.symbol()).to.equal(nftSymbol);
    });

    it("Should track feeAccount and feePercent of the Marketplace", async function () {
      expect(await marketplace.feeAccount()).to.equal(deployer.address);
      expect(await marketplace.feePercent()).to.equal(feePercent);
    });
  });

  describe("Minting NFTs", async function () {
    it("Should track each minted NFT", async function () {
      await nft.connect(addr1).mint(URI);
      expect(await nft.tokenCount()).to.equal(1);
      expect(await nft.balanceOf(addr1.address)).to.equal(1);
      expect(await nft.tokenURI(1)).to.equal(URI);

      await nft.connect(addr2).mint(URI);
      expect(await nft.tokenCount()).to.equal(2);
      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.tokenURI(2)).to.equal(URI);
    });
  });

  describe("Making marketplace items", function () {
    let price = 1;
    let result;

    this.beforeEach(async function () {
      await nft.connect(addr1).mint(URI);
      await nft.connect(addr1).setApprovalForAll(marketplace.target, true);
    });

    it("Should track newly created item", async function () {
      await expect(
        marketplace.connect(addr1).makeItem(nft.target, 1, toWei(price))
      )
        .to.emit(marketplace, "Offered")
        .withArgs(1, nft.target, 1, toWei(price), addr1.address);

      expect(await nft.ownerOf(1)).to.equal(marketplace.target);
      expect(await marketplace.itemCount()).to.equal(1);
      const item = await marketplace.items(1);
      expect(item.itemId).to.equal(1);
      expect(item.nft).to.equal(nft.target);
      expect(item.tokenId).to.equal(1);
      expect(item.price).to.equal(toWei(price));
      expect(item.sold).to.equal(false);
    });

    it("Should fail if price is set to zero", async function () {
      await expect(
        marketplace.connect(addr1).makeItem(nft.target, 1, 0)
      ).to.be.revertedWith("Price must be greater than zero");
    });
  });

  describe("Purchasing marketplace items", function () {
    let price = 2;
    let fee = (feePercent / 100) * price;
    let totalPriceInWei;

    this.beforeEach(async function () {
      await nft.connect(addr1).mint(URI);
      await nft.connect(addr1).setApprovalForAll(marketplace.target, true);
      await marketplace.connect(addr1).makeItem(nft.target, 1, toWei(price));
    });

    it("Should update item as sold, pay seller, transfer to buyer...", async function () {
      const sellerInitialEthBal = await ethers.provider.getBalance(
        addr1.address
      );
      const feeAccountInitialEthBal = await ethers.provider.getBalance(
        deployer.address
      );

      totalPriceInWei = await marketplace.getTotalPrice(1);

      await expect(
        marketplace.connect(addr2).purchaseItem(1, { value: totalPriceInWei })
      )
        .to.emit(marketplace, "Bought")
        .withArgs(1, nft.target, 1, toWei(price), addr1.address, addr2.address);

      expect((await marketplace.items(1)).sold).to.equal(true);
      expect(await nft.ownerOf(1)).to.equal(addr2.address);

      const sellerFinalEthBal = await ethers.provider.getBalance(addr1.address);
      const feeAccountFinalEthBal = await ethers.provider.getBalance(
        deployer.address
      );

      expect(sellerFinalEthBal).to.equal(sellerInitialEthBal + toWei(price));
      expect(feeAccountFinalEthBal).to.equal(
        feeAccountInitialEthBal + toWei(fee)
      );
    });
  });

  describe("getItem function", function () {
    let price = 2;
    let itemId = 1;
    let tokenId = 1;
    const URI = "sample URI";

    beforeEach(async function () {
      await nft.connect(addr1).mint(URI);
      await nft.connect(addr1).setApprovalForAll(marketplace.target, true);
      await marketplace
        .connect(addr1)
        .makeItem(nft.target, tokenId, toWei(price));
    });

    it("Should return correct item details when item exists and is not sold", async function () {
      const result = await marketplace.getItem(itemId);

      expect(result.itemId).to.equal(itemId);
      expect(result.nft).to.equal(nft.target);
      expect(result.tokenId).to.equal(tokenId);
      expect(result.price).to.equal(toWei(price));
      expect(result.seller).to.equal(addr1.address);
      expect(result.sold).to.equal(false);
      expect(result.tokenURI).to.equal(URI);
    });

    it("Should return correct item details after item is sold", async function () {
      const totalPriceInWei = await marketplace.getTotalPrice(itemId);
      await marketplace
        .connect(addr2)
        .purchaseItem(itemId, { value: totalPriceInWei });

      const result = await marketplace.getItem(itemId);

      expect(result.itemId).to.equal(itemId);
      expect(result.nft).to.equal(nft.target);
      expect(result.tokenId).to.equal(tokenId);
      expect(result.price).to.equal(toWei(price));
      expect(result.seller).to.equal(addr1.address);
      expect(result.sold).to.equal(true);
      expect(result.tokenURI).to.equal(URI);
    });

    it("Should revert when trying to get non-existent item", async function () {
      await expect(marketplace.getItem(999)).to.be.revertedWith(
        "Item doesn't exist"
      );
    });
  });
});
