import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';



function LandingPage() {
  const navigate = useNavigate(); // ⬅ Hook from react-router-dom

  const handleClick = () => {
    navigate('/register'); // or wherever you want the button to go
  };
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      
      {/* ===== HERO SECTION ===== */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Grow Your Local Business with <span style={{ color: '#1A73E8' }}>Localz</span>
        </Typography>
        <Typography variant="h6" color="textSecondary" mb={2}>
          Reach thousands of nearby customers — no commission, no middlemen. Just ₹365/year.
        </Typography>
        <Button variant="contained" color="success" size="large" onClick={handleClick}>
          Start Now
        </Button>
      </Box>

      {/* ===== WHY LOCALZ ===== */}
      <Box sx={{ display: 'flex', justifyContent: 'center', px: 2 }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center" // center inner Grid items
          sx={{ maxWidth: '1200px', mx: 'auto' }} // center the container
        >
          <Grid item xs={12} md={6}>
            <img
              src="/images/storefront.jpg"
              alt="Grow your store"
              style={{ width: '100%', borderRadius: '10px' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
            Get Discovered by Customers Near You — Instantly.
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
            Whether you sell products or offer services like repairs, delivery, or tutoring — Localz helps local people find and contact you, right when they need you.
            </Typography>
            <Typography variant="body1" color="textSecondary">
              • Be seen when people nearby search<br />
              • Customers contact you directly via call or WhatsApp<br />
              • We promote your store through local ads<br />
              • Just ₹365/year — no commissions, no surprises
            </Typography>
          </Grid>
        </Grid>
      </Box>


      {/* ===== FEATURES ===== */}
      <Box mt={10} px={2}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontWeight="bold"
          color="primary"
        >
          Unlock All These Benefits for Just ₹365/Year
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          mb={4}
        >
          One-time fee. No commissions. Your store, your customer, your growth.
        </Typography>

        <Grid container spacing={4}>
          {features.map((item, index) => (
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



      {/* ===== COST COMPARISON ===== */}
      <Box mt={8}>
      <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontWeight="bold"
          color="primary"
        >   
        Why Localz is the Smartest Investment</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Option</strong></TableCell>
              <TableCell><strong>Cost</strong></TableCell>
              <TableCell><strong>Customers</strong></TableCell>
              <TableCell><strong>Direct Contact</strong></TableCell>
              <TableCell><strong>Commission</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comparisons.map((row, i) => (
              <TableRow key={i} sx={row.highlight ? { backgroundColor: '#e8f5e9' } : {}}>
                <TableCell>{row.method}</TableCell>
                <TableCell>{row.cost}</TableCell>
                <TableCell>{row.reach}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.commission}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* ===== WHO IS IT FOR ===== */}
      <Box mt={8}>
      <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontWeight="bold"
          color="primary"
        >  Localz Works for Every Local Business</Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center" // centers items horizontally
          alignItems="center"     // optional: centers items vertically
        >
          {audiences.map((audience, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  width="100%"
                  image={audience.image}
                  alt={audience.title}
                />
                <CardContent>
                  <Typography variant="h6">{audience.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {audience.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ===== CALL TO ACTION ===== */}
      <Box mt={6} textAlign="center">
        <Typography variant="h5" mb={2}>
          You’re One Step Away from Getting More Customers
        </Typography>
        <Button variant="contained" color="success" size="large" onClick={handleClick}>
          Start Your 1-Year Subscription – ₹365 Only
        </Button>
        <Typography variant="body2" color="textSecondary" mt={1}>
          (No hidden charges. Full access. Valid for 12 months.)
        </Typography>
      </Box>

      {/* ===== ADMIN LOGIN / REGISTER ===== */}
      <Box mt={6} textAlign="center">
        <Link to="/register" style={{ textDecoration: 'none', marginRight: '10px' }}>
          <Button variant="outlined" color="primary">List My Business</Button>
        </Link>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="secondary">Login</Button>
        </Link>
      </Box>
    </Container>
  );
}

// ===== FEATURE LIST =====
const features = [
  {
    icon: '/images/icons/visibility.png',
    text: 'Visible to customers searching nearby',
    text1: 'Be seen by people looking for your services in your area. Appear in top results when someone searches nearby.More visibility means more chances of getting calls. Your store will stand out when it matters most.',
  },
  {
    icon: '/images/icons/call.png',
    text: 'Customers call or WhatsApp you directly',
    text1: 'No middlemen — customers reach out to you instantly. Get direct calls or messages from people who need your service. Handle your leads your way, with no interference. Stay in full control of your customer communication.',
  },
  {
    icon: '/images/icons/ads.png',
    text: 'We run local ads on your behalf',
    text1: 'We promote your business in your area automatically. Reach nearby people without spending time or effort. Our local ads drive real attention to your store. You grow while we handle the marketing for you.',
  },
  {
    icon: '/images/icons/commission.png',
    text: 'No commission — keep 100% of your earnings',
    text1: 'Every rupee you earn is yours to keep. No cuts, no fees — we don’t take a share. Unlike other platforms, we support your full profit. Grow your income without worrying about deductions.',
  },
  {
    icon: '/images/icons/payment.png',
    text: 'One-time ₹365/year — no monthly headache',
    text1: 'Pay once a year, no surprise charges later. Just ₹1 per day for year-round visibility. Forget about monthly renewals or bills. Simple, affordable, and stress-free pricing.',
  },
  {
    icon: '/images/icons/growth.png',
    text: 'Start getting leads in 24 hours',
    text1: 'Get listed and start receiving leads fast. We activate your visibility within a day. No waiting weeks — results come quickly. You’ll start hearing from customers in no time.',
  },
];

// ===== COMPARISON TABLE =====
const comparisons = [
  {
    method: 'Offline Ads',
    cost: '₹1,000–₹2,000/month',
    reach: 'Local but slow',
    contact: 'No',
    commission: 'No',
  },
  {
    method: 'Aggregator Apps',
    cost: '₹0 upfront',
    reach: 'High, but not targeted',
    contact: 'Indirect',
    commission: '20%–35%',
  },
  {
    method: 'Directory Platforms',
    cost: '₹1,000–₹50,000/year',
    reach: 'Mixed, low intent',
    contact: 'Limited Access',
    commission: 'Extra for leads',
  },
  {
    method: 'Localz (Best Value)',
    cost: '₹365/year',
    reach: 'Local & Digital',
    contact: 'Direct Calls/DMs',
    commission: '0% Commission',
    highlight: true,
  },
];

// ===== AUDIENCE BLOCKS =====
const audiences = [
  {
    title: 'Shops & Retailers',
    description: 'List your products, services, location and contact. Ideal for grocery, garments, repair, hardware, and more.',
    image: '/images/shopowner.jpg',
  },
  {
    title: 'Service Providers',
    description: 'Plumbers, electricians, tuition teachers, beauticians, delivery boys — get leads nearby every day.',
    image: '/images/service.jpg',
  },
  {
    title: 'Freelancers & Part-Timers',
    description: 'Start a side hustle — and get discovered by locals instantly with a ₹1/day profile.',
    image: '/images/consumer.jpg',
  },
];

export default LandingPage;
