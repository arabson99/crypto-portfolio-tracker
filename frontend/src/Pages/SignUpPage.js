import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios'; // Import axios instance

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Adding loading state
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields!');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match!');
    } else {
      try {
        setIsLoading(true); // Set loading true while the request is processing
        setError('');

        // Send POST request to backend for registration
        const response = await axiosInstance.post('/register', {
          email,
          password,
        });

        // Check if the response is successful
        if (response.status === 201) {
          // Registration successful, redirect to login or home page
          navigate('/login'); // Redirect to login page after successful registration
        }
      } catch (err) {
        console.error(err);
        setError('Failed to sign up. Please try again.');
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
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>Sign Up</Typography>
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        sx={{ marginBottom: '20px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSignUp}
        fullWidth
        sx={{ marginBottom: '10px' }}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </Button>
      <Typography variant="body2">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          style={{ cursor: 'pointer', color: 'gold' }}
        >
          Login
        </span>
      </Typography>
    </Box>
  );
};

export default SignUpPage;
