import React, { useState } from 'react';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';

function EditStore() {
  const [editName, setEditName] = useState('');
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', lat: '', lng: '', tags: ''
  });
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null); // New state for selected store ID

  const handleLoad = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/stores/by-name/${encodeURIComponent(editName)}`);
      const data = await res.json();

      if (res.ok && Array.isArray(data.stores)) {
        if (data.stores.length === 0) {
          setMessage('❌ Store not found.');
        } else if (data.stores.length === 1) {
          const store = data.stores[0];
          setFormData({
            name: store.name || '',
            address: store.address || '',
            phone: store.phone || '',
            lat: store.location?.coordinates?.[1] || '',
            lng: store.location?.coordinates?.[0] || '',
            tags: (store.tags || []).join(', '),
          });
          setSelectedStoreId(store._id); // Set the selected store ID
          setIsLoaded(true);
          setMessage('✅ Store loaded successfully.');
        } else {
          setStoreList(data.stores);
          setSelectedStoreId(null);
          setMessage('⚠️ Multiple stores found. Please select one.');
        }
      } else {
        setMessage('❌ Unexpected response format.');
      }
    } catch (err) {
      setMessage('❌ Error loading store.');
      console.error(err);
    }
  };

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
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      tags: tagsArray,
    };

    try {
      const res = await fetch(`${BACKEND_URL}/api/stores/update-by-id/${selectedStoreId}`, {  // Use the store ID
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
      <h2>Edit Store by Name</h2>
      <input
        type="text"
        placeholder="Enter store name"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />
      <button onClick={handleLoad}>Load Store</button>

      {storeList.length > 0 && (
        <div>
          <h3>Multiple stores found. Please select one:</h3>
          <ul>
            {storeList.map((store) => (
              <li key={store._id}>
                <button onClick={() => {
                  setFormData({
                    name: store.name || '',
                    address: store.address || '',
                    phone: store.phone || '',
                    lat: store.location?.coordinates?.[1] || '',
                    lng: store.location?.coordinates?.[0] || '',
                    tags: (store.tags || []).join(', '),
                  });
                  setSelectedStoreId(store._id);  // Set selected store ID
                  setIsLoaded(true);
                  setMessage('✅ Store loaded successfully.');
                }}>
                  {store.name} - {store.address}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

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
