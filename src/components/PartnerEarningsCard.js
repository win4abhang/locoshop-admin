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
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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

      {/* Bonus Table */}
      <Box sx={{ maxWidth: 600, margin: '30px auto' }}>
        <Typography variant="h6" gutterBottom>
          💼 Weekly Earnings Example (Per Store Basis)
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Stores</strong></TableCell>
                <TableCell><strong>Commission (₹36.50/store)</strong></TableCell>
                <TableCell><strong>Bonus/Store</strong></TableCell>
                <TableCell><strong>Total Bonus</strong></TableCell>
                <TableCell><strong>Total Payout</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { stores: 5, commission: 182.5, bonusPer: 0, totalBonus: 0, total: 182.5 },
                { stores: 10, commission: 365, bonusPer: 13.5, totalBonus: 135, total: 500 },
                { stores: 25, commission: 912.5, bonusPer: 22.39, totalBonus: 559.72, total: 1472.22 },
                { stores: 50, commission: 1825, bonusPer: 41.28, totalBonus: 2063.93, total: 3888.93 },
                { stores: 100, commission: 3650, bonusPer: 63.5, totalBonus: 6350, total: 10000 }
              ].map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.stores}</TableCell>
                  <TableCell>₹{row.commission.toLocaleString('en-IN')}</TableCell>
                  <TableCell>₹{row.bonusPer.toFixed(2)}</TableCell>
                  <TableCell>₹{row.totalBonus.toLocaleString('en-IN')}</TableCell>
                  <TableCell>₹{row.total.toLocaleString('en-IN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" color="text.secondary" mt={1}>
          📝 <strong>Note:</strong> If the store count falls between slabs, the lower slab bonus will apply. <br />
          <i>उदा.: 27 स्टोअर्स असतील तर 25 स्टोअर्सचा बोनस लागू होईल.</i>
        </Typography>
      </Box>

      {/* Training Prompt Dialog */}
      <Dialog open={showTrainingPrompt} onClose={() => setShowTrainingPrompt(false)}>
        <DialogTitle>Get Started with Training</DialogTitle>
        <DialogContent>
          <Typography>
            💡 To start earning, complete the <strong>Local Partner Training</strong> available in the <strong>Menu</strong> section.
            It’s your key to onboarding shops and unlocking your first commission.
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
