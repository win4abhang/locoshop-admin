import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const BACKEND_URL = 'https://locoshop-backend.onrender.com/api/stores';

function AddStore() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    latitude: '',
    longitude: '',
    tags: '',
  });
  const [message, setMessage] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const tagsArray = formData.tags.split(',').map(tag => tag.trim());

    const storeData = {
      name: formData.name,
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
      await axios.post(`${BACKEND_URL}/add`, storeData);
      setMessage('✅ Store added successfully!');
      setFormData({ name: '', address: '', phone: '', latitude: '', longitude: '', tags: '' });
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
        <input type="text" name="name" placeholder="Store Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
        <input type="text" name="tags" placeholder="Tags (e.g. bike, repair)" value={formData.tags} onChange={handleChange} required />
      </form>
      <button type="submit">Add Store</button>
      
      <label className="flex items-center space-x-2">
        <span>📍 Use Current Location</span>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) getCurrentLocation();
          }}
        />
      </label>

      {message && <p>{message}</p>}

      <hr />
    </div>
  );
}

export default AddStore;
