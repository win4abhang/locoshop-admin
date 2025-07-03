import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, Grid, Card, CardContent,
  CardActions, Button, Tooltip, IconButton, Divider, Stack
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';

// ✅ Environment variables
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

const MarketingMaterial = () => {
  const [language, setLanguage] = useState('english');
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const messagesPerPage = 2;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/messages?language=${language}`, {
        headers: { 'x-api-key': API_KEY }
      })
      .then(res => {
        setMessages(res.data || []);
        setPage(0); // reset pagination on language change
      })
      .catch(err => console.error('Failed to load messages:', err));
  }, [language]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied!');
  };

  const getImageList = (lang, type) => {
    return [1, 2].map(i => ({
      url: `/assets/${lang}/${type}/${i}.png`,
      title: `${type}-${i}`
    }));
  };
  // Fetch Posters and Banners
  // Note: Assuming these images are stored in a similar structure

  const posters = getImageList(language, 'poster');
  const banners = getImageList(language, 'banner');

  // Message Pagination Logic
  const startIndex = page * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const paginatedMessages = messages.slice(startIndex, endIndex);
  const hasNext = endIndex < messages.length;
  const hasPrev = startIndex > 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📢 Marketing Material
      </Typography>

      {/* 🌐 Language Selector */}
      <Box sx={{ mb: 4, maxWidth: 300, mx: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom>Select Language:</Typography>
        <Select
          fullWidth
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="hindi">Hindi (हिंदी)</MenuItem>
          <MenuItem value="marathi">Marathi (मराठी)</MenuItem>
        </Select>
      </Box>

      {/* 💬 WhatsApp Messages */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>📲 WhatsApp Messages</Typography>
        <Grid container spacing={2}>
          {paginatedMessages.map((msg, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">{msg.occasion}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ pr: 2 }}>{msg.text}</Typography>
                    <Tooltip title="Copy Message">
                      <IconButton onClick={() => copyText(msg.text)}>
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={() => setPage(p => p - 1)} disabled={!hasPrev}>
            ⬅️ Back
          </Button>
          <Button variant="outlined" onClick={() => setPage(p => p + 1)} disabled={!hasNext}>
            Next ➡️
          </Button>
        </Stack>
      </Box>

      {/* 🖼️ Posters & Banners */}
      {[{ title: '🖼️ Posters', data: posters }, { title: '📢 Banners', data: banners }].map((section, i) => (
        <Box key={i} sx={{ mb: 6 }}>
          <Typography variant="h5" gutterBottom>{section.title}</Typography>
          <Grid container spacing={3}>
            {section.data.map((img, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography>{img.title}</Typography>
                  </CardContent>
                  <img
                    src={img.url}
                    alt={img.title}
                    onError={(e) => e.target.style.display = 'none'}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <CardActions>
                    <Button
                      href={img.url}
                      download
                      fullWidth
                      variant="contained"
                      color="success"
                    >
                      Download
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default MarketingMaterial;
