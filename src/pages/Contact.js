import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }} >
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We'd love to hear from you! If you have any questions, feedback, or suggestions, please feel free to contact us using the details below.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Business Name:</strong> localz.online<br />
          <strong>Owner:</strong> Vinod Pandurang Abhang<br />
          <strong>Address:</strong> Nana Abhangwasti Vidani, Phaltan, Satara, Maharashtra, India – 415523<br />
          <strong>Phone:</strong> <Link href="tel:+917248924224">7248924224</Link><br />
          <strong>Email:</strong> <Link href="mailto:localz.are.online@gmail.com">localz.are.online@gmail.com</Link>
        </Typography>
        <Typography variant="body1">
          We aim to respond to all queries within 24–48 hours.
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact;
