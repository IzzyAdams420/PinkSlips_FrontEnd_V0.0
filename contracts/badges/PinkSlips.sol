pragma solidity ^0.8.0;

import "../src/ERC721/UserSendable.sol";


contract PinkSlips is UserSendable {


     constructor(address _AddressManagerAddress)
        UserSendable("PinkSlip", "Pink", _AddressManagerAddress)
    {
    }      

}