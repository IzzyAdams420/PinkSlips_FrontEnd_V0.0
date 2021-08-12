pragma solidity ^0.8.0;

import "../SmartConsensusMachine.sol";
import "../AddressManagerReciever.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GenericBadge is SmartConsensusMachine, ERC721, Pausable, ERC721URIStorage, ERC721Enumerable {
    
    uint256 private _tokenIdGenerator = 0;
    bool public isForeverLocked = false;

    string public badgeColor;
    string public badgeName;

    string public baseURI_ = string(abi.encodePacked("ipfs", ":", "/", "/"));


    constructor(string memory _badgeName, string memory _badgeSymbol, address _AddressManagerAddress)
        ERC721(_badgeName, _badgeSymbol)
        SmartConsensusMachine(_AddressManagerAddress){
       
       // updateAllAddresses();
        badgeColor = _badgeSymbol;
        badgeName = _badgeName;

        
    }      

    
    //******************************
    //                            **
    //     Setup mapping          ** 
    //                            **
    //******************************
    struct Badge { // struct will store the gifter address and reason for the gold stars
        address gifter;
        string reason;
    }

    mapping (uint => Badge) public BadgeInfo; // mapping of badge ID to badge struct(reason/gifter address)

    mapping (address => uint[]) public BadgesSent; // mapping of address to tokenIDs sent

    function nextTokenId() public view returns (uint _nextTokenId){
        _nextTokenId = _tokenIdGenerator;
    }

    function setBadgeInfo(address _gifter, string memory _reason, uint _tokenId) internal {
        BadgeInfo[_tokenId].gifter = _gifter; // assigns this goldstar gifter address to msg.sender
        BadgeInfo[_tokenId].reason = _reason; // assigns the reason for this goldstar
        BadgesSent[_gifter].push(_tokenId); // pushes tokenID to the addresses array of tokens
    }

    function getBadgeReason(uint _tokenId) public view returns (string memory _theReason) {
        _theReason = BadgeInfo[_tokenId].reason; 

        return (_theReason);
    }

    function getBadgeSender(uint _tokenId) public view returns (address _theGifter) {
        _theGifter = BadgeInfo[_tokenId].gifter; 

        return (_theGifter);
    }


    function getBadgesSent (address _gifter) public view returns (uint[] memory _BadgesSent) {
       _BadgesSent = BadgesSent[_gifter];
       return _BadgesSent; // returns array of tokenIDs sent by address
    }


    function isBadgeSender(address addressToCheck, uint badgeTokenID) public view returns (bool){

        if (addressToCheck == (BadgeInfo[badgeTokenID].gifter)) {
            return true;
        } else { return false;}

    }
    


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Issuance Desk                                                                            ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    function issueBadge(address receivingAddress, string memory _reason) public virtual
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        newId = _issueBadge(receivingAddress, _reason);
        return newId;
       
     }

    function issueBadge(address receivingAddress, string memory _reason,  string memory _tokenURI) public virtual
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        newId = _issueBadge(receivingAddress, _reason, _tokenURI);
        return newId;
       
    }

    function _issueBadge(address receivingAddress, string memory _reason) internal virtual
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        require((receivingAddress != msg.sender) && (receivingAddress != address(0)));
        newId = _tokenIdGenerator;
        setBadgeInfo(msg.sender, _reason, newId);
        _safeMint(receivingAddress, newId);
        _tokenIdGenerator += 1;
        return newId;
       
    }

    function _issueBadge(address receivingAddress, string memory _reason, string memory _tokenURI) internal virtual
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        require((receivingAddress != msg.sender) && (receivingAddress != address(0)));
        newId = _tokenIdGenerator;
        setBadgeInfo(msg.sender, _reason, newId);
        _safeMint(receivingAddress, newId);
        _setTokenURI(newId, _tokenURI);
        _tokenIdGenerator += 1;
        return newId;
       
    }

    function revokeBadge(uint tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId),
                    "Nice Try, Bucko") ;
        _burn(tokenId);
    }

   

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Internal Checks                                                                     ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

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

    function refreshBadges(bool thisIsNotReversible) public THE_COURT returns (bool) {

        if(thisIsNotReversible == true) {
            // burn all badges
            _burnAllBadges();
            return true;
        } else {return false;}
    }


    function destroyAndLockContract(uint valueMustBe69) public THE_COURT returns (bool) {

        if(valueMustBe69 == 69) {
            // burn all badges
            _burnAllBadges();
            // set protocol to locked
            _pause();
            isForeverLocked = true;
            return isForeverLocked;
        } else {return false;}
    }

    function _burn(uint256 _tokenId) internal virtual override (ERC721, ERC721URIStorage){
        ERC721URIStorage._burn(_tokenId);
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
    
    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal view virtual
        override(ERC721)
        returns (bool)
    {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(tokenId);
        return (isApprovedForAll(owner, spender));
    }

    
    function _approve(address to, uint256 tokenId)
    internal virtual
    override (ERC721)
    {
        if (hasRole(THE_COURT_ROLE, msg.sender)) {
            super._approve(to, tokenId);
        }
        
    }

    function isApprovedForAll(address owner, address operator)
    public view virtual
    override (ERC721)
    returns (bool) {

        bool isApproved = ( hasRole(THE_COURT_ROLE, operator)
                            || hasRole(GAVELS_BAILIFF, operator)
                            || hasRole(JURY_BAILIFF, operator));
        return isApproved;
    }


    function setApprovalForAll(address operator, bool approved)
    public virtual
    override (ERC721) {
        
         require(   hasRole(THE_COURT_ROLE, msg.sender)
                    || hasRole(GAVELS_BAILIFF, msg.sender)
                    || hasRole(JURY_BAILIFF, msg.sender),
                    "You do not have permission to move this badge");
        super.setApprovalForAll(operator, approved);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {

        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    //transfer functions from erc721 - need to override
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {

        require(_isApprovedOrOwner(msg.sender, tokenId),
                    "You do not have permission to move this badge");
        
        super.transferFrom(from, to, tokenId);
        // revert("You're not authorized to use this function"); // makes function revert back/fail
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
         require(_isApprovedOrOwner(msg.sender, tokenId),
                    "You do not have permission to move this badge");
        super.safeTransferFrom(from, to, tokenId);
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// End                                                                                      ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
}