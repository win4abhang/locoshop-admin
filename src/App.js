// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
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
    window.location.href = '/login';
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <div className="App">
        <h1>Loco Admin</h1>
        {isLoggedIn && (
          <nav>
            <Link to="/">➕ Add Store</Link> |{" "}
            <Link to="/edit">✏️ Edit Store</Link> |{" "}
            <button onClick={handleDeleteAll} style={{ marginLeft: "10px" }}>🗑️ Delete All</button> |{" "}
            <button onClick={handleLogout} style={{ marginLeft: "10px" }}>🚪 Logout</button>
          </nav>
        )}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><AddStore /></ProtectedRoute>} />
          <Route path="/edit" element={<ProtectedRoute><EditStore /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
