import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, TextField, Box, CircularProgress
} from '@mui/material';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const PartnerPerformanceCard = () => {
  const [username, setUsername] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/analytics/partner-summary`, {
        params: { username },
        headers: { 'x-api-key': 'YourStrongSecret123' },
      });
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load partner performance:', err.message);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary(); // initial load (all partners)
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchSummary();
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Search by Username"
        placeholder="Type username and press Enter"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleSearch}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <CircularProgress />
      ) : summary ? (
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              👤 Local Partner: {summary.username || 'All'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2">📞 Calls</Typography>
                <Typography variant="h5">{summary.call}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2">💬 WhatsApp</Typography>
                <Typography variant="h5">{summary.whatsapp}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2">💳 Payment Links</Typography>
                <Typography variant="h5">{summary.payment_link}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography color="error">❌ No data available</Typography>
      )}
    </Box>
  );
};
// PartnerPerformanceCard.js


export default PartnerPerformanceCard;
