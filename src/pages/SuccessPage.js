import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Alert, Divider, CircularProgress } from '@mui/material';
import axios from 'axios';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const orderId = query.get('order_id');

  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyOrder = async () => {
      try {
        const res = await axios.post('https://locoshop-backend.onrender.com/api/payment/verify-and-register', {
          order_id: orderId,
        });
        setCredentials(res.data.userCredentials);
      } catch (err) {
        setError('Payment verification failed or store not registered.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) verifyOrder();
    else {
      setError('Invalid access. Missing order ID.');
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <Box mt={5} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Verifying payment...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="sm" mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" color="success.main" fontWeight="bold" align="center" gutterBottom>
          🎉 Registration Successful!
        </Typography>

        <Typography align="center" sx={{ mb: 2 }}>
          Your store has been registered successfully.
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Your Login Credentials
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            <strong>Username (Store ID):</strong> {credentials?.username}
          </Typography>
          <Typography variant="body2">
            <strong>Password (Phone No):</strong> {credentials?.password}
          </Typography>
          <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
            Please save these credentials. You’ll need them to log in.
          </Typography>
        </Alert>

        <Box textAlign="center">
          <Button variant="contained" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
