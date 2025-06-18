import React from 'react';
import {
  Container, Typography, Box, List, ListItem, ListItemText
} from '@mui/material';

const LocalPartnerTrainingPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
        Local Partner Training<br />Empower Local Stores, Earn With Pride
      </Typography>

      {/* Welcome Note */}
      <Typography variant="h6" align="center" paragraph>
        Welcome Partner! Help local shops grow — and earn for each one onboarded successfully.
      </Typography>

      {/* Hero Image */}
      <Box display="flex" justifyContent="center" my={3}>
        <img
          src="/images/training-hero.jpg"
          alt="Local partner assisting a shop"
          loading="lazy"
          style={{ maxWidth: 1280, width: '100%', borderRadius: 10 }}
        />
      </Box>

      {/* SECTION 1: Convincing Local Shops */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How to Convince Shop Owners
        </Typography>

        <Typography gutterBottom>
          Your role is to educate shop owners about how Localz can bring them more customers.
        </Typography>

        <List>
          <ListItem><ListItemText primary="📞 Identify Shops" secondary="Explore local areas or online directories." /></ListItem>
          <ListItem><ListItemText primary="🤝 Introduce Yourself" secondary="Say you're a Localz Partner helping shops grow online." /></ListItem>
          <ListItem><ListItemText primary="💡 Explain Benefits" secondary="Talk about discovery, WhatsApp link, call button, map directions." /></ListItem>
          <ListItem><ListItemText primary="📝 Choose Simple Tags" secondary="Example: 'Tailor', 'Mobile Repair', etc. Easy search terms." /></ListItem>
          <ListItem><ListItemText primary="💳 Mention Plan" secondary="₹365/year only. No app or tech required. 10% commission to you." /></ListItem>
        </List>

        {/* Sales Pitch */}
        <Typography mt={3} fontStyle="italic">
          Example Pitch: <br />
          “Sir, Localz helps people nearby find your shop on phone. It works like a mini website — WhatsApp, call, map — all in one link.”
        </Typography>
      </Box>

      {/* Shop Benefits */}
      <Box mt={4}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Benefits to Shop Owners
        </Typography>
        <List>
          <ListItem><ListItemText primary="✅ Reach local customers instantly" /></ListItem>
          <ListItem><ListItemText primary="✅ One-click WhatsApp, call, map" /></ListItem>
          <ListItem><ListItemText primary="✅ Ranks by distance — more local reach" /></ListItem>
          <ListItem><ListItemText primary="✅ Shareable mini page" /></ListItem>
          <ListItem><ListItemText primary="✅ No app or login needed for customers" /></ListItem>
        </List>
      </Box>

      {/* SECTION 2: Platform Usage */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How to Use the Platform (Dashboard Guide)
        </Typography>

        <List>
          <ListItem><ListItemText primary="🔐 Login" secondary="Go to https://about.localz.online/login using your Partner ID." /></ListItem>
          <ListItem><ListItemText primary="📊 Dashboard" secondary="Track all your stores, payments, and earnings." /></ListItem>
          <ListItem><ListItemText primary="➕ Add Store" secondary="Fill store name, phone, tags, and address carefully." /></ListItem>
          <ListItem><ListItemText primary="🔎 Avoid Duplicates" secondary="Search if the store already exists before adding." /></ListItem>
          <ListItem><ListItemText primary="💳 Payment Request" secondary="Go to Edit & Payment, verify, and generate ₹365 link." /></ListItem>
          <ListItem><ListItemText primary="🎉 Confirm Activation" secondary="Once paid, store goes live. You get ₹36 commission." /></ListItem>
          <ListItem><ListItemText primary="💰 Track Payouts" secondary="Get paid every Friday to your UPI." /></ListItem>
        </List>
      </Box>

      {/* Tools Needed */}
      <Box mt={4}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Tools You Need
        </Typography>
        <List>
          <ListItem><ListItemText primary="📱 A smartphone with internet" /></ListItem>
          <ListItem><ListItemText primary="💬 WhatsApp for follow-ups" /></ListItem>
          <ListItem><ListItemText primary="🧠 Local knowledge + confidence" /></ListItem>
        </List>
      </Box>

      {/* Best Practices */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Best Practices for Success
        </Typography>

        <List>
          <ListItem><ListItemText primary="✅ Double-check shop info" /></ListItem>
          <ListItem><ListItemText primary="✅ Always be respectful" /></ListItem>
          <ListItem><ListItemText primary="✅ Don’t pressure for payment" /></ListItem>
          <ListItem><ListItemText primary="✅ Follow up politely if needed" /></ListItem>
        </List>
      </Box>

      {/* FAQs */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          FAQs (Frequently Asked Questions)
        </Typography>
        <List>
          <ListItem><ListItemText primary="What if the shop doesn’t pay?" secondary="Focus on shops that understand the value. You earn only after activation." /></ListItem>
          <ListItem><ListItemText primary="Can I add shops in other cities?" secondary="Yes, you can work PAN India." /></ListItem>
          <ListItem><ListItemText primary="How many can I add in a day?" secondary="No limit. Add as many as you can manage accurately." /></ListItem>
        </List>
      </Box>

      {/* Final Note */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
          Let’s Grow India’s Local Economy
        </Typography>
        <Typography>
          Every shop added brings more visibility, confidence, and growth to the community. Let’s build together!
        </Typography>
      </Box>
    </Container>
  );
};

export default LocalPartnerTrainingPage;
