import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
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
        const res = await axios.get(`${API_URL}/payment/summary`, {
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

      {/* Earnings Table */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          💼 Weekly Earning Example (Per Store Basis)
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 1 }}>
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
      </Grid>

      {/* Note below the table */}
      <Grid item xs={12}>
        <Card elevation={2} sx={{ backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              📝 <strong>Note:  </strong> If the total store count falls between the given slabs,
              the bonus will be calculated based on the lower slab. <br />
              <i>E.g.: If there are 27 stores, the bonus for 25 stores will be applicable.</i>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EarningsSummary;
