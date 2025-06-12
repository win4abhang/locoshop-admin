import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CircularProgress, Table,
  TableHead, TableCell, TableRow, TableBody,
  Button, Stack, TextField, MenuItem, TableSortLabel
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PaymentRequestDialog from '../../components/PaymentRequestDialog';

dayjs.extend(relativeTime);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';
const PAGE_SIZE = 20;
const STATUS_OPTIONS = ['All', 'Pending', 'Sent reminder', 'Paid', 'Expired'];

const PaymentRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const localPartnerUsername = localStorage.getItem('username');

  useEffect(() => {
    fetchRequests();
  }, [page, search, statusFilter, sortBy, sortOrder]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/payment/requestedbyLP`, {
        headers: { 'x-api-key': API_KEY },
        params: {
          localPartnerUsername,
          page,
          limit: PAGE_SIZE,
          search,
          status: statusFilter === 'All' ? undefined : statusFilter,
          sortBy,
          order: sortOrder,
        }
      });
      setRequests(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest = async (id, updatedFields) => {
    try {
      await axios.put(`${BACKEND_URL}/payment/update/${id}`, updatedFields, {
        headers: { 'x-api-key': API_KEY }
      });
      fetchRequests();
    } catch (err) {
      console.error('Failed to update payment request:', err);
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment Request Report
      </Typography>

      <Stack direction="column" spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <TextField
          label="Status"
          select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          {STATUS_OPTIONS.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </TextField>
      </Stack>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Typography>No payment requests found.</Typography>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'storeName'}
                    direction={sortOrder}
                    onClick={() => handleSort('storeName')}
                  >
                    Store Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'createdAt'}
                    direction={sortOrder}
                    onClick={() => handleSort('createdAt')}
                  >
                    Requested
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map(req => (
                <TableRow
                  key={req._id}
                  hover
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{req.storeId?.name || req.customerName}</TableCell>
                  <TableCell>{dayjs(req.createdAt).fromNow()}</TableCell>
                  <TableCell>
                    <Typography color={
                      req.status?.toLowerCase() === 'paid' ? 'green' :
                      req.status?.toLowerCase() === 'expired' ? 'red' : 'orange'}>
                      {req.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => setSelectedRequest(req)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Stack direction="row" justifyContent="center" spacing={2} sx={{ my: 2 }}>
            <Button
              variant="contained"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Typography variant="body1" sx={{ alignSelf: 'center' }}>
              Page {page}
            </Typography>
            <Button
              variant="contained"
              disabled={requests.length < PAGE_SIZE}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </Button>
          </Stack>
        </>
      )}

      {selectedRequest && (
        <PaymentRequestDialog
          open={!!selectedRequest}
          request={selectedRequest}
          handleClose={() => setSelectedRequest(null)}
          onUpdate={handleUpdateRequest}
        />
      )}
    </Box>
  );
};

export default PaymentRequestsPage;
