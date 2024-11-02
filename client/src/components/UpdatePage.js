import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select, Card, CardContent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewNav from './header/NewNav';

const UpdatePage = () => {
  const [policyType, setPolicyType] = useState(''); // 'return' or 'replacement'
  const [formData, setFormData] = useState({
    isReturn: false,
    isReplace: false,
    dateOfReturn: '',
    timeOfReturn: '',
    reasonForReturn: '',
    returnQuantity: '',
    returnImage: '',
    dateOfReplacement: '',
    timeOfReplacement: '',
    reasonForReplacement: '',
    replacementQuantity: '',
    replacedSerialId: '',
    replacementImage: '',
  });

  const handlePolicyChange = (event) => {
    const policy = event.target.value;
    setPolicyType(policy);

    // Reset form fields based on policy
    setFormData({
      isReturn: policy === 'return',
      isReplace: policy === 'replacement',
      dateOfReturn: '',
      timeOfReturn: '',
      reasonForReturn: '',
      returnQuantity: '',
      returnImage: '',
      dateOfReplacement: '',
      timeOfReplacement: '',
      reasonForReplacement: '',
      replacementQuantity: '',
      replacedSerialId: '',
      replacementImage: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4100/updatePolicy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Policy updated successfully!');
      } else {
        toast.error('Failed to update policy.');
      }
    } catch (error) {
      console.error('Error updating policy:', error);
      toast.error('Error occurred while updating policy.');
    }
  };

  return (
   <>
   <NewNav/>
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Return/Replacement Policy
      </Typography>

      <Card elevation={3} sx={{ p: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Policy Type Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Policy Type</InputLabel>
                <Select value={policyType} onChange={handlePolicyChange}>
                  <MenuItem value="return">Return</MenuItem>
                  <MenuItem value="replacement">Replacement</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Dynamic Fields for Return Policy */}
            {policyType === 'return' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Date of Return"
                    fullWidth
                    name="dateOfReturn"
                    value={formData.dateOfReturn}
                    onChange={handleInputChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Time of Return"
                    fullWidth
                    name="timeOfReturn"
                    value={formData.timeOfReturn}
                    onChange={handleInputChange}
                    type="time"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reason for Return"
                    fullWidth
                    name="reasonForReturn"
                    value={formData.reasonForReturn}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Return Quantity"
                    fullWidth
                    name="returnQuantity"
                    value={formData.returnQuantity}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Upload Return Image"
                    fullWidth
                    name="returnImage"
                    type="file"
                    onChange={(e) => setFormData({ ...formData, returnImage: e.target.files[0] })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}

            {/* Dynamic Fields for Replacement Policy */}
            {policyType === 'replacement' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Date of Replacement"
                    fullWidth
                    name="dateOfReplacement"
                    value={formData.dateOfReplacement}
                    onChange={handleInputChange}
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Time of Replacement"
                    fullWidth
                    name="timeOfReplacement"
                    value={formData.timeOfReplacement}
                    onChange={handleInputChange}
                    type="time"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reason for Replacement"
                    fullWidth
                    name="reasonForReplacement"
                    value={formData.reasonForReplacement}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Replacement Quantity"
                    fullWidth
                    name="replacementQuantity"
                    value={formData.replacementQuantity}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Replaced Serial ID"
                    fullWidth
                    name="replacedSerialId"
                    value={formData.replacedSerialId}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Upload Replacement Image"
                    fullWidth
                    name="replacementImage"
                    type="file"
                    onChange={(e) => setFormData({ ...formData, replacementImage: e.target.files[0] })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}

            {/* Submit Button */}
            <Grid item xs={12} align="center">
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Update Policy
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <ToastContainer />
    </Container>
   </>
  );
};

export default UpdatePage;
