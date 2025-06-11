import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel,
  TablePagination, Container, Typography, Paper
} from '@mui/material';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123'; // Same as in backend .env

const columns = [
  { id: 'paymentDate', label: 'Date' },
  { id: 'customerDetails', label: 'Customer' },
  { id: 'amount', label: 'Amount' },
  { id: 'paymentMode', label: 'Mode' },
  { id: 'paidBy', label: 'Paid By' },
];

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('paymentDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/payment/payments-received`, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sortBy,
          sortOrder,
        },
        headers: {
          'x-api-key': API_KEY,
        },
      });
      setPayments(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, sortBy, sortOrder]);

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === 'asc';
    setSortOrder(isAsc ? 'desc' : 'asc');
    setSortBy(column);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 4 }}>Payments Received</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={sortBy === col.id}
                    direction={sortBy === col.id ? sortOrder : 'asc'}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map(row => (
              <TableRow key={row._id}>
                <TableCell>{new Date(row.paymentDate).toLocaleString()}</TableCell>
                <TableCell>
                  {row.customerName || '-'}<br />
                  <small>{row.customerPhone || '-'}</small>
                </TableCell>
                <TableCell>₹{row.amount}</TableCell>
                <TableCell>{row.paymentMode}</TableCell>
                <TableCell>{row.paidBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Container>
  );
};

export default PaymentsPage;