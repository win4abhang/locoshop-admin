import React from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';

import {
  Box,
  Button,
  Typography,
  Stack,
  Link,
  Divider,
  Container
} from '@mui/material';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Staff Dashboard
      </Typography>

      {/* Navigation Links */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 3 }}
        flexWrap="wrap"
      >
        <Link component={RouterLink} to="/staff/add-store" underline="hover">
          ➕ Add Store
        </Link>
        <Link component={RouterLink} to="/staff/edit-store" underline="hover">
          ✏️ Edit Store
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

      {/* Routes */}
      <Box>
        <Routes>
          <Route
            index
            element={<Typography>Welcome to Staff Panel</Typography>}
          />
          <Route path="add-store" element={<AddStore />} />
          <Route path="edit-store" element={<EditStore />} />
          <Route
            path="*"
            element={
              <Typography color="error">404 - Page Not Found in Staff Panel</Typography>
            }
          />
        </Routes>
      </Box>
    </Container>
  );
};

export default StaffDashboard;
