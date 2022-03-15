/**
 * PJT Ⅰ - 과제 3 테스트 코드 작성
 * @dev NFT mint, transfer, and compare URI
 */

const NftCreator = artifacts.require("SsafyNFT");

contract("NftCreator", (accounts) => {
  const name = "Non Fungible Token For SSAFY";
  const symbol = "SNFT";
  const contractOwner = accounts[0];

  var nftCreatorInstance;

  before(async function () {
    // set contract instance into a variable
    nftCreatorInstance = await NftCreator.new(name, symbol, {
      from: contractOwner,
    });
    // nftCreatorInstance = await NftCreator.deployed();
  });

  it("NFT mint, transfer, compare URI", async () => {
    // TODO
    // 다음이 반드시 테스트되어야 합니다.
    // assert.equal(sender, owner, "NFT Mint Failed");
    // assert.equal(receiver, owner, "NFT Transfer Failed.");
    // assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.")

    const sender = accounts[1];
    const receiver = accounts[2];
    const tokenURI = "myuri://testtest";

    // create 호출 후, tokenId 생성과 owner 지정 테스트
    var createRes = await nftCreatorInstance.create(sender, tokenURI, {
      from: sender,
    });
    var tokenId = createRes.receipt.logs[0].args["2"].toNumber();
    var owner = await nftCreatorInstance.ownerOf(tokenId);

    assert.equal(sender, owner, "NFT Mint Failed");

    // transfer 호출 후, 해당 token의 owner가 잘 넘어갔는지 확인
    await nftCreatorInstance.transferFrom(sender, receiver, tokenId, {
      from: sender,
    });
    owner = await nftCreatorInstance.ownerOf(tokenId);

    assert.equal(receiver, owner, "NFT Transfer Failed.");

    // tokenURI 호출 후, create 할 때 넣은 tokenURI가 잘 들어갔는지 확인
    var tokenURIFetched = await nftCreatorInstance.tokenURI(tokenId);
    assert.equal(tokenURI, tokenURIFetched, "Wrong Token Id or URI.");
  });
});
