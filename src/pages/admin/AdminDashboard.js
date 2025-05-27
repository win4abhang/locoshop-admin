import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Users from './Users';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Admin Dashboard</h1>

      {/* ✅ Use absolute paths in Link */}
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/admin/add-store">➕ Add Store</Link> |{' '}
        <Link to="/admin/edit-store">✏️ Edit Store</Link> |{' '}
        <Link to="/admin/users">👥 Manage Users</Link>
      </nav>

      {/* ✅ Route paths remain relative */}
      <Routes>
        <Route index element={<p>Welcome to Admin Panel</p>} />
        <Route path="add-store" element={<AddStore />} />
        <Route path="edit-store" element={<EditStore />} />
        <Route path="users" element={<Users />} />
        <Route path="*" element={<p>404 - Page Not Found in Admin</p>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
