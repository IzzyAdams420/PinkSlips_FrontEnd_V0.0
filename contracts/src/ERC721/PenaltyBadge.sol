// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./GenericBadge.sol";


contract PenaltyBadge is GenericBadge {

    mapping (uint => uint) public Penalty;

    ERC20 public redPens = ERC20(RedPenTokenAddress);
 
    constructor(string memory _badgeName, string memory _badgeSymbol, address _AddressManagerAddress)
        GenericBadge(_badgeName, _badgeSymbol, _AddressManagerAddress)
    {
        redPens = ERC20(RedPenTokenAddress);
    }      

    function payPenalty(uint _tokenId) public virtual returns (bool) {
       
        _payPenalty(_tokenId);

        return true;
    }

    function _payPenalty(uint _tokenId) internal virtual returns (bool) {
        uint256 expectedContractBalance;
        uint256 penaltyCost = Penalty[_tokenId];
    
        require (penaltyCost > 0, "No penalty for this tokenId!");
        
        require(redPens.balanceOf(msg.sender) >= penaltyCost, "You Don't Have Enough !Red");
        expectedContractBalance = redPens.balanceOf(address(this)) + penaltyCost;
        redPens.transferFrom(msg.sender, address(this), penaltyCost);
        require(redPens.balanceOf(address(this)) == expectedContractBalance, "Error Transfering !RED");
        Penalty[_tokenId] = 0;
        return true;
    }

    function issueBadge(address receivingAddress, string memory _reason) public virtual override
        BAILIFF 
        returns(uint newId) {
            uint _penalty = 0;
            newId = _issueBadge(receivingAddress, _reason, _penalty);
            return newId;
    }

    function issueBadge(address receivingAddress, string memory _reason, uint _penalty) public virtual
        BAILIFF 
        returns(uint newId) {
            newId = _issueBadge(receivingAddress, _reason, _penalty);
            return newId;
    }

    function _issueBadge(address receivingAddress, string memory _reason, uint _penalty) internal virtual
        BAILIFF 
        returns(uint newId) {
            newId = super.issueBadge(receivingAddress, _reason);
            Penalty[newId] = _penalty;
    }

     /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Update Payment Token                                                                      ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    function updatePaymentToken() public {
        _updateTokenAddresses();
        redPens = ERC20(RedPenTokenAddress);
    }

     /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Transfer rules                                                                           ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal view virtual
        override(GenericBadge)
        returns (bool)
    {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        
        address owner = ownerOf(tokenId);
       
        if (spender == owner) {
            require (Penalty[tokenId] == 0, "Please Pay Your Penalty");
            return true;
        } else {
            return (isApprovedForAll(owner, spender));
        }
    }
        
}