pragma solidity ^0.8.0;

import "../src/ERC721/ElectedBadge.sol";


contract ChadBadges is ElectedBadge {

     constructor( address _AddressManagerAddress)
        ElectedBadge("ChadBadge", "Chad", _AddressManagerAddress)
    {
    }      

}