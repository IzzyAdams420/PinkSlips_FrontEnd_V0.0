    pragma solidity ^0.8.0;

    import './ConsensusMachine.sol';
   
    contract AddressManager is ConsensusMachine {/// Change the Gavels Agent Address
        
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

        address public newAddressManager; // For the ability to upgrade if neccesary.
        bool public hasMovedToNewAddress = false;

        string private errorMessage = "the hell are you doing? C'mon";
        string private zeroAddressWarning = "C'mon";


        event AddressUpdated(address, string);

        constructor(address juryDAOAgent, address gavelDAOAgent, address treasuryAddress,
                    address theCourtAddress, address _MiniBailiff)
                    ConsensusMachine(juryDAOAgent, gavelDAOAgent, theCourtAddress) {

            GavelDAOAgent = gavelDAOAgent;
            JuryDAOAgent = juryDAOAgent;
            TreasuryAddress = treasuryAddress;
            TheCourtDAOAddress = theCourtAddress;
            MiniBailiff = _MiniBailiff;

        }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Address Setters                                                                          ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

        function setnewAddressManager(address newAddressManagerAddress) public THE_COURT {
            require(newAddressManagerAddress != address(0), errorMessage);
            newAddressManager = newAddressManagerAddress;
            hasMovedToNewAddress = true;
            _resetVote();

            emit AddressUpdated(newAddressManagerAddress, "New AddressManagerAddress");
        }

        /// Change the Gavel DAO Address
        function switchGavelDAOAddress(address newDAOAddress) public GAVELS {
            require(newDAOAddress != address(0), zeroAddressWarning);
            GavelDAOAddress = newDAOAddress;
            emit AddressUpdated(newDAOAddress, "New Gavel Address");
        }


        /// Change the Jury DAO Address
        function switchJuryDAOAddress(address newDAOAddress) public JURY {
            require(newDAOAddress != address(0), zeroAddressWarning);
            JuryDAOAddress = newDAOAddress;
            emit AddressUpdated(newDAOAddress, "New Jury Address");

        }
        /// Change the Court DAO Address
        function switchTheCourtDAOAddress(address newDAOAddress) public THE_COURT {
            require(newDAOAddress != address(0), zeroAddressWarning);
            JuryDAOAddress = newDAOAddress;
            _resetVote();
            emit AddressUpdated(newDAOAddress, "New Court Address");
        }

        /// Change the Gavel Agent Address
        function switchGavelAgent(address newAgentAddress) public GAVELS {
            bool success = _setAgent(GAVELS_BAILIFF, newAgentAddress);
            require(success == true);
            GavelDAOAgent = newAgentAddress;
            emit AddressUpdated(newAgentAddress, "New Gavel Agent");
        }


        /// Change the Jury Agent Address
        function switchJuryAgent(address newAgentAddress) public JURY {
            bool success = _setAgent(JURY_BAILIFF, newAgentAddress);
            require(success == true);
            JuryDAOAgent = newAgentAddress;
            emit AddressUpdated(newAgentAddress, "New Jury Agent");

        }
        /// Change the Court Agent Address
        function switchTheCourtAgent(address newAgentAddress) public THE_COURT {
            bool success = _setAgent(THE_COURT_ROLE, newAgentAddress);
            require(success == true);
            JuryDAOAgent = TheCourtDAOAgent;
            _resetVote();
            emit AddressUpdated(newAgentAddress, "New Court Elected");
        }


        function addMiniBailiff(address newAgentAddress) public BAILIFF {
            bool success = _setAgent(MINI_BAILIFF_ROLE, newAgentAddress);
            require(success == true);
            emit AddressUpdated(newAgentAddress, "New Mini Bailiff");
        }
        
       function _setAgent( bytes32 ROLE , address newAgentAddress) internal BAILIFF returns (bool) {
            require(newAgentAddress != address(0), errorMessage);
            require(!hasRole(ROLE, newAgentAddress));
            grantRole(ROLE, newAgentAddress);
            emit AddressUpdated(newAgentAddress, "Check Role Events" );
            return true;
        }







        /// Change the Treasury Address
        function setTreasuryAddress(address newTreasuryAddress) public THE_COURT {
            require(newTreasuryAddress != address(0), errorMessage);
            TreasuryAddress = newTreasuryAddress;
            _resetVote();
            emit AddressUpdated(newTreasuryAddress, "New Treasury Address");
        }

        function setGavelTokenAddress(address newGavelTokenAddress) public GAVELS {
            require(newGavelTokenAddress != address(0), zeroAddressWarning);
            require(newGavelTokenAddress != RedPenTokenAddress, "Don't mess with the balance of power");
            GavelTokenAddress = newGavelTokenAddress;
    
            emit AddressUpdated(newGavelTokenAddress, "New Gavel Token Address");            
        }

        function setRedPenTokenAddress(address newRedPenTokenAddress) public JURY  {
            require(newRedPenTokenAddress != address(0), zeroAddressWarning);
            require(newRedPenTokenAddress != GavelTokenAddress, "Don't mess with the balance of power");
            RedPenTokenAddress = newRedPenTokenAddress;

            emit AddressUpdated(newRedPenTokenAddress, "New Red Pen Token Address"); 
        }

        function setJuryPoolAddress(address newJuryPoolAddress) public JURY  {
            require(newJuryPoolAddress != address(0), zeroAddressWarning);
            require(newJuryPoolAddress != GavelTokenAddress, "Don't mess with the balance of power");
            JuryPoolAddress = newJuryPoolAddress;
     
            emit AddressUpdated(newJuryPoolAddress, "New Jury Pool Address"); 
        }

        function setGoldStarAddress(address newGoldStarAddress) public THE_COURT {
            require(newGoldStarAddress != address(0), zeroAddressWarning);
            require(newGoldStarAddress != GavelTokenAddress && newGoldStarAddress != RedPenTokenAddress, "What are you doing?");
            GoldStarAddress = newGoldStarAddress;
            _resetVote();
            emit AddressUpdated(newGoldStarAddress, "New Gold Star Address"); 
        }

        function setPinkSlipAddress(address newPinkSlipAddress) public THE_COURT {
            require(newPinkSlipAddress != address(0), zeroAddressWarning);
            require(newPinkSlipAddress != GavelTokenAddress && newPinkSlipAddress != RedPenTokenAddress, "What are you doing?");
            PinkSlipAddress = newPinkSlipAddress;
            _resetVote();
            emit AddressUpdated(newPinkSlipAddress, "New PinkSlip Address");
        }

        function setChadBadgeAddress(address newChadBadgeAddress) public THE_COURT {
            require(newChadBadgeAddress != address(0), zeroAddressWarning);
            require(newChadBadgeAddress != GavelTokenAddress && newChadBadgeAddress != RedPenTokenAddress, "What are you doing?");
            ChadBadgeAddress = newChadBadgeAddress;
            _resetVote();
            emit AddressUpdated(newChadBadgeAddress, "New ChadBadge Address");
        }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev  END                                                                                ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// @dev                                                                                     ////
    /// @dev                                                                                     ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// @dev                                                                                     ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////