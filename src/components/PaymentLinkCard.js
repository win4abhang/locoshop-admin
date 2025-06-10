import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PaymentLinkCard from './PaymentLinkCard'; // Adjust path if needed

const PaymentLinkPopup = ({ open, onClose, storeName, phone, paymentLink }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Payment Details
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <PaymentLinkCard storeName={storeName} phone={phone} paymentLink={paymentLink} />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentLinkPopup;
