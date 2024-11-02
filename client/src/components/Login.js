import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { EmailContext } from '../EmailContext';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { AccountCircle, Lock, Email as EmailIcon, ArrowBack } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { message = "" } = location.state || {}; // Default value for message

  const { setEmail } = useContext(EmailContext); // Access EmailContext

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Switch between login and signup
  const toggleForm = () => {
    if (message === "login") {
      navigate('/enter', { state: { message: "signup" } });
    } else {
      navigate('/enter', { state: { message: "login" } });
    }
  };

  // Handle input changes for login form
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle input changes for signup form
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response, result;
      let email;

      if (message === "login") {
        response = await fetch("http://localhost:4100/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        email = loginData.email; // Capture the email for login
      } else {
        response = await fetch("http://localhost:4100/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupData),
        });
        email = signupData.email; // Capture the email for signup
      }

      result = await response.json();

      if (response.ok && result.userType === "user") {
        setEmail(email);
        navigate('/', { state: { emailFromLogin: email, message: "allowed" } });
      } else if (response.ok && result.userType === "shopkeeper") {
        setEmail(email);
        navigate('/home2', { state: { emailFromLogin: email, message: "allowed" } });
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      toast.error('Network error, please try again later');
    }
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '350px',
          padding: '30px',
          backgroundColor: '#e3f2fd',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          border: '1px solid #90caf9',
        }}
      >
        {/* Back Button */}
        <Button 
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)} 
          sx={{ mb: 2, color: '#1976d2' }}
        >
          Back
        </Button>

        <Typography variant="h5" gutterBottom align="center">
          {message === "login" ? "Login" : "Sign Up"}
        </Typography>

        {message === "signup" && (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <AccountCircle sx={{ color: '#2196f3', mr: 1 }} />
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <EmailIcon sx={{ color: '#2196f3', mr: 1 }} />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={message === "login" ? loginData.email : signupData.email}
            onChange={message === "login" ? handleLoginChange : handleSignupChange}
            required
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
          <Lock sx={{ color: '#2196f3', mr: 1 }} />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={message === "login" ? loginData.password : signupData.password}
            onChange={message === "login" ? handleLoginChange : handleSignupChange}
            required
          />
        </Box>

        <Button 
          variant="contained" 
          type="submit" 
          fullWidth 
          sx={{ mb: 2, backgroundColor: '#2196f3' }}
        >
          {message === "login" ? "Login" : "Sign Up"}
        </Button>

        <Typography align="center" sx={{ cursor: 'pointer', color: '#1976d2' }} onClick={toggleForm}>
          {message === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{ mt: 2, color: '#1976d2', borderColor: '#1976d2' }}
        >
          Continue with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{ mt: 2, color: '#1976d2', borderColor: '#1976d2' }}
        >
          Continue with Facebook
        </Button>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Login;
