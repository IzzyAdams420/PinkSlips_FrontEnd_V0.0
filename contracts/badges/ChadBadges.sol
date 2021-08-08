pragma solidity ^0.8.0;

import "../src/ERC721/GenericBadge.sol";


contract ChadBadges is GenericBadge {


     constructor( address _AddressManagerAddress)
        GenericBadge("ChadBadge", "Chad", _AddressManagerAddress)
    {
    }      

}