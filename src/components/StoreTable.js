import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Typography, Box
} from '@mui/material';

const StoreTable = ({ storeList, onSelectStore }) => {
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
    <TableContainer
      component={Paper}
      sx={{ mt: 2, overflowX: 'auto' }}
    >
      <Table aria-label="store list table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Address</strong></TableCell>
            <TableCell><strong>USP</strong></TableCell>
            <TableCell><strong>Phone</strong></TableCell>
            <TableCell><strong>Tags</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {storeList.map((store) => (
            <TableRow key={store._id}>
              <TableCell>{store.name}</TableCell>
              <TableCell>{store.address}</TableCell>
              <TableCell>{store.usp}</TableCell>
              <TableCell>{store.phone}</TableCell>
              <TableCell>{(store.tags || []).join(', ')}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    color="success"
                    href={`tel:${store.phone}`}
                    size="small"
                  >
                    📞 Call
                  </Button>
                  <Button
                    variant="outlined"
                    color="success"
                    href={`https://wa.me/${store.phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                  >
                    💬 WhatsApp
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => onSelectStore(store)}
                    size="small"
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
  );
};

export default StoreTable;
