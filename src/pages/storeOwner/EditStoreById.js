import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = 'https://locoshop-backend.onrender.com/api/stores';

function EditStoreById() {
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', latitude: '', longitude: '', tags: ''
  });
  const [message, setMessage] = useState('');
  const [storeId, setStoreId] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to get query parameter from URL
  const getStoreIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // expects ?id=...
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
    try {
      const res = await fetch(`${BACKEND_URL}/one/${id}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || 'Failed to fetch store data.'}`);
        return;
      }

      const store = data.store;

      if (!store) {
        setMessage('❌ Store not found.');
        setIsLoaded(false);
      } else {
        setFormData({
          name: store.name || '',
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

    const tagsArray = formData.tags.split(',').map(tag => tag.trim());

    const updatedData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      tags: tagsArray,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/update-by-id/${storeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Store updated successfully.');
      } else {
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Update failed.');
      console.error(err);
    }
  };

  return (
    <div>
    <h2>Edit Store</h2>
    {isLoaded ? (
      <form onSubmit={handleUpdate}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Store Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Latitude:</label>
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Longitude:</label>
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
        </div>
  
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <label>Tags (comma separated):</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
        </div>
  
        <button type="submit">Update Store</button>
      </form>
    ) : (
      <p>Loading or waiting for ID...</p>
    )}
  
    {message && <p>{message}</p>}
    <label className="flex items-center space-x-2" style={{ marginTop: '1rem', display: 'block' }}>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) getCurrentLocation();
          }}
        />
        <span>📍 Use Current Location</span>
      </label>
  </div>
  );
}

export default EditStoreById;
