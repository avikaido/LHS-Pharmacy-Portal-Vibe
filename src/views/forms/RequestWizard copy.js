import React, {useEffect} from 'react';
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
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../components/forms/theme-elements/CustomSelect';
import ParentCard from '../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import axios from 'axios';

const API_URL = '/api/data/item/ItemData';
//const API_URL = '/src/_mockApis/item/ItemData';
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

const item = [
    {
        "Id": 1,
        "GenericName": "Acetaminophen",
        "BrandName": "Tylenol",
        "Class": "Analgesic",
        "Use": "Pain relief, fever",
        "DeliveryMechanism": "Oral",
        "Schedule": "OTC",
        "Dosage": "500 mg, PRN",
        "SideEffects": "Nausea, rash",
        "PregnancyCategory": "B",
        "Label": "otc",
        "Date": "10-18-2024",
        "deleted": false
    },
  ];

// Access the first item in the array
  const sampleItem = item[0];

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

  const [gender, setGender] = React.useState('');

  const handleChange2 = (event) => {
    setGender(event.target.value);
  };


  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => step === 1;

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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [itemsData, setItemsData] = React.useState([]);

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await axios.get(API_URL);
        setItemsData(response.data);
      } catch (error) {
        console.error('Error fetching items data:', error);
      }
    };
    fetchItemsData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = itemsData.filter(item =>
        item.GenericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.BrandName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, itemsData]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setSearchTerm(item.GenericName || item.BrandName);
    setFilteredItems([]);
  };

  // eslint-disable-next-line consistent-return
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
                <Typography variant="h6" fontWeight="500" noWrap>
                  Item Info
                </Typography>
                <Grid container>
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
            <Typography variant="h6" fontWeight="500" noWrap>
              Pharmacy Info
            </Typography>
            <Box sx={{ ml: 2 }}>
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
            <CustomFormLabel htmlFor="Fname">First Name</CustomFormLabel>
            <CustomTextField
              id="Fname"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Lname">Last Name</CustomFormLabel>
            <CustomTextField
              id="Lname"
              type="text"
              variant="outlined"
              fullWidth
            />
            <CustomFormLabel htmlFor="Address">Address</CustomFormLabel>
            <CustomTextField
              id="Address"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
            />
          </Box>
        );

      case 2:
        return (
          <Box>

         
              <CustomFormLabel htmlFor="standard-select-gender">Select Gender</CustomFormLabel>
              <CustomSelect
                id="standard-select-gender"
                value={gender}
                onChange={handleChange2}
                fullWidth
                variant="outlined"
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>

              <CustomFormLabel htmlFor="firstname">First Name</CustomFormLabel>
              <CustomTextField id="firstname" variant="outlined" fullWidth />

              <CustomFormLabel htmlFor="middlename">Middle Name or Initial</CustomFormLabel>
              <CustomTextField id="middlename" variant="outlined" fullWidth />

              <CustomFormLabel htmlFor="lastname">Last Name</CustomFormLabel>
              <CustomTextField id="lastname" variant="outlined" fullWidth />

              <CustomFormLabel htmlFor="dob">Date of Birth</CustomFormLabel>

              <CustomTextField
                id="dob"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}

              />

          </Box>
        );
          
      case 3:
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
      <ParentCard title='Request Wizard' >
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
