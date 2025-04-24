import React, { useState } from 'react';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';

function EditStore() {
  const [editPhone, setEditPhone] = useState('');
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', lat: '', lng: '', tags: ''
  });
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = async () => {
    const res = await fetch(`${BACKEND_URL}/api/stores/by-phone/${editPhone}`);
    const data = await res.json();
    if (res.ok) {
      setFormData({ ...data.store, tags: data.store.tags.join(', ') });
      setIsLoaded(true);
      setMessage('✅ Store loaded for editing.');
    } else {
      setMessage('❌ Store not found.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim());
    const updatedData = { ...formData, tags: tagsArray };

    const res = await fetch(`${BACKEND_URL}/api/stores/update/${editPhone}`, {
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
  };

  return (
    <div>
      <h2>Edit Store</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={editPhone}
        onChange={(e) => setEditPhone(e.target.value)}
      />
      <button onClick={handleLoad}>Load Store</button>

      {isLoaded && (
        <form onSubmit={handleUpdate}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          <input type="text" name="lat" value={formData.lat} onChange={handleChange} required />
          <input type="text" name="lng" value={formData.lng} onChange={handleChange} required />
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
          <button type="submit">Update Store</button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditStore;
