import React, {useEffect, useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  FormControlLabel,
  Alert,
  MenuItem,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  FormLabel,
  TextField,
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../components/forms/theme-elements/CustomSelect';
import ParentCard from '../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, SearchItem } from '../../store/apps/items/ItemSlice';
import axios from 'axios';

const steps = ['Medicine Info', 'Physician Info', 'Patient Info', 'Additional Info', 'Finish'];

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

const pharmacyDetail = [
    {
      id: 1,
      pharmacyName: 'CVS Pharmacy #123',
      pharmacyType: 'Retail',
      phone: '800-123-4567',
      fax: '800-123-7654',
      email: 'contact@cvs123.com',
      website: 'www.cvs123.com',
      address: '19214 110th Rd, Saint Albans, NY, 11412',
      businessHours: '9 AM - 9 PM',
      licenseNumber: 'PH87654',
      licenseExpiration: '2026-03-15',
      npiNumber: '1234567890',
      insuranceAccepted: ['Medicare', 'Medicaid', 'BlueCross BlueShield'],
      servicesOffered: ['Vaccinations', 'Delivery', 'Compounding'],
      pharmacyChain: 'CVS Health',
      managerName: 'John Doe',
      frequentlycontacted: true,
      starred: true,
      deleted: false,
    },
  ];

// Access the first item in the array
const samplePharmacy = pharmacyDetail[0];

const RequestWizard = () => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.itemReducer.items);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [searchTermPhysician, setSearchTermPhysician] = useState('');
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [physicianSuggestions, setPhysicianSuggestions] = useState([]);
  const [loadingPhysician, setLoadingPhysician] = useState(false);

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

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm) {
      const results = itemsData.filter(item => {
        const genericName = item.GenericName ? item.GenericName.toLowerCase() : '';
        const brandName = item.BrandName ? item.BrandName.toLowerCase() : '';
        return (
          genericName.includes(searchTerm.toLowerCase()) ||
          brandName.includes(searchTerm.toLowerCase())
        );
      });
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, itemsData]);

  useEffect(() => {
    const fetchPhysicianSuggestions = async () => {
      if (searchTermPhysician.length < 2) {
        setPhysicianSuggestions([]);
        return;
      }
      setLoadingPhysician(true);
      try {
        const response = await axios.get('/api/', {
          params: {
            version: '2.1',
            last_name: searchTermPhysician,
            limit: 10,
          },
        });
        setPhysicianSuggestions(response.data.results || []);
      } catch (error) {
        console.error('Error fetching physician suggestions:', error);
      } finally {
        setLoadingPhysician(false);
      }
    };

    const debounceFetch = setTimeout(fetchPhysicianSuggestions, 300);
    return () => clearTimeout(debounceFetch);
  }, [searchTermPhysician]);

  const handleChange2 = (event) => {
    setValues({ ...values, gender: event.target.value });
  };

   const handleChange3 = (event) => {
    setValues({ ...values, state: event.target.value });
  };

  const isStepOptional = (step) => step === 3;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm(item.GenericName || item.BrandName);
    setFilteredItems([]);
  };

  const handleSelectPhysician = (physician) => {
    setSelectedPhysician(physician);
    setSearchTermPhysician(`${physician.basic.last_name}`);
    setPhysicianSuggestions([]);
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            {/* Medicine Autosuggest Field */}
            <CustomFormLabel htmlFor="item">Medicine or Device</CustomFormLabel>
            <CustomTextField
              id="item"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredItems.length > 0 && (
              <List>
                {filteredItems.map((item) => (
                  <ListItem button key={item.Id} onClick={() => handleSelectItem(item)}>
                    <ListItemText primary={item.GenericName || item.BrandName} />
                  </ListItem>
                ))}
              </List>
            )}

            {/* Display Selected Item Details */}
            {selectedItem && (
              <>
                
                <Grid container>

                  <Grid item xs={12} lg={12} mt={4}>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      Item Info
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Generic Name
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.GenericName}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Brand Name(s)
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.BrandName}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Class
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.Class}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Use
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.Use}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Delivery Mechanism
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.DeliveryMechanism}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Schedule
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.Schedule}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Dosage
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.Dosage}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Side Effects
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.SideEffects}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Pregnancy Category
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedItem.PregnancyCategory}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}

           {/* Pharmacy Info */}
            
            <Grid container>
              <Grid item xs={12} lg={12} mt={4}>
                <Typography variant="h6" fontWeight="500" noWrap>
                  Pharmacy Info
                </Typography>
              </Grid>
             </Grid> 
              <Box mt={4} sx={{ ml: 2 }}>
                
                  <Typography variant="h6" mb={0.5}>
                    {samplePharmacy.pharmacyName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {samplePharmacy.address}
                  </Typography>
                
              </Box>
              <Grid container>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Pharmacy Chain
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {samplePharmacy.pharmacyChain}
                </Typography>
              </Grid>
              <Grid item lg={6} xs={12} mt={4}>
                <Typography variant="body2" color="text.secondary">
                  Pharmacy Type
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                  {samplePharmacy.pharmacyType}
                </Typography>
              </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.phone}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Fax
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.fax}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.email}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Website
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.website}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Manager Name
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.managerName}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Business Hours
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.businessHours}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        License Number
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.licenseNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        License Expiration
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.licenseExpiration}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        NPI Number
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.npiNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Insurance Accepted
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.insuranceAccepted}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Services Offered
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {samplePharmacy.servicesOffered}
                      </Typography>
                    </Grid>
              </Grid>
               
          </Box>
        );

      case 1:
        return (
          <Box>
            <CustomFormLabel htmlFor="physician">Physician Last Name</CustomFormLabel>
            <CustomTextField
              id="physician"
              variant="outlined"
              fullWidth
              value={searchTermPhysician}
              onChange={(e) => setSearchTermPhysician(e.target.value)}
            />
            {loadingPhysician && <CircularProgress />}
            <List>
              {physicianSuggestions.map((physician) => (
                <ListItem button key={physician.number} onClick={() => handleSelectPhysician(physician)}>
                  <ListItemText
                    primary={`${physician.basic.last_name} - ${physician.taxonomies[0]?.desc} - ${physician.addresses[0].city}, ${physician.addresses[0].state}`}
                  />
                </ListItem>
              ))}
            </List>

            {/* Display Selected Physician Details */}
            {selectedPhysician && (
              <>
                <Typography variant="h6" fontWeight="500" noWrap>
                  Physician Info
                </Typography>
                <Grid container>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Physician Name
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedPhysician.basic.first_name} {selectedPhysician.basic.last_name}
                    </Typography>
                  </Grid>
                  <Grid item lg={6} xs={12} mt={4}>
                    <Typography variant="body2" color="text.secondary">
                      Physician Address
                    </Typography>
                    <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                      {selectedPhysician.addresses[0].address_1}, {selectedPhysician.addresses[0].city}, {selectedPhysician.addresses[0].state}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        );

      case 2:
        return (
          <Box mt={3}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={12}>
                  <Typography variant="h6" fontWeight="500" noWrap>
                    Patient Info
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
              </Grid>  
          </Box>
        );

      case 3:
        return (
          <Box>
            <Grid spacing={3} container>
                <Grid item xs={12} lg={12}>
                  <Typography variant="h6" fontWeight="500" noWrap>
                    Additional Info
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <TextField
                    id="ecname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.ecname}
                    onChange={(e) => setValues({ ...values, ecname: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>Emergency Contact Relation</FormLabel>
                  <TextField
                    id="ecrelation"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.ecrelation}
                    onChange={(e) => setValues({ ...values, ecrelation: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FormLabel>Emergency Contact Phone</FormLabel>
                  <TextField
                    id="ecphone"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.ecphone}
                    onChange={(e) => setValues({ ...values, ecphone: e.target.value })}
                  />
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
              </Grid>
          </Box>
        );

      case 4:
        return (
          <Box pt={3}>
            <Typography variant="h5">Terms and condition</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Sard about this site or you have been to it, but you cannot figure out what it is or
              what it can do. MTA web directory isSard about this site or you have been to it, but
              you cannot figure out what it is or what it can do. MTA web directory is
            </Typography>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Agree with terms?"
            />
          </Box>
        );
      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageContainer>
      <Breadcrumb title="Request Wizard" description="this is Request Wizard page" />
      <ParentCard title='Request Wizard'>
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={2} mt={3}>
                <Alert severity='success' mt={2}>All steps completed - you&apos;re finished</Alert>
                <Box textAlign="right">
                  <Button onClick={handleReset} variant="contained" color="error">
                    Reset
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>
              <Box display="flex" flexDirection="row" mt={3}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box flex="1 1 auto" />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default RequestWizard;