import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import EditStore from './EditStoreByOwner';

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear localStorage and redirect to login
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Admin Dashboard</h1>

      {/* ✅ Navigation Links */}
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/store_owner/edit-store">✏️ Edit Store</Link> |{' '}
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>🚪 Logout</button>
      </nav>

      {/* ✅ Admin Routes */}
      <Routes>
        <Route index element={<p>Welcome to Admin Panel</p>} />
        <Route path="edit-store" element={<EditStore />} />
        <Route path="*" element={<p>404 - Page Not Found in Admin</p>} />
      </Routes>
    </div>
  );
};

export default StoreOwnerDashboard;
