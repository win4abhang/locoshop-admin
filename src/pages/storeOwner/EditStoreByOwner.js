import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://locoshop-backend.onrender.com/api/stores';

function EditStoreByOwner() {
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', latitude: '', longitude: '', tags: ''
  });
  const [message, setMessage] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = localStorage.getItem('username');

    if (!id) {
      setMessage('❌ No store ID provided.');
      return;
    }

    const loadStore = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/update-by-id/${id}`);
        const data = await res.json();

        if (!res.ok || !data.stores || data.stores.length === 0) {
          setMessage('❌ Store not found.');
          return;
        }

        const store = data.stores[0];

        setFormData({
          name: store.name || '',
          address: store.address || '',
          phone: store.phone || '',
          latitude: store.location?.coordinates?.[1]?.toString() || '',
          longitude: store.location?.coordinates?.[0]?.toString() || '',
          tags: (store.tags || []).join(', '),
        });

        setSelectedStoreId(store._id);
        setMessage('✅ Store loaded successfully.');
      } catch (err) {
        console.error('Load error:', err);
        setMessage('❌ Error loading store.');
      }
    };

    loadStore();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedStoreId) {
      setMessage('❌ No store selected.');
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
      const res = await fetch(`${BACKEND_URL}/update-by-id/${selectedStoreId}`, {
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
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
        <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
        <button type="submit">Update Store</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditStoreByOwner;
