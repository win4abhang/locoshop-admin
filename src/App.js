// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from './AdminLayout';
import Users from './Users'; // 🆕 Import the Users page component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Wrap all admin pages with layout + protection */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AddStore />} />
          <Route path="edit" element={<EditStore />} />
          <Route path="users" element={<Users />} />  {/* 🆕 Add this route */}
          {/* You can add more admin pages here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
