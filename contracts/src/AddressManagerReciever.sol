pragma solidity ^0.8.0;

import './AddressManager.sol';


contract AddressManagerReciever {

    

    address public AddressManagerAddress;

    address public GavelTokenAddress;
    address public RedPenTokenAddress;

    address public GoldStarAddress;
    address public PinkSlipAddress;
    address public ChadBadgeAddress;

    address public  JuryPoolAddress;
    
    address public GavelDAOAgent;
    address public JuryDAOAgent;
    address public TreasuryAddress;
    address public TheCourtAddress;

    address public MiniBailiff;
    
    AddressManager public addressManager;
    
    constructor (address _AddressManagerAddress) {

        AddressManagerAddress = _AddressManagerAddress;
        addressManager = AddressManager(AddressManagerAddress);
     
    }


    function _updateDAOAddresses() internal {
        // Set these from the Address Manager Contract
        GavelDAOAgent = addressManager.GavelDAOAgent();
        JuryDAOAgent = addressManager.JuryDAOAgent();
        TreasuryAddress = addressManager.TreasuryAddress();
        MiniBailiff = addressManager.MiniBailiff();
    }

    function _updateTokenAddresses() internal virtual {
        // Set these from the Address Manager Contract
        GavelTokenAddress = addressManager.GavelTokenAddress();
        RedPenTokenAddress = addressManager.RedPenTokenAddress();
        
        GoldStarAddress = addressManager.GoldStarAddress();
        PinkSlipAddress = addressManager.PinkSlipAddress();
        ChadBadgeAddress = addressManager.ChadBadgeAddress();

        JuryPoolAddress = addressManager.JuryPoolAddress();
        
    }

    function _updateAddressManager() internal {
        // Set these from the Address Manager Contract
        require(addressManager.hasMovedToNewAddress());
        AddressManagerAddress = addressManager.newAddressManager();
    
    }
    
    

    function updateAllAddresses() public {
        _updateDAOAddresses();
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



}