import React, { useState } from 'react';
import axios from 'axios';
import StoreTable from '../../components/StoreTable';
import StoreEditDialog from '../../components/StoreEditDialog';

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

function EditStore() {
  const [editName, setEditName] = useState('');
  const [message, setMessage] = useState('');
  const [storeList, setStoreList] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectStore = (store) => {
    setSelectedStore(store);
    setDialogOpen(true);
  };

  const handleUpdate = async (updatedStore) => {
    try {
      await axios.put(`${BACKEND_URL}/stores/${updatedStore._id}`, updatedStore, {
        headers: { 'x-api-key': API_KEY },
      });
      setMessage('✅ Store updated successfully.');
      setDialogOpen(false);
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('❌ Failed to update store.');
    }
  };

  const handleRequestPayment = async (store) => {
    try {
      await axios.post(`${BACKEND_URL}/payment/request`, {
        storeId: store._id,
        name: store.name,
        phone: store.phone,
        amount: 365,
      }, {
        headers: { 'x-api-key': API_KEY },
      });
      alert('✅ Payment request sent!');
    } catch (err) {
      console.error('Payment request failed:', err);
      alert('❌ Payment request failed');
    }
  };

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

      const stores = (data.stores || []).filter(store => store.subscription !== 'Paid');

      if (stores.length === 0) {
        setMessage('❌ No free stores found.');
      } else {
        setStoreList(stores);
        setMessage(`✅ Found ${stores.length} free store(s).`);
      }
    } catch (err) {
      console.error('Load error:', err);
      setMessage('❌ Error loading store.');
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, px: 2 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Find Store by Name
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Store Name"
            variant="outlined"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLoad}>
            Load Store
          </Button>
        </Box>

        {message && (
          <Alert
            severity={message.includes('❌') ? 'error' : message.includes('⚠️') ? 'warning' : 'success'}
            sx={{ mt: 2 }}
          >
            {message}
          </Alert>
        )}
      </Paper>

      {storeList.length > 0 && (
        <>
          <StoreTable
            storeList={storeList}
            onSelectStore={handleSelectStore}
          />

          <StoreEditDialog
            open={dialogOpen}
            store={selectedStore}
            handleClose={() => setDialogOpen(false)}
            onUpdate={handleUpdate}
            onRequestPayment={handleRequestPayment}
          />
        </>
      )}
    </Box>
  );
}

export default EditStore;
