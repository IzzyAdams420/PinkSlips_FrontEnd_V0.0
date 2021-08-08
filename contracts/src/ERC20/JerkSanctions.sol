// Disclaimer: I have literally no idea what I'm doing so take that as you will.
// Now that thats out of the way, feel free to help improve this!

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "../SmartConsensusMachine.sol";

// Token features:
// Snapshot for governance and distrubutions
// Burnable
// Fixed Supply
// Gassless Permit (Draft EIP)

abstract contract JerkSanctions is ERC20, ERC20Snapshot, SmartConsensusMachine {

 
    /******************************************************
    * JERK SANCTIONS:
    *   if 'jerkSanctionIsOn' is enabled, this prohibits jerks from using thier !Red.    *
    *
    * FOREVER_DISABLE_SANCTIONS:
    *   if this setting is set to true, Jerk sanctions will be disabled forever.
    *   THIS IS NOT REVERSABLE!
    */

    bool public SANCTIONS_FOREVER_DISABLED = false;
    bool public jerkSanctionsLocal = false;

    /***********************************************/
    //***********************************************************
    // The DAO may choose to prohibit Jerks from using !Red
    //********************************************************* */
    function switchLocalJerkSanctions(bool turnOnSanctions) public JURY {
        require(!SANCTIONS_FOREVER_DISABLED);

        jerkSanctionsLocal = turnOnSanctions;

    }

    // This will disable the sanctions function forever (incase it was a bad idea or poses a security issue)
    function foreverDisableJerkSanctions(bool safteySwitch) public THE_COURT {
        // The Saftey Switch should be set to FALSE for the function to be properly executed.
        require(!safteySwitch && !SANCTIONS_FOREVER_DISABLED);
        jerkSanctionsLocal = false;
        SANCTIONS_FOREVER_DISABLED = true;
    }


    // Take a snapshot of token holders (Must be the recorder, bailiff, or court)
     function snapshot() public MINI_BAILIFF {
        _snapshot();
    }

    /**************************************************************************
    ***************************************************************************/

    // Only needed in the event jerk sanctions are turned on.
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        virtual
        override(ERC20, ERC20Snapshot)
    {
        if (jerkSanctionsLocal && jerkSanctions) {
           require(!hasRole(JERK_ROLE, msg.sender)); 
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}