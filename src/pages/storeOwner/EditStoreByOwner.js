import React, { useEffect, useState } from 'react';

const BACKEND_URL = 'https://locoshop-backend.onrender.com/api/stores';

function EditStoreByOwner() {
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', latitude: '', longitude: '', tags: ''
  });
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [ownerName, setOwnerName] = useState('');

  // Load store when page loads using owner name
  useEffect(() => {
    const storedName = localStorage.getItem('storeOwnerName'); // e.g., 'ashiyana' or 'vinod'
    if (storedName) {
      setOwnerName(storedName);
      loadStore(storedName);
    } else {
      setMessage('❌ No store owner name found in localStorage.');
    }
  }, []);

  const loadStore = async (name) => {
    try {
      const res = await fetch(`${BACKEND_URL}/by-id/${name}`);
      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message || 'Failed to fetch store data.'}`);
        return;
      }

      const stores = data.stores || [];

      if (stores.length === 0) {
        setMessage('❌ Store not found.');
        setIsLoaded(false);
        setSelectedStoreId(null);
      } else if (stores.length === 1) {
        const store = stores[0];
        setFormData({
          name: store.name || '',
          address: store.address || '',
          phone: store.phone || '',
          latitude: store.location?.coordinates?.[1]?.toString() || '',
          longitude: store.location?.coordinates?.[0]?.toString() || '',
          tags: (store.tags || []).join(', '),
        });
        setSelectedStoreId(store._id);
        setIsLoaded(true);
        setMessage('✅ Store loaded successfully.');
      } else {
        setStoreList(stores);
        setIsLoaded(false);
        setSelectedStoreId(null);
        setMessage('⚠️ Multiple stores found. Please select one.');
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
      <h2>Edit My Store</h2>
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
                    latitude: store.location?.coordinates?.[1] || '',
                    longitude: store.location?.coordinates?.[0] || '',
                    tags: (store.tags || []).join(', '),
                  });
                  setSelectedStoreId(store._id);
                  setIsLoaded(true);
                  setMessage('✅ Store loaded successfully.');
                }}>
                  <strong>{store.name}</strong>
                  <div className="text-sm text-gray-600">{store.address}</div>
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
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
          <button type="submit">Update Store</button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditStoreByOwner;
