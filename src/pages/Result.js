import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container } from '@mui/material';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // 🔄 TEMPORARILY inject gtag on this page directly
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17100124901';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-17100124901');
    `;
    document.head.appendChild(script2);

    // Clean up scripts when component unmounts
    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

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
