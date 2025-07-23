import { ethers } from 'ethers';

// Replace with your deployed contract address and ABI
export const JOB_PORTAL_ADDRESS = '0xYourContractAddress';
export const JOB_PORTAL_ABI = [
  // Minimal ABI for logJob and logPayment
  "function logJob(string title, string txHash)",
  "function logPayment(uint256 amount, string txHash)",
  "event JobPosted(uint256 indexed jobId, string title, address indexed poster, string txHash)",
  "event PaymentLogged(address indexed user, uint256 amount, string txHash)"
];

export function getContract(providerOrSigner) {
  return new ethers.Contract(JOB_PORTAL_ADDRESS, JOB_PORTAL_ABI, providerOrSigner);
} 