import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import StaffDashboard from './pages/staff/StaffDashboard';
import StoreOwnerDashboard from './pages/storeOwner/StoreOwnerDashboard';
import About from './pages/About'; // adjust path if different
import Contact from './pages/Contact'; // adjust path if different
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnRefundPolicy from './pages/ReturnRefundPolicy';
import ShippingDeliveryPolicy from './pages/ShippingDeliveryPolicy';
import Result from './pages/Result';
import LandingLocalPartner from './pages/LandingLocalPartner';
import RegisterLocalPartner from './pages/RegisterLocalPartner';

import './App.css';

// ✅ MUI theme setup
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/return" element={<ReturnRefundPolicy />} />
          <Route path="/shipping" element={<ShippingDeliveryPolicy />} />
          <Route path="/result" element={<Result />} />
          
          <Route path="/landing_Local_Partner" element={<LandingLocalPartner />} />
          <Route path="/register_local-partner" element={<RegisterLocalPartner />} />
          

          {/* Dashboard Routes */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/staff/*" element={<StaffDashboard />} />
          <Route path="/store_owner/*" element={<StoreOwnerDashboard />} />

          {/* 404 fallback */}
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
