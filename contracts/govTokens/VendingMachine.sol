pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract VendingMachine {
    
    ERC20Burnable public redPens;
    
    address public treasuryAddress;
    bool private hasBeenInitated = false;
    
    uint256 public inStock = 0;
    uint256 private decimals = 10 ** 18;
    uint public penToNativeRatio = 10;

    event  Deposit(address indexed dst, uint amount);
    event  Dispersed(address indexed src, uint amount);

    mapping (address => uint) private pendingBalance;

    constructor (address redPensAddress, address _treasuryAddress) {
        redPens = ERC20Burnable(redPensAddress);
        treasuryAddress = _treasuryAddress;
    }

    // This vending machine can only be used once.
    function initiateStock() public {
        require(!hasBeenInitated);
        inStock = _fromWei(redPens.balanceOf(address(this)));
        penToNativeRatio = inStock / 1000;
        hasBeenInitated = true;
    }

    function _fromWei(uint256 amount) internal view returns (uint256 fromWeiAmount) {
        fromWeiAmount = amount / decimals;
    }

    receive() external payable  {
        deposit();
    }
    function deposit() public payable {
        pendingBalance[msg.sender] = msg.value;
        emit Deposit(msg.sender, msg.value);
        require(_vend());
    }
    function _vend() internal returns (bool) {
        
        uint256 amount = pendingBalance[msg.sender];
        require(amount >= 0);

        amount = amount * penToNativeRatio;
        pendingBalance[msg.sender] = 0;

        require(pendingBalance[msg.sender] == 0);  
        _transfer(msg.sender, amount);

        inStock = _fromWei(redPens.balanceOf(address(this)));
        penToNativeRatio = inStock / 1000;

        emit Dispersed(msg.sender, amount);

        return (pendingBalance[msg.sender] == 0);
    }

    function simulateVend(uint _value) public view returns (uint _amount) {
        
        _amount = _value;
        require(_amount >= 0);
        _amount = _amount * penToNativeRatio;

        return (_amount);
    }

    function _transfer(address to, uint amount) internal returns (bool) {
        pendingBalance[msg.sender] -= amount;
        return redPens.transferFrom(address(this), to, amount);
    }

    function sendPensToTreasury() public returns (bool) {
        uint balance = redPens.balanceOf(address(this));
        require(_transfer(treasuryAddress, balance), "Error Transfering");
        return true;
    }

    function coinCollect() public returns (bool) {
        uint balance = address(this).balance;
        payable(treasuryAddress).transfer(balance);
        return true;
    }

}
