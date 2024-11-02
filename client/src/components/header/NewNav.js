import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Button, Avatar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon, PersonAdd as RegisterIcon, Update as UpdateIcon, Receipt as BillIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

// Styled Components
const LogoDiv = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginRight: '20px', // Spacing from search bar and menu
});

const Logo = styled('img')({
  width: '40px',
  marginRight: '10px',
  filter: 'none', // Ensures the logo appears black
});

const LogoText = styled('h2')({
  color: 'red', // Red color for the logo text
  fontSize: '1.5rem',
  margin: 0,
});

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#F0F0F0', // Light background for the search bar
  borderRadius: '5px',
  padding: '2px 10px',
  marginLeft: 'auto',
  width: '400px',
  [theme.breakpoints.down('sm')]: {
    display: 'none', // Hide search bar on small screens
  },
}));

const StyledInputBase = styled(InputBase)({
  width: '100%',
});

// Universal green button
const GreenButton = styled(Button)({
  color: '#FFF',
  backgroundColor: '#4CAF50',
  '&:hover': {
    backgroundColor: '#45A049',
  },
  marginLeft: '10px', // Spacing between buttons
});

// Styling the navbar
const Navbar = styled(AppBar)({
  backgroundColor: 'white', // White background for the navbar
  boxShadow: 'none',
});

// Avatar styling: Blue background without a border
const UserAvatar = styled(Avatar)({
  backgroundColor: 'blue',
  border: 'none',
  marginLeft: '10px', // Spacing from buttons
});

const NewNav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation functions
  const gotoRegister = () => navigate('/registerdata');
  const gotoSearchProduct = () => navigate('/search');
  const gotoUpdate = () => navigate('/update');
  const gotoBill = () => navigate('/bill');
  const logout = () => navigate('/');
  const openprofile = () => navigate('/profile');

  // Toggle Drawer
  const toggleDrawer = (open) => () => setIsDrawerOpen(open);

  // Drawer content
  const drawerList = () => (
    <Box sx={{ width: 250 }}>
      <List>
        <ListItem button onClick={gotoRegister}>
          <ListItemIcon><RegisterIcon /></ListItemIcon>
          <ListItemText primary="Register Data" />
        </ListItem>
        <ListItem button onClick={gotoSearchProduct}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary="Search Product" />
        </ListItem>
        <ListItem button onClick={gotoUpdate}>
          <ListItemIcon><UpdateIcon /></ListItemIcon>
          <ListItemText primary="Update" />
        </ListItem>
        <ListItem button onClick={gotoBill}>
          <ListItemIcon><BillIcon /></ListItemIcon>
          <ListItemText primary="Bill" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Navbar position="static">
      <Toolbar>
        {/* Logo Section */}
        <LogoDiv onClick={() => navigate('/')}>
          <Logo src="/Assets/logo.png" alt="Logo" />
          <LogoText>DataManage</LogoText>
        </LogoDiv>

        {/* Search Bar */}
        <SearchBar>
          <SearchIcon />
          <StyledInputBase placeholder="Search Products..." />
        </SearchBar>

        {/* Hamburger Icon for small screens */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ display: { sm: 'none' }, color: 'black' }} // Set color to black
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer for small screens */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>

        {/* Links and User Profile for large screens */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 'auto', alignItems: 'center' }}>
          <GreenButton startIcon={<RegisterIcon />} onClick={gotoRegister}>
            Register Data
          </GreenButton>
          <GreenButton startIcon={<SearchIcon />} onClick={gotoSearchProduct}>
            Search Product
          </GreenButton>
          <GreenButton startIcon={<UpdateIcon />} onClick={gotoUpdate}>
            Update
          </GreenButton>
          <GreenButton startIcon={<BillIcon />} onClick={gotoBill}>
            Bill
          </GreenButton>
          <GreenButton startIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </GreenButton>
          <UserAvatar alt="User" src="/Assets/user.png" onClick={openprofile} />
        </Box>
      </Toolbar>
    </Navbar>
  );
};

export default NewNav;
