# JobPortal Smart Contract

This Solidity contract logs job postings and payments for the Job & Networking Portal.

## Features
- Log job postings (title, poster, txHash)
- Log payments (user, amount, txHash)
- Emits events for on-chain transparency

## Deployment

### Option 1: Remix
1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `JobPortal.sol` and paste the contract code.
3. Compile with Solidity ^0.8.0
4. Deploy to Goerli/Sepolia testnet using MetaMask
5. Copy the deployed contract address and ABI

### Option 2: Hardhat
1. Install Hardhat: `npm install --save-dev hardhat`
2. Create a Hardhat project: `npx hardhat init`
3. Add `JobPortal.sol` to `contracts/`
4. Write a deploy script in `scripts/`
5. Deploy: `npx hardhat run scripts/deploy.js --network goerli`
6. Copy the deployed contract address and ABI

## Integration
- Use the contract address and ABI in your frontend/backend to call `logJob` and `logPayment`.
- Listen for `JobPosted` and `PaymentLogged` events for on-chain activity. 