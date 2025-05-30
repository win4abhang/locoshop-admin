  import React, { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';

  const BACKEND_URL = 'https://locoshop-backend.onrender.com';

  function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
    
      try {
        const res = await axios.post(`${BACKEND_URL}/api/auth/login`, { username, password });
        const { token, userType } = res.data;
    
        // Save token and user info
        localStorage.setItem('storeOwnerName', username);
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        localStorage.setItem('isLoggedIn', 'true');
    
        // ✅ Debug: Check login status
        console.log('User', username);
        console.log('Login successful');
        console.log('User type:', userType);
        console.log('Token:', token);
    

        if (userType === 'admin') navigate('/admin/AdminDashboard');
        else if (userType === 'staff') navigate('/staff');
        else if (userType === 'store_owner') navigate('/store_owner');
        
      } catch (err) {
        console.error('Login error:', err);
        setError(err.response?.data?.error || 'Login failed');
      }
    };
    

    return (
      <div className="App" style={{ padding: '1rem' }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  export default Login;
