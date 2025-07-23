import React, { useState } from 'react';
import axios from 'axios';

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleUpload = async e => {
    e.preventDefault();
    setError('');
    if (!file) return setError('Please select a file');
    // Stub: just send file name as text
    try {
      const text = file.name;
      const res = await axios.post('http://localhost:8000/ai/extract-skills', { bio: text });
      setSkills(res.data.skills);
    } catch (err) {
      setError('Failed to extract skills');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow space-y-4">
        <input type="file" accept=".pdf,.txt" onChange={handleFileChange} className="w-full" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Extract Skills</button>
        {error && <div className="text-red-500">{error}</div>}
        {skills.length > 0 && <div className="text-green-600">Extracted Skills: {skills.join(', ')}</div>}
      </form>
    </div>
  );
} 