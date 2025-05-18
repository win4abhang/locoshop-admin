import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';

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
      await axios.post(`${BACKEND_URL}/stores/add`, storeData);
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

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const stores = results.data.map(row => ({
          name: row.name,
          address: row.address,
          phone: row.phone,
          tags: row.tags.split(',').map(tag => tag.trim()),
          location: {
            type: "Point",
            coordinates: [
              parseFloat(row.lng),
              parseFloat(row.lat)
            ]
          }
        }));

        try {
          await axios.post(`${BACKEND_URL}/stores/bulk`, stores, {
            onUploadProgress: (progressEvent) => {
              const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setUploadProgress(percent);
            }
          });
          setBulkMessage('✅ Bulk stores uploaded successfully!');
        } catch (error) {
          setBulkMessage('❌ ' + (error.response?.data?.message || 'Bulk upload failed.'));
        } finally {
          setUploadProgress(0);
        }
      }
    });
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h2>Locoshop Admin – Add Store</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Store Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
        <input type="text" name="tags" placeholder="Tags (e.g. bike, repair)" value={formData.tags} onChange={handleChange} required />
        <button type="submit">Add Store</button>
      </form>
      {message && <p>{message}</p>}

      <hr />
      <button type="button" onClick={getCurrentLocation}>📍 Use Current Location</button>

      <hr />
      <h3>📁 Bulk Upload CSV</h3>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      {bulkMessage && <p>{bulkMessage}</p>}
      {uploadProgress > 0 && (
        <div>
          Uploading: {uploadProgress}%
          <progress value={uploadProgress} max="100"></progress>
        </div>
      )}
    </div>
  );
}

export default AddStore;
