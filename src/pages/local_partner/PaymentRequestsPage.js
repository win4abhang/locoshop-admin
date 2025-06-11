// ✅ ALL IMPORTS SHOULD BE AT THE VERY TOP
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  IconButton,
  Box,
  Paper,
  CircularProgress,
  Table,
  TableHead, TableCell, MenuItem, TextField, Stack, TableRow, Select, TableBody 
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

dayjs.extend(relativeTime);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

const STAGES = ['pending', 'sent reminder', 'paid', 'expired'];
const PAGE_SIZE = 20;

function PaymentRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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
      setRequests(res.data.data); // ✅ only the array
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStage = async (id, stage) => {
    try {
      await axios.put(`${BACKEND_URL}/payment-requests/${id}/status`, { status: stage }, {
        headers: { 'x-api-key': API_KEY }
      });
      setRequests(reqs => reqs.map(r => r._id === id ? { ...r, status: stage } : r));
    } catch (err) {
      console.error('Error updating status', err);
    }
  };

  const updateNote = async (id, note) => {
    try {
      await axios.put(`${BACKEND_URL}/payment-requests/${id}/notes`, { notes: note }, {
        headers: { 'x-api-key': API_KEY }
      });
    } catch (err) {
      console.error('Error updating notes', err);
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
                  <TableCell>Elapsed</TableCell>
                  <TableCell>Call</TableCell>
                  <TableCell>WhatsApp</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map(req => (
                  <TableRow key={req._id}>
                    <TableCell>{req.storeId?.name || req.customerName}</TableCell>
                    <TableCell>{dayjs(req.createdAt).format('YYYY-MM-DD HH:mm')}</TableCell>
                    <TableCell>{dayjs(req.createdAt).fromNow(true)}</TableCell>

                    <TableCell>
                      <Button
                        startIcon={<PhoneIcon />}
                        variant="outlined"
                        color="primary"
                        href={`tel:+91${req.customerPhone}`}
                      >
                        Call
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        startIcon={<WhatsAppIcon />}
                        variant="outlined"
                        color="success"
                        href={`https://wa.me/91${req.customerPhone}?text=Hi ${req.customerName}, please complete your payment: ${req.link_url}`}
                        target="_blank"
                      >
                        WhatsApp
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Select
                        value={req.status}
                        onChange={e => updateStage(req._id, e.target.value)}
                        size="small"
                      >
                        {STAGES.map(s => (
                          <MenuItem key={s} value={s}>{s}</MenuItem>
                        ))}
                      </Select>
                    </TableCell>

                    <TableCell>
                      <TextField
                        placeholder="Add notes"
                        size="small"
                        fullWidth
                        value={notes[req._id] || ''}
                        onChange={e => setNotes(n => ({ ...n, [req._id]: e.target.value }))}
                        onBlur={() => updateNote(req._id, notes[req._id] || '')}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ my: 2 }}>
              <Button
                variant="contained"
                disabled={page === 1}
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
              >
                Previous
              </Button>

              <Typography variant="body1" sx={{ alignSelf: 'center' }}>
                Page {page}
              </Typography>

              <Button
                variant="contained"
                disabled={requests.length < PAGE_SIZE}
                onClick={() => setPage(prev => prev + 1)}
              >
                Next
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default PaymentRequestsPage;
