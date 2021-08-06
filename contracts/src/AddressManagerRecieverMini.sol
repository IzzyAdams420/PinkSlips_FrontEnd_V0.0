pragma solidity ^0.8.0;

import './AddressManager.sol';


contract AddressManagerRecieverMini {

    // Master Address Manager Address
    address public AddressManagerAddress;

    // DAO addresses
    address public JuryDAOAddress;

    // Agent Addresses
    address public JuryDAOAgent;


    AddressManager public addressManager;
    
    constructor (address _AddressManagerAddress) {

        AddressManagerAddress = _AddressManagerAddress;
        addressManager = AddressManager(AddressManagerAddress);
     
    }


    function _updateDAOAddresses() internal {
        // Set these from the Address Manager Contract
        JuryDAOAddress = addressManager.JuryDAOAddress();
    
    }

    function _updateDAOAgents() internal {
        // Set these from the Address Manager Contract
        JuryDAOAgent = addressManager.JuryDAOAgent();
    }


    function _updateAddressManager() internal {
        // Set these from the Address Manager Contract
        require(addressManager.hasMovedToNewAddress());
        AddressManagerAddress = addressManager.newAddressManager();
    
    }
    
    

    function updateAllAddresses() public {
        _updateDAOAddresses();
        _updateDAOAgents();
    }

    function updateAddressManager() public {
        _updateAddressManager();
    }

    function updateDAOAddresses() public {
        _updateDAOAddresses();
    }

    function updateDAOAgents() public {
        _updateDAOAgents();
    }



}