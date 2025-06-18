// Updated Landing Page: Local Partner Training
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';


const LocalPartnerTrainingPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>

      {/* Page Title */}
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
        🎓 Local Partner Training: <br/> Help More Shops, Earn More
      </Typography>

      {/* Welcome Message */}
      <Typography variant="h6" align="center" paragraph>
        Welcome to your Training Page, Local Partner!<br/>
        Here, you’ll learn how to use the platform, explain it to businesses, and earn faster. Let’s get started.
      </Typography>

      {/* What You Do */}
      <Box mt={4}>
      <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          What You Do:
        </Typography>
        <List>
        <ListItem>
            <ListItemText
            primary="Step 1: Get Mobile Numbers of Shop Owners"
            secondary="You can find mobile numbers in two ways: (a) Use the Edit & Payment Details page in your dashboard where some contacts may be listed, or (b) Search manually on platforms like Google, Facebook, WhatsApp groups, JustDial, or even local directories."
            />
        </ListItem>

        <ListItem>
            <ListItemText
            primary="Step 2: Call the Shop Owner or Service Provider"
            secondary="Introduce yourself politely as a Localz Partner. Mention that you're helping shops get more customers online. Speak in their preferred language if needed."
            />
        </ListItem>

        <ListItem>
            <ListItemText
            primary="Step 3: Explain Localz Benefits Clearly"
            secondary="Tell them Localz helps them appear in local search results when people search for their service. Highlight features like: Google Maps link, WhatsApp button, direct call button, customer visibility based on open hours and location, and that no app is needed."
            />
        </ListItem>

        <ListItem>
            <ListItemText
            primary="Step 4: Understand the Shop’s Business Properly"
            secondary="Ask them what they sell or which services they provide. Based on that, identify proper tags or keywords (e.g., 'Mobile Repair', 'AC Service', 'Grocery Store'). Add these in the right way during registration."
            />
        </ListItem>

        <ListItem>
            <ListItemText
            primary="Step 5: Fill Their Business Details on the Platform"
            secondary="Go to the 'Add Store' page in your dashboard and enter accurate information like Shop Name, Phone Number, Tags (keywords), Address, Open Hours, and optional photo. Make sure everything is correct."
            />
        </ListItem>

        <ListItem>
            <ListItemText
            primary="Step 6: Convince Them to Make the Payment Online"
            secondary="Once you submit their details, a payment link will be sent to them. Explain that the cost is only ₹365/year and there's no commission. Assure them it’s safe and helps them grow. Follow up politely if needed."
            />
        </ListItem>

        <ListItem>
            <ListItemText
            primary="Step 7: Confirm Payment & Earn Commission"
            secondary="When the shop owner makes the payment, their listing will be activated and you’ll receive ₹36 as commission. You can check the payment status in your dashboard."
            />
        </ListItem>
        </List>

        <Typography  fontStyle="italic" color="textSecondary">
          “Find shops. Add them. Explain benefits. Help them go live. Earn.”
        </Typography>
      </Box>

      {/* Benefits to Shop Owners */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          What You Should Explain to Shop Owners
        </Typography>

        <Typography variant="h6" gutterBottom>
          How Localz Helps Shops & Service Providers
        </Typography>
        <List>
          <ListItem><ListItemText primary="✅ More Visibility Online — shown to customers nearby without needing a website" /></ListItem>
          <ListItem><ListItemText primary="✅ Google Maps Link + Call + WhatsApp — contact in one click" /></ListItem>
          <ListItem><ListItemText primary="✅ Open Hours Logic — live stores appear at the top during their open hours" /></ListItem>
          <ListItem><ListItemText primary="✅ Show Nearby Customers — closer shops rank higher" /></ListItem>
          <ListItem><ListItemText primary="✅ Simple Link to Share — works like a mini-website" /></ListItem>
          <ListItem><ListItemText primary="✅ Supports 50+ Business Categories — like Kirana, Tailor, Bike Repair, Tutors" /></ListItem>
          <ListItem><ListItemText primary="✅ No App or Tech Needed — simple onboarding" /></ListItem>
        </List>
      </Box>

      {/* How to Use the Platform */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How to Use the Platform (Simple Steps)
        </Typography>
        <List>
          <ListItem><ListItemText primary="Login at: https://about.localz.online/login" /></ListItem>
          <ListItem><ListItemText primary="Go to Admin Dashboard" /></ListItem>
          <ListItem><ListItemText primary="Click 'Add Store' and fill details" /></ListItem>
          <ListItem><ListItemText primary="Submit the form — our team will verify and activate" /></ListItem>
          <ListItem><ListItemText primary="Use WhatsApp if you can't meet in person" /></ListItem>
          <ListItem><ListItemText primary="You can add shops from anywhere in India" /></ListItem>
        </List>
      </Box>

      {/* Earnings Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How Earnings Work (Clear & Honest)
        </Typography>
        <List>
          <ListItem><ListItemText primary="Earn only after payment" /></ListItem>
          <ListItem><ListItemText primary="No payment = No commission" /></ListItem>
          <ListItem><ListItemText primary="Track status in dashboard" /></ListItem>
          <ListItem><ListItemText primary="Payouts weekly/monthly (as announced)" /></ListItem>
        </List>
      </Box>

      {/* Explaining Localz */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How to Explain Localz to Shop Owners
        </Typography>
        <Typography>
          “Sir, nowadays people search for everything online. If your shop is on Localz, more nearby customers will find you — even if you don’t have a website or app.”<br/>
          “You get a link, map, tags, and more visibility. No technical work needed from your side.”
        </Typography>
      </Box>

      {/* Best Practices */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Best Practices for Success
        </Typography>
        <List>
          <ListItem><ListItemText primary="Double-check phone numbers and timings" /></ListItem>
          <ListItem><ListItemText primary="Be polite and helpful — never pushy" /></ListItem>
          <ListItem><ListItemText primary="Save all shops in personal notes" /></ListItem>
          <ListItem><ListItemText primary="Ask permission before uploading any photo" /></ListItem>
          <ListItem><ListItemText primary="Follow up if needed after 1–2 days" /></ListItem>
        </List>
      </Box>

      {/* Tools */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Tools to Make Work Easy
        </Typography>
        <List>
          <ListItem><ListItemText primary="Mobile phone with internet" /></ListItem>
          <ListItem><ListItemText primary="WhatsApp for quick sharing" /></ListItem>
          <ListItem><ListItemText primary="Partner login ID" /></ListItem>
          <ListItem><ListItemText primary="Confidence and local knowledge" /></ListItem>
        </List>
      </Box>

      {/* FAQs */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Common Questions
        </Typography>
        <List>
          <ListItem><ListItemText primary="Q: What if the shop never pays?" secondary="A: You won’t earn unless they pay. Focus on genuine businesses." /></ListItem>
          <ListItem><ListItemText primary="Q: What if the shop owner has doubts?" secondary="A: Show an example listing from Localz." /></ListItem>
          <ListItem><ListItemText primary="Q: Can I earn from outside my area?" secondary="A: Yes, shops from anywhere in India are accepted." /></ListItem>
          <ListItem><ListItemText primary="Q: How many shops can I add in a day?" secondary="A: As many as you can handle correctly." /></ListItem>
        </List>
      </Box>

      {/* Final Tip */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
          Final Tip: Keep Going!
        </Typography>
        <Typography>
          The more you help shops, the more you earn. Your work brings real businesses online. 🌐<br/>
          Keep learning, keep helping — and you’ll grow with Localz.
        </Typography>
      </Box>

    </Container>
  );
};

export default LocalPartnerTrainingPage;
