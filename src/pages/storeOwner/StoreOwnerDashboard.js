import React from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import EditStoreById from './EditStoreById';

import {
  Container,
  Typography,
  Stack,
  Button,
  Link,
  Divider,
  Box
} from '@mui/material';

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();

  const storeId = localStorage.getItem('storeOwnerName'); // ID from login/session

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Store Owner Dashboard
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="center"
        sx={{ mb: 3 }}
        flexWrap="wrap"
      >
        <Link
          component={RouterLink}
          to={`/store_owner/edit-store?id=${storeId}`}
          underline="hover"
        >
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

      <Box>
        <Routes>
          <Route
            index
            element={<Typography>Welcome to Store Owner Panel</Typography>}
          />
          <Route path="edit-store" element={<EditStoreById />} />
          <Route
            path="*"
            element={
              <Typography color="error">
                404 - Page Not Found in Store Owner Panel
              </Typography>
            }
          />
        </Routes>
      </Box>
    </Container>
  );
};

export default StoreOwnerDashboard;
