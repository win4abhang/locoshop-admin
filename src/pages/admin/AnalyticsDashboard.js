import React from 'react';
import { Box, Typography } from '@mui/material';

const AnalyticsDashboard = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        📊 Business Analytics Dashboard
      </Typography>

      {/* Example placeholder components: you can build and replace them step by step */}
      <Box sx={{ mt: 2 }}>
        <Typography>✅ Total Stores, Paid vs Free</Typography>
        <Typography>📈 Weekly Store Growth Chart</Typography>
        <Typography>💳 Payment Conversion Trends</Typography>
        <Typography>📞 Contact Activity Logs</Typography>
        <Typography>🧠 Suggestions to Improve</Typography>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;
