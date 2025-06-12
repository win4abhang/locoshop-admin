import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  DialogContentText, TextField, MenuItem, Stack, Button, Typography
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';

const STAGES = ['pending', 'sent reminder', 'paid', 'expired'];

const PaymentRequestDialog = ({ open, handleClose, request, onUpdate }) => {
  const [status, setStatus] = useState(request?.status || '');
  const [newNote, setNewNote] = useState('');
  const [oldNote, setOldNote] = useState(request?.notes || '');

  useEffect(() => {
    if (request) {
      setStatus(request.status);
      setOldNote(request.notes || '');
      setNewNote('');
    }
  }, [request]);

  const getCurrentFormattedDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSave = () => {
    const timestamp = getCurrentFormattedDateTime();
    const combinedNote = newNote
      ? `(${timestamp}) ${newNote}\n${oldNote}`
      : oldNote;

    onUpdate(request._id, {
      status,
      notes: combinedNote,
    });

    handleClose();
  };

  const isPaid = request?.status === 'paid';

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Information about Payment Request</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          {request?.storeId?.name || request?.customerName} ({request?.customerPhone})
        </DialogContentText>

        <Stack spacing={2}>
        <TextField
            label="Status"
            select
            fullWidth
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            {STAGES.map(stage => (
              <MenuItem
                key={stage}
                value={stage}
                disabled={stage === 'paid'} // 🔒 Always disable "paid"
              >
                {stage}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Add New Note"
            fullWidth
            multiline
            rows={3}
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Type new note to add..."
          />

          {oldNote && (
            <TextField
              label="Old Notes"
              fullWidth
              multiline
              rows={5}
              value={oldNote}
              InputProps={{ readOnly: true }}
            />
          )}

          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              href={`tel:+91${request?.customerPhone}`}
              startIcon={<PhoneIcon />}
            >
              Call
            </Button>

            <Button
              variant="outlined"
              color="success"
              target="_blank"
              href={`https://wa.me/91${request?.customerPhone}?text=Hi ${request?.customerName}, please complete your payment: ${request?.link_url}`}
              startIcon={<WhatsAppIcon />}
            >
              WhatsApp
            </Button>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentRequestDialog;
