import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Users from './Users';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Admin Dashboard</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="add-store">➕ Add Store</Link> |{' '}
        <Link to="edit-store">✏️ Edit Store</Link> |{' '}
        <Link to="users">👥 Manage Users</Link>
      </nav>

      <Routes>
        <Route path="add-store" element={<AddStore />} />
        <Route path="edit-store" element={<EditStore />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<p>404 - Page Not Found in Admin</p>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
