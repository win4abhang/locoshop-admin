import React from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent,
  List, ListItem, ListItemText, Button
} from '@mui/material';

const LocalPartnerTrainingPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Page Title */}
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
        🎓 Local Partner Training<br />Empower Local Stores, Earn With Pride
      </Typography>

      {/* Welcome Message */}
      <Typography variant="h6" align="center" paragraph>
        Welcome, Partner!<br />
        You're playing a valuable role in supporting India’s small businesses.<br />
        This guide will walk you through how to grow your income by helping shops get discovered locally.
      </Typography>

      {/* Hero Image */}
      <Box display="flex" justifyContent="center" mb={2}>
        <img
          src="/images/training-hero.jpg"
          alt="Local partner assisting business owner via phone"
          loading="lazy"
          style={{ maxWidth: 1280, width: '100%', borderRadius: 10 }}
        />
      </Box>

      {/* Mission Section */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Your Mission as a Local Partner
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="📞 Identify Local Businesses"
              secondary="Explore your area or online platforms to find store owners who need better online visibility."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🤝 Introduce Yourself"
              secondary="Explain that you’re a Localz Partner helping nearby shops reach more local customers."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="💡 Explain the Benefits"
              secondary="Tell them about WhatsApp/call buttons, location links, and how they appear when people nearby search."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🔍 Understand Their Business"
              secondary="Choose simple, searchable tags like 'Tailor', 'Mobile Repair', etc. Think like the local customer."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="📝 Add the Store in Dashboard"
              secondary="Use the 'Add Store' form. Ensure name, phone, tags, and location are filled in correctly."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="💳 Request Activation"
              secondary="Go to Edit & Payment page, find the store, verify details with the client, and request payment. A ₹365/year payment link is generated — valid for 24 hours."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🎉 Confirm Activation & Get Commission"
              secondary="After payment, the store goes live. You earn ₹36 (10%) commission. Track status on your dashboard."
            />
          </ListItem>
        </List>
        <Typography fontStyle="italic" color="textSecondary">
          “Support shops. Help them grow. And grow your income with pride.”
        </Typography>
      </Box>

      {/* Shop Benefits Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          What to Highlight to Shop Owners
        </Typography>
        <Typography variant="h6" gutterBottom>
          Localz is built to help them grow — simply and affordably.
        </Typography>
        <List>
          <ListItem><ListItemText primary="✅ Local Discovery — attract nearby customers instantly" /></ListItem>
          <ListItem><ListItemText primary="✅ One-Click Contact — WhatsApp, Call, Maps in one place" /></ListItem>
          <ListItem><ListItemText primary="✅ Timings Logic — only open stores appear on top" /></ListItem>
          <ListItem><ListItemText primary="✅ Distance Ranking — closer shops rank better" /></ListItem>
          <ListItem><ListItemText primary="✅ Mini Website — shareable and search-friendly" /></ListItem>
          <ListItem><ListItemText primary="✅ Works for 50+ Shop Types — grocery, repairs, tuition, salon, more" /></ListItem>
          <ListItem><ListItemText primary="✅ No App Required — accessible on any mobile browser" /></ListItem>
        </List>
      </Box>

      {/* Dashboard Instructions */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How to Use the Dashboard (Step-by-Step)
        </Typography>
        <List>
          <ListItem><ListItemText primary="🔐 Step 1: Log In" secondary="Go to https://about.localz.online/login and sign in with your Partner ID." /></ListItem>
          <ListItem><ListItemText primary="📊 Step 2: Dashboard Access" secondary="Track store entries, payment status, and commissions." /></ListItem>
          <ListItem><ListItemText primary="➕ Step 3: Add Store" secondary="Fill shop details correctly — name, tags, phone, and address." /></ListItem>
          <ListItem><ListItemText primary="🔎 Step 4: Avoid Duplicates" secondary="Search if the store already exists before adding." /></ListItem>
          <ListItem><ListItemText primary="📨 Step 5: Submit Form" secondary="Only submit once all details are correct and confirmed." /></ListItem>
          <ListItem><ListItemText primary="💳 Step 6: Payment Request" secondary="Use Edit & Payment page, generate secure payment link." /></ListItem>
          <ListItem><ListItemText primary="⏱ Step 7: Track Status" secondary="Follow up gently. Use dashboard for payment tracking." /></ListItem>
          <ListItem><ListItemText primary="📱 Step 8: Assist Remotely" secondary="Help shops via WhatsApp or call if you're not nearby." /></ListItem>
          <ListItem><ListItemText primary="🔍 Step 9: Verification" secondary="Localz team reviews every entry before publishing." /></ListItem>
          <ListItem><ListItemText primary="💰 Step 10: Weekly Payouts" secondary="Earnings are credited to your UPI every Friday." /></ListItem>
        </List>
      </Box>

      {/* Earnings Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Earnings with Transparency & Trust
        </Typography>
        <List>
          <ListItem><ListItemText primary="✔️ Earn ₹36 for each successful store activation" /></ListItem>
          <ListItem><ListItemText primary="✔️ ₹365/year plan per shop — easy value pitch" /></ListItem>
          <ListItem><ListItemText primary="✔️ Weekly payouts to your UPI every Friday" /></ListItem>
          <ListItem><ListItemText primary="✔️ Full status visibility in your dashboard" /></ListItem>
        </List>
      </Box>

      {/* How to Explain Localz */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Simple Way to Explain Localz to Shops
        </Typography>
        <Typography>
          “Sir/Madam, nowadays people search for shops on Google or Maps. Localz helps your shop show up when someone nearby searches for your service — even if you don’t have a website.”<br /><br />
          “It works like a mini-site — with WhatsApp, call, and map links in one place. More visibility, more customers, and no technical skills needed.”
        </Typography>
      </Box>

      {/* Best Practices */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Best Practices to Build Trust
        </Typography>
        <List>
          <ListItem><ListItemText primary="✅ Double-check all store information before submission" /></ListItem>
          <ListItem><ListItemText primary="✅ Be respectful — never push for payment" /></ListItem>
          <ListItem><ListItemText primary="✅ Save leads in your notebook or notes app" /></ListItem>
          <ListItem><ListItemText primary="✅ Confirm with owner before uploading anything" /></ListItem>
          <ListItem><ListItemText primary="✅ Follow up politely the next day if needed" /></ListItem>
        </List>
      </Box>

      {/* Tools Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Tools You’ll Need
        </Typography>
        <List>
          <ListItem><ListItemText primary="📱 Mobile phone with internet access" /></ListItem>
          <ListItem><ListItemText primary="💬 WhatsApp for communication" /></ListItem>
          <ListItem><ListItemText primary="🔑 Partner login access" /></ListItem>
          <ListItem><ListItemText primary="🧠 Local knowledge and confidence" /></ListItem>
        </List>
      </Box>

      {/* FAQs */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <List>
          <ListItem><ListItemText primary="Q: What if the shop doesn’t pay?" secondary="A: That’s okay — focus on genuine businesses. You earn only after activation." /></ListItem>
          <ListItem><ListItemText primary="Q: The shop owner has doubts?" secondary="A: Explain clearly how we help increase their visibility and business." /></ListItem>
          <ListItem><ListItemText primary="Q: Can I register shops outside my city?" secondary="A: Yes! You can add shops from anywhere across India." /></ListItem>
          <ListItem><ListItemText primary="Q: Is there a daily limit?" secondary="A: No limit. You can add as many shops as you can accurately handle." /></ListItem>
        </List>
      </Box>

      {/* Final Note */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
          Final Word: Let’s Grow Together 🌱
        </Typography>
        <Typography>
          Every business you onboard becomes more visible. Every owner becomes more independent. Every customer benefits from local discovery.<br /><br />
          Keep going — you are making a real impact in India’s local economy.
        </Typography>
      </Box>
    </Container>
  );
};

export default LocalPartnerTrainingPage;
