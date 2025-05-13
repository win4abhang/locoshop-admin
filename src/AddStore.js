import React, { useState } from 'react';
import './App.css';
import Papa from 'papaparse';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';
const [uploadProgress, setUploadProgress] = useState(0);

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
      complete: (results) => {
        const stores = results.data.map(row => ({
          name: row.name,
          address: row.address,
          phone: row.phone,
          lat: row.lat,
          lng: row.lng,
          tags: row.tags,
        }));
  
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${BACKEND_URL}/api/stores/bulk`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
  
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent); // ← your state hook
          }
        };
  
        xhr.onload = () => {
          if (xhr.status === 200) {
            setBulkMessage('✅ Bulk stores uploaded successfully!');
          } else {
            const data = JSON.parse(xhr.responseText);
            setBulkMessage('❌ ' + (data.message || 'Upload failed.'));
          }
          setUploadProgress(0); // Reset progress
        };
  
        xhr.onerror = () => {
          setBulkMessage('❌ Upload error.');
          setUploadProgress(0);
        };
  
        xhr.send(JSON.stringify(stores));
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
      {uploadProgress > 0 && (
          <div>
            Uploading: {uploadProgress}%
            <progress value={uploadProgress} max="100"></progress>
          </div>
        )}
    </div>
  );
}

export default App;
