import React from 'react';
import { Box, Typography } from '@mui/material';
import EarningsSummary from '../../components/EarningsSummary'; // path may vary

const AnalyticsDashboard = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        📊 Business Analytics Dashboard
      </Typography>

      <EarningsSummary />

      {/* Future cards: Growth, conversion, etc */}
    </Box>
  );
};

export default AnalyticsDashboard;
