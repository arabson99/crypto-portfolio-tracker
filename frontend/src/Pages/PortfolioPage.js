import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom'; // Import `useNavigate` hook from react-router-dom

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate to other pages

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axiosInstance.get('/portfolios', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPortfolios(response.data);
      } catch (err) {
        setError('Failed to load portfolio data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Your Portfolios
      </Typography>
      {portfolios.length > 0 ? (
        portfolios.map((portfolio) => (
          <Box
            key={portfolio._id}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '10px',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                textAlign: 'center',
                padding: '15px',
                borderRadius: '8px',
                minWidth: '250px', // Set a consistent width for the buttons
              }}
              onClick={() => navigate(`/portfolio/${portfolio._id}`)} // Navigate to portfolio detail page
            >
              <Typography variant="h6">{portfolio.name}</Typography>
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1">You don't have any portfolios yet.</Typography>
      )}
    </Box>
  );
};

export default PortfolioPage;
