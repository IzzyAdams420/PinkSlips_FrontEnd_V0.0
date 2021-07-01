pragma solidity ^0.8.0;

import "../src/GenericBadge.sol";


contract ChadBadges is GenericBadge {


     constructor( bool doPayReciever, address _AddressManagerAddress)
        GenericBadge("ChadBadge", "Chad", doPayReciever, _AddressManagerAddress)
    {
    }      

}