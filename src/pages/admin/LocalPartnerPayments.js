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
  const [weeklySummary, setWeeklySummary] = useState(null);

  const fetchPayments = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);

      // Fetch unpaid payment records
      const res = await axios.get(`${BACKEND_URL}/payment/local-partner`, {
        params: { username },
        headers: { 'x-api-key': API_KEY },
      });
      setRecords(res.data || []);

      // Fetch weekly summary
      const summaryRes = await axios.post(`${BACKEND_URL}/payment/weekly-summary`, {
        username,
      }, {
        headers: { 'x-api-key': API_KEY },
      });
      setWeeklySummary(summaryRes.data || {});
    } catch (err) {
      console.error('Error fetching data:', err);
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
      fetchPayments(); // Refresh data
    } catch (err) {
      console.error('Error marking as paid:', err);
    }
  };

  const totalCommission = records.reduce((sum, item) => {
    const amount = Number(item.order_amount) || 0;
    return sum + (amount * 0.1);
  }, 0);

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
                  <TableCell>{row.customerName || '-'}</TableCell>
                  <TableCell>{row.customerPhone || '-'}</TableCell>
                  <TableCell>₹{(row.order_amount || 0).toFixed(2)}</TableCell>
                  <TableCell>{row.link_id || '-'}</TableCell>
                  <TableCell>
                    {row.paymentDate
                      ? new Date(row.paymentDate).toLocaleDateString('en-IN')
                      : '-'}
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

      {/* WEEKLY SUMMARY */}
      {weeklySummary && (
        <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>📈 Weekly Summary</Typography>
          <Typography>🛍️ Stores Added: <strong>{weeklySummary.storeCount || 0}</strong></Typography>
          <Typography>💼 Commission (₹36.5/store): <strong>₹{(weeklySummary.commission || 0).toFixed(2)}</strong></Typography>
          <Typography>🎁 Bonus (based on slab): <strong>₹{(weeklySummary.bonus || 0).toFixed(2)}</strong></Typography>
          <Typography>🧾 Total Weekly Earning: <strong>₹{(weeklySummary.totalEarning || 0).toFixed(2)}</strong></Typography>
        </Box>
      )}

      {records.length === 0 && username && !loading && (
        <Typography sx={{ mt: 2 }}>No unpaid records found for this partner.</Typography>
      )}
    </Box>
  );
};

export default LocalPartnerPayments;
