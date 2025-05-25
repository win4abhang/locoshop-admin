// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage'; // 🆕 New
import Register from './Register'; // 🆕 You will create this
import Login from './Login'; // Admin login
import AddStore from './AddStore';
import EditStore from './EditStore';
import Users from './Users';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from './AdminLayout';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* 🆕 Landing Page */}
        <Route path="/register" element={<Register />} /> {/* 🆕 Registration Page */}
        <Route path="/admin/login" element={<Login />} /> {/* 🆕 Admin Login */}
        
        {/* Admin Panel Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AddStore />} />
          <Route path="edit" element={<EditStore />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
