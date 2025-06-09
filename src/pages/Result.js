import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'AW-17100124901'; // Replace with your own ID

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // 👇 Trigger Google Ads conversion only on successful registration
  useEffect(() => {
    if (state?.success) {
      ReactGA.initialize(GA_MEASUREMENT_ID);

      // This will log a page view (optional)
      ReactGA.send({ hitType: 'pageview', page: '/result', title: 'Registration Success' });

      // This triggers the conversion event (required for Google Ads)
      ReactGA.event('conversion', {
        send_to: 'AW-17100124901', // Replace with your actual Google Ads ID
      });

      console.log("✅ Google Conversion Event Triggered");
    }
  }, [state]);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {state?.success ? '✅ Store Registered Successfully' : '❌ Registration Failed'}
        </Typography>

        {state?.success ? (
          <>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Username:</strong> {state.username}
              <br />
              <strong>Password:</strong> {state.password}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Please save these credentials safely.
              You can't change your Username and Password, So Save it safely.
            </Typography>
            <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/login')}>
              LOGIN
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" sx={{ mt: 4 }} onClick={() => navigate('/register')}>
              Try again
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {state?.message || 'Something went wrong.'}
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Result;
