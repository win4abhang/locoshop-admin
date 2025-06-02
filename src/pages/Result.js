import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container } from '@mui/material';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

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
