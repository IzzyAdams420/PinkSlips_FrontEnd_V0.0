// SPDX-License-Identifier: MIT
// Inspired by SushiSwap SushiBar

pragma solidity ^0.8.0;

import "../src/SmartConsensusMachine.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JuryPool is ERC721, ERC721Enumerable, SmartConsensusMachine {

    ERC20 public redPens;
    uint private tokenIdGenerator = 1;
    uint256 public totalShares = 0;

    constructor(address _AddressManagerAddress) SmartConsensusMachine(_AddressManagerAddress) ERC721("Jurry Hats", "Hat")  {


    }

    mapping (uint => uint256) public JurrorStake;

    
    function updateStakingToken() public {
        redPens = ERC20(addressManager.RedPenTokenAddress());
    }

    function getHatBalance(uint _tokenId) public returns (uint256 hatBalance) {

        // hatBalance = JurrorStake[_tokenId];
        return JurrorStake[_tokenId];
    }
    
    function stakePens() public {
        uint256 amountToStake = redPens.balanceOf(msg.sender);
        stakePens(amountToStake);
    }

    function stakePens(uint256 _amount) public {
 
        uint256 totalPensInPool = redPens.balanceOf(address(this));
        uint256 totalSharesCirculating = totalShares;
        uint _tokenId;
        redPens.transferFrom(msg.sender, address(this), _amount);


        if ( balanceOf(msg.sender) < 1) {
            _tokenId = tokenIdGenerator;
            _safeMint(msg.sender, _tokenId);
            tokenIdGenerator += 1;
        } else if (balanceOf(msg.sender) >= 1) {
            _tokenId = tokenOfOwnerByIndex(msg.sender, 1);
        }   

        if (totalSharesCirculating > 0) {
            _amount = (_amount * totalSharesCirculating / totalPensInPool);
        }

        JurrorStake[_tokenId] += _amount; 
        totalShares += _amount;

    }

    // Only use this one if you have multiple staked positions that you are managing manually.
    function stakePens(uint256 _amount, uint tokenIdToStakeWith) public {
 
        uint256 totalPensInPool = redPens.balanceOf(address(this));
        uint _tokenId;
        redPens.transferFrom(msg.sender, address(this), _amount);

        if (totalShares > 0) {
            _amount = (_amount * totalShares / totalPensInPool);
        }

        JurrorStake[_tokenId] += _amount; 
        totalShares += _amount;

    }


    function returnHats() public {
        require(balanceOf(msg.sender) > 0);
         uint256 _tokenId = tokenOfOwnerByIndex(msg.sender, 1);
         returnHats(_tokenId);
    }

    function returnHats(uint256 _tokenId) public {

        require (ownerOf(_tokenId) == msg.sender);
        uint256 _amount = JurrorStake[_tokenId];
        uint256 pensToDistrubute = (_amount * (redPens.balanceOf(address(this))) / totalShares);
        JurrorStake[_tokenId] = 0;
        totalShares -= _amount;
        _burn(_tokenId);
        redPens.transfer(msg.sender, pensToDistrubute);
    
    }

    function returnHats(uint256 _amount, uint256 _tokenId) public {

        require (ownerOf(_tokenId) == msg.sender);
        if (JurrorStake[_tokenId] <= _amount) {
            _amount = JurrorStake[_tokenId];
        }
        uint256 pensToDistrubute = (_amount * (redPens.balanceOf(address(this))) / totalShares);
        totalShares -= _amount;

        if (JurrorStake[_tokenId] == _amount) {
            _burn(_tokenId);
            JurrorStake[_tokenId] = 0;

        } else if (JurrorStake[_tokenId] > _amount) {
            JurrorStake[_tokenId] -= _amount;
        }
        
        redPens.transfer(msg.sender, pensToDistrubute);
    
    }

    function slashToken(uint _tokenIdToSlash, uint _percentToSlashInWholeNumber) public BAILIFF {

        require(_percentToSlashInWholeNumber < 100);
        uint256 amountToSlash = JurrorStake[_tokenIdToSlash] * _percentToSlashInWholeNumber / 100;
        _slash(_tokenIdToSlash, amountToSlash);

    }

    function _slash(uint _tokenIdToSlash, uint _amountToSlash) internal {
        JurrorStake[_tokenIdToSlash] -= _amountToSlash;
    }

    function _updateTokenAddresses() internal override {

        updateStakingToken();
        super._updateTokenAddresses();
        
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override (ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControlEnumerable, ERC721, ERC721Enumerable) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC20).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

}