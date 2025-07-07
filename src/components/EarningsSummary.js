import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const EarningsSummary = () => {
  const [summary, setSummary] = useState({
    today: 0,
    week: 0,
    month: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/payments/summary`, {
          headers: { 'x-api-key': 'YourStrongSecret123' },
        });
        setSummary(res.data);
      } catch (err) {
        console.error('Failed to load earnings summary:', err.message);
      }
    };

    fetchSummary();
  }, []);

  const CardItem = ({ title, amount }) => (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="h6" color="success.main">
          ₹{amount.toLocaleString('en-IN')}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <CardItem title="📅 Today's Earnings" amount={summary.today} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardItem title="📈 This Week's Earnings" amount={summary.week} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CardItem title="📆 This Month's Earnings" amount={summary.month} />
      </Grid>
    </Grid>
  );
};

export default EarningsSummary;
