    pragma solidity ^0.8.0;

    import './ConsensusMachine.sol';
   
    contract AddressManager is ConsensusMachine {/// Change the Gavels Agent Address
        
        address public GavelTokenAddress;
        address public RedPenTokenAddress;

        address public GoldStarAddress;
        address public PinkSlipAddress;
        address public ChadBadgeAddress;
        address public ColoredIDAddress;

        
        address public  JuryPoolAddress;

        address public CourtClerk;
        address public GavelDAOAgent;
        address public JuryDAOAgent;
        address public TreasuryAddress;
        address public TheCourtAddress;

        address public MiniBailiff;

        address public newAddressManager; // For the ability to upgrade if neccesary.
        bool public hasMovedToNewAddress = false;

        string private errorMessage = "the hell are you doing? C'mon";
        string private zeroAddressWarning = "C'mon";

        string public frontEnd = "content hash stored @ coloredbadges.eth";

        uint public badgeCount = 0;

        event AddressUpdated(address, string);

        constructor(address juryDAOAgent, address gavelDAOAgent, address treasuryAddress,
                    address theCourtAddress, address _MiniBailiff)
                    ConsensusMachine(juryDAOAgent, gavelDAOAgent, theCourtAddress) {

            GavelDAOAgent = gavelDAOAgent;
            JuryDAOAgent = juryDAOAgent;
            TreasuryAddress = treasuryAddress;
            TheCourtAddress = theCourtAddress;
            MiniBailiff = _MiniBailiff;

        }

    


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Address Setters                                                                          ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

        function setnewAddressManager(address newAddressManagerAddress) public THE_COURT BAILIFF {
            require(newAddressManagerAddress != address(0), errorMessage);
            newAddressManager = newAddressManagerAddress;
            hasMovedToNewAddress = true;
            _resetVote();

            emit AddressUpdated(newAddressManagerAddress, "New AddressManagerAddress");
        }


        function _setAgent( bytes32 ROLE , address newAgentAddress) internal returns (bool) {
            require(newAgentAddress != address(0), errorMessage);
            require(!hasRole(ROLE, newAgentAddress));
            grantRole(ROLE, newAgentAddress);
            emit AddressUpdated(newAgentAddress, "Check Role Events" );
            return true;
        }

        /// Change the Gavel Agent Address
        function addGavelAgent(address newAgentAddress) public GAVELS {
            bool success = _setAgent(GAVELS_BAILIFF, newAgentAddress);
            require(success == true);
            emit AddressUpdated(newAgentAddress, "New Gavel Agent");
        }


        /// Change the Jury Agent Address
        function addJuryAgent(address newAgentAddress) public GAVELS {
            bool success = _setAgent(JURY_BAILIFF, newAgentAddress);
            require(success == true);
            emit AddressUpdated(newAgentAddress, "New Jury Agent");

        }

        function addMiniBailiff(address newAgentAddress) public BAILIFF {
            bool success = _setAgent(MINI_BAILIFF_ROLE, newAgentAddress);
            require(success == true);
            emit AddressUpdated(newAgentAddress, "New Mini Bailiff");
        }

        /// Change the Court Agent Address
        function setTheCourtAgent(address newAgentAddress) public GAVELS {
            bool success = _setAgent(THE_COURT_ROLE, newAgentAddress);
            require(success == true);
            emit AddressUpdated(newAgentAddress, "New Court Elected");
        }

        /// Change the Treasury Address
        function setTreasuryAddress(address newTreasuryAddress) public THE_COURT {
            require(newTreasuryAddress != address(0), errorMessage);
            TreasuryAddress = newTreasuryAddress;
            _resetVote();
            emit AddressUpdated(newTreasuryAddress, "New Treasury Address");
        }

        function setCourtAddress(address newCourtAddress) public THE_COURT {
            require(newCourtAddress != address(0), zeroAddressWarning);
            TheCourtAddress = newCourtAddress;
            _resetVote();
            emit AddressUpdated(newCourtAddress, "New Court Address");
            
        }

        function setCourtClerk(address _newCourtClerkAddress) public BAILIFF {
            require(_newCourtClerkAddress != address(0), zeroAddressWarning);
            CourtClerk = _newCourtClerkAddress;
            emit AddressUpdated(CourtClerk, "New Court Clerk");
            
        }

        function setGavelTokenAddress(address newGavelTokenAddress) public GAVELS {
            require(newGavelTokenAddress != address(0), zeroAddressWarning);
            require(newGavelTokenAddress != RedPenTokenAddress, "Don't mess with the balance of power");
            GavelTokenAddress = newGavelTokenAddress;
    
            emit AddressUpdated(newGavelTokenAddress, "New Gavel Token Address");            
        }

        function setJuryPoolAddress(address newJuryPoolAddress) public JURY  {
            require(newJuryPoolAddress != address(0), zeroAddressWarning);
            require(newJuryPoolAddress != GavelTokenAddress, "Don't mess with the balance of power");
            JuryPoolAddress = newJuryPoolAddress;
     
            emit AddressUpdated(newJuryPoolAddress, "New Jury Pool Address"); 
        }

        function setRedPenTokenAddress(address newRedPenTokenAddress) public JURY  {
            require(newRedPenTokenAddress != address(0), zeroAddressWarning);
            require(newRedPenTokenAddress != GavelTokenAddress, "Don't mess with the balance of power");
            RedPenTokenAddress = newRedPenTokenAddress;

            emit AddressUpdated(newRedPenTokenAddress, "New Red Pen Token Address"); 
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

        function setColoredIDAddress(address newColoredIDAddress) public THE_COURT {
            require(newColoredIDAddress != address(0), zeroAddressWarning);
            require(newColoredIDAddress != GavelTokenAddress && newColoredIDAddress != RedPenTokenAddress, "What are you doing?");
            ColoredIDAddress = newColoredIDAddress;
            _resetVote();
            emit AddressUpdated(newColoredIDAddress, "New ColoredID Address");
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