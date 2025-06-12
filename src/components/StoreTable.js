import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Box, TextField, MenuItem, Select, InputLabel,
  FormControl, useMediaQuery, Stack, Chip, Tooltip, IconButton, InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

const StoreTable = ({ storeList, onSelectStore }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortKey, setSortKey] = useState('');

  const filteredAndSortedStores = useMemo(() => {
    let filtered = storeList;

    if (filterText) {
      const lower = filterText.toLowerCase();
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(lower) ||
        (store.tags || []).some(tag => tag.toLowerCase().includes(lower)) ||
        store.address.toLowerCase().includes(lower)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(store => store.subscription === statusFilter);
    }

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
      {/* Filters */}
      <Stack spacing={2} sx={{ mb: 2 }}>
        <TextField
          label="Search by name, tag, or address"
          variant="outlined"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: filterText && (
              <InputAdornment position="end">
                <IconButton onClick={() => setFilterText('')}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>Subscription</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Subscription"
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

      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size={isMobile ? 'small' : 'medium'}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Offer</strong></TableCell>
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

                <TableCell>
                  <Tooltip title={store.address}>
                    <Typography noWrap>{store.address}</Typography>
                  </Tooltip>
                </TableCell>

                <TableCell>
                  <Tooltip title={store.usp || ''}>
                    <Typography noWrap>{store.usp || '—'}</Typography>
                  </Tooltip>
                </TableCell>

                <TableCell>{store.phone}</TableCell>
                <TableCell>{(store.tags || []).join(', ')}</TableCell>

                <TableCell>
                  <Chip
                    label={store.subscription}
                    color={store.subscription === 'Paid' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Stack
                    direction={isMobile ? 'column' : 'row'}
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      href={`tel:${store.phone}`}
                      size="small"
                    >
                      📞 Call
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      href={`https://wa.me/91${store.phone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                    >
                      💬 WhatsApp
                    </Button>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => onSelectStore(store)}
                      size="small"
                    >
                      ✏️ Edit & Pay
                    </Button>
                  </Stack>
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
