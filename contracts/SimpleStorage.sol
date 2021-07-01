// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.8.0;

contract SimpleStorage {
  uint storedData;
  string public storedString;

  function set(uint x) public {
    storedData = x;
  }

  function setString(string memory stringData) public returns(bool){
    storedString = stringData;
    return true;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
