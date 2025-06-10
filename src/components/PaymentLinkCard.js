import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const PaymentLinkCard = ({ name, phone, paymentLink }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const message = `Hi ${name} team, please complete your payment using this link: ${paymentLink}`;
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
    <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom color="success.main">
          ✅ Payment Link Created
        </Typography>

        <Typography variant="body2" sx={{ wordBreak: 'break-all', mb: 2 }}>
          {paymentLink}
        </Typography>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={2}
          alignItems="stretch"
        >
          <Button
            variant="outlined"
            color="primary"
            endIcon={<OpenInNewIcon />}
            fullWidth={isMobile}
            onClick={() => window.open(paymentLink, '_blank')}
          >
            Open Link
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ContentCopyIcon />}
            fullWidth={isMobile}
            onClick={handleCopy}
          >
            Copy Link
          </Button>

          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            fullWidth={isMobile}
            sx={{
              backgroundColor: '#25D366',
              '&:hover': { backgroundColor: '#20b954' }
            }}
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
