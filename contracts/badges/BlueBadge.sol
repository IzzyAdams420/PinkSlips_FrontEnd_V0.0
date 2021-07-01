pragma solidity ^0.8.0;

import "../src/GenericBadge.sol";


contract BlueBadge is GenericBadge {


     constructor(string memory badgeName, string memory badgeSymbol, bool doPayReciever, address _AddressManagerAddress)
        GenericBadge(badgeName, badgeSymbol, doPayReciever, _AddressManagerAddress)
    {
    }      

}