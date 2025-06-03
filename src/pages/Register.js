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
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const { name, phone, address, tags, longitude, latitude } = formData;

    if (!name.trim() || !phone.trim() || !address.trim() || !tags.trim()) {
      setAlertType('error');
      setMessage('Please fill all required fields.');
      return;
    }

    if (
      !longitude ||
      !latitude ||
      isNaN(parseFloat(longitude)) ||
      isNaN(parseFloat(latitude))
    ) {
      setAlertType('error');
      setMessage('Please provide valid latitude and longitude or use current location.');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setAlertType('error');
      setMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const userData = {
        order_amount: 365.0,
        order_currency: 'INR',
        customerPhone: phone,
        customerName: name,
      };
      const res = await axios.post(`${BACKEND_URL}/payment/create`, userData);

      if (res.data.order_id && res.data.order_token && res.data.app_id) {
        // Prepare form and redirect via POST
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `https://payments.cashfree.com/pg/merchant/${res.data.app_id}/pay`;

        const fields = {
          order_id: res.data.order_id,
          order_token: res.data.order_token,
          order_currency: 'INR', // ✅ add this
        };

        for (const key in fields) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        }

        try {
          document.body.appendChild(form);
          form.submit();
        } catch (err) {
          console.error('❌ Form submission failed', err);
          setAlertType('error');
          setMessage('❌ Could not redirect to payment gateway.');
        }
      } else {
        setAlertType('error');
        setMessage('❌ Failed to create Cashfree payment link.');
      }
    } catch (error) {
      console.error(error);
      setAlertType('error');
      setMessage('❌ Something went wrong while initiating payment.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box maxWidth="sm" mx="auto" mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
            Store Registration
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

              <Button variant="contained" type="submit" fullWidth disabled={loading}>
                {loading ? 'Processing...' : 'Pay ₹365 & Register'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
