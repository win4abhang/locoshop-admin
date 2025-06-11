import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, CircularProgress,
  Table, TableHead, TableCell, TableRow, TableBody,
  Button, Stack
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PaymentRequestDialog from '../../components/PaymentRequestDialog'; // ✅ Adjust path as needed

dayjs.extend(relativeTime);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';
const PAGE_SIZE = 20;

const PaymentRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const localPartnerUsername = localStorage.getItem('username');

  useEffect(() => {
    fetchRequests();
  }, [page]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/payment/requestedbyLP`, {
        headers: { 'x-api-key': API_KEY },
        params: {
          localPartnerUsername,
          page,
          limit: PAGE_SIZE
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
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error('Failed to update payment request:', err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Payment Requests
      </Typography>

      <Paper sx={{ width: '100%', overflowX: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Store Name</TableCell>
                  <TableCell>Requested</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map(req => (
                  <TableRow key={req._id}>
                    <TableCell>{req.storeId?.name || req.customerName}</TableCell>
                    <TableCell>{dayjs(req.createdAt).fromNow(true)}</TableCell>
                    <TableCell>{req.status}</TableCell>
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

            {/* Pagination */}
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
      </Paper>

      {/* Popup Dialog */}
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
