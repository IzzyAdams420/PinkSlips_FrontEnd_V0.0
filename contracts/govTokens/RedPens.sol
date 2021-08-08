// Disclaimer: I have literally no idea what I'm doing so take that as you will.
// Now that thats out of the way, feel free to help improve this!

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../src/SmartConsensusMachine.sol";
import "../src/ERC20/JerkSanctions.sol";

// Token features:
// Snapshot for governance and distrubutions
// Burnable
// Fixed Supply
// Gassless Permit (Draft EIP)

contract RedPens is ERC20, ERC20Snapshot, ERC20Permit, ERC20Burnable, SmartConsensusMachine, JerkSanctions {

    constructor(address _AddressManagerAddress) ERC20("Red Pens", "!RED") ERC20Permit("Red Pens") SmartConsensusMachine(_AddressManagerAddress) {
    
        _mint(TreasuryAddress, 820042000 * 10 ** 18); // Mint the entire token supply
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot, JerkSanctions)
    {
        if (jerkSanctionsLocal && jerkSanctions) {
           require(!hasRole(JERK_ROLE, msg.sender)); 
        }
        super._beforeTokenTransfer(from, to, amount);
    }

}

    