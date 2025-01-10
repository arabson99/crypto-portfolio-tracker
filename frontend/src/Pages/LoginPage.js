import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios'; // Import axios instance

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password!');
    } else {
      try {
        setIsLoading(true);
        setError(''); // Clear any previous error
  
        const response = await axiosInstance.post('/login', { email, password });
        console.log('Login Response:', response); // Log the response from backend
  
        if (response.status === 200) {
          console.log('Login successful');
          const { token } = response.data;
          localStorage.setItem('token', token); // Store the token in localStorage
  
         // Fetch the user's portfolio
          const portfolioResponse = await axiosInstance.get('/portfolios', {
           headers: {
             Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
          });
          
         console.log('Portfolio Response:', portfolioResponse);  // Log portfolio response
  
          // Now you have the portfolio data, redirect to the portfolio page
          navigate('/dashboard'); // Redirect to the user's portfolio page
        }
      } catch (err) {
        console.error('Login error:', err);
        const errorMessage = err.response ? err.response.data.error : 'Invalid email or password';
        setError(errorMessage);
      } finally {
        setIsLoading(false); // Set loading to false after request is completed
      }
    }
  };
  

  return (
    <Box
      sx={{
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Login</Typography>
      {error && (
        <Typography variant="body2" sx={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        sx={{ marginBottom: '10px' }}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Logging In...' : 'Login'}
      </Button>
      <Typography variant="body2">
        Don't have an account?{' '}
        <span
          onClick={() => navigate('/signup')}
          style={{ cursor: 'pointer', color: 'gold' }}
        >
          Sign Up
        </span>
      </Typography>
    </Box>
  );
};

export default LoginPage;
