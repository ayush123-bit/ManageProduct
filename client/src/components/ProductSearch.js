import React, { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, IconButton } from '@mui/material';
import BarcodeScanner from './BarcodeScanner';
import NewNav from './header/NewNav'; // NewNav component
import { EmailContext } from '../EmailContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';

const ProductSearch = () => {
  const [serialId, setSerialId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [productDetails, setProductDetails] = useState(null); // To store product details after fetching
  const [openImageModal, setOpenImageModal] = useState(false); // For handling the modal open state
  const [openProductImageModal, setOpenProductImageModal] = useState(false); // For product image modal
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

  const handleShowProduct = async () => {
    try {
      const response = await fetch('http://localhost:4100/searchProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serialId: serialId,
          email: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setProductDetails(data); // Set the product details from server
        toast.success('Product found!');
      } else {
        setProductDetails(null);
        toast.error('Product not found.');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error occurred while searching for the product.');
    }
  };

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const handleOpenProductImageModal = () => {
    setOpenProductImageModal(true);
  };

  const handleCloseProductImageModal = () => {
    setOpenProductImageModal(false);
  };

  return (
    <>
      {/* NewNav component at the top */}
      <NewNav />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Search Product
        </Typography>

        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Enter Serial ID or Scan"
                fullWidth
                required
                value={serialId}
                onChange={(e) => setSerialId(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button onClick={handleScan} disabled={isScanning} variant="contained" sx={{ ml: 1 }}>
                      Scan
                    </Button>
                  ),
                }}
              />
            </Grid>

            {isScanning && (
              <Grid item xs={12}>
                <BarcodeScanner onDetected={handleDetected} />
                <Button variant="contained" color="secondary" onClick={handleStop} sx={{ mt: 2 }}>
                  Stop Scanning
                </Button>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleShowProduct} fullWidth>
                Show Product
              </Button>
            </Grid>

            {productDetails && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Product Details:
                </Typography>

                {/* Product Details Table */}
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Field</strong></TableCell>
                        <TableCell><strong>Details</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>{productDetails.__parentArray[0].name || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Quantity</TableCell>
                        <TableCell>{productDetails.__parentArray[0].quantity || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Price</TableCell>
                        <TableCell>${productDetails.__parentArray[0].price || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Company Name</TableCell>
                        <TableCell>{productDetails.__parentArray[0].companyName || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Guarantee</TableCell>
                        <TableCell>{productDetails.__parentArray[0].guarantee || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Warranty</TableCell>
                        <TableCell>{productDetails.__parentArray[0].warranty || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Purchase Date</TableCell>
                        <TableCell>{productDetails.purchaseDate ? new Date(productDetails.purchaseDate).toLocaleDateString() : 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Purchase Time</TableCell>
                        <TableCell>{productDetails.purchaseTime || 'N/A'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Product Image</TableCell>
                        <TableCell>
                          {productDetails.__parentArray[0].image ? (
                            <Button variant="outlined" onClick={handleOpenProductImageModal}>
                              <InsertDriveFileIcon /> View Product Image
                            </Button>
                          ) : 'N/A'}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bill Image</TableCell>
                        <TableCell>
                          {productDetails.billImage ? (
                            <Button variant="outlined" onClick={handleOpenImageModal}>
                              <InsertDriveFileIcon /> View Bill
                            </Button>
                          ) : 'N/A'}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>
        </Paper>

        {/* Modal for displaying the product image */}
        <Dialog open={openProductImageModal} onClose={handleCloseProductImageModal} maxWidth="md" fullWidth>
          <div style={{ position: 'relative', padding: '16px' }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseProductImageModal}
              style={{ position: 'absolute', right: '8px', top: '8px' }}
            >
              <CloseIcon />
            </IconButton>
            {productDetails?.productImage && (
              <img
                src={`Assets/${productDetails.__parentArray[0].image}`}
                alt="Product"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            )}
          </div>
        </Dialog>

        {/* Modal for displaying the bill image */}
        <Dialog open={openImageModal} onClose={handleCloseImageModal} maxWidth="md" fullWidth>
          <div style={{ position: 'relative', padding: '16px' }}>
            <IconButton
              aria-label="close"
              onClick={handleCloseImageModal}
              style={{ position: 'absolute', right: '8px', top: '8px' }}
            >
              <CloseIcon />
            </IconButton>
            {productDetails?.billImage && (
              <img
                src={`Assets/${productDetails.billImage}`}
                alt="Bill"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            )}
          </div>
        </Dialog>

        <ToastContainer />
      </Container>
    </>
  );
};

export default ProductSearch;
