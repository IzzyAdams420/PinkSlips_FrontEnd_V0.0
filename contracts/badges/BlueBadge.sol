pragma solidity ^0.8.0;

import "../src/ERC721/GenericBadge.sol";


contract BlueBadge is GenericBadge {


     constructor(string memory badgeName, string memory badgeSymbol, address _AddressManagerAddress)
        GenericBadge(badgeName, badgeSymbol, _AddressManagerAddress)
    {
    }      

}