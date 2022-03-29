// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";

contract NFTIslandBadge is ERC721 {

    uint256 private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => bool) private _publics;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _tokenIds = 0;
    }

    function current() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function create(address to, string memory _tokenURI, bool _public, uint256 _amount) public virtual returns (uint256[] memory) {
        require(_amount <= 100, "NFTIslandBadge: you can't mint more than 100 tokens at a time");
        
        uint256[] memory tokenIdArray = new uint256[](_amount);

        for (uint i = 0; i < _amount; i++) {
            uint256 tokenId = _tokenIds;
            _mint(to, tokenId);
            _tokenURIs[tokenId] = _tokenURI;
            _publics[tokenId] = _public;
            tokenIdArray[i] = tokenId;
            
            _tokenIds += 1;
        }

        return tokenIdArray;
    }

    function isPublic(uint256 tokenId) public view returns (bool) {
        require(_exists(tokenId), "NFTIslandBadge: this tokenId doesn't exist");
        
        return _publics[tokenId];
    }
}