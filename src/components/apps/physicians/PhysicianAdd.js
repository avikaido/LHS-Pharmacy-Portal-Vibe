import React from 'react';
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
import { createPhysician } from '../../../store/apps/physicians/PhysicianSlice';
import user1 from '../../../assets/images/profile/user-1.jpg';

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


const PhysicianAdd = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [values, setValues] = React.useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    dea_number: '',
    license_number: '',
    license_expiration: '',
    npi_number: '',    
    languages_spoken: '',    
    address: '',
    address2: '',
    city: '',
    state: '',
    zip_code: '',
    department: '',
    years_of_experience: '',
    specialty: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPhysician(values));
    setModal(!modal);
    // Reset form
    setValues({
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      dea_number: '',
      license_number: '',
      license_expiration: '',
      npi_number: '',    
      languages_spoken: '',    
      address: '',
      address2: '',
      city: '',
      state: '',
      zip_code: '',
      department: '',
      years_of_experience: '',
      specialty: '',
      notes: '',
    });
  };

  const handleChange2 = (event) => {
    setValues({ ...values, gender: event.target.value });
  };

  const handleChange3 = (event) => {
    setValues({ ...values, state: event.target.value });
  };

return (
  <>
    <Box p={3} pb={1}>
      <Button color="primary" variant="contained" fullWidth onClick={toggle}>
        Add New Physician
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
        {'Add New Physician'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Add a new physician you administer. Fill in all fields and click on the 'Submit' button.
        </DialogContentText>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={6}>
                <FormLabel>First Name</FormLabel>
                <TextField
                  id="first_name"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.first_name}
                  onChange={(e) => setValues({ ...values, first_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Last Name</FormLabel>
                <TextField
                  id="last_name"
                  required
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.last_name}
                  onChange={(e) => setValues({ ...values, last_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Phone</FormLabel>
                <TextField
                  id="phone"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.phone}
                  onChange={(e) => setValues({ ...values, phone: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  required
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormLabel>Address</FormLabel>
                <TextField
                  id="address"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.address}
                  onChange={(e) => setValues({ ...values, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>DEA Number</FormLabel>
                <TextField
                  id="dea_number"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.dea_number}
                  onChange={(e) => setValues({ ...values, dea_number: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>NPI Number</FormLabel>
                <TextField
                  id="npi_number"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.npi_number}
                  onChange={(e) => setValues({ ...values, npi_number: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>License Number</FormLabel>
                <TextField
                  id="license_number"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.license_number}
                  onChange={(e) => setValues({ ...values, license_number: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                  <FormLabel>License Expiration</FormLabel>
                  <TextField
                    id="license_expiration"
                    type="date"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.license_expiration}
                    onChange={(e) => setValues({ ...values, license_expiration: e.target.value })}
                  />
                </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Department</FormLabel>
                <TextField
                  id="department"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.department}
                  onChange={(e) => setValues({ ...values, department: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} lg={6}>
                <FormLabel>Years of Experience</FormLabel>
                <TextField
                  id="years_of_experience"
                  type="number"
                  size="small"
                  fullWidth
                  value={values.years_of_experience}
                  onChange={(e) => setValues({ ...values, years_of_experience: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12} lg={12}>
                <FormLabel>Languages Spoken</FormLabel>
                <TextField
                  id="languages_spoken"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.languages_spoken}
                  onChange={(e) => setValues({ ...values, languages_spoken: e.target.value })}
                />
              </Grid>
              
              
              <Grid item xs={12} lg={12}>
                <FormLabel>Notes</FormLabel>
                <TextField
                  id="notes"
                  size="small"
                  multiline
                  rows="4"
                  variant="outlined"
                  fullWidth
                  value={values.notes}
                  onChange={(e) => setValues({ ...values, notes: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 1 }}
                  type="submit"
                  disabled={
                    values.first_name.length === 0 ||
                    values.last_name.length === 0 ||
                    values.phone.length === 0 ||
                    values.email.length === 0 ||
                    values.dea_number.length === 0 ||
                    values.license_number.length === 0 ||
                    values.license_expiration.length === 0 ||
                    values.address.length === 0 
                  }
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

export default PhysicianAdd;
