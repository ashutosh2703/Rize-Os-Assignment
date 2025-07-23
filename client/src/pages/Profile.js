import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({ name: '', bio: '', linkedInUrl: '', walletAddress: '', skills: [] });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/profile', { headers: { 'x-user-id': 'me' } }).then(res => setProfile(res.data));
  }, []);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:8000/profile', profile, { headers: { 'x-user-id': 'me' } });
      setSuccess('Profile updated!');
      setEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleExtractSkills = async () => {
    try {
      const res = await axios.post('http://localhost:8000/ai/extract-skills', { bio: profile.bio });
      setProfile({ ...profile, skills: res.data.skills });
    } catch (err) {
      setError('Failed to extract skills');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="bg-white p-6 rounded shadow space-y-4">
        <input name="name" value={profile.name} onChange={handleChange} className="w-full p-2 border rounded" disabled={!editing} />
        <textarea name="bio" value={profile.bio} onChange={handleChange} className="w-full p-2 border rounded" disabled={!editing} />
        <input name="linkedInUrl" value={profile.linkedInUrl} onChange={handleChange} className="w-full p-2 border rounded" disabled={!editing} />
        <input name="walletAddress" value={profile.walletAddress} className="w-full p-2 border rounded bg-gray-100" disabled />
        <div>
          <span className="font-bold">Skills:</span> {profile.skills.join(', ')}
          {editing && <button onClick={handleExtractSkills} className="ml-2 bg-blue-500 text-white px-2 py-1 rounded">Extract from Bio</button>}
        </div>
        {editing ? (
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        ) : (
          <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Edit</button>
        )}
        {success && <div className="text-green-600">{success}</div>}
        {error && <div className="text-red-500">{error}</div>}
      </div>
    </div>
  );
} 