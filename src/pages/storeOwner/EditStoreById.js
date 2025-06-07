import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

function EditStoreById() {
  setMessage('');
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
  const [storeId, setStoreId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStoreIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        () => {
          setMessage('❌ Unable to retrieve your location.');
        }
      );
    } else {
      setMessage('❌ Geolocation not supported by your browser.');
    }
  };

  useEffect(() => {
    const id = getStoreIdFromUrl();
    if (id) {
      setStoreId(id);
      loadStoreById(id);
    } else {
      setMessage('❌ No store ID found in URL.');
    }
  }, []);

  const loadStoreById = async (id) => {
    setMessage('');
    setLoading(true);
    try {
      const config = {
        headers: {
          'x-api-key': API_KEY
        }
      };
      
      const res = await axios.get(`${BACKEND_URL}/stores/one/${id}`, config);
      const data = res.data;
      const store = data.store;

      if (!store) {
        setMessage('❌ Store not found.');
        setIsLoaded(false);
      } else {
        setFormData({
          name: store.name || '',
          usp: store.usp || '',
          address: store.address || '',
          phone: store.phone || '',
          latitude: store.location?.coordinates?.[1]?.toString() || '',
          longitude: store.location?.coordinates?.[0]?.toString() || '',
          tags: (store.tags || []).join(', '),
        });
        setIsLoaded(true);
        setMessage('✅ Store loaded successfully.');
      }
    } catch (err) {
      console.error('Load error:', err);
      setMessage('❌ Error loading store.');
      setIsLoaded(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!storeId) {
      setMessage('❌ Store ID is missing.');
      return;
    }

    const tagsArray = formData.tags.split(',').map((tag) => tag.trim());
    const updatedData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      tags: tagsArray,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/stores/update-by-id/${storeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(updatedData)
    });

    const data = await res.json();
      setMessage(res.ok ? '✅ Store updated successfully.' : `❌ ${data.message}`);
    } catch (err) {
      console.error(err);
      setMessage('❌ Update failed.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Edit Store
      </Typography>

      {loading ? (
        <Box textAlign="center" my={4}>
          <CircularProgress />
        </Box>
      ) : isLoaded ? (
        <Box component="form" onSubmit={handleUpdate} noValidate>
          <Stack spacing={2}>
            {[
              { label: 'Store Name', name: 'name' },
              { label: "What's New", name: 'usp' },
              { label: 'Address', name: 'address' },
              { label: 'Phone', name: 'phone' },
              { label: 'Latitude', name: 'latitude' },
              { label: 'Longitude', name: 'longitude' },
              { label: 'Tags (comma separated)', name: 'tags' },
            ].map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                required
              />
            ))}

            <Button type="submit" variant="contained" color="success" fullWidth>
              Update Store
            </Button>
          </Stack>
        </Box>
      ) : (
        <Typography>Loading or waiting for ID...</Typography>
      )}

      {message && (
        <Alert
          severity={message.startsWith('✅') ? 'success' : 'error'}
          sx={{ mt: 3 }}
        >
          {message}
        </Alert>
      )}

      <Button
        onClick={getCurrentLocation}
        variant="contained"
        sx={{ mt: 3 }}
        fullWidth
      >
        Use Current Location
      </Button>
    </Container>
  );
}

export default EditStoreById;
