import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function AdminLayout() {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

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
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      <h1 style="color: Royal Blue;">LocalZ</h1>
      <nav>
        <Link to="">➕ Add Store</Link> |{" "}
        <Link to="edit">✏️ Edit Store</Link>
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
