import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const userType = localStorage.getItem('userType');

const StoreEditDialog = ({ open, handleClose, store, onUpdate, onRequestPayment }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (store) {
      setFormData({
        ...store,
        latitude: store.latitude || '',
        longitude: store.longitude || '',
        tags: Array.isArray(store.tags) ? store.tags.join(', ') : (store.tags || ''),
      });
      setErrors({});
    }
  }, [store]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    if (!formData.phone?.trim()) newErrors.phone = 'Phone is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onUpdate(formData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Store Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {['name', 'usp', 'tags', 'address', 'phone', 'latitude', 'longitude'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                margin="normal"
                label={field.toUpperCase()}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                error={!!errors[field]}
                helperText={errors[field] || ''}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ flexDirection: isMobile ? 'column' : 'row', gap: 1, m: 2 }}>
      {userType !== 'local_partner' && (
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                fullWidth={isMobile}
            >
                Update Store
            </Button>
            )}
        <Button
          onClick={() => onRequestPayment(formData)}
          variant="outlined"
          color="success"
          fullWidth={isMobile}
        >
          Request Payment
        </Button>
        <Button
          onClick={handleClose}
          variant="text"
          fullWidth={isMobile}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreEditDialog;