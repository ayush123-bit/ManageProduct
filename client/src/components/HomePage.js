import React, { useContext, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import InventoryIcon from '@mui/icons-material/Inventory';
import NewNav from './header/NewNav.js'; // Assuming you have a Navbar component named 'NewNav'
import Navbar from './header/Navbar.js';
import { EmailContext } from '../EmailContext.js';
import { useLocation } from 'react-router-dom';
// Animation Keyframes
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '60px 20px',
  backgroundColor: '#007BFF',
  color: '#FFF',
  textAlign: 'center',
  minHeight: '50vh',
  animation: `${fadeInScale} 1s ease-in-out`,
  [theme.breakpoints.down('md')]: {
    padding: '40px 10px',
  },
}));

const FeatureCard = styled(Card)({
  backgroundColor: '#FFF',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
});

const HeroButton = styled(Button)({
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#FFF',
  '&:hover': {
    backgroundColor: '#45A049',
  },
});

const HomePage = () => {
    const location = useLocation();
    const { message = "" } = location.state || {};
    const { email, setEmail } = useContext(EmailContext);
    console.log(email);
    useEffect(() => {
      const { emailFromLogin } = location.state || {};
      if (emailFromLogin) {
        setEmail(emailFromLogin); // Set the email in context
      }
    }, [location.state, setEmail]);
  const navigate = useNavigate();

  const handleAddProduct = () => {
    if(message=="allowed")
    navigate('/registerdata');
  else{
    navigate('/enter');
  }
  };

  const handleSearchProduct = () => {
    if(message=="allowed")
    navigate('/search');
  else
  navigate('/enter');
  };

  return (
    <>
      {/* Navbar at the top */}
      {message === "allowed" ? <NewNav /> : <Navbar />}

      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          Welcome to Product Management
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ marginTop: '20px', fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Effortlessly manage all your products. Add details, fetch information, and keep everything organized.
        </Typography>
        <HeroButton onClick={handleAddProduct}>Get Started</HeroButton>
      </HeroSection>

      {/* Features Section */}
      <Container sx={{ padding: '40px 0' }}>
        <Typography variant="h4" component="h2" textAlign="center" sx={{ marginBottom: '40px' }}>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <AddCircleIcon fontSize="large" sx={{ color: '#4CAF50' }} />
                <Typography variant="h5" component="h3" sx={{ marginTop: '20px' }}>
                  Add Products
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '10px' }}>
                  Quickly enter product details, including name, category, price, and description.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <SearchIcon fontSize="large" sx={{ color: '#FF5722' }} />
                <Typography variant="h5" component="h3" sx={{ marginTop: '20px' }}>
                  Search Products
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '10px' }}>
                  Fetch any product information anytime, anywhere with advanced search options.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <CardContent>
                <InventoryIcon fontSize="large" sx={{ color: '#2196F3' }} />
                <Typography variant="h5" component="h3" sx={{ marginTop: '20px' }}>
                  Manage Inventory
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '10px' }}>
                  Keep track of your inventory and get notifications about low-stock products.
                </Typography>
              </CardContent>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: '#F7F7F7', padding: '40px 0' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="300"
                image="/Assets/login.jpg"
                alt="Add Product"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography variant="h5" component="h3" sx={{ marginBottom: '20px' }}>
                Ready to Manage Your Products?
              </Typography>
              <HeroButton onClick={handleAddProduct}>
                Add Product
              </HeroButton>
              <HeroButton onClick={handleSearchProduct} sx={{ backgroundColor: '#FF5722', marginTop: '20px' }}>
                Search Product
              </HeroButton>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#007BFF', color: '#FFF', padding: '20px 0', textAlign: 'center' }}>
        <Typography variant="body1">© 2024 Product Management | All Rights Reserved</Typography>
      </Box>
    </>
  );
};

export default HomePage;
