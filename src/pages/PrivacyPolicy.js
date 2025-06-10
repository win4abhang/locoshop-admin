import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }}>
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
          Your information is used solely to display your business listing on our website, personalize your experience, and to contact you regarding your listing or support needs.
        </Typography>

        <Typography variant="h6" gutterBottom>
          3. Use of Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies, Google Ads tags, and Facebook Pixel to understand user behavior, track conversions, and show personalized ads across platforms. These tools help us improve our marketing efforts and website experience.
        </Typography>

        <Typography variant="h6" gutterBottom>
          4. Third-party Advertising and Analytics
        </Typography>
        <Typography variant="body1" paragraph>
          We may share anonymized usage data with third-party partners like Google and Facebook for advertising and analytics. These platforms may collect or receive information from our website and use it to provide services such as targeted advertising and audience measurement.
        </Typography>

        <Typography variant="h6" gutterBottom>
          5. Opt-Out Options
        </Typography>
        <Typography variant="body1" paragraph>
          You can control how your data is used for advertising through the following:
          <ul>
            <li>Google Ads Settings: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a></li>
            <li>Facebook Ad Preferences: <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">facebook.com/adpreferences</a></li>
            <li>Network Advertising Initiative: <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer">optout.networkadvertising.org</a></li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          6. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We take reasonable precautions to protect your information. However, no method of transmission over the Internet is 100% secure.
        </Typography>

        <Typography variant="h6" gutterBottom>
          7. Sharing of Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or rent your personal information. We may share anonymized, non-personal data with trusted partners for analytics and advertising purposes.
        </Typography>

        <Typography variant="h6" gutterBottom>
          8. Contact
        </Typography>
        <Typography variant="body1" paragraph>
          For any privacy-related concerns, contact us at <strong>localz.are.online@gmail.com</strong> or call <strong>7248924224</strong>.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Last updated: June 10, 2025
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
