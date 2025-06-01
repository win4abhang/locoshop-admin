import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const TermsConditions = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }} >
        <Typography variant="h4" gutterBottom>
          Terms & Conditions
        </Typography>

        <Typography variant="body1" paragraph>
          These Terms & Conditions govern your use of the website <strong>localz.online</strong> operated by Vinod Pandurang Abhang.
        </Typography>

        <Typography variant="h6" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using our service, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not access the service.
        </Typography>

        <Typography variant="h6" gutterBottom>
          2. Service Description
        </Typography>
        <Typography variant="body1" paragraph>
          localz.online is an online business listing and advertising platform. We do not sell any physical goods or services directly.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. User Responsibilities
        </Typography>
        <Typography variant="body1" paragraph>
          Users are responsible for ensuring that the information they provide is accurate, complete, and up to date.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          We are not liable for any direct or indirect damages arising from the use of our website or services. Users must verify listings independently.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these terms at any time. Continued use of the service after changes implies acceptance of the updated terms.
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          For questions regarding these Terms, please contact us at <strong>localz.are.online@gmail.com</strong> or call <strong>7248924224</strong>.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Last updated: June 1, 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsConditions;
