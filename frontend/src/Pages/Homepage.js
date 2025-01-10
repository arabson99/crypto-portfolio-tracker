import React from 'react';
import Banner from '../components/Banner/Banner';
import CoinsTable from "../components/CoinsTable";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  // Handlers for button redirects
  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleSignupRedirect = () => {
    navigate("/signup"); // Redirect to signup page
  };

  const handleAboutRedirect = () => {
    navigate("/about"); // Redirect to about page
  };

  return (
    <main>
      {/* Header Section with Login, Sign Up, and About Buttons */}
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" style={{ fontFamily: 'Montserrat' }}>
            Cryptocurrency Portfolio Tracker
          </Typography>
          <div>
            {/* Login Button */}
            <Button
              color="inherit"
              onClick={handleLoginRedirect}
              style={{ fontSize: '16px', marginRight: '10px' }}
            >
              Login
            </Button>

            {/* Sign Up Button */}
            <Button
              color="inherit"
              onClick={handleSignupRedirect}
              style={{ fontSize: '16px', marginRight: '10px' }}
            >
              Sign Up
            </Button>

            {/* About Button */}
            <Button
              color="inherit"
              onClick={handleAboutRedirect}
              style={{ fontSize: '16px' }}
            >
              About
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content Section */}
      <Banner />
      <CoinsTable />
    </main>
  );
};

export default Homepage;
