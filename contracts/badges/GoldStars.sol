pragma solidity ^0.8.0;

import "../src/ERC721/TippingBadge.sol";


contract GoldStars is TippingBadge {


     constructor(address _AddressManagerAddress)
        TippingBadge("GoldStars", "Gold", _AddressManagerAddress)
    {
    }      

  
}