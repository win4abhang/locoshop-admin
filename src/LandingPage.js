// src/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1>Welcome to LocoShop Admin Portal</h1>
      <p>Please choose an option:</p>
      <div className="buttons">
        <Link to="/register">
          <button>New Registration</button>
        </Link>
        <Link to="/admin/login">
          <button>Admin Login</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
