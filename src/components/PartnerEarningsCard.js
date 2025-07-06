import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PaidIcon from '@mui/icons-material/Paid';

const PartnerEarningsCard = () => {
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [upcomingPayment, setUpcomingPayment] = useState(0);
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [showTrainingPrompt, setShowTrainingPrompt] = useState(false);
  const theme = useTheme();

  const username = localStorage.getItem('username');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_KEY = 'YourStrongSecret123';

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/payment/partner-earnings`,
          { username },
          {
            headers: { 'x-api-key': API_KEY }
          }
        );

        const data = res.data;
        const today = data.todayEarnings || 0;
        const upcoming = data.upcomingPayment || 0;

        setTodayEarnings(today);
        setUpcomingPayment(upcoming);
        setNextPaymentDate(getNextFriday());

        if (today === 0 && upcoming === 0) {
          setShowTrainingPrompt(true);
        }
      } catch (error) {
        console.error('Error fetching earnings:', error);
      }
    };

    if (username) {
      fetchEarnings();
    }
  }, [username]);

  const getNextFriday = () => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = (5 - day + 7) % 7 || 7; // Days until Friday
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + diff);
    nextFriday.setHours(18, 0, 0, 0); // 6 PM
    return nextFriday.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Earnings Card */}
      <Card
        sx={{
          maxWidth: 500,
          margin: 'auto',
          p: 3,
          boxShadow: 6,
          borderRadius: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent>
          <Stack spacing={4}>
            {/* Today’s Earnings */}
            <Box display="flex" alignItems="center" gap={2}>
              <CurrencyRupeeIcon color="success" fontSize="large" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Today’s Earnings
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  ₹{todayEarnings}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* Upcoming Payment */}
            <Box display="flex" alignItems="center" gap={2}>
              <CurrencyRupeeIcon color="success" fontSize="large" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Upcoming Payment
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="warning.main">
                  ₹{upcomingPayment}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* Next Payment Date */}
            <Box display="flex" alignItems="center" gap={2}>
              <AccessTimeIcon color="info" fontSize="large" />
              {nextPaymentDate && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Next Payment:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="text.disabled">
                    {nextPaymentDate}
                  </Typography>
                </Box>
              )}
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Training Prompt Dialog */}
      <Dialog open={showTrainingPrompt} onClose={() => setShowTrainingPrompt(false)}>
        <DialogTitle>Get Started with Training</DialogTitle>
        <DialogContent>
          <Typography>
            💡 To start earning, complete the <strong>Local Partner Training</strong> available in the <strong>Menu</strong> section. It’s your key to onboarding shops and unlocking your first commission.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTrainingPrompt(false)} variant="contained" color="primary">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PartnerEarningsCard;
