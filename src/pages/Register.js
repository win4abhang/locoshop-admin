import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://locoshop-backend.onrender.com/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    usp: '',
    address: '',
    tags: '',
    longitude: '',
    latitude: '',
  });

  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setAlertType('');

    if (!formData.name || !formData.phone || !formData.address || !formData.tags) {
      setAlertType('error');
      setMessage('Please fill all required fields.');
      return;
    }

    if (
      !formData.longitude ||
      !formData.latitude ||
      isNaN(parseFloat(formData.longitude)) ||
      isNaN(parseFloat(formData.latitude))
    ) {
      setAlertType('error');
      setMessage('Please provide valid latitude and longitude or use current location.');
      return;
    }

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      setAlertType('error');
      setMessage('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }

    try {
      const orderRes = await axios.post(`${BACKEND_URL}/payment/create-order`, {
        amount: 36500,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
      });

      const { order_id, razorpayKey } = orderRes.data;

      const options = {
        key: razorpayKey,
        amount: 36500,
        currency: 'INR',
        name: 'Localz.online',
        description: 'Store Registration',
        order_id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          const tagsArray = formData.tags.split(',').map((t) => t.trim());

          const userData = {
            name: formData.name,
            phone: formData.phone,
            usp: formData.usp || 'Premium user',
            address: formData.address,
            tags: tagsArray,
            location: {
              type: 'Point',
              coordinates: [
                parseFloat(formData.longitude),
                parseFloat(formData.latitude),
              ],
            },
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          };

          try {
            const res = await axios.post(`${BACKEND_URL}/payment/verify-and-register`, userData);
            if (res.data.success) {
              // Navigate to success page with credentials in state
              navigate('/success', {
                state: {
                  username: res.data.userCredentials.username,
                  password: res.data.userCredentials.password,
                },
              });
            } else {
              setAlertType('error');
              setMessage('❌ Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            setAlertType('error');
            setMessage('❌ Payment verification failed.');
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
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
      setMessage('❌ Payment initiation failed.');
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={5}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Premium Store Registration
        </Typography>

        {message && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {[ 
              { label: 'Store Name', name: 'name', required: true },
              { label: 'Phone', name: 'phone', required: true },
              { label: 'Offer / Announcement (optional)', name: 'usp' },
              { label: 'Address', name: 'address', required: true },
              { label: 'Tags (comma separated)', name: 'tags', required: true },
              { label: 'Longitude', name: 'longitude' },
              { label: 'Latitude', name: 'latitude' },
            ].map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            ))}

            <Button variant="outlined" onClick={handleLocation}>
              Use Current Location
            </Button>

            <Button variant="contained" type="submit" fullWidth>
              Pay ₹365 & Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
