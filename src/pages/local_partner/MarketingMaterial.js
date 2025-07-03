import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Select, MenuItem, Grid, Card, CardContent,
  CardActions, Button, Tooltip, IconButton, Divider
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';

// ✅ Use .env variable and secure API key
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_KEY = 'YourStrongSecret123';

const MarketingMaterial = () => {
  const [language, setLanguage] = useState('english');
  const [messages, setMessages] = useState([]);

  // ✅ Fetch WhatsApp messages from backend API
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/messages?language=${language}`, {
        headers: {
          'x-api-key': API_KEY,
        },
      })
      .then((res) => setMessages(res.data || []))
      .catch((err) => console.error('Failed to load messages:', err));
  }, [language]);

  // ✅ Copy message to clipboard
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied!');
  };

  // ✅ Dynamically import images from public folder
  const importImages = (lang, type) => {
    try {
      const context = require.context(`/assets/${lang}/${type}`, false, /\.(png|jpe?g)$/);
      return context.keys().map((key) => ({
        url: `/assets/${lang}/${type}/${key.replace('./', '')}`,
        title: key.replace('./', '').split('.')[0],
      }));
    } catch {
      return [];
    }
  };

  const posters = importImages(language, 'poster');
  const banners = importImages(language, 'banner');

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        📢 Marketing Material
      </Typography>

      {/* 🔽 Language Selector */}
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
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>📲 WhatsApp Messages</Typography>
        <Grid container spacing={2}>
          {messages.map((msg, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {msg.occasion}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ pr: 2 }}>{msg.text}</Typography>
                    <Tooltip title="Copy Message">
                      <IconButton onClick={() => copyText(msg.text)}><FileCopyIcon /></IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 🖼️ Image Sections */}
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
                  <img src={img.url} alt={img.title} style={{ width: '100%', height: 'auto' }} />
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
