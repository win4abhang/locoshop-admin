import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

import AdminDashboard from './pages/admin/AdminDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import StoreOwnerDashboard from './pages/storeOwner/StoreOwnerDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/staff/*" element={<StaffDashboard />} />
        <Route path="/store_owner/*" element={<StoreOwnerDashboard />} />
        {/* Optional fallback */}
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
       
      </Routes>
    </Router>
  );
}

export default App;
