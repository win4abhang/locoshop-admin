import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }} >
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          At <strong>localz.online</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect your name, email address, phone number, and business details when you register to list your business on our platform.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          Your information is used solely to display your business listing on our website and to contact you regarding your listing or support needs.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take reasonable precautions to protect your information. However, no method of transmission over the Internet is 100% secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Sharing of Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or rent your personal information to third parties.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          For any privacy-related concerns, contact us at <strong>localz.are.online@gmail.com</strong> or call <strong>7248924224</strong>.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Last updated: June 1, 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
