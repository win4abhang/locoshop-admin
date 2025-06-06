import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4, mt: 8 }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >

          <Link component={RouterLink} to="/about" underline="hover" color="text.secondary">
            About Us
          </Link>
          <Link component={RouterLink} to="/contact" underline="hover" color="text.secondary">
            Contact Us
          </Link>
          <Link component={RouterLink} to="/privacy" underline="hover" color="text.secondary">
            Privacy Policy
          </Link>
          <Link component={RouterLink} to="/terms" underline="hover" color="text.secondary">
            Terms & Conditions
          </Link>
          <Link component={RouterLink} to="/return" underline="hover" color="text.secondary">
            Return & Refund Policy
          </Link>
          <Link component={RouterLink} to="/shipping" underline="hover" color="text.secondary">
            Shipping Policy
          </Link>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          © {new Date().getFullYear()} Locoshop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
