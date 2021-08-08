    pragma solidity ^0.8.0;

    import "./forked/AccessControlEnumerable.sol";
   
    contract ConsensusMachine is AccessControlEnumerable {
       
        bytes32 public constant THE_COURT_ROLE = keccak256("THE_COURT_ROLE");
        bytes32 public constant GAVELS_BAILIFF = keccak256("GAVELS_BAILIFF");
        bytes32 public constant JURY_BAILIFF = keccak256("JURY_BAILIFF");
        bytes32 public constant MINI_BAILIFF_ROLE = keccak256("MINI_BAILIFF_ROLE");
        bytes32 public constant JERK_ROLE = keccak256("JERK_ROLE");

        //To generate Consensus (false by default)
        bool public jerkSanctions = false;

        bool public GavelVote = false;
        bool public JuryVote = false;

        constructor(address juryDAOAgent, address gavelDAOAgent, address theCourtAddress) {
            _setupRole(DEFAULT_ADMIN_ROLE, theCourtAddress);
            _setupRole(THE_COURT_ROLE, theCourtAddress);
            _setupRole(GAVELS_BAILIFF, gavelDAOAgent);
            _setupRole(JURY_BAILIFF, juryDAOAgent);
            _setupRole(MINI_BAILIFF_ROLE, theCourtAddress);
            _setupRole(JERK_ROLE, address(0));
            
        }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Permission Modifiers                                                                     ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

        modifier BAILIFF {
            require(hasRole(THE_COURT_ROLE, msg.sender)
                    || hasRole(GAVELS_BAILIFF, msg.sender)
                    || hasRole(JURY_BAILIFF, msg.sender),
                    "You're not the bailiff");
            _;
        }

        modifier NOT_JERK {
            if (jerkSanctions == true) {
                require(!hasRole(JERK_ROLE, msg.sender));
            }
            _;
        }

        modifier MINI_BAILIFF {
            require(hasRole(THE_COURT_ROLE, msg.sender)
                    || hasRole(GAVELS_BAILIFF, msg.sender)
                    || hasRole(JURY_BAILIFF, msg.sender)
                    || hasRole(MINI_BAILIFF_ROLE, msg.sender),
                    "You're not the bailiff");
            _;
        }

        modifier GAVELS {
            require(hasRole(GAVELS_BAILIFF, msg.sender)
                    || hasRole(THE_COURT_ROLE, msg.sender)
                    , "You're not the Gavels");
            _;
        }

        modifier JURY {
            require(hasRole(JURY_BAILIFF, msg.sender)
                    || hasRole(THE_COURT_ROLE, msg.sender), "You're not the Jury");
            _;
        }

        // Requires a YES vote from both DAOs
        modifier THE_COURT {
            require(hasRole(GAVELS_BAILIFF, msg.sender)
                    || hasRole(JURY_BAILIFF, msg.sender)
                    || hasRole(THE_COURT_ROLE, msg.sender));
            require((GavelVote == JuryVote == true)
                    || hasRole(THE_COURT_ROLE, msg.sender)
                    , "Court Must Agree");
            _;
        }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Consensus Machine                                                                        ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

        function vote(bool _vote) public BAILIFF {

            if (hasRole(THE_COURT_ROLE, msg.sender)) {
                
                GavelVote = _vote;
                JuryVote = GavelVote;
            
            } else if (hasRole(GAVELS_BAILIFF, msg.sender)) {
                GavelVote = _vote;
            } else if (hasRole(JURY_BAILIFF, msg.sender)) {
                JuryVote = _vote;
            }
        
        }

        function resetVote() public BAILIFF { 
            _resetVote();
        }


        function _resetVote() internal { 
            GavelVote = false;
            JuryVote = false;
        }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev  CLEAR ROLES                                                                        ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

        function _clearRole(bytes32 ROLE_TO_CLEAR) internal returns(bool) {
            // Clear Roles
            uint numberOfRoleHodlers = this.getRoleMemberCount(ROLE_TO_CLEAR);
            uint index = 0;
            for (index = 0; index < numberOfRoleHodlers; index++) {
                address roleHolder = this.getRoleMember(ROLE_TO_CLEAR, index);
                this.revokeRole(ROLE_TO_CLEAR, roleHolder);
            }
            return true;

            
        }

        function _purgeUser(address addressToPurge) internal returns(bool) {

            revokeRole(JURY_BAILIFF, addressToPurge);
            revokeRole(GAVELS_BAILIFF, addressToPurge);
            revokeRole(THE_COURT_ROLE, addressToPurge);
            revokeRole(DEFAULT_ADMIN_ROLE, addressToPurge);
            return true;
        }


        function _purgeSelf(address addressToPurge) internal returns(bool) {

            renounceRole(JURY_BAILIFF, addressToPurge);
            renounceRole(GAVELS_BAILIFF, addressToPurge);
            renounceRole(THE_COURT_ROLE, addressToPurge);
            renounceRole(DEFAULT_ADMIN_ROLE, addressToPurge);
            return true;
        }

        function resetSingleRole(bytes32 ROLE_TO_UPDATE, address newRoleHolder) public THE_COURT {
            _clearRole(ROLE_TO_UPDATE);
            this.grantRole(ROLE_TO_UPDATE, newRoleHolder);
            _resetVote();
        }

        function purgeUser(address addressToPurge) public THE_COURT {
            require(addressToPurge != msg.sender);
            _purgeUser(addressToPurge);
            _resetVote();
        }

        function purgeSelf(bool areYouSure) public returns (bool){
            if (areYouSure == true) {
                _purgeSelf(msg.sender);
                return true;
            } else {return false;}
        }

        function toggleJerkSanctions() public JURY {
            if(jerkSanctions == true) {
                jerkSanctions = false;
            } else { jerkSanctions = false; }
        }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev  END                                                                                ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    }
