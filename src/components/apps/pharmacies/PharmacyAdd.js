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
import { createPharmacy, fetchPharmacyTypes } from '../../../store/apps/pharmacies/PharmacySlice';
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

const PharmacyAdd = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.pharmaciesReducer.pharmacies.length + 1);
  const pharmacyTypes = useSelector((state) => state.pharmaciesReducer.pharmacyTypes);
  const [modal, setModal] = React.useState(false);

  // Fetch pharmacy types when component mounts
  React.useEffect(() => {
    dispatch(fetchPharmacyTypes());
  }, [dispatch]);

  const toggle = () => {
    setModal(!modal);
  };

  const [values, setValues] = React.useState({
    pharmacy_name: '',
    pharmacy_type: '',
    chain_name: '',
    phone: '',
    fax: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    website: '',
    contact_person: '',
    business_hours: '',
    license_number: '',
    license_expiration: '',
    npi_number: '',
    insurance_accepted: '',
    services_offered: '',    
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPharmacy(values));
    setModal(!modal);
  };

  const handleChange3 = (event) => {
    setValues({ ...values, state: event.target.value });
  };

  const handlePharmacyTypeChange = (event) => {
    setValues({ ...values, pharmacy_type: event.target.value });
  };

  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth onClick={toggle}>
          Add New Location
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
          {'Add New Location'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Add a new location you administer. Fill in the all fields and click on the 'Submit' button.
          </DialogContentText>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Location Name</FormLabel>
                  <TextField
                    id="pharmacy_name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.pharmacy_name}
                    onChange={(e) => setValues({ ...values, pharmacy_name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Location Type</FormLabel>
                  <CustomSelect
                    id="pharmacy_type"
                    value={values.pharmacy_type}
                    onChange={handlePharmacyTypeChange}
                    fullWidth
                    size="small"
                    variant="outlined"
                  >
                    {pharmacyTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Chain Name</FormLabel>
                  <TextField
                    id="chain_name"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.chain_name}
                    onChange={(e) => setValues({ ...values, chain_name: e.target.value })}
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
                  <FormLabel>Fax</FormLabel>
                  <TextField
                    id="fax"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.fax}
                    onChange={(e) => setValues({ ...values, fax: e.target.value })}
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
                <Grid item xs={12} lg={12}>
                  <FormLabel>Address 2</FormLabel>
                  <TextField
                    id="address2"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.address2}
                    onChange={(e) => setValues({ ...values, address2: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>City</FormLabel>
                  <TextField
                    id="city"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.city}
                    onChange={(e) => setValues({ ...values, city: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>State</FormLabel>
                  <CustomSelect
                    id="state"
                    value={values.state}
                    onChange={handleChange3}
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
                  <FormLabel>Zip Code</FormLabel>
                  <TextField
                    id="zipcode"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.zipcode}
                    onChange={(e) => setValues({ ...values, zipcode: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Website</FormLabel>
                  <TextField
                    id="website"
                    type="website"
                    required
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.website}
                    onChange={(e) => setValues({ ...values, website: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Contact Person</FormLabel>
                  <TextField
                    id="contact_person"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.contact_person}
                    onChange={(e) => setValues({ ...values, contact_person: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Business Hours</FormLabel>
                  <TextField
                    id="business_hours"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.business_hours}
                    onChange={(e) => setValues({ ...values, business_hours: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>License Number</FormLabel>
                  <TextField
                    id="license_number"
                    required
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
                    required
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.license_expiration}
                    onChange={(e) => setValues({ ...values, license_expiration: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>NPI Number</FormLabel>
                  <TextField
                    id="npi_number"
                    required
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.npi_number}
                    onChange={(e) => setValues({ ...values, npi_number: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Insurance Accepted</FormLabel>
                  <TextField
                    id="insurance_accepted"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance_accepted}
                    onChange={(e) => setValues({ ...values, insurance_accepted: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Services Offered</FormLabel>
                  <TextField
                    id="services_offered"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.services_offered}
                    onChange={(e) => setValues({ ...values, services_offered: e.target.value })}
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
                    disabled={values.pharmacy_name.length === 0 || values.pharmacy_type.length === 0}
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

export default PharmacyAdd;
