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
const API_KEY = 'YourStrongSecret123'; // Replace with the same key as in your backend .env

const LocalPartnerPayments = () => {
  const [username, setUsername] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    if (!username.trim()) return;
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/payment/local-partner`, {
        params: { username },
        headers: { 'x-api-key': API_KEY },
      });
      setRecords(response.data || []);
    } catch (error) {
      console.error('Error fetching partner payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/payment/mark-paid-to-local-partner`,
        { username },
        {
          headers: { 'x-api-key': API_KEY },
        }
      );
      fetchPayments(); // refresh
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

      {records.length === 0 && username && !loading && (
        <Typography>No unpaid records found for this partner.</Typography>
      )}
    </Box>
  );
};

export default LocalPartnerPayments;
