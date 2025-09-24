// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @title Simple ERC721 NFT Contract
/// @author matias-d
/// @notice This contract allows users to mint unique NFTs with custom metadata URIs.
/// @dev Inherits from OpenZeppelin's ERC721URIStorage for token storage and metadata handling.
contract NFT is ERC721URIStorage {

    uint public tokenCount; // Counter for the total number of tokens minted

    /// @notice Initializes the NFT collection with a name and symbol
    constructor() ERC721("PXLM", "PXL") {}

    /// @notice Mint a new NFT with a given metadata URI
    /// @dev Mints a new token to the caller and sets its URI
    /// @param _tokenURI The metadata URI pointing to the NFT's data ( JSON file )
    /// @return The ID of the newly minted token
    function mint(string memory _tokenURI) external returns (uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
}
