pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


// This contract enables anyone to be able to submit dispute proposals, regardless of thier membership status.

contract CourtClerk {
    
    address daoAddress;
    address daoMinionAddress = 0x2fc321C703f06893b4C3E872FBd66DC2D7c91f72;
    address pensAddress = 0xe78AC7E8d309C749EBC80F55A78B3b397625421C;
    
    constructor (address _daoAddress, address _daoMinionAddress, address _pensAddress) {
        daoAddress = _daoAddress;
        daoMinionAddress = _daoMinionAddress;
        pensAddress = _pensAddress;
    }

    // should probably just generate minion call data here, for best security.Will Do that Later
    function submitDispute(uint _tokenId, address _badgeAddress, bytes memory _minionCallData) public returns (bytes memory proposalIdBytes) {
        ERC721 badge = ERC721(_badgeAddress);
        require(msg.sender == badge.ownerOf(_tokenId));
        proposalIdBytes = _sendMinionTransaction(_minionCallData);
        //require(proposalId > 0, "Check proposalId");
        return proposalIdBytes;
    }

    function _sendMinionTransaction(bytes memory _minionCallData)internal returns (bytes memory proposalIdBytes) {

        (bool success, bytes memory toReturn) = daoMinionAddress.call(_minionCallData);
        proposalIdBytes = toReturn;
        //require (proposalId >= 1, "Error sending tx to minion");
        require(success, "Tx not submitted to minion");
        return proposalIdBytes;

    }

}