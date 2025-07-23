# Job & Networking Portal

A minimal full-stack web application inspired by LinkedIn, Upwork, and AngelList, enhanced with:
- User profiles, job listings, and social feed
- AI-powered features (job matching, skill extraction)
- Web3 wallet connection & blockchain payment integration
- Optional on-chain logging via Solidity smart contract

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Ethers.js, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Blockchain:** Ethereum (Goerli/Sepolia) + MetaMask
- **Smart Contract:** Solidity (JobPortal.sol)
- **AI:** NLP (stubbed, ready for OpenAI)

## Features
- JWT authentication, profile management (with wallet address)
- Post/view jobs, filter by skill/location, social posts
- AI skill extraction and job match (stubbed, easy to extend)
- MetaMask payment required to post jobs (0.001 ETH)
- On-chain logging of jobs and payments (JobPortal.sol)
- Resume upload and skill extraction

## Getting Started

### 1. Backend
```
cd server
npm install
# Set up .env with MONGO_URI and JWT_SECRET
npm start
```

### 2. Frontend
```
cd client
npm install
npm start
```

### 3. Smart Contract
- See `smart-contracts/README.md` for deployment instructions
- Update `client/src/utils/contract.js` with your deployed contract address

### 4. Usage
- Register/login, edit profile, connect MetaMask, post jobs, view/suggest jobs, upload resume, create/view social posts
- All payments and job posts are logged on-chain for transparency

## Deployment
- Frontend: Vercel, Netlify, or similar
- Backend: Render, Railway, or similar
- Database: MongoDB Atlas
- Smart Contract: Goerli/Sepolia testnet

## Extending
- Swap AI stubs for OpenAI API or custom NLP
- Add notifications, dark mode, or more blockchain features

---
**Built for the RizeOS Core Team Internship assessment.** 