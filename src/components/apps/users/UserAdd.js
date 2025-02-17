import React from 'react';
import { Link } from 'react-router-dom';
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
import { addUser } from '../../../store/apps/users/UserSlice';
import user1 from '../../../assets/images/profile/user-1.jpg';

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



const UserAdd = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.usersReducer.users.length + 1);
  const [modal, setModal] = React.useState(false);
  const [state, setState] = React.useState('');

  const toggle = () => {
    setModal(!modal);

  };

  const [values, setValues] = React.useState({
    firstname: '',
    middlename: '',
    lastname: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    ecname: '',
    ecrelation: '',
    ecphone: '',
    notes: '',
    requests: [],
    insurance1: '',
    insurance2: '',
    insurance1id: '',
    insurance2id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addUser(
        id,
        values.firstname,
        values.middlename,
        values.lastname,
        user1,
        values.dob,
        values.gender,
        values.phone,
        values.email,
        values.address,
        values.address2,
        values.city,
        values.state,
        values.zipcode,
        values.ecname,
        values.ecrelation,
        values.ecphone,
        values.notes,
        values.requests,
        values.insurance1,
        values.insurance2,
        values.insurance1id,
        values.insurance2id,
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

  // Build the URL to be encoded; replace pharmacyDetail.id in the URL
      const urlNew = ``; 

  return (
    <>
      <Box p={3} pb={1}>
        <Button color="primary" variant="contained" fullWidth component={Link} to={`/auth/register`}>
          Add New User
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
          {'Add New User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill in all fields and click on the submit button.
          </DialogContentText>
          <Box mt={3}>
            <form onSubmit={handleSubmit}>
              <Grid spacing={3} container>
              <Grid item xs={12} lg={12}>
                  <Typography variant="h6" fontWeight="500" noWrap>
                    User Info
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>First Name</FormLabel>
                  <TextField
                    id="firstname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.firstname}
                    onChange={(e) => setValues({ ...values, firstname: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>Middle Name or Initial</FormLabel>
                  <TextField
                    id="middlename"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.middlename}
                    onChange={(e) => setValues({ ...values, middlename: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>Last Name</FormLabel>
                  <TextField
                    id="lastname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.lastname}
                    onChange={(e) => setValues({ ...values, lastname: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Date of Birth</FormLabel>
                  <TextField
                    id="dob"
                    type="date"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.dob}
                    onChange={(e) => setValues({ ...values, dob: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>

              <FormLabel>Gender</FormLabel>    
                <CustomSelect
                  id="gender"
                  value={values.gender}
                  onChange={handleChange2}
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
                  <FormLabel>Phone</FormLabel>
                  <TextField
                    id="phone"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.phone}
                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    type="email"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
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
                  <Typography variant="h6" fontWeight="500" noWrap>
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
                    onChange={(e) => setValues({ ...values, insurance1: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Primary Insurance Member ID</FormLabel>
                  <TextField
                    id="insurance1id"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance1id}
                    onChange={(e) => setValues({ ...values, insurance1id: e.target.value })}
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
                    onChange={(e) => setValues({ ...values, insurance2: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel>Secondary Insurance Member ID</FormLabel>
                  <TextField
                    id="insurance2id"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance2id}
                    onChange={(e) => setValues({ ...values, insurance2id: e.target.value })}
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
                    disabled={values.firstname.length === 0
                    || values.lastname.length === 0
                    || values.dob.length === 0
                    || values.gender.length === 0
                    || values.phone.length === 0
                    || values.address.length === 0
                    || values.city.length === 0
                    || values.state.length === 0
                    || values.zipcode.length === 0
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

export default UserAdd;
