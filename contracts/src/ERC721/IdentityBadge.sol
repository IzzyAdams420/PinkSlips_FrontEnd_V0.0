pragma solidity ^0.8.0;

import "../SmartConsensusMachine.sol";
import "../AddressManagerReciever.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract IdentityBadge is SmartConsensusMachine, ERC721, Pausable, ERC721URIStorage, ERC721Enumerable {
    
    uint256 private _tokenIdGenerator = 1;

    bool public isForeverLocked = false;

    string public socialPlatform;
    string public badgeColor;
    string public badgeName;
    string public baseURI_ = string(abi.encodePacked("ipfs", ":", "/", "/"));

    constructor(string memory _badgeName, string memory _badgeSymbol, string memory _socialPlatform, address _AddressManagerAddress)
        ERC721(_badgeName, _badgeSymbol)
        SmartConsensusMachine(_AddressManagerAddress) {
       
        updateAllAddresses();
        
        badgeColor = _badgeSymbol;
        badgeName = _badgeName;
        socialPlatform = socialPlatform;

    }      
    
    //******************************
    //                            **
    //     Setup mapping          ** 
    //                            **
    //******************************
    struct IDCard { // struct will store the psuedonym and avatar NFT information.
        string pseudonym;
        string socialHandle;
        address avatarTokenAddress;
        uint avatarTokenId;
        uint avatarNetworkId;
    }


    mapping (uint => bool) public UserTransferApproved;
    mapping (uint => IDCard) public IDCardInfo; 
    mapping (string => uint) public SocialHandle;
    mapping (string => uint) public Pseudonym;

    function _checkAvailibility(string memory _socialHandle, string memory _pseudonym) internal returns (bool) {
        require(SocialHandle[_socialHandle] <= 1, "Already an ID associated with this social account");
        require(Pseudonym[_pseudonym] <= 1, "Already an ID associated with this pseudonym");
        return true;
    }

    
    function _setBadgeInfo(string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress, uint _avatarTokenId, uint _tokenId) internal {
        
        
        require(_checkAvailibility(_socialHandle, _pseudonym));
        IDCardInfo[_tokenId].socialHandle = _socialHandle;
        IDCardInfo[_tokenId].avatarTokenAddress = _avatarTokenAddress; 
        IDCardInfo[_tokenId].avatarTokenId = _avatarTokenId;
        IDCardInfo[_tokenId].pseudonym = _pseudonym;

        //Assumes Mainnet if not specified...
        IDCardInfo[_tokenId].avatarNetworkId = 1;

        SocialHandle[_socialHandle] = _tokenId;
        Pseudonym[_pseudonym] = _tokenId;
    }

    function _setBadgeInfo(string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress, uint _avatarTokenId, uint _avatarNetworkId, uint _tokenId) internal {
        
        require(_checkAvailibility(_socialHandle, _pseudonym));

        IDCardInfo[_tokenId].socialHandle = _socialHandle;
        IDCardInfo[_tokenId].avatarTokenAddress = _avatarTokenAddress; 
        IDCardInfo[_tokenId].avatarTokenId = _avatarTokenId;
        IDCardInfo[_tokenId].pseudonym = _pseudonym;
        IDCardInfo[_tokenId].avatarNetworkId = _avatarNetworkId;

        SocialHandle[_socialHandle] = _tokenId;
        Pseudonym[_pseudonym] = _tokenId;
    }

    function updateAvatar(address _avatarTokenAddress, uint _avatarTokenId) public {
        require(balanceOf(msg.sender) > 0);
        uint _tokenId = tokenOfOwnerByIndex(msg.sender, 0);
        _updateAvatar(_tokenId, _avatarTokenAddress, _avatarTokenId);
    }

    function updateAvatar(uint _tokenId, address _avatarTokenAddress, uint _avatarTokenId) public {
        require(_isApprovedOrOwner(msg.sender, _tokenId));
        _updateAvatar(_tokenId, _avatarTokenAddress, _avatarTokenId);
    }

    function updateAvatar(uint _tokenId, address _avatarTokenAddress, uint _avatarTokenId, uint _avatarNetworkId) public {
        require(_isApprovedOrOwner(msg.sender, _tokenId));
        _updateAvatar(_tokenId, _avatarTokenAddress, _avatarTokenId, _avatarNetworkId);
    }

    function updateImageHash(uint256 _tokenId, string memory _contentHash) public {
        require(_isApprovedOrOwner(msg.sender, _tokenId));
        _setTokenURI( _tokenId, _contentHash);
    }

    function _updateAvatar(uint _tokenId, address _avatarTokenAddress, uint _avatarTokenId) internal {
        IDCardInfo[_tokenId].avatarTokenAddress = _avatarTokenAddress; 
        IDCardInfo[_tokenId].avatarTokenId = _avatarTokenId;
    }

    function _updateAvatar(uint _tokenId, address _avatarTokenAddress, uint _avatarTokenId, uint _avatarNetworkId) internal {
        IDCardInfo[_tokenId].avatarTokenAddress = _avatarTokenAddress; 
        IDCardInfo[_tokenId].avatarTokenId = _avatarTokenId;
        IDCardInfo[_tokenId].avatarNetworkId = _avatarNetworkId;
    }

    function getIDFromHandle(string memory _SocialHandle) public view returns (uint _tokenId) {
        _tokenId = SocialHandle[_SocialHandle];
        return ( _tokenId );
    }

    function getBadgeInfo(uint _tokenId) public view returns (string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress, uint _avatarTokenId ) {
        _pseudonym = IDCardInfo[_tokenId].pseudonym;
        _avatarTokenAddress = IDCardInfo[_tokenId].avatarTokenAddress;
        _avatarTokenId = IDCardInfo[_tokenId].avatarTokenId;
        _socialHandle =IDCardInfo[_tokenId].socialHandle;
        return (_pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId );
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Issuance Desk                                                                            ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    function issueBadge(address receivingAddress, string memory _pseudonym, string memory _socialHandle,
                            address _avatarTokenAddress, uint _avatarTokenId, uint _tokenId, string memory _TokenURI) public virtual
        BAILIFF
        returns(uint newId) {
            uint _avatarNetworkId = 1;
            string memory _tokenURI = "";
            newId = _issueBadge(receivingAddress, _pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId, _avatarNetworkId, _tokenURI); 
     }

    function issueBadge(address receivingAddress, string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress,
                            uint _avatarTokenId, uint _avatarNetworkId, uint _tokenId) public virtual
        BAILIFF
        returns(uint newId) {
        string memory _tokenURI = "";
        newId = _issueBadge(receivingAddress, _pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId, _avatarNetworkId, _tokenURI);
       
    }
    
    function issueBadge(address receivingAddress, string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress,
                            uint _avatarTokenId, uint _avatarNetworkId, uint _tokenId, string memory _tokenURI) public virtual
        BAILIFF
        returns(uint newId) {
        newId = _issueBadge(receivingAddress, _pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId, _avatarNetworkId, _tokenURI);       
    }

    function _issueBadge(address receivingAddress, string memory _pseudonym, string memory _socialHandle, address _avatarTokenAddress,
                            uint _avatarTokenId, uint _avatarNetworkId, string memory _tokenURI) internal virtual
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        require((receivingAddress != msg.sender) && (receivingAddress != address(0)));
        require(balanceOf(receivingAddress) <= 0, "Only one ID per wallet");
        newId = _tokenIdGenerator;
        _setBadgeInfo(_pseudonym, _socialHandle, _avatarTokenAddress, _avatarTokenId, _avatarNetworkId, newId);
        _safeMint(receivingAddress, newId);
        _setTokenURI(newId, _tokenURI);
        _tokenIdGenerator += 1;
        
       
     }


    function revokeBadge(uint _tokenId) public {
        require(isApprovedForAll(ownerOf(_tokenId), msg.sender),
                    "Please visit the DAO to renounce your citizenship!") ;
        _burn(_tokenId);
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Maintanence\\\\\\\\\\\\\\\\\\\\\\\\\\\                                                   ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    // Pause the contract if neccesary. Only the Gavels can do this.
    function pause() public GAVELS {
        _pause();
    }

    function unpause() public GAVELS {
        require(isForeverLocked == false);
        _unpause();
    }

    function _burnAllBadges() internal returns (bool) {
        // burn all badges
        uint256 index = 0;
        for (index = 0; index < _tokenIdGenerator; index++) {
            if (_exists(index)) {
                _burn(index);
            }   
        }
        _tokenIdGenerator = 0;
        return true;
    }

    function refreshBadges(bool _thisIsNotReversible) public THE_COURT returns (bool) {

        if(_thisIsNotReversible == true) {
            // burn all badges
            _burnAllBadges();
            return true;
        } else {return false;}
    }


    function destroyAndLockContract(uint _valueMustBe69) public THE_COURT returns (bool) {

        if(_valueMustBe69 == 69) {
            // burn all badges
            _burnAllBadges();
            // set protocol to locked
            _pause();
            isForeverLocked = true;
            return isForeverLocked;
        } else {return false;}
    }

    function setBaseURI(string memory _baseURIString) public BAILIFF returns (bool) {
        _setBaseURI(_baseURIString);
        return true;
    }

    function _setBaseURI(string memory _baseURIString) internal returns (bool) {
        baseURI_ = _baseURIString;
        return true;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI_;
    }
    function tokenURI(uint256 _tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory _URI) {
        _URI = ERC721URIStorage.tokenURI(_tokenId);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Transfer rules                                                                           ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    

    function approveUserTransfer(uint _tokenId) public BAILIFF{
        require(_approveTransfer(_tokenId));
    }

    function _approveTransfer(uint _tokenId) internal returns (bool) {
        UserTransferApproved[_tokenId] = true;
        return true;
    }

    function _undoApproveTransfer(uint _tokenId) internal returns (bool) {
        UserTransferApproved[_tokenId] = false;
    }

    function isApprovedForAll(address owner, address operator)
    public view virtual
    override (ERC721)
    returns (bool) {

        bool isApproved = ( hasRole(THE_COURT_ROLE, operator)
                            || hasRole(JURY_BAILIFF, operator));
        return isApproved;
    }

    function setApprovalForAll(address operator, bool approved)
    public virtual
    override (ERC721) {
        
         require(   hasRole(THE_COURT_ROLE, msg.sender)
                    || hasRole(JURY_BAILIFF, msg.sender),
                    "You do not have permission to set approval for all");
        super.setApprovalForAll(operator, approved);
    }

    function _beforeTokenTransfer(address from, address to, uint256 _tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        require(isApprovedForAll(from, msg.sender) || UserTransferApproved[_tokenId], "Please visit the DAO to change your address!");
         
        if (UserTransferApproved[_tokenId] && _isApprovedOrOwner(msg.sender, _tokenId)) {
            require(UserTransferApproved[_tokenId]);
            require(_undoApproveTransfer(_tokenId));
            super._beforeTokenTransfer(from, to, _tokenId);
        } else {
            super._beforeTokenTransfer(from, to, _tokenId);
        }

    }
    
    function _burn(uint256 tokenId) internal virtual override (ERC721, ERC721URIStorage){
        ERC721URIStorage._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// End                                                                                      ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
}