// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


/// @title NFT Marketplace
/// @author matias-d
/// @notice A decentralized marketplace to list, buy, and sell ERC721 NFTs with a fee.
/// @dev Uses ReentrancyGuard to protect against reentrancy attacks.

contract Marketplace is ReentrancyGuard {

    address payable public immutable feeAccount; // Address that receives marketplace fees

    uint public immutable feePercent; // Fee percentage applied to each sale (e.g., 3 = 3%)

    uint public itemCount; // Counter of items listed in the marketplace

    /// @notice Represents an NFT listed in the marketplace
    struct Item {
        uint itemId;               
        IERC721 nft;               
        uint tokenId;              
        uint price;                
        address payable seller;    
        bool sold;                
    }

    /// @notice Mapping that stores all listed items by their ID
    mapping(uint => Item) public items;

    /// @notice Emitted when an NFT is listed for sale
    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );

    /// @notice Emitted when an NFT is purchased
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId, 
        uint price,
        address indexed seller,
        address indexed buyer
    );

    /// @notice Initializes the marketplace with a fee percentage
    /// @param _feePercent The percentage fee taken on each sale
    constructor (uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    /// @notice List an NFT for sale in the marketplace
    /// @param _nft The address of the NFT contract
    /// @param _tokenId The token ID of the NFT
    /// @param _price The sale price in wei
    function makeItem(IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );
        emit Offered(
            itemCount, 
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    /// @notice Retrieve information about a listed NFT
    /// @param _itemId The marketplace ID of the item
    function getItem(uint _itemId)
    external
    view
    returns (
        uint itemId,
        address nft,
        uint tokenId,
        uint price,
        address seller,
        bool sold,
        string memory tokenURI
    )
    {
        Item storage item = items[_itemId];
        require(item.itemId != 0, "Item doesn't exist");

        return (
            item.itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            item.sold,
            ERC721URIStorage(address(item.nft)).tokenURI(item.tokenId)
        );
    }

    /// @notice Purchase a listed NFT
    /// @dev Transfers funds to the seller and feeAccount, then transfers the NFT to the buyer
    /// @param _itemId The marketplace ID of the item to purchase
    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "Item doesn't exist");
        require(msg.value >= _totalPrice, "Not enough ether");
        require(!item.sold, "Item already sold");

        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);

        item.sold = true;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);

        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    /// @notice Calculate the total price including marketplace fee
    /// @param _itemId The marketplace ID of the item
    function getTotalPrice(uint _itemId) view public returns(uint) {
        return ((items[_itemId].price * (100 + feePercent)) / 100);
    }

}