// SPDX-License-Identifier: MIT
// Inspired by SushiSwap SushiBar


// I have not implemented slashing or anything fancy yet. This is a functional placeholder.
pragma solidity 0.8.0;

import "../src/SmartConsensusMachine.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";


contract JuryPool is ERC20("Jury Hats", "HATS"), SmartConsensusMachine, ERC20Snapshot {

    ERC20 public redPens;


    constructor(address _AddressManagerAddress) SmartConsensusMachine(_AddressManagerAddress)  {

    }


    function updateStakingToken() public {
        updateTokenAddresses();
        redPens = ERC20(RedPenTokenAddress);
    }
    
    function stakePens() public {
        uint256 amountToStake = redPens.balanceOf(address(this));
        stakePens(amountToStake);
    }

    function stakePens(uint256 _amount) public {
 
        uint256 totalPensStaked = redPens.balanceOf(address(this));
        uint256 totalHatsCirculating = totalSupply();

        if (totalHatsCirculating == 0) {
            _mint(msg.sender, _amount);
        } else {
            uint256 hatsToDistribute = (_amount * totalHatsCirculating / totalPensStaked);
            _mint(msg.sender, hatsToDistribute);
        }

        redPens.transferFrom(msg.sender, address(this), _amount);
    }

     function returnHats() public {
         uint256 _amount = balanceOf(msg.sender);
         returnHats(_amount);
    }

    function returnHats(uint256 _amount) public {
        uint256 totalHats = totalSupply();
        uint256 pensToDistrubute = (_amount * (redPens.balanceOf(address(this))) / totalHats);
       
        _burn(msg.sender, _amount);
        redPens.transfer(msg.sender, pensToDistrubute);
    
    }

    function snapshot() public MINI_BAILIFF {
        _snapshot();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}