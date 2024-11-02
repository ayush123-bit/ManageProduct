import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, InputAdornment, IconButton } from '@mui/material';
import { Add as AddIcon, CameraAlt as ScanIcon, Stop as StopIcon } from '@mui/icons-material';
import BarcodeScanner from './BarcodeScanner';
import { EmailContext } from '../EmailContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewNav from './header/NewNav';

const ProductRegistration = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [serialId, setSerialId] = useState('');
  const [billImage, setBillImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseTime, setPurchaseTime] = useState('');
  const { email } = useContext(EmailContext);

  const handleScan = () => {
    setIsScanning(true);
  };

  const handleStop = () => {
    setIsScanning(false);
  };

  const handleDetected = (code) => {
    setSerialId(code);
    handleStop();
  };

  const handleImageUpload = (event) => {
    if (event.target.name === 'productImage') {
      setProductImage(event.target.files[0]);
    } else if (event.target.name === 'billImage') {
      setBillImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event, shouldResetDateAndTime = true) => {
    event.preventDefault();
    console.log(email)
    const formElement = event.target.form || event.currentTarget; // Get the form element
    const formData = new FormData(formElement); // Create FormData using the correct form element
  
    if (productImage) {
      formData.append('productImage', productImage);
    }
    if (billImage) {
      formData.append('billImage', billImage);
    }
  
    formData.append('email', email);
  
    try {
      const response = await fetch('http://localhost:4100/products', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        toast.success('Product registered successfully!');
  
        // Reset form inputs based on the button clicked
        if (shouldResetDateAndTime) {
          formElement.reset();
          setPurchaseDate('');
          setPurchaseTime('');
        }
  
        setSerialId('');
        setProductImage(null);
        setBillImage(null);
      } else {
        toast.error('Failed to register product.');
      }
    } catch (error) {
      toast.error('Error occurred while registering the product.');
      console.error('Error:', error);
    }
  };
  

  return (
    <>
    <NewNav/>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Registration
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Purchase Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                name="purchaseDate"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Purchase Time"
                type="time"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                value={purchaseTime}
                onChange={(e) => setPurchaseTime(e.target.value)}
                name="purchaseTime"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Serial ID"
                fullWidth
                required
                value={serialId}
                onChange={(e) => setSerialId(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleScan} disabled={isScanning}>
                        <ScanIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                name="serialId"
              />
            </Grid>

            {isScanning && (
              <Grid item xs={12}>
                <BarcodeScanner onDetected={handleDetected} />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleStop}
                  startIcon={<StopIcon />}
                  sx={{ mt: 2 }}
                >
                  Stop Scanning
                </Button>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                label="Product Name"
                fullWidth
                required
                name="name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                required
                name="quantity"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Company Name"
                fullWidth
                name="companyName"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Wholesaler Name"
                fullWidth
                name="wholeSalerName"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Guarantee"
                fullWidth
                name="guarantee"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Warranty"
                fullWidth
                name="warranty"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Wholesaler Number"
                type="tel"
                fullWidth
                name="wholeSalerNumber"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                required
                name="price"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<AddIcon />}
              >
                Product Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="productImage"
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                startIcon={<AddIcon />}
              >
                Bill Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name="billImage"
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={(e) => handleSubmit(e, true)} // Register Product button resets all fields
                >
                  Register Product
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={(e) => handleSubmit(e, false)} // Add New Product button keeps date and time
                >
                  Add New Product
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </Container>
    </>
  );
};

export default ProductRegistration;
