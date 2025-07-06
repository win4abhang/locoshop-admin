import React from 'react';
import { Routes, Route, useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Users from './Users';
import PaymentsPage from './PaymentsPage';
import PaymentRequestsPage from './PaymentRequestsPage';
import LocalPartnerPayments from './LocalPartnerPayments'; // ✅ New page

import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Container
} from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Button list
  const navButtons = [
    { label: '➕ Add Store', path: '/admin/add-store' },
    { label: '✏️ Edit Store', path: '/admin/edit-store' },
    { label: '👥 Manage Users', path: '/admin/users' },
    { label: '💰 Payments Received', path: '/admin/payments' },
    { label: '💳 Payment Requests', path: '/admin/payment-requests' },
    { label: '🤝 Partner Payments', path: '/admin/local-partner-payments' } // ✅ New
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Navigation Buttons */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 3 }}
      >
        {navButtons.map(({ label, path }) => (
          <Button
            key={path}
            component={RouterLink}
            to={path}
            variant={location.pathname === path ? 'contained' : 'outlined'}
            color={location.pathname === path ? 'primary' : 'inherit'}
            size="small"
          >
            {label}
          </Button>
        ))}
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="error"
          size="small"
        >
          🚪 Logout
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* Admin Routes */}
      <Box>
        <Routes>
          <Route index element={<Typography>Welcome to Admin Panel</Typography>} />
          <Route path="add-store" element={<AddStore />} />
          <Route path="edit-store" element={<EditStore />} />
          <Route path="users" element={<Users />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="payment-requests" element={<PaymentRequestsPage />} />
          <Route path="local-partner-payments" element={<LocalPartnerPayments />} /> {/* ✅ New Route */}
          <Route
            path="*"
            element={<Typography color="error">404 - Page Not Found in Admin</Typography>}
          />
        </Routes>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
