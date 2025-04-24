import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Locoshop Admin</h1>
        <nav>
          <Link to="/">➕ Add Store</Link> | <Link to="/edit">✏️ Edit Store</Link>
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
