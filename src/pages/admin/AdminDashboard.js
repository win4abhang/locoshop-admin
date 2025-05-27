import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL stores?")) {
      try {
        const res = await fetch('https://locoshop-backend.onrender.com/api/stores', {
          method: 'DELETE',
        });
        const data = await res.json();
        alert(data.message || 'All stores deleted');
      } catch (err) {
        alert('Error deleting stores');
        console.error(err);
      }
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ color: 'RoyalBlue' }}>Admin Dashboard</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="add">➕ Add Store</Link> |{" "}
        <Link to="edit">✏️ Edit Store</Link> |{" "}
        <Link to="users">👥 Manage Users</Link> |{" "}
        <button onClick={handleDeleteAll}>🗑️ Delete All</button> |{" "}
        <button onClick={handleLogout}>🚪 Logout</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
