import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function StaffDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ color: 'DarkGreen' }}>Staff Dashboard</h1>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="add">➕ Add Store</Link> |{" "}
        <Link to="edit">✏️ Edit Store</Link> |{" "}
        <button onClick={handleLogout}>🚪 Logout</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default StaffDashboard;
