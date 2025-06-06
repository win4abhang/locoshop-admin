// components/Menu.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu as MuiMenu,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='absolute' sx={{ backgroundColor: '#1A73E8' }} elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Hamburger Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleMenuOpen}
            sx={{ mr: 2 }}
            aria-label="open navigation menu"
            aria-controls={open ? 'main-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
          <MuiMenu
            id="main-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
          <MenuItem onClick={handleMenuClose} component={Link} to="/" disableRipple>
            Home
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/register" disableRipple>
            Register Your Store
          </MenuItem>
          
          <MenuItem onClick={handleMenuClose} component={Link} to="/landing_Local_Partner" disableRipple>
            Become a Local Partner
          </MenuItem>
          
            <MenuItem
              onClick={handleMenuClose}
              component="a"
              href="https://localz.online/"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
            >
              Search nearby stores and services
            </MenuItem>
          </MuiMenu>
        </Box>

        {/* Center: Logo */}
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to="/">
            <img src="/images/logo.png" alt="Localz" style={{ height: 50, cursor: 'pointer' }} />
          </Link>
        </Box>

        {/* Right: Login Button */}
        <Box>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color='inherit'>
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
