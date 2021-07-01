pragma solidity ^0.8.0;

import "../src/GenericBadge.sol";


contract GoldStars is GenericBadge {


     constructor(address _AddressManagerAddress)
        GenericBadge("GoldStar", "Gold", true, _AddressManagerAddress)
    {
    }      

}