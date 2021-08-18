// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

import "./GenericBadge.sol";

/**
 * @dev ERC721 token with pausable token transfers, minting and burning.
 *
 * Useful for scenarios such as preventing trades until the end of an evaluation
 * period, or having an emergency switch for freezing all token transfers in the
 * event of a large bug.
 */
contract ElectedBadge is GenericBadge {

    // Set Default Minting Costs to 3 Red Pens.
    uint256 public mintingCost = 300 * 10 ** 18;

    // Set Default Minting Cost Floor to 1 Red Pens
    uint256 public mintingCostFloor = 100 * 10 ** 17;


    ERC20Burnable public redPens = ERC20Burnable(RedPenTokenAddress);

    mapping (address => uint) public chadVoteBalance;
 
    constructor(string memory _badgeName, string memory _badgeSymbol, address _AddressManagerAddress)
        GenericBadge(_badgeName, _badgeSymbol, _AddressManagerAddress)
    {

        redPens = ERC20Burnable(RedPenTokenAddress);

    }      


    modifier PAY_WITH_PENS(address receivingAddress, uint _voteValue) virtual {      

        uint256 _valueSplit = _voteValue / 2;
        uint256 expectedContractBalance = redPens.balanceOf(TreasuryAddress) + _valueSplit;
        redPens.transferFrom(msg.sender, TreasuryAddress, _valueSplit);
        redPens.burnFrom(msg.sender, _valueSplit);
        //require(redPens.balanceOf(TreasuryAddress) == expectedContractBalance, "Error Transfering !RED Is it approved?");
        chadVoteBalance[receivingAddress] += _voteValue;

        _;
    }

    function electAChad(address receivingAddress, uint _voteValue) public virtual
        PAY_WITH_PENS(receivingAddress, _voteValue) 
        returns(uint votesRemaining) {

            votesRemaining = getVotesNeeded(receivingAddress);            
            return votesRemaining;     
    }

    function electAChad(address receivingAddress, string memory _reason, uint _voteValue, string memory _tokenURI) public virtual
        PAY_WITH_PENS(receivingAddress, _voteValue) 
        returns(uint _newId_or_votesRemaining) {

            if (chadVoteBalance[receivingAddress] >= mintingCost) {
                chadVoteBalance[receivingAddress] = 0;
                uint newId = _issueBadge(receivingAddress, _reason, _tokenURI);
                _newId_or_votesRemaining = newId; 
                
            } else {
                _newId_or_votesRemaining = getVotesNeeded(receivingAddress);
            }
            
            return _newId_or_votesRemaining;     
    }

    function getVotesNeeded(address _nominatedAddress) public view returns (uint _votesNeeded) {
        uint voteBalance = chadVoteBalance[_nominatedAddress];
        if (mintingCost > voteBalance) { 
                _votesNeeded = mintingCost - voteBalance;
            } else if (mintingCost <= voteBalance) {
                _votesNeeded = 0;
            }
            return _votesNeeded;
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

    function setMintingCostFloor(uint256 costFloorInWei) public THE_COURT returns (bool){

        require(costFloorInWei > (1 * 10 * 16));
        _setMintingCostFloor(costFloorInWei);
        if (mintingCostFloor > mintingCost) {
            mintingCost = mintingCostFloor;
        }
        return true;
    }

    function _setMintingCostFloor(uint256 costInWei) internal returns (bool) {
        mintingCostFloor = costInWei;
        return true;
    }

    function updatePaymentToken() public {
        _updateTokenAddresses();
        redPens = ERC20Burnable(RedPenTokenAddress);
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
        return (isApprovedForAll(owner, spender));
    }

}