pragma solidity ^0.8.0;

import "../SmartConsensusMachine.sol";
import "../AddressManagerReciever.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract IdentityBadge is SmartConsensusMachine, ERC721, Pausable, ERC721Enumerable {
    
    uint256 private _tokenIdGenerator = 0;

    bool public isForeverLocked = false;

    string public badgeColor;
    string public badgeName;

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
    struct IDCard { // struct will store the psuedonym and avatar NFT information.
        string pseudonym;
        string twitterHandle;
        address avatarTokenAddress;
        uint avatarTokenId;
        // uint avatarChainId; // may want to add this. Will consider.
    }

    mapping (uint => IDCard) public IDCardInfo; 
    mapping (string => uint) public TwitterHandle;


    
    function _setBadgeInfo(string memory _pseudonym, string memory _twitterHandle, address _avatarTokenAddress, uint _avatarTokenId, uint _tokenId) internal {
        
        require(TwitterHandle[_twitterHandle] == 0, "Already a badge associated with this handle");

        IDCardInfo[_tokenId].twitterHandle = _twitterHandle;
        IDCardInfo[_tokenId].avatarTokenAddress = _avatarTokenAddress; 
        IDCardInfo[_tokenId].avatarTokenId = _avatarTokenId;
        IDCardInfo[_tokenId].pseudonym = _pseudonym;

        TwitterHandle[_twitterHandle] = _tokenId;
    }

    function updateAvatar(uint _tokenId, address _avatarTokenAddress, uint _avatarTokenId) public {
        require(balanceOf(msg.sender) > 0);
        _tokenId = tokenOfOwnerByIndex(msg.sender, 0);
        _updateAvatar(_tokenId, _avatarTokenAddress, _avatarTokenId);

    }

    function _updateAvatar(uint _tokenId, address _avatarTokenAddress, uint _avatarTokenId) internal {
        require(ownerOf(_tokenId) == msg.sender, "Double check your ID Number");
        IDCardInfo[_tokenId].avatarTokenAddress = _avatarTokenAddress; 
        IDCardInfo[_tokenId].avatarTokenId = _avatarTokenId;
    }

    function getIDFromHandle(string memory _TwitterHandle) public view returns (uint _tokenId) {
        _tokenId = TwitterHandle[_TwitterHandle];
        return ( _tokenId );
    }

    function getBadgeInfo(uint _tokenId) public view returns (string memory _pseudonym, string memory _twitterHandle, address _avatarTokenAddress, uint _avatarTokenId ) {
        _pseudonym = IDCardInfo[_tokenId].pseudonym;
        _avatarTokenAddress = IDCardInfo[_tokenId].avatarTokenAddress;
        _avatarTokenId = IDCardInfo[_tokenId].avatarTokenId;
        _twitterHandle =IDCardInfo[_tokenId].twitterHandle;
        return (_pseudonym, _twitterHandle, _avatarTokenAddress, _avatarTokenId );
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Issuance Desk                                                                            ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    function issueBadge(address receivingAddress, string memory _pseudonym, string memory _twitterHandle, address _avatarTokenAddress, uint _avatarTokenId, uint _tokenId) public virtual
        BAILIFF
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        require((receivingAddress != msg.sender) && (receivingAddress != address(0)));
        require(balanceOf(receivingAddress) <= 0, "Only one ID per wallet");
        newId = _tokenIdGenerator;
        _setBadgeInfo(_pseudonym, _twitterHandle, _avatarTokenAddress, _avatarTokenId, _tokenId);
        _safeMint(receivingAddress, _tokenIdGenerator);
        _tokenIdGenerator += 1;
       
     }

    function revokeBadge(uint tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId),
                    "Nice Try, Bucko") ;
        _burn(tokenId);
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
        return (owner == msg.sender || isApprovedForAll(owner, spender));
    }

    
    function _approve(address to, uint256 tokenId)
    internal virtual
    override (ERC721)
    {
        require( hasRole(THE_COURT_ROLE, msg.sender),
                    "You do not have permission to approve this badge");
        super._approve(to, tokenId);
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

        address owner = ownerOf(tokenId);
        require((msg.sender == owner || isApprovedForAll(from, msg.sender)),
                    "You do not have permission to move this badge");
        
        super.transferFrom(from, to, tokenId);
        // revert("You're not authorized to use this function"); // makes function revert back/fail
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        address owner = ownerOf(tokenId);
        require( (msg.sender == owner || isApprovedForAll(from, msg.sender)),
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