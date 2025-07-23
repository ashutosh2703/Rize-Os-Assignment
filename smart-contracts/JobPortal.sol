// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract JobPortal {
    event JobPosted(uint256 indexed jobId, string title, address indexed poster, string txHash);
    event PaymentLogged(address indexed user, uint256 amount, string txHash);

    uint256 public jobCount;

    struct Job {
        uint256 id;
        string title;
        address poster;
        string txHash;
    }

    mapping(uint256 => Job) public jobs;

    function logJob(string memory title, string memory txHash) public {
        jobCount++;
        jobs[jobCount] = Job(jobCount, title, msg.sender, txHash);
        emit JobPosted(jobCount, title, msg.sender, txHash);
    }

    function logPayment(uint256 amount, string memory txHash) public {
        emit PaymentLogged(msg.sender, amount, txHash);
    }
} 