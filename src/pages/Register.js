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

const cashfree = window.Cashfree({ mode: 'sandbox' });

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
  const [showOverlay, setShowOverlay] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

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
    setShowOverlay(true);
  
    const { name, phone, address, tags, longitude, latitude } = formData;
  
    if (!name || !phone || !address || !tags) {
      setAlertType('error');
      setMessage('Please fill all required fields.');
      return;
    }
  
    if (!longitude || !latitude || isNaN(parseFloat(longitude)) || isNaN(parseFloat(latitude))) {
      setAlertType('error');
      setMessage('Please provide valid latitude and longitude or use current location.');
      return;
    }
  
    try {
      const userData = {
        order_amount: 365,
        order_currency: 'INR',
        customerPhone: phone,
        customerName: name,
      };
  
      const res = await axios.post(`${BACKEND_URL}/payment/create`, userData);
  
      if (res.data.order_id && res.data.payment_session_id) {
        const { order_id, payment_session_id } = res.data;
  
        // Initialize Cashfree SDK
        cashfree.checkout({
          paymentSessionId: payment_session_id,
          redirectTarget: '_blank', // Opens in a new tab
        });
        
        // Show overlay with Continue button
        
        setOrderDetails({ order_id, payment_session_id });
                 
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

  const handleContinueAfterPayment = async () => {
    if (!orderDetails) return;
  
    setShowOverlay(false);
    try {
      const verifyRes = await axios.post(`${BACKEND_URL}/payment/verify`, {
        order_id: orderDetails.order_id,
        name: formData.name,
        phone: formData.phone,
        usp: formData.usp,
        address: formData.address,
        tags: formData.tags.split(',').map(t => t.trim()),
        location: {
          type: "Point",
          coordinates: [
            parseFloat(formData.longitude),
            parseFloat(formData.latitude)
          ]
        }
      });
  
      if (verifyRes.data.success) {
        navigate('/result', {
          state: {
            success: true,
            username: verifyRes.data.userCredentials.username,
            password: verifyRes.data.userCredentials.password,
          }
        });
      } else {
        navigate('/result', {
          state: {
            success: false,
            message: '❌ Payment not completed. Please try again.',
          }
        });
      }
    } catch (err) {
      console.error(err);
      navigate('/result', {
        state: {
          success: false,
          message: '❌ Error verifying payment.',
        }
      });
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

              <Button variant="contained" type="submit" fullWidth>
                Pay ₹365 & Register
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
      {showOverlay && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: 4,
            }}
          >
            <Typography variant="h6" align="center" gutterBottom>
              Do not Close this tab. Click "Continue" after completing the payment.
            </Typography>
            <Typography variant="body2" align="center" gutterBottom>
              Make sure popup is allowed in your browser.
            </Typography>
            <Button
              variant="contained"
              onClick={handleContinueAfterPayment}
              sx={{ mt: 2 }}
            >
              Continue
            </Button>
          </Box>
        )}

    </Container>
  );
};

export default Register;
