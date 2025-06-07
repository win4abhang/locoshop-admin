import React, { useState } from 'react';
import axios from 'axios';
import StoreTable from '../../components/StoreTable';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

function EditStore() {
  const [editName, setEditName] = useState('');
  const [formData, setFormData] = useState({
    name: '', usp: '', address: '', phone: '', latitude: '', longitude: '', tags: '', subscription: ''
  });
  const [message, setMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [storeList, setStoreList] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const handleLoad = async () => {
    setMessage('');
    try {
      const res = await fetch(`${BACKEND_URL}/stores/by-name/${encodeURIComponent(editName)}`, {
        method: 'GET',
        headers: {
          'x-api-key': API_KEY,
        },
      });
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
          usp: store.usp || '',
          address: store.address || '',
          phone: store.phone || '',
          latitude: store.location?.coordinates?.[1]?.toString() || '',
          longitude: store.location?.coordinates?.[0]?.toString() || '',
          tags: (store.tags || []).join(', '),
          subscription: store.subscription || '',
        });
        setSelectedStoreId(store._id);
        setIsLoaded(true);
        setMessage('✅ Store loaded successfully.');
      } else {
        setStoreList(stores);
        setSelectedStoreId(null);
        setIsLoaded(false);
        setMessage('⚠️ Multiple stores found. Please select one.');
      }
    } catch (err) {
      console.error('Load error:', err);
      setMessage('❌ Error loading store.');
      setIsLoaded(false);
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

      {storeList.length > 1 && (
        <div style={{ marginTop: '1rem' }}>
          <StoreTable
            storeList={storeList.filter(store => store.subscription !== 'Paid')}
            onSelectStore={(store) => {
              setFormData({
                name: store.name || '',
                usp: store.usp || '',
                address: store.address || '',
                phone: store.phone || '',
                latitude: store.location?.coordinates?.[1] || '',
                longitude: store.location?.coordinates?.[0] || '',
                tags: (store.tags || []).join(', '),
                subscription: store.subscription || '',
              });
              setSelectedStoreId(store._id);
              setIsLoaded(true);
              setMessage('✅ Store loaded successfully.');
            }}
          />
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default EditStore;
