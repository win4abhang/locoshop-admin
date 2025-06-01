import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const ReturnRefundPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }} >
        <Typography variant="h4" gutterBottom>
          Return, Refund, and Cancellation Policy
        </Typography>

        <Typography variant="body1" paragraph>
          At <strong>localz.online</strong>, we provide an online business listing and advertising service. Please note the following policies:
        </Typography>

        <Typography variant="h6" gutterBottom>
          No Refunds
        </Typography>
        <Typography variant="body1" paragraph>
          We do not offer any refunds for the services provided. All payments are final.
        </Typography>

        <Typography variant="h6" gutterBottom>
          No Physical Delivery
        </Typography>
        <Typography variant="body1" paragraph>
          Our platform only offers online listings and advertising services. We do not sell or deliver any physical products.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Cancellation Policy
        </Typography>
        <Typography variant="body1" paragraph>
          If you wish to cancel your listing or subscription, please contact us at <strong>localz.are.online@gmail.com</strong>. Cancellation requests will be processed but will not qualify for any refund.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          For any queries regarding this policy, feel free to contact us at <strong>localz.are.online@gmail.com</strong> or call <strong>7248924224</strong>.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Last updated: June 1, 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default ReturnRefundPolicy;
