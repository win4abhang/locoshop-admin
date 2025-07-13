import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Stack, Divider, Box, useTheme,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  LinearProgress
} from '@mui/material';
import axios from 'axios';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const PartnerEarningsCard = () => {
  const [storeCount, setStoreCount] = useState(0);
  const [commission, setCommission] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [nextTarget, setNextTarget] = useState(null);
  const [showTrainingPrompt, setShowTrainingPrompt] = useState(false);
  const theme = useTheme();

  const username = localStorage.getItem('username');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_KEY = 'YourStrongSecret123';

  useEffect(() => {
    if (!username) return;
    fetchWeeklySummary();
    setNextPaymentDate(getNextFriday());
  }, [username]);

  const fetchWeeklySummary = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/payment/weekly-summary`,
        { username },
        { headers: { 'x-api-key': API_KEY } }
      );

      const data = res.data;
      setStoreCount(data.storeCount);
      setCommission(data.commission);
      setBonus(data.bonus);
      setTotalEarning(data.totalEarning);
      setNextTarget(data.nextTarget || null);

      if (data.storeCount === 0) {
        setShowTrainingPrompt(true);
      }
    } catch (err) {
      console.error('Error fetching weekly summary:', err);
    }
  };

  const getNextFriday = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = (5 - day + 7) % 7 || 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + diff);
    nextFriday.setHours(18, 0, 0, 0);
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
      <Card sx={{ maxWidth: 500, margin: 'auto', p: 3, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={4}>
            {/* Weekly Commission */}
            <Box display="flex" alignItems="center" gap={2}>
              <CurrencyRupeeIcon color="success" fontSize="large" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Weekly Commission</Typography>
                <Typography variant="h5" fontWeight="bold" color="success.main">₹{commission.toFixed(2)}</Typography>
              </Box>
            </Box>

            <Divider />

            {/* Weekly Bonus */}
            <Box display="flex" alignItems="center" gap={2}>
              <CurrencyRupeeIcon color="info" fontSize="large" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Weekly Bonus (for {storeCount} stores)
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="info.main">₹{bonus.toFixed(2)}</Typography>
              </Box>
            </Box>

            {/* Progress to Next Slab */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Weekly Slab Progress
              </Typography>
              <Typography variant="body2">
                {nextTarget
                  ? `You’ve added ${storeCount} / ${nextTarget.stores} stores`
                  : `🎉 You've reached the highest slab!`}
              </Typography>

              {nextTarget && (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={(storeCount / nextTarget.stores) * 100}
                    sx={{ mt: 1, height: 10, borderRadius: 5 }}
                    color="success"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {nextTarget.stores - storeCount} more store{nextTarget.stores - storeCount > 1 ? 's' : ''} to reach ₹
                    {nextTarget.total.toLocaleString('en-IN')} slab
                  </Typography>
                </>
              )}
            </Box>

            <Divider />

            {/* Weekly Earning */}
            <Box display="flex" alignItems="center" gap={2}>
              <CurrencyRupeeIcon color="primary" fontSize="large" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Weekly Earning</Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  ₹{totalEarning.toLocaleString('en-IN')}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* Next Payment Date */}
            <Box display="flex" alignItems="center" gap={2}>
              <AccessTimeIcon color="info" fontSize="large" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Next Payment:</Typography>
                <Typography variant="body1" fontWeight="bold" color="text.disabled">{nextPaymentDate}</Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Slab Table */}
      <Box sx={{ maxWidth: 600, margin: '30px auto' }}>
        <Typography variant="h6" gutterBottom>
          💼 Weekly earnings calculation
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Stores</strong></TableCell>
                <TableCell><strong>Commission (₹36.5/store)</strong></TableCell>
                <TableCell><strong>Bonus/Store</strong></TableCell>
                <TableCell><strong>Total Bonus</strong></TableCell>
                <TableCell><strong>Total Payout</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { stores: 5, bonusPer: 10 },
                { stores: 10, bonusPer: 16 },
                { stores: 25, bonusPer: 20 },
                { stores: 50, bonusPer: 40 },
                { stores: 75, bonusPer: 55 },
                { stores: 100, bonusPer: 64 }
              ].map((row, idx) => {
                const commission = row.stores * 36.5;
                const totalBonus = row.stores * row.bonusPer;
                const total = commission + totalBonus;
                return (
                  <TableRow key={idx}>
                    <TableCell>{row.stores}</TableCell>
                    <TableCell>₹{commission.toLocaleString('en-IN')}</TableCell>
                    <TableCell>₹{row.bonusPer.toFixed(2)}</TableCell>
                    <TableCell>₹{totalBonus.toLocaleString('en-IN')}</TableCell>
                    <TableCell>₹{total.toLocaleString('en-IN')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Training Prompt */}
      <Dialog open={showTrainingPrompt} onClose={() => setShowTrainingPrompt(false)}>
        <DialogTitle>Get Started with Training</DialogTitle>
        <DialogContent>
          <Typography>
            💡 To start earning, complete the <strong>Local Partner Training</strong> available in the <strong>Menu</strong> section.
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
