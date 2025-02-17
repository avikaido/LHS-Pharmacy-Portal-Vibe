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
  Card,
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
import Logo from 'src/layouts/full/shared/logo/Logo';

const steps = ['Medicine Info', 'Physician Info', 'Patient Info', 'Finish'];

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
  const [physicianState, setPhysicianState] = useState('');

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
            state: physicianState,
            limit: 100,
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
  }, [searchTermPhysician, physicianState]);

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
            <Grid spacing={3} container>
            <Grid item xs={12} lg={12}>
            </Grid>
              <Grid item xs={12} lg={12}>
                  <Typography variant="primary">
                    Request a prescription from your healthcare provider on your behalf!
                  </Typography>
              </Grid>    
              <Grid item xs={12} lg={12}>
                  <Typography variant="primary">
                    The following questions are required for us to send the request.
                  </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>  
                  <Typography variant="primary">
                    (Don't worry, most doctors approve requests initiated through our prescription screening tool.)
                  </Typography>
              </Grid>
            </Grid>
            
            <Grid item xs={12} lg={12}> 
            {/* Medicine Autosuggest Field */}
            <CustomFormLabel htmlFor="item">Medicine or Device</CustomFormLabel>
            <CustomTextField
              id="item"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} lg={12}>
            {filteredItems.length > 0 && (
              <List>
                {filteredItems.map((item) => (
                  <ListItem button key={item.Id} onClick={() => handleSelectItem(item)}>
                    <ListItemText primary={`${item.GenericName} (${item.BrandName})`} />
                  </ListItem>
                ))}
              </List>
            )}
            </Grid>
            {/* Display Selected Item Details */}
            {selectedItem && (
              <>
                 
                 {/* ------------------------------------------- */}
                    {/* Disabled - Item Unfo - V1.0 */}
                    {/*

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
                </Grid> */}
                {/* ------------------------------------------- */}
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

              {/* ------------------------------------------- */}
                    {/* Disabled - Item Unfo - V1.0 */}
                    {/* 
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
               */}
                {/* ------------------------------------------- */}
          </Box>
        );
      
      case 1:
        return (
          <Box>

               

            {/* New State Dropdown Field */}
          <Grid spacing={3} container>

            <Grid item xs={12} lg={12}>
            </Grid>
              
            <Grid item xs={12} lg={12}>
              <Typography variant="primary">
                Search for your physician/provider by first selecting the state and then typing in their last name.
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomFormLabel htmlFor="physician-state">State</CustomFormLabel>
                <CustomSelect
                  id="physician-state"
                  fullWidth
                  variant="outlined"
                  value={physicianState}
                  onChange={(e) => setPhysicianState(e.target.value)}
                >
                  {states.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
            </Grid>
            <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="physician">Physician Last Name</CustomFormLabel>
                <CustomTextField
                  id="physician"
                  variant="outlined"
                  fullWidth
                  value={searchTermPhysician}
                  onChange={(e) => setSearchTermPhysician(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} lg={12}> 
                {loadingPhysician && <CircularProgress />}
                <List>
                  {physicianSuggestions.map((physician) => (
                    <ListItem button key={physician.number} onClick={() => handleSelectPhysician(physician)}>
                      <ListItemText
                        primary={`${physician.basic.last_name}, ${physician.basic.first_name} - ${physician.taxonomies[0]?.desc} - ${physician.addresses[0].city}, ${physician.addresses[0].state}`}
                      />
                    </ListItem>
                  ))}
                </List>
            </Grid> 
          </Grid>
            {/* Display Selected Physician Details */}
            {selectedPhysician && (
                <Grid spacing={3} container>
                  <Grid item xs={12} lg={12}>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      Physician Info
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormLabel>First Name</FormLabel>
                    <TextField
                      id="physician_firstname"
                      size="small"
                      variant="outlined"
                      fullWidth
                      required
                      value={selectedPhysician.basic.first_name}
                      onChange={(e) => setValues({ ...values, physician_firstname: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                      <FormLabel>Last Name</FormLabel>
                      <TextField
                        id="physician_lastname"
                        size="small"
                        variant="outlined"
                        fullWidth
                        required
                        value={selectedPhysician.basic.last_name}
                        onChange={(e) => setValues({ ...values, physician_lastname: e.target.value })}
                      />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormLabel>Phone</FormLabel>
                    <TextField
                      id="physician_phone"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={selectedPhysician.addresses[0].telephone_phone}
                      onChange={(e) => setValues({ ...values, physician_phone: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormLabel>Fax</FormLabel>
                    <TextField
                      id="physician_fax"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={selectedPhysician.addresses[0].fax_number}
                      onChange={(e) => setValues({ ...values, physician_fax: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormLabel>Address</FormLabel>
                    <TextField
                      id="physician_address"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={selectedPhysician.addresses[0].address_1}
                      onChange={(e) => setValues({ ...values, physician_address: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <FormLabel>Address 2</FormLabel>
                    <TextField
                      id="physician_address2"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={selectedPhysician.addresses[0].address_2}
                      onChange={(e) => setValues({ ...values, physician_address2: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <FormLabel>City</FormLabel>
                    <TextField
                      id="physician_city"
                      size="small"
                      variant="outlined"
                      fullWidth
                      required
                      value={selectedPhysician.addresses[0].city}
                      onChange={(e) => setValues({ ...values, physician_city: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <FormLabel>State</FormLabel>
                    <CustomSelect
                      id="physician_state"
                      value={selectedPhysician.addresses[0].state}
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
                      id="physician_zipcode"
                      size="small"
                      variant="outlined"
                      fullWidth
                      value={selectedPhysician.addresses[0].postal_code}
                      onChange={(e) => setValues({ ...values, physician_zipcode: e.target.value })}
                    />
                  </Grid>
                </Grid>
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
              </Grid>  
          </Box>
        );

      case 3:
        return (
          <Box pt={3}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500">Terms and Conditions</Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography variant="primary" sx={{ mt: 1 }}>
                  By clicking “Finish” below, I hereby provide my express written consent authorizing AskYoutPrimary.com <u>to run a health insurance eligibility check and to request a prescription from my treating healthcare professional for the medicine or device I specificied</u>. I further am providing such consent for AskYoutPrimary.com to contact me at the telephone number I entered above concerning my request, including text messages and telephone calls from humans. I understand that I am not required to provide my consent as a condition to purchase any products or services and that this offer does not qualify me for any prize or reward. Message and data rates may apply. Message frequency varies. Click <a href="#">HERE</a> for our Privacy Policy. Click <a href="#">HERE</a> for our Terms and Conditions.
                </Typography>
              </Grid>  
              <Grid item xs={12} lg={12}>
               <FormControlLabel
                  control={<CustomCheckbox />}
                  label="Agree with terms?"
                />
              </Grid>
            </Grid>     
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
    <PageContainer title="Request Wizard" description="this is Request Wizard page">
      {/* ------------------------------------------- */}
      {/* Disabled - Breadcrumb and left menu - V1.0 */}
      {/* <Breadcrumb title="Request Wizard" description="this is Request Wizard page" />
      <ParentCard title='Request Wizard'> */}
      {/* ------------------------------------------- */}
      {/* ------------------------------------------- */}
      {/* Replace - Box - V1.0 */}
      {/* <Box width="100%"> */}
      {/* ------------------------------------------- */}
        <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
      {/* ------------------------------------------- */}
      {/* Added - Grid and Card - V1.0 */}
          <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            xl={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '90%' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {/* End Added */}
              {/* ------------------------------------------- */}  
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
        {/* Added - Grid and Card Closing - V1.0 */}
          </Card>
          </Grid>
        </Grid>
        {/* End Added */}
        {/* ------------------------------------------- */}  
        </Box>
      {/* ------------------------------------------- */}
      {/* Disabled - left menu - V1.0 */}  
      {/* </ParentCard> */}
      {/* ------------------------------------------- */}
    </PageContainer>
  );
};

export default RequestWizard;