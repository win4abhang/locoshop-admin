import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
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

  return (
    <Router>
      <div className="App">
        <h1>Loco Admin</h1>
        <nav>
          <Link to="/">➕ Add Store</Link> |{" "}
          <Link to="/edit">✏️ Edit Store</Link> |{" "}
          <button onClick={handleDeleteAll} style={{ marginLeft: "10px" }}>🗑️ Delete All</button>
        </nav>
        <Routes>
          <Route path="/" element={<AddStore />} />
          <Route path="/edit" element={<EditStore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
