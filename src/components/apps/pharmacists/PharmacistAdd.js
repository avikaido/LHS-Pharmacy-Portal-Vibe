import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  FormLabel,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
  MenuItem,
} from '@mui/material';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import { useSelector, useDispatch } from 'react-redux';
import { addPharmacist, fetchPharmacists } from '../../../store/apps/pharmacists/PharmacistSlice';
import axios from '../../../utils/axios';

const departments = [
  { value: 'Clinical Pharmacy', label: 'Clinical Pharmacy' },
  { value: 'Hospital Pharmacy', label: 'Hospital Pharmacy' },
  { value: 'Compounding Pharmacy', label: 'Compounding Pharmacy' },
  { value: 'Staff', label: 'Staff' },
];

const PharmacistAdd = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    department: '',
    yearsOfExperience: '',
    deaNumber: '',
    licenseNumber: '',
    licenseExpiration: '',
    npiNumber: '',
    languagesSpoken: '',
    notes: '',
  });

  const toggle = () => {
    setModal(!modal);
    setError(null);
    setSuccess(null);
    setValues({
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      department: '',
      yearsOfExperience: '',
      deaNumber: '',
      licenseNumber: '',
      licenseExpiration: '',
      npiNumber: '',
      languagesSpoken: '',
      notes: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map frontend field names to backend field names
      const backendData = {
        first_name: values.firstname,
        last_name: values.lastname,
        phone: values.phone,
        email: values.email,
        type: values.department?.toLowerCase().includes('clinical') ? 'clinical' :
              values.department?.toLowerCase().includes('hospital') ? 'hospital' :
              values.department?.toLowerCase().includes('compounding') ? 'compounding' : 'staff',
        dea_number: values.deaNumber,
        license_number: values.licenseNumber,
        license_expiration: values.licenseExpiration,
        npi_number: values.npiNumber,
        years_experience: parseInt(values.yearsOfExperience) || 0,
        languages_spoken: values.languagesSpoken,
        notes: values.notes,
      };

      const result = await axios.post('/api/pharmacists', backendData);
      setSuccess('Pharmacist created successfully!');
      // Refresh the pharmacist list immediately
      await dispatch(fetchPharmacists());
      // Close the modal after 1.5 seconds to show the success message
      setTimeout(() => {
        toggle();
      }, 1500);
    } catch (err) {
      console.log('Full error object:', err); // Log the full error object

      // Handle the error based on its structure
      if (err.error) {
        setError(err.error);
      } else if (err.response?.status === 409) {
        setError('This email address is already registered to another pharmacist. Please use a different email.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to create pharmacist. Please try again.');
      }
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleDepartmentChange = (event) => {
    setValues(prev => ({
      ...prev,
      department: event.target.value
    }));
  };

  const isFormValid = () => {
    return (
      values.firstname &&
      values.lastname &&
      values.phone &&
      values.email &&
      values.department &&
      values.yearsOfExperience &&
      values.deaNumber &&
      values.licenseNumber &&
      values.licenseExpiration
    );
  };

  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Add New Pharmacist
        </Button>
      </Box>
      <Dialog
        open={modal}
        onClose={toggle}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h5">
          Add New Pharmacist
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill in all required fields and click on the submit button.
          </DialogContentText>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success" variant="body2" sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
              {success}
            </Typography>
          )}
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500">
                  Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>First Name *</FormLabel>
                <TextField
                  id="firstname"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.firstname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Last Name *</FormLabel>
                <TextField
                  id="lastname"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.lastname}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Phone *</FormLabel>
                <TextField
                  id="phone"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.phone}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Email *</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Department *</FormLabel>
                <CustomSelect
                  id="department"
                  value={values.department}
                  onChange={handleDepartmentChange}
                  fullWidth
                  required
                  size="small"
                  variant="outlined"
                >
                  {departments.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Years of Experience *</FormLabel>
                <TextField
                  id="yearsOfExperience"
                  type="number"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.yearsOfExperience}
                  onChange={handleChange}
                  inputProps={{ min: 0, max: 50 }}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500" sx={{ mt: 2 }}>
                  License & Certification Information
                </Typography>
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>DEA Number *</FormLabel>
                <TextField
                  id="deaNumber"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.deaNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>License Number *</FormLabel>
                <TextField
                  id="licenseNumber"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.licenseNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>License Expiration *</FormLabel>
                <TextField
                  id="licenseExpiration"
                  type="date"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.licenseExpiration}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0] // Set min date to today
                  }}
                  helperText="License must not be expired"
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>NPI Number</FormLabel>
                <TextField
                  id="npiNumber"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.npiNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500" sx={{ mt: 2 }}>
                  Additional Information
                </Typography>
              </Grid>

              <Grid item xs={12} lg={12}>
                <FormLabel>Languages Spoken</FormLabel>
                <TextField
                  id="languagesSpoken"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.languagesSpoken}
                  onChange={handleChange}
                  helperText="Separate languages with commas (e.g., English, Spanish, French)"
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <FormLabel>Notes</FormLabel>
                <TextField
                  id="notes"
                  size="small"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={values.notes}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  type="submit"
                  disabled={!isFormValid()}
                >
                  Submit
                </Button>
                <Button variant="contained" color="error" onClick={toggle}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PharmacistAdd;
