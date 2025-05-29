import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Alert,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import axios from 'axios';

const BACKEND_URL = 'https://locoshop-backend.onrender.com/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    usp: '',
    tags: '',
    latitude: '',
    longitude: '',
  });

  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('success');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          setMessage('❌ Unable to retrieve your location.');
        }
      );
    } else {
      setMessage('❌ Geolocation not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

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

    try {
      // Save registration data temporarily before payment
      await axios.post(`${BACKEND_URL}/register/temp`, formData);

      // Redirect to Razorpay Payment Page
      window.location.href = 'https://rzp.io/rzp/s6cQP2d';
    } catch (err) {
      console.error(err);
      setAlertType('error');
      setMessage('❌ Error during registration process.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Register on Localz.online
      </Typography>

      {message && (
        <Alert severity={alertType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Full Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="USP (optional)" name="usp" value={formData.usp} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Tags (e.g. bike, repair)" name="tags" value={formData.tags} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox onChange={(e) => e.target.checked && getCurrentLocation()} />}
              label="📍 Use Current Location"
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Pay ₹365 & Register
        </Button>
      </Box>
    </Container>
  );
};

export default RegisterPage;
