import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, IconButton, CardMedia } from '@mui/material';
import { EmailContext } from '../EmailContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NewNav from './header/NewNav';
const BillCards = () => {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const { email } = useContext(EmailContext);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(`http://localhost:4100/bills/${email}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBills(data);
        } else {
          toast.error('Failed to fetch bills.');
        }
      } catch (error) {
        console.error('Error fetching bills:', error);
        toast.error('Error occurred while fetching bills.');
      }
    };

    fetchBills();
  }, [email]);

  const handleOpenBill = (bill) => {
    setSelectedBill(bill);
  };

  const handleCloseBill = () => {
    setSelectedBill(null);
  };

  return (
    <>
    <NewNav/>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Your Bills
      </Typography>

      <Grid container spacing={3}>
        {bills.map((bill) => (
          <Grid item xs={12} sm={6} md={4} key={bill._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`Assets/${bill.billImage}`} // Update with actual path
                alt="Bill Image"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Bill Date: {new Date(bill.purchaseDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <InsertDriveFileIcon /> {bill.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Time: {bill.purchaseTime || 'N/A'}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenBill(bill)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedBill && (
        <Dialog open={Boolean(selectedBill)} onClose={handleCloseBill} maxWidth="md" fullWidth>
          <div style={{ position: 'relative', padding: '16px' }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseBill}
              style={{ position: 'absolute', right: '8px', top: '8px' }}
            >
              <CloseIcon />
            </IconButton>
            {selectedBill.billImage && (
              <img
                src={`Assets/${selectedBill.billImage}`}
                alt="Bill"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            )}
            <Typography variant="h6" gutterBottom>
              Bill Details
            </Typography>
            <Typography variant="body1">
              {selectedBill.description}
            </Typography>
            <Typography variant="body2">
              Date: {new Date(selectedBill.purchaseDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Time: {selectedBill.purchaseTime || 'N/A'}
            </Typography>
          </div>
        </Dialog>
      )}

      <ToastContainer />
    </Container>
    </>
  );
};

export default BillCards;
