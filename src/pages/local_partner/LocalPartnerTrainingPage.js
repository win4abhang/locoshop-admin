// Local Partner Training Page - Refined Version
import React from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent,
  List, ListItem, ListItemText
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

    <Box display="flex" justifyContent="center" mb={2}>
        <img src="/images/training-hero.jpg" alt="Work from home telecalling" style={{ maxWidth: 1280, width: '100%', borderRadius: 10 }} />
    </Box>

      {/* What You Do */}
      <Box mt={4}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Your Mission as a Local Partner
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="📞 Step 1: Identify Local Businesses"
              secondary="Explore your area or online platforms to find store owners who might benefit from more online visibility."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🤝 Step 2: Reach Out Genuinely"
              secondary="Politely introduce yourself as a Localz Partner working to connect local businesses with more nearby customers. Use the language they’re most comfortable with."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="💡 Step 3: Explain How Localz Helps"
              secondary="Share how Localz allows their shop to appear when nearby people search for services. Show benefits like WhatsApp/call buttons, maps direction."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🔍 Step 4: Understand Their Business"
              secondary="Learn what they offer — products or services. Choose clear tags like 'Tailor', 'Mobile Repair', or 'Tiffin Service' so customers can find them easily. Consider that how local people will search for that particular product or service on our platform add thouse tag in while listing "
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="📝 Step 5: Register Their Store Accurately"
              secondary="Use your dashboard's 'Add Store' option to fill in the details clearly — name, phone, tags, location, etc. Accuracy builds trust."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="💳 Step 6: Request Online Activation"
              secondary="Once details are submitted, go to Edit and payment request page Search the store name which you added Click on edit & pay then check details Confirm from client Then click on payment request Link will generated and share with the client automatically. Link is valid for the 24 hours only So if you and client fully convinced they only generate the linka secure payment link (₹365/year) is shared with the shop. Politely guide them about the value — no app, no tech skills, full visibility."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="🎉 Step 7: Confirm Activation & Receive Commission"
              secondary="After the payment is completed and the listing is verified, the store goes live. You'll receive ₹36 (10%)commission — check your dashboard for status updates."
            />
          </ListItem>
        </List>
        <Typography fontStyle="italic" color="textSecondary">
          “Support shops. Help them grow. And grow your income with pride.”
        </Typography>
      </Box>

      {/* Benefits to Shop Owners */}
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
          <ListItem><ListItemText primary="✅ No App Required — accessible on mobile browser" /></ListItem>
        </List>
      </Box>

      {/* Using the Platform */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How to Use the Dashboard (Step-by-Step)
        </Typography>
        <List>
          <ListItem><ListItemText primary="🔐 Step 1: Log In" secondary="Go to https://about.localz.online/login and sign in with your Partner ID." /></ListItem>
          <ListItem><ListItemText primary="📊 Step 2: Access Your Dashboard" secondary="Track store entries, payment status, and commissions here." /></ListItem>
          <ListItem><ListItemText primary="➕ Step 3: Add a Store" secondary="Fill in shop details accurately — name, phone, tags, address." /></ListItem>
          <ListItem><ListItemText primary="🔎 Step 4: Search to Avoid Duplicates" secondary="Make sure the store isn’t already listed before adding it." /></ListItem>
          <ListItem><ListItemText primary="📨 Step 5: Submit Form" secondary="Once submitted all required details." /></ListItem>
          <ListItem><ListItemText primary="💳 Step 5: Payment Request" secondary="Go to Edit & payment page search store and request payment, a payment link is auto-sent to the shop owner." /></ListItem>
          <ListItem><ListItemText primary="⏱ Step 6: Track Payments & Send Reminders" secondary="Use your dashboard to follow up if required — be kind and helpful." /></ListItem>
          <ListItem><ListItemText primary="📱 Step 7: Communicate via WhatsApp/Call" secondary="If you can’t meet the shop, collect details and assist remotely." /></ListItem>
          <ListItem><ListItemText primary="🔍 Step 8: Verification by Our Team" secondary="We verify all entries to ensure quality and trust for customers." /></ListItem>
          <ListItem><ListItemText primary="💰 Step 9: Commission Credited Weekly" secondary="Every Friday, earnings are transferred to your UPI account." /></ListItem>
          <ListItem><ListItemText primary="🌐 Step 10: Work From Anywhere in India" secondary="You're not limited by geography — grow your network nationwide." /></ListItem>
        </List>
      </Box>

      {/* Earnings Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Earning with Integrity — Transparent & Timely
        </Typography>
        <List>
          <ListItem><ListItemText primary="✔️ Earn when a store joins successfully" /></ListItem>
          <ListItem><ListItemText primary="✔️ ₹36 per verified store listing (₹365/year plan)" /></ListItem>
          <ListItem><ListItemText primary="✔️ Payouts processed every Friday directly to your UPI" /></ListItem>
          <ListItem><ListItemText primary="✔️ Full payment transparency via your dashboard" /></ListItem>
        </List>
      </Box>

      {/* How to Explain Localz */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Simple Way to Explain Localz to Shops
        </Typography>
        <Typography>
          “Sir/Madam, nowadays when people search on Google or Maps, they expect quick results nearby. Localz helps your shop show up when someone nearby searches for your service — even if you don’t have a website.”<br /><br />
          “It works like a mini-site — with WhatsApp, call, and maps in one place. More visibility, more customers, and it’s very easy. We’re here to help you grow — no technical knowledge needed.”
        </Typography>
      </Box>

      {/* Best Practices */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Best Practices to Build Long-Term Trust
        </Typography>
        <List>
          <ListItem><ListItemText primary="✅ Always verify information" /></ListItem>
          <ListItem><ListItemText primary="✅ Speak respectfully and never push for payment" /></ListItem>
          <ListItem><ListItemText primary="✅ Save leads in a personal log or notes app" /></ListItem>
          <ListItem><ListItemText primary="✅ Only upload after confirming with the owner" /></ListItem>
          <ListItem><ListItemText primary="✅ Follow up politely after 1 days if needed" /></ListItem>
        </List>
      </Box>

      {/* Tools Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Tools You’ll Need
        </Typography>
        <List>
          <ListItem><ListItemText primary="📱 Mobile phone with internet" /></ListItem>
          <ListItem><ListItemText primary="💬 WhatsApp for fast communication" /></ListItem>
          <ListItem><ListItemText primary="🔑 Partner login access" /></ListItem>
          <ListItem><ListItemText primary="🧠 Basic local knowledge & confidence" /></ListItem>
        </List>
      </Box>

      {/* FAQs */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <List>
          <ListItem><ListItemText primary="Q: What if the shop doesn’t pay?" secondary="A: That’s okay — focus on genuine businesses. You earn only when they activate their listing." /></ListItem>
          <ListItem><ListItemText primary="Q: The shop owner has doubts — what to do?" secondary="A: Describe about that how we are going to help them to grow their business" /></ListItem>
          <ListItem><ListItemText primary="Q: Can I register shops outside my city?" secondary="A: Absolutely! You can add shops from any location across India." /></ListItem>
          <ListItem><ListItemText primary="Q: Is there a daily limit?" secondary="A: No limit! You can register as many shops as you can manage accurately." /></ListItem>
        </List>
      </Box>

      {/* Final Note */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" color="success.main" gutterBottom>
          Final Word: Let’s Grow Together 🌱
        </Typography>
        <Typography>
          Every business you onboard becomes more discoverable. Every owner you help becomes more independent. And every customer who finds them — benefits from a trusted local option.<br /><br />
          Keep going. You are making a real difference in India’s local economy.
        </Typography>
      </Box>
    </Container>
  );
};

export default LocalPartnerTrainingPage;
