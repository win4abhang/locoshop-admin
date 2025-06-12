import React, { useState } from 'react';
import axios from 'axios';
import StoreTable from '../../components/StoreTable';
import StoreEditDialog from '../../components/StoreEditDialog';
import PaymentLinkCard from '../../components/PaymentLinkCard';
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
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectStore = (store) => {
    setSelectedStore(store);
    setDialogOpen(true);
  };

  const handleUpdate = async (updatedStore) => {
    if (!updatedStore || !updatedStore._id) {
      alert('❌ No store selected.');
      return;
    }

    const tagsArray = (updatedStore.tags || '').split(',').map(tag => tag.trim());

    const updatedData = {
      ...updatedStore,
      latitude: parseFloat(updatedStore.location?.coordinates?.[1]?.toString() || ''),
      longitude: parseFloat(updatedStore.location?.coordinates?.[0]?.toString() || ''),
      tags: tagsArray,
    };

    try {
      await axios.put(`${BACKEND_URL}/stores/update-by-id/${updatedStore._id}`, updatedData, {
        headers: { 'x-api-key': API_KEY }
      });

      alert('✅ Store is updated, Request payment');
    } catch (err) {
      console.error('Update error:', err);
      const errorMessage = err.response?.data?.message || 'Update failed.';
      setMessage('❌ ' + errorMessage);
    }
  };

  const handleRequestPayment = async (store) => {
    if (!store?._id) {
      alert('❌ Invalid store selected for payment.');
      return;
    }

    try {
      const localPartnerUsername = localStorage.getItem('username') || 'UnknownUser';

      const response = await axios.post(`${BACKEND_URL}/payment/request`, {
        order_amount: "365",
        order_currency: "INR",
        customerPhone: store.phone,
        customerName: store.name,
        link_expiry_hours: "24",
        storeId: store._id,
        localPartnerUsername,
      }, {
        headers: { 'x-api-key': API_KEY },
      });

      if (response.data.success) {
        setPaymentDetails({
          storeName: store.name,
          phone: store.phone,
          paymentLink: response.data.link_url,
        });
        alert('✅ Payment request sent! Payment Link expires in 24 hours');
      } else {
        alert('❌ Payment link creation failed');
      }
    } catch (err) {
      console.error('Payment request failed:', err);
      alert('❌ Payment request failed');
    }
  };

  const handleLoad = async () => {
    setMessage('');
    setStoreList([]);
    setIsLoading(true);

    if (!navigator.geolocation) {
      alert('❌ Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const response = await fetch(
            `${BACKEND_URL}/stores/by-nameForLP?row_query=${encodeURIComponent(editName)}&page=1&limit=100&latitude=${lat}&longitude=${lng}`,
            {
              headers: {
                'x-api-key': API_KEY,
              },
            }
          );

          const data = await response.json();

          if (!Array.isArray(data.stores) || data.stores.length === 0) {
            setMessage('❌ No matching stores found.');
          } else {
            const unpaidStores = data.stores.filter(store => store.subscription !== 'Paid');

            if (unpaidStores.length === 0) {
              setMessage('❌ All found stores are already paid.');
            } else {
              setStoreList(unpaidStores);
              setMessage(`✅ Found ${unpaidStores.length} free store(s).`);
            }
          }
        } catch (err) {
          console.error('Search error:', err);
          setMessage('❌ Failed to fetch store data.');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('❌ Location access is required to load stores near you.\n\nPlease allow location and try again.');
        setIsLoading(false);
      }
    );
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, px: 2 }}>
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Find Store by Name (Location Required)
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Store Name"
            variant="outlined"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoad}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load Store'}
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

      {paymentDetails && (
        <PaymentLinkCard
          storeName={paymentDetails.storeName}
          phone={paymentDetails.phone}
          paymentLink={paymentDetails.paymentLink}
        />
      )}
    </Box>
  );
}

export default EditStore;
