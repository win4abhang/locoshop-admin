import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear localStorage and redirect to login
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>staff Dashboard</h1>

      {/* ✅ Navigation Links */}
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/staff/add-store">➕ Add Store</Link> |{' '}
        <Link to="/staff/edit-store">✏️ Edit Store</Link> |{' '}
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>🚪 Logout</button>
      </nav>

      {/* ✅ Admin Routes */}
      <Routes>
        <Route index element={<p>Welcome to Admin Panel</p>} />
        <Route path="add-store" element={<AddStore />} />
        <Route path="edit-store" element={<EditStore />} />
        <Route path="*" element={<p>404 - Page Not Found in staff</p>} />
      </Routes>
    </div>
  );
};

export default StaffDashboard;
