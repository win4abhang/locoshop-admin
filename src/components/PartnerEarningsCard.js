import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Stack
} from '@mui/material';
import axios from 'axios';

const PartnerEarningsCard = () => {
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [upcomingPayment, setUpcomingPayment] = useState(0);
  const [nextPaymentDate, setNextPaymentDate] = useState('');

  const username = localStorage.getItem('username');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_KEY = 'YourStrongSecret123';

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.post(`${BACKEND_URL}/payment/partner-earnings`, {
          username
        }, {
          headers: {
            'x-api-key': API_KEY
          }
        });
  
        const data = res.data;
        setTodayEarnings(data.todayEarnings || 0);
        setUpcomingPayment(data.upcomingPayment || 0);
        setNextPaymentDate(getNextFriday());
      } catch (error) {
        console.error('Error fetching earnings:', error);
      }
    };
  
    if (username) {
      fetchEarnings();
    }
  }, [username]);
  

  const getNextFriday = () => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = (5 - day + 7) % 7 || 7; // Days until Friday
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + diff);
    nextFriday.setHours(18, 0, 0, 0); // 6 PM
    return nextFriday.toDateString();
  };

  return (
    <Card sx={{ maxWidth: 500, margin: 'auto', p: 3 }}>
      <CardContent>
        <Stack spacing={3}>
          <div>
            <Typography variant="h5" fontWeight="bold">
              Today’s Earnings: ₹{todayEarnings}
            </Typography>
          </div>

          <div>
            <Typography variant="h5" fontWeight="bold">
              Upcoming Payment: ₹{upcomingPayment}
            </Typography>
            {nextPaymentDate && (
              <Typography color="text.secondary" fontSize={14}>
                Next Payment Date: {nextPaymentDate}
              </Typography>
            )}
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PartnerEarningsCard;
