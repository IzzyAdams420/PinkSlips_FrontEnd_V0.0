pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VendingMachine {
    
    ERC20 public redPens;
    
    bool private hasBeenInitated = false;
    
    uint256 public inStock = 0;
    uint256 private decimals = 10 ** 18;
    uint public penToNativeRatio = 10;

    event  Deposit(address indexed dst, uint amount);
    event  Dispersed(address indexed src, uint amount);

    mapping (address => uint) private pendingBalance;

    constructor (address redPensAddress) {
        redPens = ERC20(redPensAddress);
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
        pendingBalance[msg.sender] += msg.value;
        Deposit(msg.sender, msg.value);
        _vend();
    }
    function _vend() internal returns (bool) {
        
        uint256 amount = pendingBalance[msg.sender];
        require(amount >= 0);
        amount = amount * penToNativeRatio;
        pendingBalance[msg.sender] = 0;
        require(pendingBalance[msg.sender] == 0);  
        redPens.transfer(msg.sender, amount);
        inStock = _fromWei(balanceOf(address(this)));
        penToNativeRatio = inStock / 1000;
        Dispersed(msg.sender, amount);
        return pendingBalance[msg.sender] == 0;
    }

    function _transfer(address to, uint amount) internal returns (bool) {
        pendingBalance[msg.sender] -= amount;
        return redPens.transferFrom(address(this), to, amount);
    }

}
