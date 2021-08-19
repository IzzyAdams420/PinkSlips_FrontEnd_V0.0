pragma solidity ^0.8.0;

import "../src/ERC721/IdentityBadge.sol";
import "../src/ERC721/DistributionBadge.sol";


contract ColoredID is IdentityBadge, DistributionBadge {


    constructor(address _AddressManagerAddress, address _subsidyToken) 
        IdentityBadge("Colored ID", "ID", "twitter", _AddressManagerAddress)
        DistributionBadge(1000, 69, 0, _subsidyToken)
    {
    }

    function _issueBadge(address _receivingAddress, string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress,
                            uint _avatarTokenId, uint _avatarNetworkId, string memory _tokenURI)
        internal virtual override returns(uint newId)
        {
       newId = super._issueBadge(_receivingAddress, _pseudonym, _socialHandle, _avatarTokenAddress,
                            _avatarTokenId, _avatarNetworkId, _tokenURI);
        _paySubsidy(_receivingAddress);
        return newId;       
     }


}
