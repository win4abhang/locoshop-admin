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
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

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
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add Store
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <Stack spacing={2}>
            <TextField
              label="Store Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="What's New (USP)"
              name="usp"
              value={formData.usp}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Latitude"
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Longitude"
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button
              variant="outlined"
              onClick={getCurrentLocation}
              color="secondary"
            >
              Use Current Location
            </Button>
            <TextField
              label="Tags (comma-separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              required
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
      </Paper>
    </Container>
  );
}

export default AddStore;
