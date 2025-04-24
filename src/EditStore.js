import React, { useState } from 'react';

const BACKEND_URL = 'https://locoshop-backend.onrender.com';

function EditStore() {
  const [editName, setEditName] = useState('');
  const [formData, setFormData] = useState({
    name: '', address: '', phone: '', lat: '', lng: '', tags: ''
  });
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [storeList, setStoreList] = useState([]); // ✅ ADD THIS LINE

  const handleLoad = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/stores/by-name/${encodeURIComponent(editName)}`);
      const data = await res.json();
      if (res.ok) {
        if (data.stores.length === 1) {
          // If only one store is found, load it directly
          setFormData({ ...data.stores[0], tags: data.stores[0].tags.join(', ') });
          setIsLoaded(true);
          setMessage('✅ Store loaded successfully.');
        } else if (data.stores.length > 1) {
          // If multiple stores are found, display a list of stores to choose from
          setStoreList(data.stores);
          setMessage('❌ Multiple stores found. Please select one.');
        }
      } else {
        setMessage('❌ Store not found.');
      }
    } catch (err) {
      setMessage('❌ Error loading store.');
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
  
      {/* If multiple stores are found, display them in a list to let the user select */}
      {storeList.length > 0 && (
        <div>
          <h3>Multiple stores found. Please select one:</h3>
          <ul>
            {storeList.map((store, index) => (
              <li key={index}>
                <button onClick={() => setFormData({ ...store, tags: store.tags.join(', ') })}>
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
    
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim());
    const updatedData = { ...formData, tags: tagsArray };

    try {
      const res = await fetch(`${BACKEND_URL}/api/stores/update-by-name/${encodeURIComponent(editName)}`, {
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
