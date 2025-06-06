import React from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import Users from './Users';

import {
  Box,
  Button,
  Typography,
  Stack,
  Link,
  Divider,
  Container
} from '@mui/material';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Navigation Links */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 3 }}
        flexWrap="wrap"
      >
        <Link component={RouterLink} to="/admin/add-store" underline="hover">
          ➕ Add Store
        </Link>
        <Link component={RouterLink} to="/admin/edit-store" underline="hover">
          ✏️ Edit Store
        </Link>
        <Link component={RouterLink} to="/admin/users" underline="hover">
          👥 Manage Users
        </Link>
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
