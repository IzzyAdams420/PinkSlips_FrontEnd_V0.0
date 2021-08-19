pragma solidity ^0.8.0;

import "../SmartConsensusMachine.sol";
import "../AddressManagerReciever.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


abstract contract DistributionBadge {

    /*////////////////////////////////////////////////////////////////////////
    | ----------------------------
    | Colored Distribution Formula
    | ----------------------------
    | = f(n) = l-((i-l)/((n+r)/r))
    |   --------------------------
    |-| Where:
    |---> n = number of payments dispursed (paymentId)
    |   &
    |---> l = lower limit of distrubution (subsidyFloor)
    |---> i = amount to distrubute when n=0 (subsidyInitialValue)
    |---> r = Fairness Facotor, an inverse rate of decay. (fairnessFactor)
    |_________________________________________________________
    / ---------
    / CDF vars:
    / ---------
    / (n) ->  paymentId
    / (l) ->  subsidyFloor
    / (i) ->  subsidyInitialValue
    / (r )->  fairnessFactor
    /
    /////////////////////////////////////////////////////////////////////////*/


    uint256 public paymentId = 0;
    uint256 public subsidyFloor;
    uint256 public subsidyInitialValue;
    uint256 public fairnessFactor;

    uint256 public pensBalance;

    using SafeERC20 for IERC20;
    IERC20 public subsidyToken;

    
    constructor(uint256 _subsidyInitialValue, uint256 _fairnessFactor, uint256 _subsidyFloor,  address _subsidyToken) {
       
        subsidyInitialValue = _subsidyInitialValue * 10 ** 18;
        fairnessFactor = _fairnessFactor;
        subsidyFloor = _subsidyFloor * 10 ** 18;

        subsidyToken = IERC20(_subsidyToken);
        pensBalance = subsidyToken.balanceOf(address(this));
        subsidyToken.safeIncreaseAllowance(address(this), 1 * 10 ** 30);

    }      

    function _paySubsidy(address _payTo) internal returns (bool) {
        
        uint256 _mathBuffer = 10 ** 18;
        uint256 _amount1 =  subsidyInitialValue - subsidyFloor;
        uint256 _amount2 = paymentId + fairnessFactor;
        uint256 _amount3 = ( _amount2 * _mathBuffer ) / (fairnessFactor);
        uint256 _amount4 = (_amount1 * _mathBuffer) / (_amount3) ;
        uint256 _amount = _amount4 + subsidyFloor;

        uint256 initialBalance = subsidyToken.balanceOf(address(this));

        require ( initialBalance >= _amount, "Contract balance too low!");
        paymentId = paymentId + 1;
        SafeERC20.safeTransferFrom(subsidyToken, address(this), _payTo, _amount);
        uint256 newBalance = subsidyToken.balanceOf(address(this));
        require (newBalance == (initialBalance - _amount), "Transfer Error?");
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /// @dev                                                                                     ////
    /// End                                                                                      ////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
}