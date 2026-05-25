// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LegacyVault {

    address public owner;

    struct Beneficiary {
        address wallet;
        uint256 share; // percentage (e.g. 50 = 50%)
    }

    Beneficiary[] public beneficiaries;

    uint256 public lastAlive;
    uint256 public inactivityLimit;

    uint256 public totalDeposited;

    bool public inheritanceTriggered;

    mapping(address => uint256) public claimed;

    event VaultCreated(address owner, uint256 inactivityLimit);
    event PingAlive(address owner, uint256 time);
    event Deposit(address from, uint256 amount);
    event InheritanceTriggered(uint256 time);
    event Claimed(address beneficiary, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(uint256 _inactivityLimit) {
        owner = msg.sender;
        inactivityLimit = _inactivityLimit;
        lastAlive = block.timestamp;

        emit VaultCreated(owner, _inactivityLimit);
    }

    function addBeneficiary(address _wallet, uint256 _share) external onlyOwner {
        beneficiaries.push(Beneficiary(_wallet, _share));
    }

    function deposit() external payable {
        totalDeposited += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function pingAlive() external onlyOwner {
        lastAlive = block.timestamp;
        emit PingAlive(msg.sender, block.timestamp);
    }

    function triggerInheritance() public {
        require(!inheritanceTriggered, "Already triggered");
        require(block.timestamp > lastAlive + inactivityLimit, "Owner still active");

        inheritanceTriggered = true;

        emit InheritanceTriggered(block.timestamp);
    }

    function claim() external {
        require(inheritanceTriggered, "Not triggered");

        uint256 totalShare = 0;

        for (uint i = 0; i < beneficiaries.length; i++) {
            if (beneficiaries[i].wallet == msg.sender) {
                totalShare = beneficiaries[i].share;
            }
        }

        require(totalShare > 0, "Not beneficiary");

        uint256 amount = (totalDeposited * totalShare) / 100;

        require(claimed[msg.sender] == 0, "Already claimed");

        claimed[msg.sender] = amount;

        payable(msg.sender).transfer(amount);

        emit Claimed(msg.sender, amount);
    }

    function checkTrigger() external {
        if (block.timestamp > lastAlive + inactivityLimit) {
            triggerInheritance();
        }
    }

    receive() external payable {
        totalDeposited += msg.value;
    }
}