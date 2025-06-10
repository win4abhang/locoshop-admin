import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Container,
  Paper,
  Alert,
} from '@mui/material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

function AddStore() {
  const [formData, setFormData] = useState({
    name: '',
    usp: '',
    address: '',
    phone: '',
    latitude: '',
    longitude: '',
    tags: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Store name is required';
    if (!formData.usp.trim()) newErrors.usp = 'USP is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    const lat = parseFloat(formData.latitude);
    if (isNaN(lat) || lat < -90 || lat > 90) newErrors.latitude = 'Latitude must be between -90 and 90';
    const lng = parseFloat(formData.longitude);
    if (isNaN(lng) || lng < -180 || lng > 180) newErrors.longitude = 'Longitude must be between -180 and 180';
    if (!formData.tags.trim()) newErrors.tags = 'At least one tag is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;

    const tagsArray = formData.tags.split(',').map(tag => tag.trim());

    const storeData = {
      name: formData.name,
      usp: formData.usp,
      address: formData.address,
      phone: formData.phone,
      tags: tagsArray,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(formData.longitude),
          parseFloat(formData.latitude)
        ]
      }
    };

    try {
      const config = {
        headers: {
          'x-api-key': API_KEY
        }
      };
      await axios.post(`${BACKEND_URL}/stores/add`, storeData, config);
      setMessage('✅ Store added successfully!');
      setFormData({
        name: '',
        usp: '',
        address: '',
        phone: '',
        latitude: '',
        longitude: '',
        tags: ''
      });
      setErrors({});
    } catch (error) {
      setMessage('❌ ' + (error.response?.data?.message || 'Error adding store.'));
    }
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

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Store
        </Typography>
  
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2} width="100%">
            <TextField
              label="Store Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              fullWidth
            />
            <TextField
              label="What's New (USP)"
              name="usp"
              value={formData.usp}
              onChange={handleChange}
              error={!!errors.usp}
              helperText={errors.usp}
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
            />
            <TextField
              label="Latitude"
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
              error={!!errors.latitude}
              helperText={errors.latitude}
              fullWidth
            />
            <TextField
              label="Longitude"
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
              error={!!errors.longitude}
              helperText={errors.longitude}
              fullWidth
            />
            <Button
              variant="outlined"
              onClick={getCurrentLocation}
              color="secondary"
              fullWidth
            >
              Use Current Location
            </Button>
            <TextField
              label="Tags (comma-separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              error={!!errors.tags}
              helperText={errors.tags}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Add Store
            </Button>
          </Stack>
        </Box>
  
        {message && (
          <Box mt={2}>
            <Alert severity={message.startsWith('✅') ? 'success' : 'error'}>
              {message}
            </Alert>
          </Box>
        )}
    </Container>
  );  
}

export default AddStore;
