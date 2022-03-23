// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./access/Ownable.sol";
import "./token/ERC20/ERC20.sol";
import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅲ - Req.1-SC1 SaleFactory 구현
 * 상태 변수나 함수의 시그니처, 이벤트는 구현에 따라 변경할 수 있습니다.
 */

contract SaleFactory is Ownable {
    address public admin;
    address[] public sales;

    IERC721 public erc721Constract;

    event NewSale(
        address indexed _saleContract,
        address indexed _owner,
        uint256 _workId
    );

    constructor(address _nftAddress) {
        admin = msg.sender;
        erc721Constract = IERC721(_nftAddress);
    }

    /**
     * @dev 반드시 구현해야하는 함수입니다. 
     */
    function createSale(
        uint256 itemId,
        uint256 purchasePrice,
        address currencyAddress,
        address nftAddress
    ) public returns (address) {
        address seller = msg.sender;
        require(erc721Constract.ownerOf(itemId) == seller, "SaleFactory: seller is not owner of this item");
        
        Sale sale = new Sale(admin, seller, itemId, purchasePrice, currencyAddress, nftAddress);
        sales.push(address(sale));
        return address(sale);
    }

    function allSales() public view returns (address[] memory) {
        return sales;
    }
}

/**
 *  PJT Ⅲ - Req.1-SC2) Sale 구현
 */
contract Sale {
    // 생성자에 의해 정해지는 값
    address public seller;
    address public buyer;
    address admin;
    uint256 public purchasePrice;
    uint256 public tokenId;
    address public currencyAddress;
    address public nftAddress;
    bool public ended;

    IERC20 public erc20Contract;
    IERC721 public erc721Constract;

    event SaleEnded(address winner, uint256 amount);

    constructor(
        address _admin,
        address _seller,
        uint256 _tokenId,
        uint256 _purchasePrice,
        address _currencyAddress,
        address _nftAddress
    ) {
        tokenId = _tokenId;
        purchasePrice = _purchasePrice;
        seller = _seller;
        admin = _admin;
        currencyAddress = _currencyAddress;
        nftAddress = _nftAddress;
        ended = false;
        erc20Contract = IERC20(_currencyAddress);
        erc721Constract = IERC721(_nftAddress);
    }

    function purchase() public {   
        require(msg.sender != seller, "Sale: Purchase caller is seller");
        require(purchasePrice <= erc20Contract.allowance(msg.sender, address(this)), "Sale: Purchase caller is not approved in ERC20");

        erc20Contract.transferFrom(msg.sender, seller, purchasePrice);
        erc721Constract.transferFrom(address(this), msg.sender, tokenId);

        buyer = msg.sender;
        ended = true;
        emit SaleEnded(buyer, purchasePrice);
    }
    
    // function cancelSales() public {
    //     require(!ended, "Sale: This sale is ended");
    //     require(msg.sender == seller || msg.sender == admin, "Sale: Cancel caller is not seller nor admin");
    // }

    function getSaleInfo()
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address
        )
    {
        return (
            purchasePrice,
            tokenId,
            currencyAddress,
            nftAddress
        );
    }

    // internal 혹은 private 함수 선언시 아래와 같이 _로 시작하도록 네이밍합니다.
    function _end() internal {
        ended = true;
    }

    function _getCurrencyAmount() private view returns (uint256) {
        return erc20Contract.balanceOf(msg.sender);
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Sale: You are not seller.");
        _;
    }
}
