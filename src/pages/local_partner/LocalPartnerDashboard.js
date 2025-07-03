import React, { useEffect, useState } from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import AddStore from './AddStore';
import EditStore from './EditStore';
import PaymentRequests from './PaymentRequestsPage';
import PartnerEarningsCard from '../../components/PartnerEarningsCard';
import LocalPartnerTrainingPage from './LocalPartnerTrainingPage';
import MarketingMaterial from './MarketingMaterial';

import {
  Box,
  Button,
  Typography,
  Stack,
  Link,
  Divider,
  Container,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const LocalPartnerDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerItems = [
    { label: '➕ Add Store', path: '/local_partner/add-store' },
    { label: '✏️ Edit & Payment Request', path: '/local_partner/edit-store' },
    { label: '💸 Payment Request Report', path: '/local_partner/PaymentRequestsPage' },
    { label: '💰 Earnings', path: '/local_partner/earnings' },
    { label: '📗 Trainings', path: '/local_partner/trainings' },
    { label: '📢 Marketing Material', path: '/local_partner/MarketingMaterial' },
    { label: '🚪 Logout', action: handleLogout },
  ];

  return (
    <>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Local Partner Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {username && (
              <ListItem>
                <Typography variant="subtitle2" color="textSecondary">
                  Logged in as: <strong>{username}</strong>
                </Typography>
              </ListItem>
            )}
            {drawerItems.map((item, index) => (
              <ListItemButton
                key={index}
                component={item.path ? RouterLink : 'button'}
                to={item.path || undefined}
                onClick={item.action || undefined}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Page Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mt: 2 }}>
          <Routes>
            <Route index element={<PartnerEarningsCard />} />
            <Route path="add-store" element={<AddStore />} />
            <Route path="edit-store" element={<EditStore />} />
            <Route path="PaymentRequestsPage" element={<PaymentRequests />} />
            <Route path="earnings" element={<PartnerEarningsCard />} />
            <Route path="trainings" element={<LocalPartnerTrainingPage />} />
            <Route path="MarketingMaterial" element={<MarketingMaterial />} />
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
    </>
  );
};

export default LocalPartnerDashboard;
