import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="App">
      <h1>Loco Admin</h1>
      <nav>
        <Link to="/">➕ Add Store</Link> |{" "}
        <Link to="/edit">✏️ Edit Store</Link> |{" "}
        <Link to="/users">👥 Manage Users</Link> |{" "}
        <button onClick={handleDeleteAll} style={{ marginLeft: "10px" }}>🗑️ Delete All</button> |{" "}
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>🚪 Logout</button>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
