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

  // Navigation buttons list
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
            color="primary"
            size="small"
            sx={{
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              py: 1,
              boxShadow: location.pathname === path ? 2 : 0,
              transition: 'all 0.3s ease-in-out',
              bgcolor: location.pathname === path ? 'primary.main' : 'background.paper',
              '&:hover': {
                boxShadow: 3,
                bgcolor: location.pathname === path ? 'primary.dark' : 'grey.100',
              }
            }}
          >
            {label}
          </Button>
        ))}
        <Button
          onClick={handleLogout}
          variant="outlined"
          color="error"
          size="small"
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            fontWeight: 500,
            px: 2,
            py: 1,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              bgcolor: 'error.main',
              color: '#fff',
            }
          }}
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
          <Route path="local-partner-payments" element={<LocalPartnerPayments />} />
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
