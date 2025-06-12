import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography,
  Box, TextField, MenuItem, Select, InputLabel,
  FormControl, useMediaQuery, Stack, Tooltip, IconButton, InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

const StoreTable = ({ storeList, onSelectStore }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [filterText, setFilterText] = useState('');
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

    if (sortKey === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [storeList, filterText, sortKey]);

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
            <InputLabel>Sort</InputLabel>
            <Select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              label="Sort"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 180 }}><strong>Name</strong></TableCell>
              <TableCell sx={{ minWidth: 200 }}><strong>Address</strong></TableCell>
              <TableCell sx={{ minWidth: 200 }}><strong>Offer</strong></TableCell>
              <TableCell sx={{ minWidth: 150 }}><strong>Phone</strong></TableCell>
              <TableCell sx={{ minWidth: 180 }}><strong>Tags</strong></TableCell>
              <TableCell sx={{ minWidth: 260 }}><strong>Actions</strong></TableCell>
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
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="nowrap"
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
