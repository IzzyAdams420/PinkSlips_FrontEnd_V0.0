pragma solidity ^0.8.0;

import './AddressManager.sol';


contract AddressManagerReciever {

    // Master Address Manager Address
    address public AddressManagerAddress;

    // Token Addresses
    address public GavelTokenAddress;
    address public RedPenTokenAddress;

    // Badge Addresses
    address public GoldStarAddress;
    address public PinkSlipAddress;
    address public ChadBadgeAddress;

    // Bank Addresses
    address public TreasuryAddress;
    address public JuryPoolAddress;
    
    // DAO addresses
    address public GavelDAOAddress;
    address public JuryDAOAddress;
    address public TheCourtDAOAddress;

    // Agent Addresses
    address public GavelDAOAgent;
    address public JuryDAOAgent;
    address public TheCourtDAOAgent;
    address public MiniBailiff;
    
    AddressManager public addressManager;
    
    constructor (address _AddressManagerAddress) {

        AddressManagerAddress = _AddressManagerAddress;
        addressManager = AddressManager(AddressManagerAddress);
     
    }


    function _updateDAOAddresses() internal {
        // Set these from the Address Manager Contract
        GavelDAOAddress = addressManager.GavelDAOAddress();
        JuryDAOAddress = addressManager.JuryDAOAddress();
        TheCourtDAOAddress = addressManager.TheCourtDAOAddress();
        TreasuryAddress = addressManager.TreasuryAddress();
        JuryPoolAddress = addressManager.JuryPoolAddress();
    }

    function _updateDAOAgents() internal {
        // Set these from the Address Manager Contract
        GavelDAOAgent = addressManager.GavelDAOAgent();
        JuryDAOAgent = addressManager.JuryDAOAgent();
        TheCourtDAOAgent = addressManager.TheCourtDAOAgent();
        MiniBailiff = addressManager.MiniBailiff();
    }

    function _updateTokenAddresses() internal virtual {
        // Set these from the Address Manager Contract
        GavelTokenAddress = addressManager.GavelTokenAddress();
        RedPenTokenAddress = addressManager.RedPenTokenAddress();
        
        GoldStarAddress = addressManager.GoldStarAddress();
        PinkSlipAddress = addressManager.PinkSlipAddress();
        ChadBadgeAddress = addressManager.ChadBadgeAddress();

    }

    function _updateAddressManager() internal {
        // Set these from the Address Manager Contract
        require(addressManager.hasMovedToNewAddress());
        AddressManagerAddress = addressManager.newAddressManager();
    
    }
    
    

    function updateAllAddresses() public {
        _updateDAOAddresses();
        _updateDAOAgents();
        _updateTokenAddresses();
    }

    function updateAddressManager() public {
        _updateAddressManager();
    }

    function updateTokenAddresses() public {
        _updateTokenAddresses();
    }

    function updateDAOAddresses() public {
        _updateDAOAddresses();
    }

    function updateDAOAgents() public {
        _updateDAOAgents();
    }



}