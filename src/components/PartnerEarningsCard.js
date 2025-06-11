// src/components/PartnerEarningsCard.js
import React, { useState } from 'react';
import {
  Card, CardContent, Typography, TextField,
  Stack, Button
} from '@mui/material';

const PartnerEarningsCard = () => {
  const [upi, setUpi] = useState('vinod@upi');
  const [isEditing, setIsEditing] = useState(false);
  const [tempUpi, setTempUpi] = useState(upi);

  const handleUpdate = () => {
    setUpi(tempUpi);
    setIsEditing(false);
    // TODO: Connect with API to update UPI
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', p: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <div>
            <Typography variant="h5" fontWeight="bold">Today’s Earnings: ₹250</Typography>
            <Typography color="text.secondary" fontSize={14}>Total Earnings till date: ₹5,400</Typography>
          </div>

          <div>
            <Typography variant="h5" fontWeight="bold">Upcoming Payment: ₹1,000</Typography>
            <Typography color="text.secondary" fontSize={14}>Next Payment Date: 15 June 2025</Typography>
          </div>

          <div>
            <Typography variant="h6">Payment will be done on:</Typography>
            {isEditing ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  size="small"
                  value={tempUpi}
                  onChange={(e) => setTempUpi(e.target.value)}
                />
                <Button size="small" variant="contained" onClick={handleUpdate}>Update</Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body1" fontWeight="medium">{upi}</Typography>
                <Button size="small" onClick={() => setIsEditing(true)}>Edit</Button>
              </Stack>
            )}
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PartnerEarningsCard;
