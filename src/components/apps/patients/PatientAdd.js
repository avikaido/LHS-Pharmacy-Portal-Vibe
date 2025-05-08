//import React from 'react';
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
import { createPatient, fetchPatients } from '../../../store/apps/patients/PatientSlice';
//import user1 from '../../../assets/images/profile/user-1.jpg';
import axios from '../../../utils/axios';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import * as yup from 'yup';


const genders = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const states = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];


const validationSchema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  dob: yup.string().required('Date of Birth is required'),
  // Add other fields similarly...
});

const CustomTextField = styled((props) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
}));

const CustomFormLabel = styled((props) => (
  <Typography variant="subtitle1" fontWeight={600} {...props} component="label" />
))(() => ({
  marginBottom: '5px',
  marginTop: '25px',
  display: 'block',
}));

const PatientAdd = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [values, setValues] = useState({
    first_name: '',
    middle_initial: '',
    last_name: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    notes: '',
    insurance1: '',
    insurance1_id: '',
    insurance2: '',
    insurance2_id: '',
  });

  const toggle = () => {
    setModal(!modal);
    setError(null);
    setSuccess(null);
    setValues({
      first_name: '',
      middle_initial: '',
      last_name: '',
      dob: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      notes: '',
      insurance1: '',
      insurance1_id: '',
      insurance2: '',
      insurance2_id: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/patients', values);
      setSuccess('Patient created successfully!');
      // Refresh the patient list immediately
      await dispatch(fetchPatients());
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
        setError('This email address is already registered to another patient. Please use a different email.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Failed to create patient. Please try again.');
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

  const handleGenderChange = (event) => {
    setValues(prev => ({
      ...prev,
      gender: event.target.value
    }));
  };

  const handleStateChange = (event) => {
    setValues(prev => ({
      ...prev,
      state: event.target.value
    }));
  };

  const isFormValid = () => {
    return (
      values.first_name &&
      values.last_name &&
      values.dob &&
      values.gender &&
      values.phone &&
      values.email &&
      values.address &&
      values.city &&
      values.state &&
      values.zipcode
    );
  };

  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Add New Patient
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
          Add New Patient
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill in all fields and click on the submit button.
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
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                  <Typography variant="h6" fontWeight="500">
                    Patient Info
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormLabel>First Name *</FormLabel>
                  <TextField
                    id="first_name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.first_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormLabel>Middle Initial</FormLabel>
                  <TextField
                    id="middle_initial"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.middle_initial}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormLabel>Last Name *</FormLabel>
                  <TextField
                    id="last_name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.last_name}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Date of Birth *</FormLabel>
                  <TextField
                    id="dob"
                    type="date"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.dob}
                    onChange={handleChange}
                    inputProps={{
                      max: new Date().toISOString().split('T')[0] // Set max date to today
                    }}
                    helperText="Date cannot be in the future"
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Gender *</FormLabel>
                  <CustomSelect
                    id="gender"
                    value={values.gender}
                    onChange={handleGenderChange}
                    fullWidth
                    required
                    size="small"
                    variant="outlined"
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
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

                <Grid item xs={12} lg={12}>
                  <FormLabel>Address *</FormLabel>
                  <TextField
                    id="address"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.address}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <FormLabel>Address 2</FormLabel>
                  <TextField
                    id="address2"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.address2}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormLabel>City *</FormLabel>
                  <TextField
                    id="city"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.city}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormLabel>State *</FormLabel>
                  <CustomSelect
                    id="state"
                    value={values.state}
                    onChange={handleStateChange}
                    fullWidth
                    required
                    size="small"
                    variant="outlined"
                  >
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>

                <Grid item xs={12} lg={4}>
                  <FormLabel>Zip Code *</FormLabel>
                  <TextField
                    id="zipcode"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.zipcode}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Typography variant="h6" fontWeight="500">
                    Additional Info
                  </Typography>
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Primary Insurance</FormLabel>
                  <TextField
                    id="insurance1"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance1}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Primary Insurance ID</FormLabel>
                  <TextField
                    id="insurance1_id"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance1_id}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Secondary Insurance</FormLabel>
                  <TextField
                    id="insurance2"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance2}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} lg={6}>
                  <FormLabel>Secondary Insurance ID</FormLabel>
                  <TextField
                    id="insurance2_id"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance2_id}
                    onChange={handleChange}
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
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PatientAdd;
