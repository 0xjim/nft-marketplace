const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  it("Should create and execute NFT market sales", async function () {
    const Marketplace = await ethers.getContractFactory("NFTMarketplace")
    const marketplace = await Marketplace.deploy()
    await marketplace.deployed()
    const marketplaceAddress = marketplace.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketplaceAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await marketplace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits("100", "ether")

    await nft.createToken("")
    await nft.createToken("")

    await marketplace.createMarketItem(nftContractAddress, 1, auctionPrice, {value: listingPrice})
    await marketplace.createMarketItem(nftContractAddress, 2, auctionPrice, {value: listingPrice})

    const [_, buyerAddress, thirdAddress, fourthAddress] = await ethers.getSigners()

    await marketplace.connect(buyerAddress).createMarketSale(nftContractAddress,1, {value: auctionPrice})

    /* query for and return the unsold items */
    let items = await marketplace.getUnsoldItems()

    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))

    console.log('items: ', items)
  });
});
