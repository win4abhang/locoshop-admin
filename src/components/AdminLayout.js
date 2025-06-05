import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = process.env.FRONTEND_SECRET_KEY;

function AdminLayout() {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete ALL stores?")) {
      try {
        const res = await fetch(`${BACKEND_URL}/stores`, {
          method: 'DELETE',
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json', // optional but recommended
          },
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
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="App" style={{ padding: '1rem' }}>
      <h1 style={{ color: 'RoyalBlue' }}>LocalZ Admin</h1>

      <p><strong>Logged in as:</strong> {userType?.toUpperCase()}</p>

      <nav style={{ marginBottom: '1rem' }}>
        {(userType === 'admin' || userType === 'staff') && (
          <>
            <Link to="">➕ Add Store</Link> |{" "}
          </>
        )}

        {(userType === 'admin' || userType === 'staff' || userType === 'store') && (
          <>
            <Link to="edit">✏️ Edit Store</Link>
          </>
        )}

        {userType === 'admin' && (
          <>
            {" "} | <Link to="users">👥 Manage Users</Link>
            {" "} | <button onClick={handleDeleteAll} style={{ marginLeft: "10px" }}>🗑️ Delete All</button>
          </>
        )}

        {" "} | <button onClick={handleLogout} style={{ marginLeft: "10px" }}>🚪 Logout</button>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
