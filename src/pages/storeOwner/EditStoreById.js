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
<div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
  <h2 style={{ marginBottom: "1rem" }}>Edit Store</h2>
  {isLoaded ? (
    <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {[
        { label: "Store Name:", name: "name" },
        { label: "Address:", name: "address" },
        { label: "Phone:", name: "phone" },
        { label: "Latitude:", name: "latitude" },
        { label: "Longitude:", name: "longitude" },
        { label: "Tags (comma separated):", name: "tags" },
      ].map((field) => (
        <div key={field.name} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "0.25rem", fontWeight: "600" }}>{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "14px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>
      ))}

      <button
        type="submit"
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Update Store
      </button>
    </form>
  ) : (
    <p>Loading or waiting for ID...</p>
  )}

  {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}

  <button
    onClick={getCurrentLocation}
    style={{
      marginTop: "1rem",
      backgroundColor: "#007bff",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Use Current Location
  </button>
</div>


  );
}

export default EditStoreById;
