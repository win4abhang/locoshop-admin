import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button, Alert, Divider } from '@mui/material';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, password } = location.state || {};

  if (!username || !password) {
    return (
      <Box mt={5} textAlign="center">
        <Typography variant="h6" color="error">
          Invalid access. Please complete registration.
        </Typography>
      </Box>
    );
  }

  return (
    <Box maxWidth="sm" mx="auto" mt={8}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" color="success.main" fontWeight="bold" align="center" gutterBottom>
          🎉 Registration Successful!
        </Typography>

        <Typography align="center" sx={{ mb: 2 }}>
          Your store has been registered successfully.
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Your Login Credentials
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            <strong>Username (Store ID):</strong> {username}
          </Typography>
          <Typography variant="body2">
            <strong>Password (Phone No):</strong> {password}
          </Typography>
          <Typography variant="caption" color="error" display="block" sx={{ mt: 1 }}>
            Please save these credentials. You’ll need them to log in.
          </Typography>
        </Alert>

        <Box textAlign="center">
          <Button variant="contained" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
  