import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Job Portal</h1>
        <nav className="flex-1 space-y-4">
          <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-100">Dashboard</Link>
          <Link to="/jobs" className="block py-2 px-4 rounded hover:bg-gray-100">Jobs</Link>
          <Link to="/post-job" className="block py-2 px-4 rounded hover:bg-gray-100">Post Job</Link>
          <Link to="/profile" className="block py-2 px-4 rounded hover:bg-gray-100">Profile</Link>
          <Link to="/posts" className="block py-2 px-4 rounded hover:bg-gray-100">Social Posts</Link>
        </nav>
        <button className="mt-8 bg-red-500 text-white py-2 rounded" onClick={logout}>Logout</button>
      </aside>
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h2>
        <div className="bg-white rounded shadow p-6">Job Feed coming soon...</div>
      </main>
    </div>
  );
} 