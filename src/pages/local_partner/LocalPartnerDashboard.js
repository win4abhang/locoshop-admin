import React, { useEffect, useState } from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import PaymentRequests from './PaymentRequestsPage';
import PartnerEarningsCard from '../../components/PartnerEarningsCard';

import {
  Box,
  Button,
  Typography,
  Stack,
  Link,
  Divider,
  Container,
  Paper,
} from '@mui/material';

const LocalPartnerDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username'); // Adjust the key if different
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Local Partner Dashboard
        </Typography>

        {/* 👇 Show username if available */}
        {username && (
          <Typography align="center" variant="subtitle1" color="textSecondary" sx={{ mb: 2 }}>
            Logged in as: <strong>{username}</strong>
          </Typography>
        )}

        <Stack direction="column" spacing={2} sx={{ mb: 3 }} alignItems="stretch">
          <Button
            component={RouterLink}
            to="/local_partner/add-store"
            variant="contained"
            color="primary"
            fullWidth
          >
            ➕ Add Store
          </Button>

          <Button
            component={RouterLink}
            to="/local_partner/edit-store"
            variant="outlined"
            color="primary"
            fullWidth
          >
            ✏️ Edit Store
          </Button>

          <Button
            component={RouterLink}
            to="/local_partner/PaymentRequestsPage"
            variant="outlined"
            color="primary"
            fullWidth
          >
            💸 Payment Request Report
          </Button>

          <Button
            component={RouterLink}
            to="/local_partner/earnings"
            variant="outlined"
            color="success"
            fullWidth
          >
            💰 Earnings
          </Button>

          <Button
            onClick={handleLogout}
            variant="text"
            color="error"
            fullWidth
          >
            🚪 Logout
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Routes>
            <Route
              index
              element={
                <Typography align="center" variant="body1">
                  👋 Welcome to Local Partner Dashboard.
                </Typography>
              }
            />
            <Route path="add-store" element={<AddStore />} />
            <Route path="edit-store" element={<EditStore />} />
            <Route path="PaymentRequestsPage" element={<PaymentRequests />} />
            <Route path="earnings" element={<PartnerEarningsCard />} />
            <Route
              path="*"
              element={
                <Typography color="error" align="center">
                  404 - Page Not Found in Local Partner Dashboard
                </Typography>
              }
            />
          </Routes>
        </Box>
    </Container>
  );
};

export default LocalPartnerDashboard;
