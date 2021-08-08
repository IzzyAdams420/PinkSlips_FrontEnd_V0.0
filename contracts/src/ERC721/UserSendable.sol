// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "./GenericBadge.sol";

/**
 * @dev ERC721 token with pausable token transfers, minting and burning.
 *
 * Useful for scenarios such as preventing trades until the end of an evaluation
 * period, or having an emergency switch for freezing all token transfers in the
 * event of a large bug.
 */
contract UserSendable is GenericBadge {

    // Set Default Minting Costs to 3 Red Pens.
    uint256 public mintingCost = 3 * 10 ** 18;

    // Set Default Minting Cost Floor to 1 Red Pens
    uint256 public mintingCostFloor = 1 * 10 ** 17;


    ERC20 public redPens = ERC20(RedPenTokenAddress);
 
    constructor(string memory _badgeName, string memory _badgeSymbol, address _AddressManagerAddress)
        GenericBadge(_badgeName, _badgeSymbol, _AddressManagerAddress)
    {

        redPens = ERC20(RedPenTokenAddress);

    }      


    modifier PAY_WITH_PENS(address receivingAddress) virtual {      

        uint256 expectedContractBalance;

        expectedContractBalance = redPens.balanceOf(address(this)) + mintingCost;
        redPens.transferFrom(msg.sender, address(this), mintingCost);
      
        require(redPens.balanceOf(address(this)) == expectedContractBalance, "Error Transfering !RED");
        
        _;
    }

    function issueBadge(address receivingAddress, string memory _reason) public virtual override
        PAY_WITH_PENS(receivingAddress) 
        returns(uint newId) {
        newId = _issueBadge(receivingAddress, _reason);
        return newId;     
    }

     /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Set Minting Costs                                                                        ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

    function setMintingCost(uint256 costInWei) public JURY returns (bool){
        require(costInWei >= mintingCostFloor, "Sorry! Cost must be greater than 0.1 RedPen");
        _setMintingCost(costInWei);
        return true;
    }

    function _setMintingCost(uint256 costInWei) internal returns (bool) {
        mintingCost = costInWei;
        return true;
    }

    function setMintingCostFloor(uint256 costFloorInWei) public BAILIFF returns (bool){

        require(costFloorInWei < mintingCostFloor, "Sorry! You can only lower the floor!");
        _setMintingCostFloor(costFloorInWei);
        return true;
    }

    function _setMintingCostFloor(uint256 costInWei) internal returns (bool) {
        mintingCostFloor = costInWei;
        return true;
    }

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
        address gifter = BadgeInfo[tokenId].gifter;
        return (spender == gifter || msg.sender == JuryDAOAgent || isApprovedForAll(owner, spender));
    }

}