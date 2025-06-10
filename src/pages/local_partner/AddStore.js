import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

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
      setFormData({ name: '', usp: '', address: '', phone: '', latitude: '', longitude: '', tags: '' });
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
    <div className="App" style={{ padding: '1rem' }}>
      <h2>Add Store</h2>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="name"
          placeholder="Store Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
        type="text"
        name="usp"
        placeholder="What's New"
        value={formData.usp}
        onChange={handleChange}
        required
      />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (e.g. bike, repair)"
          value={formData.tags}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Store</button>
      </form>

      <label className="flex items-center space-x-2" style={{ marginTop: '1rem', display: 'block' }}>
        <span>📍 Use Current Location</span>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) getCurrentLocation();
          }}
        />
      </label>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStore;
