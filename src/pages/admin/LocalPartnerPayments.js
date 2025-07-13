import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

const LocalPartnerPayments = () => {
  const [username, setUsername] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weeklyBonus, setWeeklyBonus] = useState(null);

  const fetchPayments = async () => {
    if (!username.trim()) return;
    try {
      setLoading(true);

      // Get payment records
      const response = await axios.get(`${BACKEND_URL}/payment/local-partner`, {
        params: { username },
        headers: { 'x-api-key': API_KEY },
      });
      setRecords(response.data || []);

      // Get weekly bonus summary
      const bonusRes = await axios.post(`${BACKEND_URL}/payment/weekly-summary`, {
        username,
      }, {
        headers: { 'x-api-key': API_KEY },
      });
      setWeeklyBonus(bonusRes.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/payment/mark-paid-to-local-partner`,
        { username },
        { headers: { 'x-api-key': API_KEY } }
      );
      fetchPayments(); // Refresh
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const totalCommission = records.reduce((sum, item) => sum + (item.order_amount * 0.1), 0);

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <TextField
          label="Partner Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          onClick={fetchPayments}
          disabled={loading || !username}
        >
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </Stack>

      {/* TABLE */}
      {records.length > 0 && (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Link ID</TableCell>
                <TableCell>Paid Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.customerPhone}</TableCell>
                  <TableCell>₹{row.order_amount}</TableCell>
                  <TableCell>{row.link_id}</TableCell>
                  <TableCell>
                    {row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* COMMISSION */}
      {records.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            💸 Total Commission (10%): ₹{totalCommission.toFixed(2)}
          </Typography>
          <Button variant="contained" color="success" onClick={handleMarkAsPaid}>
            ✅ Mark All as Paid
          </Button>
        </>
      )}

      {/* WEEKLY BONUS SUMMARY */}
      {weeklyBonus && (
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>📈 Weekly Summary</Typography>
          <Typography>🛍️ Stores Added: <strong>{weeklyBonus.storeCount}</strong></Typography>
          <Typography>💼 Commission (₹36.5/store): <strong>₹{weeklyBonus.weeklyCommission.toFixed(2)}</strong></Typography>
          <Typography>🎁 Bonus: <strong>₹{weeklyBonus.bonusAmount.toFixed(2)}</strong></Typography>
          <Typography>🧾 Total Weekly Earning: <strong>₹{weeklyBonus.totalWeeklyEarning.toFixed(2)}</strong></Typography>

          {weeklyBonus.nextTarget && (
            <Typography sx={{ mt: 1, color: 'orange' }}>
              🔔 Add {weeklyBonus.nextTarget.stores - weeklyBonus.storeCount} more store(s) to reach the ₹{weeklyBonus.nextTarget.total} slab!
            </Typography>
          )}
        </Box>
      )}

      {records.length === 0 && username && !loading && (
        <Typography>No unpaid records found for this partner.</Typography>
      )}
    </Box>
  );
};

export default LocalPartnerPayments;
