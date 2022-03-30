//const Migrations = artifacts.require("Migrations");
const NFTIslandBadge = artifacts.require("NFTIslandBadge");
// const SsafyToken = artifacts.require("SsafyToken");
const SaleFactory = artifacts.require("SaleFactory");

const name = "Non Fungible Token For NFTIsland";
const symbol = "BADGE";

module.exports = function (deployer) {
  // deployer.deploy(NFTIslandBadge, name, symbol);
  // deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
  deployer.deploy(SaleFactory, "0x33D9c68D731Ca9fB3fdcE7dda79Fe34FeB33CaE1");
};
