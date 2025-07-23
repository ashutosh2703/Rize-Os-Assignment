import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [suggested, setSuggested] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/jobs').then(res => setJobs(res.data));
  }, []);

  const suggestJobs = async () => {
    const res = await axios.post('http://localhost:8000/jobs/suggest', { skills: ['JavaScript', 'React'] });
    setSuggested(res.data.jobs);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Job Feed</h2>
      <button onClick={suggestJobs} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Suggest Jobs for Me</button>
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="text-gray-700 mb-2">{job.description}</p>
            <div className="mb-2">
              <span className="font-bold">Skills:</span> {job.skills.join(', ')}
            </div>
            <div className="text-sm text-gray-500">Posted by: {job.postedBy?.name || 'Unknown'}</div>
          </div>
        ))}
      </div>
      {suggested.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Suggested Jobs</h3>
          <div className="space-y-2">
            {suggested.map(job => (
              <div key={job._id} className="bg-green-50 p-3 rounded border border-green-200">
                <div className="font-semibold">{job.title}</div>
                <div className="text-sm">{job.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 