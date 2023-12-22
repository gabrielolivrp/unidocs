// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Greeter {
  string private greeting;

  event GreetingChanged(string oldGreeting, string newGreeting);

  constructor(string memory _greeting) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    greeting = _greeting;
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) external payable {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);

    string memory oldGreeting = greeting;
    greeting = _greeting;

    emit GreetingChanged(oldGreeting, _greeting);
  }
}
