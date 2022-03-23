/**
 *  PJT Ⅲ - Req.1-SC3) 시나리오 테스트
 */
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const SaleFactory = artifacts.require("SaleFactory");
const Sale = artifacts.require("Sale");
let ssafyTokenContract, saleFactoryContract, nftContract, saleContract;
let itemId = 0;

contract("Sale Contract Testing", (accounts) => {
  const contractOwner = accounts[0];
  const seller = accounts[1];
  const purchaser = accounts[2];

  const uri = "testURI";
  const price = 1;
  const initPurchaserBalance = 100;

  async function printBalance() {
    var sellerBalance = await ssafyTokenContract.balanceOf.call(seller);
    var purchaserBalance = await ssafyTokenContract.balanceOf.call(purchaser);

    console.log("------------------------------");
    console.log("seller: " + sellerBalance);
    console.log("purchaser: " + purchaserBalance);
    console.log("------------------------------");
  }

  before(async function () {
    ssafyTokenContract = await SsafyToken.new("SsafyToken", "SSF", 18, {
      from: contractOwner,
    });

    await ssafyTokenContract.mint(10000, { from: contractOwner });
    await ssafyTokenContract.forceToTransfer(
      contractOwner,
      purchaser,
      initPurchaserBalance,
      {
        from: contractOwner,
      }
    );

    nftContract = await SsafyNFT.new("Non Fungible Token For SSAFY", "SNFT", {
      from: contractOwner,
    });

    saleFactoryContract = await SaleFactory.new(nftContract.address, {
      from: contractOwner,
    });

    await nftContract.create(seller, uri, { from: seller });

    await saleFactoryContract.createSale(
      itemId,
      price,
      ssafyTokenContract.address,
      nftContract.address,
      {
        from: seller,
      }
    );

    var sales = await saleFactoryContract.allSales();
    saleContract = await Sale.at(sales[0]);

    await nftContract.transferFrom(seller, saleContract.address, itemId, {
      from: seller,
    });
  });

  it("Create Sale", async () => {
    var saleInfo = await saleContract.getSaleInfo.call();

    assert.equal(
      itemId,
      saleInfo["1"].toNumber(),
      "itemId in SaleInfo is not correct"
    );

    assert.equal(
      nftContract.address,
      saleInfo["3"],
      "nft-address in SaleInfo is not correct"
    );
  });

  it("Purchase", async () => {
    await ssafyTokenContract.approve(saleContract.address, 100000, {
      from: purchaser,
    });

    await saleContract.purchase({ from: purchaser });

    var owner = await nftContract.ownerOf.call(itemId);
    var purchaserBalance = await ssafyTokenContract.balanceOf.call(purchaser);

    assert.equal(purchaser, owner, "Not Owned By Purchaser");
    assert.equal(
      initPurchaserBalance - price,
      purchaserBalance,
      "Transfer Failed"
    );

    // TODO
    // 다음을 테스트를 통과해야합니다.
    // assert.equal(purchaser, await getNftOwner(), "Not Owned By Purchaser");
    // assert.equal(900, await getBalance(purchaser), "Transfer Failed");
  });

  it("Cancel", async () => {
    // TODO
    // 다음을 테스트를 통과해야합니다.
    // assert.equal(seller, await getNftOwner(), "Cancellation Failed");
  });
});
