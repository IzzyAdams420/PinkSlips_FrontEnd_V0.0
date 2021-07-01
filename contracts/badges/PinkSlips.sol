pragma solidity ^0.8.0;

import "../src/GenericBadge.sol";


contract PinkSlips is GenericBadge {


     constructor(address _AddressManagerAddress)
        GenericBadge("PinkSlip", "Pink", false, _AddressManagerAddress)
    {
    }      

}