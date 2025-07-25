import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Menu from '../components/Menu'; // Adjust path if needed

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to <strong>localz.online</strong> – your trusted platform for listing and discovering local businesses and services in India.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to empower small businesses by offering a simple, effective, and accessible way to get discovered online. Whether you're running a shop, offering a service, or managing a local business, <strong>localz.online</strong> helps you reach customers in your area.
        </Typography>
        <Typography variant="body1" paragraph>
          This platform is proudly created and managed by <strong>Vinod Pandurang Abhang</strong>, based in Satara, Maharashtra.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>localz.online</strong> is a part of <strong>Agronome Pvt. Ltd.</strong>
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions, feel free to contact us at: <br />
          <strong>📍 Address:</strong> 1ST FLOOR, HOME NO. 396, NEAR MAHADEV MANDIR, PHALTAN SATARA ROAD, GHADGEWADI, Satara, Maharashtra, 415523<br />
          <strong>📞 Mobile:</strong> 7248924224<br />
          <strong>📧 Email:</strong> connect@localz.online
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
