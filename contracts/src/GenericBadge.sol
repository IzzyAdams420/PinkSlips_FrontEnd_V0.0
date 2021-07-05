pragma solidity ^0.8.0;

import "./SmartConsensusMachine.sol";
import "./AddressManagerReciever.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract GenericBadge is SmartConsensusMachine, ERC721, Pausable, ERC721Enumerable {
    
    // Set Default Minting Costs to 3 Red Pens.
    uint256 public mintingCost = 3 * 10 ** 18;

    // Set Default Minting Cost Floor to 1 Red Pens
    uint256 public mintingCostFloor = 1 * 10 ** 17;

    uint256 public payItForwardTreasuryRatio_Numerator = 2;
    uint256 public payItForwardTreasuryRatio_Divisor = 3;

    uint256 private _tokenIdGenerator = 0;

    bool public isForeverLocked = false;
    bool public payReciver;

    string public badgeColor;
    string public badgeName;

    ERC20 public redPens = ERC20(RedPenTokenAddress);

     constructor(string memory _badgeName, string memory _badgeSymbol, bool _payReciver, address _AddressManagerAddress)
        ERC721(_badgeName, _badgeSymbol)
        SmartConsensusMachine(_AddressManagerAddress){
       
       // updateAllAddresses();
        badgeColor = _badgeSymbol;
        badgeName = _badgeName;

        payReciver = _payReciver;
        redPens = ERC20(RedPenTokenAddress);
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


    function isBadgeSender(address addressToCheck, uint badgeTokenID) public returns (bool){

        if (addressToCheck == (BadgeInfo[badgeTokenID].gifter)) {
            return true;
        } else { return false;}

    }
    
    //******************************
    //                            **
    //  Set payment modifier      ** 
    //                            **
    //******************************


    modifier PAY_WITH_PENS(address receivingAddress) {      

        uint256 expectedContractBalance;

        if (payReciver == true) {
        uint256 portionOfMintingCost = mintingCost / payItForwardTreasuryRatio_Divisor;
        expectedContractBalance = redPens.balanceOf(address(this)) + (payItForwardTreasuryRatio_Numerator * portionOfMintingCost);

        redPens.transferFrom(msg.sender, address(this), (payItForwardTreasuryRatio_Numerator * portionOfMintingCost));
        redPens.transferFrom(msg.sender, receivingAddress, (portionOfMintingCost * (payItForwardTreasuryRatio_Divisor - payItForwardTreasuryRatio_Numerator)));
        } else {
            expectedContractBalance = redPens.balanceOf(address(this)) + mintingCost;
            redPens.transferFrom(msg.sender, address(this), mintingCost);
        }
        
        require(redPens.balanceOf(address(this)) == expectedContractBalance, "Error Transfering !RED");
        
        _;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// Issuance Desk                                                                            ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////


    function issueBadge(address receivingAddress, string memory _reason) public
        PAY_WITH_PENS(receivingAddress) 
        returns(uint newId) { // Right now function also increments and returns tokenId, this will be removed.
        require((receivingAddress != msg.sender) && (receivingAddress != address(0)));
        newId = _tokenIdGenerator;
        setBadgeInfo(msg.sender, _reason, _tokenIdGenerator);
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
    /// Set Minting Costs                                                                        ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

    function setMintingCost(uint256 costInWei) public BAILIFF returns (bool){
        require(costInWei >= mintingCostFloor, "Sorry! Cost must be greater than 0.1 RedPen");
        _setMintingCost(costInWei);
        return true;
    }

    function _setMintingCost(uint256 costInWei) internal returns (bool) {
        mintingCost = costInWei;
        return true;
    }

    function setMintingCostFloor(uint256 costFloorInWei) public BAILIFF returns (bool){

        require(costFloorInWei < mintingCostFloor, "Sorry! You can only lower the floor!");
        _setMintingCostFloor(costFloorInWei);
        return true;
    }

    function _setMintingCostFloor(uint256 costInWei) internal returns (bool) {
        mintingCostFloor = costInWei;
        return true;
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

    function updatePaymentToken() public {
        _updateTokenAddresses();
        redPens = ERC20(RedPenTokenAddress);
    }

    function _burnAllBadges() internal returns (bool) {
        // burn all badges
        uint256 index = 0;
        for (index = 0; index < _tokenIdGenerator; index++) {
            _burn(index);
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
        address owner = ERC721.ownerOf(tokenId);
        address gifter = BadgeInfo[tokenId].gifter;
        return (spender == gifter || isApprovedForAll(owner, spender));
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

        address gifter = BadgeInfo[tokenId].gifter;
        require( (msg.sender == gifter || isApprovedForAll(from, msg.sender)),
                    "You do not have permission to move this badge");
        
        super.transferFrom(from, to, tokenId);
        // revert("You're not authorized to use this function"); // makes function revert back/fail
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        address gifter = BadgeInfo[tokenId].gifter;
        require( (msg.sender == gifter || isApprovedForAll(from, msg.sender)),
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