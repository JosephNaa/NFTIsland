// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract SsafyNFT is ERC721 {

    uint256 private _tokenIds;
    mapping(uint256 => string) tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _tokenIds = 0;
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI) public virtual returns (uint256) {
        uint256 tokenId = _tokenIds;
        _mint(to, tokenId);
        tokenURIs[tokenId] = _tokenURI;
        
        _tokenIds += 1;

        return tokenId;
    }
}