// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./UserSendable.sol";

/**
 * @dev ERC721 token with pausable token transfers, minting and burning.
 *
 * Useful for scenarios such as preventing trades until the end of an evaluation
 * period, or having an emergency switch for freezing all token transfers in the
 * event of a large bug.
 */
abstract contract TippingBadge is UserSendable {

    uint public payItForwardTreasuryRatio_Numerator = 2;
    uint public payItForwardTreasuryRatio_Divisor = 3;
 
    constructor(string memory _badgeName, string memory _badgeSymbol, address _AddressManagerAddress)
        UserSendable(_badgeName, _badgeSymbol, _AddressManagerAddress)
    {

    } 

    modifier PAY_WITH_PENS(address receivingAddress) virtual override {      

        uint256 expectedContractBalance;
     
        uint256 portionOfMintingCost = mintingCost / payItForwardTreasuryRatio_Divisor;
        expectedContractBalance = redPens.balanceOf(address(this)) + (payItForwardTreasuryRatio_Numerator * portionOfMintingCost);

        redPens.transferFrom(msg.sender, address(this), (payItForwardTreasuryRatio_Numerator * portionOfMintingCost));
        redPens.transferFrom(msg.sender, receivingAddress, (portionOfMintingCost * (payItForwardTreasuryRatio_Divisor - payItForwardTreasuryRatio_Numerator)));
            
        require(redPens.balanceOf(address(this)) == expectedContractBalance, "Error Transfering !RED");
        
        _;
    }

    function setTipRatio(uint _numerator, uint _divisor) public JURY returns (bool){
        require(_numerator >= _divisor, "Sorry! Cost numerator must be greater than denominator");
        _setTipRatio(_numerator, _divisor);
        return true;
    }

    function _setTipRatio(uint _numerator, uint _divisor) internal returns (bool) {
        payItForwardTreasuryRatio_Numerator = _numerator;
        payItForwardTreasuryRatio_Divisor = _divisor;
        return true;
    }


}