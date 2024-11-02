import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { EmailContext } from '../EmailContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewNav from './header/NewNav';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [isEditing, setIsEditing] = useState(false);
  const { email } = useContext(EmailContext); // Use the context to get the user's email

  useEffect(() => {
    // Fetch user data from server when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4100/user/${email}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          toast.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error occurred while fetching user data.');
      }
    };

    fetchUserData();
  }, [email]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:4100/updateUser/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error occurred while updating profile.');
    }
  };

  return (
    <>
    <NewNav/>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile Page
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              fullWidth
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              fullWidth
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12} align="center">
            {isEditing ? (
              <>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>

      <ToastContainer />
    </Container>
    </>
  );
};

export default ProfilePage;
