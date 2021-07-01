    pragma solidity ^0.8.0;

    import "./AddressManagerReciever.sol";

    import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
   
    contract SmartConsensusMachine is AccessControlEnumerable, AddressManagerReciever {
       
        bytes32 public constant THE_COURT_ROLE = keccak256("THE_COURT_ROLE");
        bytes32 public constant GAVELS_BAILIFF = keccak256("GAVELS_BAILIFF");
        bytes32 public constant JURY_BAILIFF = keccak256("JURY_BAILIFF");
        bytes32 public constant MINI_BAILIFF_ROLE = keccak256("MINI_BAILIFF_ROLE");
        bytes32 public constant JERK_ROLE = keccak256("JERK_ROLE");

        bool public jerkSanctions = false;

        //To generate Consensus (false by default)
        bool public GavelVote = false;
        bool public JuryVote = false;

        bool private isSetUp = false;

        constructor(address _AddressManagerAddress) AddressManagerReciever(_AddressManagerAddress) {

            updateAllAddresses();
            _syncVotes(); 
            _setupRole(DEFAULT_ADMIN_ROLE, TheCourtAddress);
            _setupRole(THE_COURT_ROLE, TheCourtAddress);
            _setupRole(GAVELS_BAILIFF, GavelDAOAgent);
            _setupRole(JURY_BAILIFF, JuryDAOAgent);
            _setupRole(MINI_BAILIFF_ROLE, MiniBailiff);
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

        modifier MINI_BAILIFF {
            require(hasRole(THE_COURT_ROLE, msg.sender)
                    || hasRole(GAVELS_BAILIFF, msg.sender)
                    || hasRole(JURY_BAILIFF, msg.sender)
                    || hasRole(MINI_BAILIFF_ROLE, msg.sender),
                    "You're not the bailiff");
            _;
        }

        modifier NOT_JERK {
            if (jerkSanctions == true) {
                require(!hasRole(JERK_ROLE, msg.sender));
            }
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

        function _syncVotes() internal {
            GavelVote = addressManager.GavelVote();
            JuryVote = addressManager.JuryVote();      
        }

        function syncVotes() public {
            _syncVotes();      
        }

        function resetVote() public BAILIFF { 
            addressManager.resetVote();
            syncVotes();
        }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev UPDATE ROLES                                                                        ////
    /// @dev                                                                                     ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


        function _updateRole(bytes32 ROLE_TO_GRANT) internal returns(bool) {
            // UPDATE ROLES
            uint numberOfRoleHodlers = addressManager.getRoleMemberCount(ROLE_TO_GRANT);
            uint index = 0;
            for (index = 0; index < numberOfRoleHodlers; index++) {
                address roleHolder = addressManager.getRoleMember(ROLE_TO_GRANT, index);
                this.grantRole(ROLE_TO_GRANT, roleHolder);
            }
            return true;
        }

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


        function _updateAllRoles() internal returns(bool) {
            // Clear Bailiff Role
            _clearRole(THE_COURT_ROLE);
            require(_updateRole(THE_COURT_ROLE));

            _clearRole(GAVELS_BAILIFF);
            require(_updateRole(GAVELS_BAILIFF));

            _clearRole(JURY_BAILIFF);
            require(_updateRole(JURY_BAILIFF));

            _clearRole(MINI_BAILIFF_ROLE);
            require(_updateRole(MINI_BAILIFF_ROLE));

            _clearRole(JERK_ROLE);
            require(_updateRole(JERK_ROLE));

            _clearRole(DEFAULT_ADMIN_ROLE);
            require(_updateRole(DEFAULT_ADMIN_ROLE));

            _syncVotes(); 

            return true;
        }

        function _syncSingleRole(bytes32 ROLE_TO_SYNC) internal returns(bool) {
            // SYNC ROLES
            uint numberOfAllRoleHodlers = addressManager.getRoleMemberCount(ROLE_TO_SYNC);
            uint numberOfCurrentRoleHodlers = this.getRoleMemberCount(ROLE_TO_SYNC);
            uint numberOfNewRoleHodlers = numberOfAllRoleHodlers - numberOfCurrentRoleHodlers;
            
            require(numberOfNewRoleHodlers > 0, "Nothing to sync!");
            
            uint index = 0;
            for (index = 0; index < numberOfNewRoleHodlers; index++) {
                address roleHolder = addressManager.getRoleMember(ROLE_TO_SYNC, index);
                this.grantRole(ROLE_TO_SYNC, roleHolder);
            }
            return true;

        }

       

        function updateAllRoles() public {
            _updateAllRoles();
        }

        function updateSingleRole(bytes32 ROLE_TO_UPDATE) public {
            _clearRole(ROLE_TO_UPDATE);
            _updateRole(ROLE_TO_UPDATE);
        }

        function syncSingleRole(bytes32 ROLE_TO_SYNC) public {
            _syncSingleRole(ROLE_TO_SYNC);

        }

        function syncAllRoles() public {
            _syncSingleRole(THE_COURT_ROLE);
            _syncSingleRole(GAVELS_BAILIFF);
            _syncSingleRole(JURY_BAILIFF);
            _syncSingleRole(MINI_BAILIFF_ROLE);
            _syncSingleRole(JERK_ROLE);
            _syncSingleRole(DEFAULT_ADMIN_ROLE);
            _syncVotes(); 
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