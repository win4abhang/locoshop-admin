import React, { useState } from 'react';
import './App.css';
import Papa from 'papaparse';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    lat: '',
    lng: '',
    tags: '',
  });
  const [message, setMessage] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagsArray = formData.tags.split(',').map(tag => tag.trim());
    const storeData = { ...formData, tags: tagsArray };

    const response = await fetch(`${BACKEND_URL}/api/stores/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(storeData),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('✅ Store added successfully!');
      setFormData({ name: '', address: '', phone: '', lat: '', lng: '', tags: '' });
    } else {
      setMessage('❌ ' + data.message);
    }
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const stores = results.data.map(row => ({
            name: row.name,
            address: row.address,
            phone: row.phone,
            lat: row.lat,
            lng: row.lng,
            tags: row.tags,
          }));

          const response = await fetch(`${BACKEND_URL}/api/stores/bulk`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stores),
          });

          const data = await response.json();
          if (response.ok) {
            setBulkMessage('✅ Bulk stores uploaded successfully!');
          } else {
            setBulkMessage('❌ ' + data.message);
          }
        } catch (err) {
          console.error("CSV Upload Error:", err);
          setBulkMessage('❌ Error processing CSV file.');
        }
      }
    });
  };

  return (
    <div className="App">
      <h2>Locoshop Admin – Add Store</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Store Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} required />
        <input type="text" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} required />
        <input type="text" name="tags" placeholder="Tags (e.g. bike, repair)" value={formData.tags} onChange={handleChange} required />
        <button type="submit">Add Store</button>
      </form>
      {message && <p>{message}</p>}

      <hr />
      <h3>📁 Bulk Upload CSV</h3>
      <input type="file" accept=".csv" onChange={handleCSVUpload} />
      {bulkMessage && <p>{bulkMessage}</p>}
    </div>
  );
}

export default App;
