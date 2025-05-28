import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import EditStoreById from './EditStoreById';

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();

  // 👇 Store ID is assumed to be saved in localStorage after login
  const storeId = localStorage.getItem('storeOwnerName'); // e.g., "66517352b63c98..."

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <p>Store Owner Dashboard</p>

      <nav style={{ marginBottom: '1rem' }}>
        <Link to={`/store_owner/edit-store?id=${storeId}`}>✏️ Edit Store</Link> |{' '}
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>🚪 Logout</button>
      </nav>

      <Routes>
        <Route index element={<p>Welcome to Store Owner Panel</p>} />
        <Route path="edit-store" element={<EditStoreById />} />
        <Route path="*" element={<p>404 - Page Not Found in Admin</p>} />
      </Routes>
    </div>
  );
};

export default StoreOwnerDashboard;
