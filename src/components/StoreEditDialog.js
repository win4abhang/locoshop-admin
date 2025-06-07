import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Grid, useMediaQuery, Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StoreEditDialog = ({ open, handleClose, store, onUpdate, onRequestPayment }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Load userType safely
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

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
      <DialogContent sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          {['name', 'usp', 'tags', 'address', 'phone', 'latitude', 'longitude'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                margin="dense"
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

      <DialogActions>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          sx={{ width: '100%', p: 2 }}
        >
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
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default StoreEditDialog;
