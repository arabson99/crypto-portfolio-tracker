import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axiosInstance from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';

const PortfolioDetailPage = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddCoinDialog, setOpenAddCoinDialog] = useState(false);
  const [openUpdateCoinDialog, setOpenUpdateCoinDialog] = useState(false);
  const [openRemoveCoinDialog, setOpenRemoveCoinDialog] = useState(false);
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinAmount, setCoinAmount] = useState('');
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchPortfolioWithPrices = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/portfolio/${portfolioId}/prices`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSelectedPortfolio(response.data);
      } catch (err) {
        setError('Failed to load portfolio prices');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioWithPrices();
  }, [portfolioId]);

  const handleAddCoin = async () => {
    try {
      await axiosInstance.put(
        `/portfolios/${portfolioId}`,
        {
          action: 'add',
          symbol: coinSymbol,
          amount: parseFloat(coinAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOpenAddCoinDialog(false);
      // Fetch updated portfolio after adding the coin
      fetchPortfolioWithPrices();
    } catch (err) {
      setError('Failed to add coin');
    }
  };

  const handleUpdateCoin = async () => {
    try {
      await axiosInstance.put(
        `/portfolios/${portfolioId}`,
        {
          action: 'update',
          symbol: selectedCoin.symbol,
          amount: parseFloat(coinAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOpenUpdateCoinDialog(false);
      // Fetch updated portfolio after updating the coin
      fetchPortfolioWithPrices();
    } catch (err) {
      setError('Failed to update coin');
    }
  };

  const handleRemoveCoin = async () => {
    try {
      await axiosInstance.put(
        `/portfolios/${portfolioId}`,
        {
          action: 'remove',
          symbol: selectedCoin.symbol,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOpenRemoveCoinDialog(false);
      // Fetch updated portfolio after removing the coin
      fetchPortfolioWithPrices();
    } catch (err) {
      setError('Failed to remove coin');
    }
  };

  const handleDeletePortfolio = async () => {
    try {
      await axiosInstance.delete(`/portfolio/${portfolioId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/portfolios');
    } catch (err) {
      setError('Failed to delete portfolio');
    }
  };

  const fetchPortfolioWithPrices = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/portfolio/${portfolioId}/prices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSelectedPortfolio(response.data);
    } catch (err) {
      setError('Failed to load portfolio prices');
    } finally {
      setIsLoading(false);
    }
  };

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
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        {selectedPortfolio?.name}
      </Typography>

      <Button variant="contained" color="error" onClick={handleDeletePortfolio} sx={{ marginBottom: '20px' }}>
        Delete Portfolio
      </Button>

      {selectedPortfolio?.prices.length > 0 ? (
        <Grid container spacing={3}>
          {selectedPortfolio.prices.map((coin, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{coin.symbol.toUpperCase()}</Typography>
                  <Typography variant="body2">Amount: {coin.amount}</Typography>
                  <Typography variant="body2">Current Price: ${coin.currentPrice || 'N/A'}</Typography>
                  <Typography variant="body2">Total Value: ${coin.totalValue.toFixed(2)}</Typography>

                  {/* Update and Remove buttons */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setSelectedCoin(coin);
                      setCoinAmount(coin.amount);
                      setOpenUpdateCoinDialog(true);
                    }}
                    sx={{ marginTop: '10px' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setSelectedCoin(coin);
                      setOpenRemoveCoinDialog(true);
                    }}
                    sx={{ marginTop: '10px' }}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No coins in this portfolio.</Typography>
      )}

      <Button variant="contained" color="primary" onClick={() => setOpenAddCoinDialog(true)} sx={{ marginTop: '20px' }}>
        Add Coin
      </Button>

      {/* Add Coin Dialog */}
      <Dialog open={openAddCoinDialog} onClose={() => setOpenAddCoinDialog(false)}>
        <DialogTitle>Add a Coin</DialogTitle>
        <DialogContent>
          <TextField
            label="Coin Symbol"
            fullWidth
            value={coinSymbol}
            onChange={(e) => setCoinSymbol(e.target.value)}
            sx={{ marginBottom: '20px' }}
          />
          <TextField
            label="Amount"
            type="number"
            fullWidth
            value={coinAmount}
            onChange={(e) => setCoinAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCoinDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddCoin} color="primary">
            Add Coin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Coin Dialog */}
      <Dialog open={openUpdateCoinDialog} onClose={() => setOpenUpdateCoinDialog(false)}>
        <DialogTitle>Update Coin Amount</DialogTitle>
        <DialogContent>
          <TextField
            label="Coin Amount"
            type="number"
            fullWidth
            value={coinAmount}
            onChange={(e) => setCoinAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateCoinDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCoin} color="primary">
            Update Coin
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Coin Dialog */}
      <Dialog open={openRemoveCoinDialog} onClose={() => setOpenRemoveCoinDialog(false)}>
        <DialogTitle>Remove Coin</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove {selectedCoin?.symbol.toUpperCase()} from your portfolio?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRemoveCoinDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleRemoveCoin} color="error">
            Remove Coin
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PortfolioDetailPage;
