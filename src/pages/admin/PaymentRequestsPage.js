import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, TablePagination,
  Paper, Typography, Box, TextField, CircularProgress
} from '@mui/material';
import axios from 'axios';

const PaymentRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [usernameFilter, setUsernameFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_KEY = 'YourStrongSecret123';

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/payment/all-payment-requests`, {
        headers: { 'x-api-key': API_KEY },
        params: {
          page: page + 1,
          limit: rowsPerPage,
          username: usernameFilter
        }
      });

      setRequests(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, rowsPerPage, usernameFilter]);

  return (
    <Box p={3}>
      <TextField
        label="Filter by Local Partner Username"
        value={usernameFilter}
        onChange={(e) => {
          setUsernameFilter(e.target.value);
          setPage(0); // reset page
        }}
        fullWidth
        margin="normal"
      />

      <Paper sx={{ width: '100%', overflow: 'auto' }}>
        {loading ? (
          <Box textAlign="center" py={4}><CircularProgress /></Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Partner</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Paid To LP</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.localPartnerUsername}</TableCell>
                  <TableCell>{row.customerName} ({row.customerPhone})</TableCell>
                  <TableCell>₹{row.order_amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.paidToLP || '-'}</TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleString('en-IN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
};

export default PaymentRequestsPage;