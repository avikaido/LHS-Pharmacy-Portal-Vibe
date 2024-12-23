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
import { addPharmacist } from '../../../store/apps/pharmacists/PharmacistSlice';
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


const PharmacistAdd = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.pharmacistsReducer.pharmacists.length + 1);
  const [modal, setModal] = React.useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const [values, setValues] = React.useState({
    phone: '',
    email: '',
    deanumber: '',
    licensenumber: '',
    licenseexpiration: '',
    npinumber: '',    
    languagesspoken: '',    
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addPharmacist(
        id,
        values.phone,
        values.email,
        user1,
        values.deanumber,
        values.licensenumber,
        values.licenseexpiration,
        values.npinumber,
        values.languagesspoken,
        values.address,
        values.address2,
        values.city,
        values.state,
        values.zipcode,
        values.notes,
      ),
    );
    setModal(!modal);
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
        {'Add New Pharmacist'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Add a new pharmacist you administer. Fill in all fields and click on the 'Submit' button.
        </DialogContentText>
        <Box mt={3}>
          <form onSubmit={handleSubmit}>
            <Grid spacing={3} container>
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
              <Grid item xs={12} lg={6}>
                <FormLabel>DEANumber</FormLabel>
                <TextField
                  id="deanumber"
                  size="small"
                  variant="outlined"
                  fullWidth
                  required
                  value={values.deanumber}
                  onChange={(e) => setValues({ ...values, deanumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>License Number</FormLabel>
                <TextField
                  id="licensenumber"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.licensenumber}
                  onChange={(e) => setValues({ ...values, licensenumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>License Expiration</FormLabel>
                <TextField
                  id="licenseexpiration"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.licenseexpiration}
                  onChange={(e) => setValues({ ...values, licenseexpiration: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>NPI Number</FormLabel>
                <TextField
                  id="npinumber"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.npinumber}
                  onChange={(e) => setValues({ ...values, npinumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormLabel>Languages Spoken</FormLabel>
                <TextField
                  id="languagesspoken"
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={values.languagesspoken}
                  onChange={(e) => setValues({ ...values, languagesspoken: e.target.value })}
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
                    values.phone.length === 0 ||
                    values.email.length === 0 ||
                    values.deanumber.length === 0 ||
                    values.licensenumber.length === 0 ||
                    values.licenseexpiration.length === 0 ||
                    values.npinumber.length === 0 ||
                    values.address.length === 0 ||
                    values.city.length === 0 ||
                    values.state.length === 0 ||
                    values.zipcode.length === 0
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

export default PharmacistAdd;
