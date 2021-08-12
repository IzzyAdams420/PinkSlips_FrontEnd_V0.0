pragma solidity ^0.8.0;

import "../src/ERC721/IdentityBadge.sol";


contract ColoredID is IdentityBadge {


    constructor(address _AddressManagerAddress)
        IdentityBadge("Colored ID", "ID", "twitter", _AddressManagerAddress)
    {
    }

}
