import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const ShippingDeliveryPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }} >
        <Typography variant="h4" gutterBottom>
          Shipping & Delivery Policy
        </Typography>

        <Typography variant="body1" paragraph>
          At <strong>localz.online</strong>, we provide online business listing and advertising services only.
        </Typography>

        <Typography variant="body1" paragraph>
          Please note that we do not sell or ship any physical products. Our platform is designed solely to help businesses advertise and list their services online.
        </Typography>

        <Typography variant="h6" gutterBottom>
          No Physical Delivery
        </Typography>
        <Typography variant="body1" paragraph>
          Since no physical products are sold through our platform, there is no shipping or delivery service involved.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or concerns, please contact us at <strong>localz.are.online@gmail.com</strong> or call <strong>7248924224</strong>.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Last updated: June 1, 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default ShippingDeliveryPolicy;
