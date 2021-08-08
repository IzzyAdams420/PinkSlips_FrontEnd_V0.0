// SPDX-License-Identifier: MIT
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.

//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.

//  I have not really implemented anything yet. This is just a placeholder.
//  I have not really implemented anything yet. This is just a placeholder.
pragma solidity ^0.8.0;

import "../src/SmartConsensusMachine.sol";
import "./JuryPool.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";


contract DisputeMachine is SmartConsensusMachine {

    ERC20 public redPens;
    JuryPool public juryHats;

    uint private slashIndex = 0;
    uint public slashPercentageInWholeNumber = 30;

    uint[] private slashList;


    constructor(address _AddressManagerAddress) SmartConsensusMachine(_AddressManagerAddress)  {

    }


    function drawJurors() internal {
        // emit events to summon jurrors based on their token IDs        
    }

    function _slash() internal {

        for (uint i = 0; i < slashIndex; i++) {
            juryHats.slashToken(slashList[i], slashPercentageInWholeNumber);
            slashList[i] = 0;
        }
        slashIndex = 0;

    }

    function setSlashPercent(uint _slashPercentageInWholeNumber) public JURY {
        slashPercentageInWholeNumber = _slashPercentageInWholeNumber;
    }

    function _updateTokenAddresses() internal override {
        // Set these from the Address Manager Contract
        
        super._updateTokenAddresses();
        redPens = ERC20(RedPenTokenAddress);
        juryHats = JuryPool(JuryPoolAddress);
    }

}