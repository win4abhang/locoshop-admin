import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import ManageStores from './ManageStores'; // new component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Locoshop Admin</h1>
        <nav>
          <Link to="/">➕ Add Store</Link> |{" "}
          <Link to="/edit">✏️ Edit Store</Link> |{" "}
          <Link to="/manage">🗂️ Manage All</Link>
        </nav>
        <Routes>
          <Route path="/" element={<AddStore />} />
          <Route path="/edit" element={<EditStore />} />
          <Route path="/manage" element={<ManageStores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

