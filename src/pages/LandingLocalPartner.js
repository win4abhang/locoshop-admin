import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from '@mui/material';


import Menu from '../components/Menu'; // Adjust path as needed

function LandingTelecallerPartner() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register_local-partner');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Menu />

      {/* Hero Section */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3"  gutterBottom sx={{ mt: 4 }}>
          Earn from Anywhere by <br/>Connecting Local Stores to Customers
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={2}>
          Help businesses get more visibility — get paid weekly.
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <img src="/images/telecaller-hero.jpg" alt="Work from home telecalling" style={{ maxWidth: 1280, width: '100%', borderRadius: 10 }} />
        </Box>

        <Button variant="contained" color="success" size="large" onClick={handleClick}>
          Start Now
        </Button>


      {/* ===== What You Need To Do ===== */}
      <Box mt={5} px={2}>
        
      <Typography variant="h5" fontWeight="bold" align="center" color="primary" mt={5} gutterBottom>
        Your Role as a Localz Partner
      </Typography>
      <Typography variant="body1" align="center" color="textSecondary" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
        Follow this simple step-by-step process to onboard shops and earn weekly commission<br />
        All from your phone, with no travel needed.
      </Typography>

        <Grid container spacing={4} justifyContent="center"  alignItems="center">
          {WhatYouNeedToDo.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  maxWidth: 300,
                  minHeight: 300, // ensures consistent height, but not forced
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  // '&:hover': {
                  //   transform: 'translateY(-5px)',
                  //   boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                  // },
                }}
              >
                <CardMedia
                  component="img"
                  image={item.icon}
                  alt={item.text}
                  sx={{
                    width: 60,
                    height: 60,
                    mb: 2,
                    filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(752%) hue-rotate(202deg) brightness(95%) contrast(101%)',
                  }}
                />
                <Typography variant="body1" fontWeight={500}>
                  {item.text}
                </Typography>
                <hr/>
                <Typography variant="body1" fontWeight={300}>
                  {item.text1}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>







        
      </Box>

      {/* Task Section */}
      <Grid container spacing={4} alignItems="center" mt={6}>
        <Grid item xs={12} md={6}>
          <img
            src="/images/telecaller-work.jpg"
            alt="Telecaller work"
            style={{ width: '100%', borderRadius: 10 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Why Shop Owners Should Join Through You
        </Typography>
        <Typography variant="body1" paragraph>
          As a Localz Partner, your job is to help shop owners easily onboard to our platform. You are their trusted point of contact — making the process simple and smooth.
        </Typography>
        <Typography variant="body1" paragraph>
          For store owners, Localz offers high visibility to nearby customers, direct inquiries via phone or WhatsApp, and zero commission on orders — all for just ₹365/year (₹1/day).
        </Typography>
        <Typography variant="body1" paragraph>
          All help regarding services or orders is handled by the Localz support team. Your role is only to onboard shops — not to provide service assistance.
        </Typography>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          What shop owners get:
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li>Listing in top local results when customers search nearby</li>
          <li>Direct Visit to store, calls and messages from genuine nearby customers</li>
          <li>Free digital posters, banners & marketing materials to share on WhatsApp, Facebook, etc.</li>
          <li>just ₹365/year for no extra cost</li>
        </ul>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          How you add value as a Localz Partner:
        </Typography>
        <ul style={{ paddingLeft: 20 }}>
          <li>You explain the benefits in simple language over a phone call</li>
          <li>You help the shop fill the registration form</li>
          <li>You send them the payment link — and once they pay, your job is done</li>
          <li>Your trust helps the store feel confident in subscribing</li>
        </ul>
        <Typography variant="body1" paragraph>
          The entire process is digital — no physical visits or printed material required.
        </Typography>
      </Grid>



      </Grid>

      {/* Benefits Section */}
      <Box mt={6} px={2}>
        <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
          Earn Weekly Commission, Work Anytime from Anywhere
        </Typography>
        <Grid container spacing={4} justifyContent="center" mt={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <CardMedia component="img" src="/images/money.jpg" alt="Earn Commission" sx={{ height: 150,  objectFit: 'cover' }} />
              <Typography variant="h6" mt={2}>Earn ₹36 per Registration</Typography>
              <Typography variant="body2">Paid weekly directly to your bank account.</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <CardMedia component="img" src="/images/flexible-time.jpg" alt="Flexible Time" sx={{ height: 150, objectFit: 'cover' }} />
              <Typography variant="h6" mt={2}>No Targets or Pressure</Typography>
              <Typography variant="body2">Work part-time or full-time from home.</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ textAlign: 'center', p: 3 }}>
              <CardMedia component="img" src="/images/phone-call.jpg" alt="Just Call" sx={{ height: 150, objectFit: 'cover' }} />
              <Typography variant="h6" mt={2}>Just Use Your Phone</Typography>
              <Typography variant="body2">No field work. All calls done from your mobile.</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* CTA */}
      <Box mt={6} textAlign="center">
      <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
      Achieve the financial freedom you've always wanted.
        </Typography>
        <Typography variant="h5" mb={2}>
          Want to Get Started? It’s Simple and Free.
        </Typography>
        <Typography variant="h6" mb={2}>
          Start Your Journey Today!
        </Typography>
        <img src="/images/signup.jpg" alt="Start now" style={{ maxWidth: 1280, width: '100%', borderRadius: 10, marginBottom: 16 }} />
        <Button variant="contained" color="success" size="large" onClick={handleClick}>
          Register as a Local Partner Now
        </Button>
        <Typography variant="body2" color="textSecondary" mt={1}>
          No joining fees. No pressure. No targets. Just ₹36 per verified store.
        </Typography>
      </Box>
    </Container>
  );
}

// ===== FEATURE LIST =====
const WhatYouNeedToDo = [
  {
    icon: '/images/icons/onboarding.png',
    text: 'Fill Your Own Form First',
    text1: 'To start, you need to fill your own onboarding form. Within 24 hours, you’ll receive a message to verify your mobile number, submit bank details, and get access to all marketing materials and tools required to talk to shop owners.',
  },
  {
    icon: '/images/icons/Shop_Owners.png',
    text: 'Call Local Shop Owners',
    text1: 'We provide a list of shop numbers near you — or you can find your own local shops. Just speak to them on the phone. No in-person visits required. Explain the service in your local language if needed.',
  },
  {
    icon: '/images/icons/Benefits.png',
    text: 'Explain Localz Listing Benefits',
    text1: 'Tell the shop owner they can appear in top search results nearby by paying just ₹365/year. No commission. No extra fees. Direct calls and more visibility to local customers.',
  },
  {
    icon: '/images/icons/Shop_Details.png',
    text: 'Fill Shop Details Form',
    text1: 'Once a shop agrees, you must fill a short form with their name, phone number, shop name, category, and location. No need to collect documents — just basic information is enough.',
  },
  {
    icon: '/images/icons/link.png',
    text: 'Send Payment Link After Form',
    text1: 'After you submit the shop form, the system automatically sends a payment link to the shop owner. They can pay ₹365 immediately or later via UPI, card, or net banking.',
  },
  {
    icon: '/images/icons/Payment_Confirm.png',
    text: 'Wait for Payment & Confirm',
    text1: 'You don’t need to force them to pay immediately. Wait a few hours or follow up politely. Once they pay, you’ll be notified to confirm the payment for that shop.',
  },
  {
    icon: '/images/icons/money.png',
    text: 'Earn ₹36 Per Paid Shop',
    text1: 'You earn ₹36 for every shop that completes payment through your form. The more shops that pay, the more you earn. No upper limit.',
  },
  {
    icon: '/images/icons/Every_Friday.png',
    text: 'Get Paid Every Friday',
    text1: 'We calculate your earnings every Thursday. Your full commission is sent to your bank account by Friday, weekly. No delay. No cuts. Full payment every week.',
  },
  {
    icon: '/images/icons/marketing.png',
    text: 'Get All Marketing Materials',
    text1: 'You receive banners, posters, and message templates to use while talking to shop owners. You can share them on WhatsApp or show while calling — no need to create anything yourself.',
  },
  {
    icon: '/images/icons/freedom.png',
    text: 'Work at Your Own Pace',
    text1: 'There is no daily target. Call 5 shops or 50 — it’s up to you. You can work part time or full time, from home or anywhere. Just be consistent and follow the process.',
  },
];


export default LandingTelecallerPartner;
