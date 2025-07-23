import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';

const ADMIN_WALLET = '0x000000000000000000000000000000000000dead'; // Replace with real admin wallet
const PLATFORM_FEE = '0.001';

export default function PostJob() {
  const [form, setForm] = useState({ title: '', description: '', skills: '', budget: '', location: '' });
  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePostJob = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      if (!window.ethereum) throw new Error('MetaMask not found');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: ADMIN_WALLET,
        value: ethers.parseEther(PLATFORM_FEE)
      });
      await tx.wait();
      setTxHash(tx.hash);
      // Post job to backend
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8000/jobs', {
        ...form,
        skills: form.skills.split(',').map(s => s.trim()),
        txHash: tx.hash,
        postedBy: 'me' // Replace with real user id from auth
      }, { headers: { Authorization: `Bearer ${token}` } });
      // Log payment on-chain
      const contract = getContract(signer);
      const logPayTx = await contract.logPayment(ethers.parseEther(PLATFORM_FEE), tx.hash);
      await logPayTx.wait();
      // Log job on-chain
      const logJobTx = await contract.logJob(form.title, tx.hash);
      await logJobTx.wait();
      setSuccess('Job posted, payment and job logged on-chain!');
    } catch (err) {
      setError(err.message || 'Failed to post job');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handlePostJob} className="bg-white p-6 rounded shadow space-y-4">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" disabled={loading}>{loading ? 'Posting...' : 'Pay & Post Job (0.001 ETH)'}</button>
        {txHash && <div className="text-green-600">Transaction Hash: {txHash}</div>}
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
} 