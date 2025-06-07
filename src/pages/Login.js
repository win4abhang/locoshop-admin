import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper
} from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, 
        { username, password },
        {
          headers: {
            'x-api-key': API_KEY 
          }
        }
      );
      const { token, userType } = res.data;

      localStorage.setItem('storeOwnerName', username);
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('isLoggedIn', 'true');

      if (userType === 'admin') navigate('/admin/AdminDashboard');
      else if (userType === 'staff') navigate('/staff');
      else if (userType === 'store_owner') navigate('/store_owner');
      else if (userType === 'local_partner') navigate('/local_partner');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Menu />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value.trimEnd())}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>

        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
