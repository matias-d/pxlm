// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Marketplace is ReentrancyGuard {

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId, 
        uint price,
        address indexed seller,
        address indexed buyer
    );

    constructor (uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

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

    function getTotalPrice(uint _itemId) view public returns(uint) {
        return ((items[_itemId].price*(100 + feePercent))/100);
    }

}