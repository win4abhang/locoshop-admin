import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  Paper,
  Container,
  List,
  ListItem,
  ListItemText,
  FormControlLabel, Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { useState } from 'react';
import Menu from '../components/Menu';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

const RegisterLocalPartner = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pan_number: '',
    addhar_number: '',
    address: '',
    longitude: '',
    latitude: '',
    consent: false, // NEW
  });

  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        }));
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const getIP = async () => {
    try {
      const res = await axios.get("https://api64.ipify.org?format=json");
      return res.data.ip;
    } catch (error) {
      return 'IP_NOT_FOUND';
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setAlertType('');

    const {
      name,
      phone,
      email,
      pan_number,
      addhar_number,
      address,
      longitude,
      latitude,
    } = formData;

    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !longitude ||
      !latitude
    ) {
      setAlertType('error');
      setMessage('Please fill all required fields and location.');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadharRegex = /^[2-9]{1}[0-9]{11}$/;

    if (!phoneRegex.test(phone.trim())) {
      setAlertType('error');
      setMessage('Enter a valid 10-digit phone number.');
      return;
    }
    if (pan_number && !panRegex.test(pan_number.trim().toUpperCase())) {
      setAlertType('error');
      setMessage('Please enter a valid PAN number (e.g., ABCDE1234F).');
      return;
    }
    
    if (addhar_number && !aadharRegex.test(addhar_number.trim())) {
      setAlertType('error');
      setMessage('Please enter a valid 12-digit Aadhar number.');
      return;
    }
    if (!formData.consent) {
      setAlertType('error');
      setMessage('Please provide consent to proceed.');
      return;
    }

    const userPayload = {
      username: phone.trim(),
      password: Date.now().toString(),
      userType: 'local_partner',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      pan_number: pan_number.trim(),
      addhar_number: addhar_number.trim(),
      address: address.trim(),
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      consentDetails: {
        consentGivenAt: new Date().toISOString(),
        consentIp: await getIP(),  // (See below)
      },
    };
    

    try {
      await axios.post(
        `${BACKEND_URL}/users/add_Local_Partner`,
        userPayload,
        {
          headers: {
            'x-api-key': API_KEY // replace with your actual key or env variable
          }
        }
      );
      setShowSuccessDialog(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        pan_number: '',
        addhar_number: '',
        address: '',
        longitude: '',
        latitude: '',
        consent: false, // Reset this as well
      });
    } catch (error) {
      setAlertType('error');
      setMessage('❌ ' + (error.response?.data?.message || 'Registration failed.'));
    }
  };

  return (
    <>
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box maxWidth="sm" mx="auto" mt={5}>
        <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Local Partner Registration
        </Typography>

        {message && (
          <Alert severity={alertType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            {[
              { label: 'Full Name', name: 'name', required: true },
              { label: 'Phone Number', name: 'phone', required: true },
              { label: 'Email', name: 'email' , required: true },
              { label: 'PAN Number', name: 'pan_number' , required: true },
              { label: 'Aadhar Number', name: 'addhar_number', required: true  },
              { label: 'Address', name: 'address', required: true },
              { label: 'Longitude', name: 'longitude', required: true },
              { label: 'Latitude', name: 'latitude', required: true },
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
            Use Current Location (to get your current Longitude and Latitude)
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
            }
            label="I consent to the collection and use of my personal data for registration."
          />

          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
          </Stack>
        </form>
      </Paper>
      </Box>
    </Container>
    
    {/* Success Dialog — place this outside the Container */}
    <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
      <DialogTitle>🎉 Registration Successful!</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          You’ll receive a call or WhatsApp message within 24 hours for verification.
        </Typography>
        <Typography gutterBottom>
          After verification, we’ll share your User ID and Password.
        </Typography>
        <Typography>
          Once that’s done, you can begin your work as a Local Partner!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowSuccessDialog(false)} autoFocus variant="contained" color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
</>

  );
};

export default RegisterLocalPartner;
