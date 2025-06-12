import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Box, TextField, MenuItem, Select, InputLabel, FormControl, useMediaQuery,Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StoreTable = ({ storeList, onSelectStore }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');

  const filteredAndSortedStores = useMemo(() => {
    let filtered = storeList;

    // Filter by name, tag, or address
    if (filterText) {
      const lower = filterText.toLowerCase();
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(lower) ||
        (store.tags || []).some(tag => tag.toLowerCase().includes(lower)) ||
        store.address.toLowerCase().includes(lower)
      );
    }

    // Filter by subscription
    if (statusFilter) {
      filtered = filtered.filter(store => store.subscription === statusFilter);
    }

    // Sort logic
    if (sortKey === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortKey === 'status') {
      filtered = [...filtered].sort((a, b) => (a.subscription > b.subscription ? 1 : -1));
    }

    return filtered;
  }, [storeList, filterText, statusFilter, sortKey]);

  if (!storeList || storeList.length === 0) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" color="text.secondary">
          No stores available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter Controls */}
      <Stack spacing={2} sx={{ mb: 2 }}>
  {/* Line 1: Search Bar */}
  <TextField
    label="Search by name, tag, or address"
    variant="outlined"
    value={filterText}
    onChange={(e) => setFilterText(e.target.value)}
    fullWidth
  />

  {/* Line 2: Status and Sort */}
  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
    <FormControl sx={{ minWidth: 120, flex: 1 }}>
      <InputLabel>Subscription</InputLabel>
      <Select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        label="Status"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Free">Free</MenuItem>
      </Select>
    </FormControl>

    <FormControl sx={{ minWidth: 120, flex: 1 }}>
      <InputLabel>Sort</InputLabel>
      <Select
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value)}
        label="Sort"
      >
        <MenuItem value="">None</MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="status">Status</MenuItem>
      </Select>
    </FormControl>
  </Box>
</Stack>


      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Offer or Announcement</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Tags</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedStores.map((store) => (
              <TableRow key={store._id}>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.address}</TableCell>
                <TableCell>{store.usp}</TableCell>
                <TableCell>{store.phone}</TableCell>
                <TableCell>{(store.tags || []).join(', ')}</TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={store.subscription === 'Paid' ? 'green' : 'orange'}
                  >
                    {store.subscription === 'Paid' ? 'Paid' : 'Free'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      href={`tel:${store.phone}`}
                      size="small"
                      fullWidth={isMobile}
                    >
                      📞 Call
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      href={`https://wa.me/91${store.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      fullWidth={isMobile}
                    >
                      💬 WhatsApp
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => onSelectStore(store)}
                      size="small"
                      fullWidth={isMobile}
                    >
                      ✏️ Edit
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StoreTable;
