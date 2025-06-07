import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PaymentLinkCard = ({ storeName, phone, paymentLink }) => {
  const message = `Hi ${storeName} team, please complete your payment using this link: ${paymentLink}`;
  const whatsappURL = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      alert('✅ Payment link copied to clipboard!');
    } catch (err) {
      alert('❌ Failed to copy link');
    }
  };

  return (
    <Card sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ✅ Payment Link Created
        </Typography>

        <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 2 }}>
          {paymentLink}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.open(paymentLink, '_blank')}
          >
            Open Link
          </Button>

          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
          >
            Copy Link
          </Button>

          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{ backgroundColor: '#25D366', '&:hover': { backgroundColor: '#20b954' } }}
            onClick={() => window.open(whatsappURL, '_blank')}
          >
            Send via WhatsApp
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PaymentLinkCard;
