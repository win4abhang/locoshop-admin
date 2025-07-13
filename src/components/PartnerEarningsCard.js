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
  const [weeklyCommission, setWeeklyCommission] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [storeCount, setStoreCount] = useState(0);
  const [nextPaymentDate, setNextPaymentDate] = useState('');
  const [showTrainingPrompt, setShowTrainingPrompt] = useState(false);
  const [nextTarget, setNextTarget] = useState(null);
  const theme = useTheme();

  const username = localStorage.getItem('username');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_KEY = 'YourStrongSecret123';

  const slabs = [
    { stores: 100, total: 10000 },
    { stores: 50, total: 3888.93 },
    { stores: 25, total: 1472.22 },
    { stores: 10, total: 500 },
    { stores: 5, total: 182.5 }
  ];

  useEffect(() => {
    if (!username) return;
    fetchWeeklyStores();
    setNextPaymentDate(getNextFriday());
  }, [username]);

  const fetchWeeklyStores = async () => {
    try {
      const { start, end } = getCurrentWeekRange();

      const res = await axios.post(
        `${BACKEND_URL}/payment/partner-weekly-stores`,
        { username },
        { headers: { 'x-api-key': API_KEY } }
      );

      const allStores = res.data || [];
      const filteredStores = allStores.filter(store => {
        const created = new Date(store.createdAt);
        return created >= start && created <= end;
      });

      const count = filteredStores.length;
      setStoreCount(count);

      const commission = count * 36.5;
      setWeeklyCommission(commission);

      const slab = slabs.find(s => count >= s.stores);
      const bonus = slab ? slab.total - commission : 0;
      setBonusAmount(bonus);

      const next = slabs.slice().reverse().find(s => count < s.stores);
      setNextTarget(next);

      if (count === 0) {
        setShowTrainingPrompt(true);
      }
    } catch (err) {
      console.error('Error fetching store count:', err);
    }
  };

  const getCurrentWeekRange = () => {
    const today = new Date();
    const day = today.getDay();

    const lastFriday = new Date(today);
    lastFriday.setDate(today.getDate() - ((day + 2) % 7));
    lastFriday.setHours(0, 0, 0, 0);

    const thisThursday = new Date(today);
    const diffToThursday = (4 - day + 7) % 7;
    thisThursday.setDate(today.getDate() + diffToThursday);
    thisThursday.setHours(23, 59, 59, 999);

    return { start: lastFriday, end: thisThursday };
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

  const totalWeeklyEarning = weeklyCommission + bonusAmount;

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
                <Typography variant="h5" fontWeight="bold" color="success.main">₹{weeklyCommission.toFixed(2)}</Typography>
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
                <Typography variant="h5" fontWeight="bold" color="info.main">₹{bonusAmount.toFixed(2)}</Typography>
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
                  ₹{totalWeeklyEarning.toLocaleString('en-IN')}
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
                <TableCell><strong>Commission ₹36.50/store</strong></TableCell>
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
