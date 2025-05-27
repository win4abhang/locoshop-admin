import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Users from './Users';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="">Home</Link> | <Link to="Users">Manage Users</Link> | <Link to="AddStore">AddStore</Link> | <Link to="EditStore">EditStore</Link>
      </nav>

      <Routes>
        <Route path="AddStore" element={<AddStore />} />
        <Route path="EditStore" element={<EditStore />} />
        <Route path="Users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
