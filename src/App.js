import React, { useState } from 'react';
import './App.css';

const BACKEND_URL = 'https://locoshop-backend.onrender.com'; // Your backend URL

function App() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    tags: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.address || !form.phone || !form.tags) {
      alert("Please fill in all fields");
      return;
    }

    // Convert address to coordinates using OpenStreetMap API
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(form.address)}`);
    const geoData = await geoRes.json();

    if (!geoData[0]) {
      alert("Unable to get location from address");
      return;
    }

    const newStore = {
      name: form.name,
      address: form.address,
      phone: form.phone,
      tags: form.tags.toLowerCase().split(',').map(tag => tag.trim()),
      lat: parseFloat(geoData[0].lat),
      lng: parseFloat(geoData[0].lon),
    };

    const res = await fetch(`${BACKEND_URL}/api/stores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStore)
    });

    if (res.ok) {
      alert("Store added successfully!");
      setForm({ name: '', address: '', phone: '', tags: '' });
    } else {
      alert("Failed to add store");
    }
  };

  return (
    <div className="App">
      <h2>Add New Store</h2>
      <input type="text" name="name" placeholder="Store Name" value={form.name} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <input type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Store</button>
    </div>
  );
}

export default App;
