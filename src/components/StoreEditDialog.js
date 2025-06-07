import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid
} from '@mui/material';

const StoreEditDialog = ({ open, handleClose, store, onUpdate, onRequestPayment }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (store) setFormData(store);
  }, [store]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Store Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {['name', 'usp', 'address', 'phone', 'tags'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                label={field.toUpperCase()}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onUpdate(formData)} variant="contained" color="primary">
          Update Store
        </Button>
        <Button onClick={() => onRequestPayment(formData)} variant="outlined" color="success">
          Request Payment
        </Button>
        <Button onClick={handleClose} variant="text">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreEditDialog;
