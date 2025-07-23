import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import ResumeUpload from './pages/ResumeUpload';
import NotFound from './pages/NotFound';

function App() {
  const isAuth = !!localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={isAuth ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/post-job" element={isAuth ? <PostJob /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/posts" element={isAuth ? <Posts /> : <Navigate to="/login" />} />
        <Route path="/resume-upload" element={isAuth ? <ResumeUpload /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
