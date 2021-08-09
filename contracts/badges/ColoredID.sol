pragma solidity ^0.8.0;

import "../src/ERC721/IdentityBadge.sol";


contract ColoredID is IdentityBadge {

    string internal baseURI;

    constructor(address _AddressManagerAddress)
        IdentityBadge("Colored ID", "ID", "twitter", _AddressManagerAddress)
    {
        setBaseURI("https://coloredbadges.fun/#/");
    }

    function setBaseURI(string memory _baseURI) public BAILIFF {

        _setBaseURI(_baseURI);

    }


    function _setBaseURI(string memory _baseURI) internal {
        baseURI = _baseURI;
    }

}
