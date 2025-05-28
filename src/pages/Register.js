import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Alert,
} from '@mui/material';
import axios from 'axios';

const BACKEND_URL = 'https://locoshop-backend.onrender.com'; // Replace if needed

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!formData.name || !formData.phone || !formData.email) {
      setAlertType('error');
      setMessage('All fields are required.');
      return;
    }

    const isRazorpayLoaded = await loadRazorpayScript();
    if (!isRazorpayLoaded) {
      setAlertType('error');
      setMessage('Failed to load Razorpay SDK.');
      return;
    }

    try {
      // Step 1: Create order on backend
      const orderResponse = await axios.post(`${BACKEND_URL}/create-order`, {
        amount: 49900, // ₹499
        currency: 'INR',
      });

      const { id: order_id, currency, amount } = orderResponse.data;

      // Step 2: Open Razorpay checkout
      const options = {
        key: 'rzp_test_1234567890abcdef', // Replace with your key
        amount: amount.toString(),
        currency,
        name: 'LocoShop Registration',
        description: 'Premium Registration Fee',
        order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function (response) {
          // Step 3: On payment success, send data to backend
          try {
            await axios.post(`${BACKEND_URL}/register`, {
              ...formData,
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });
            setAlertType('success');
            setMessage('✅ Registration and payment successful!');
            setFormData({ name: '', phone: '', email: '' });
          } catch (err) {
            setAlertType('error');
            setMessage('❌ Payment success but failed to save registration.');
          }
        },
        theme: {
          color: '#1976d2',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setAlertType('error');
      setMessage('❌ Error during payment process.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register for Premium Access
      </Typography>

      {message && (
        <Alert severity={alertType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
        >
          Pay ₹499 & Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
