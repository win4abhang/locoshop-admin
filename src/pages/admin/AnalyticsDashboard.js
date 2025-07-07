import React from 'react';
import { Box, Typography } from '@mui/material';
import EarningsSummary from '../../components/EarningsSummary';
import PartnerPerformanceCard from '../../components/PartnerPerformanceCard';

const AnalyticsDashboard = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        📊 Business Overview
      </Typography>

      <EarningsSummary />
      <PartnerPerformanceCard />
    </Box>
  );
};

export default AnalyticsDashboard;
