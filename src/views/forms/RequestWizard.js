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

const steps = ['Describe Condition', 'Medicine Info', 'Physician Info', 'Patient Info', 'Finish'];

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
  const [conditionDescription, setConditionDescription] = useState('');
  const [llmResponse, setLlmResponse] = useState(null);
  const [loadingLlm, setLoadingLlm] = useState(false);
  const [selectedRecommendedMed, setSelectedRecommendedMed] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userResponse, setUserResponse] = useState('');

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
      const response = await axios.get('/api/nhs/', {  // Ensure it uses `/api/nhs/`
        params: {
          version: '2.1',
          last_name: searchTermPhysician,
          state: physicianState,
          limit: 100,
        },
      });

      if (response.data && response.data.results) {
        setPhysicianSuggestions(response.data.results);
      } else {
        setPhysicianSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching physician suggestions:', error.response?.data || error.message);
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

  const handleConditionSubmit = async () => {
    if (!conditionDescription.trim()) {
      return;
    }

    setLoadingLlm(true);
    setIsAnalyzing(true);
    try {
      const response = await axios.post('http://localhost:5002/api/analyze-condition/analyze', {
        condition: conditionDescription,
        medications: itemsData.map(item => ({
          name: item.BrandName || item.GenericName,
          description: item.Description || ''
        })),
        conversationHistory: conversationHistory
      });

      const newResponse = response.data;
      setLlmResponse(newResponse);
      
      // Add the new interaction to conversation history
      setConversationHistory(prev => [...prev, {
        user: conditionDescription,
        assistant: newResponse
      }]);

      // If the LLM needs more information, show the follow-up question
      if (newResponse.needsMoreInfo) {
        setFollowUpQuestion(newResponse.followUpQuestion);
      } else {
        setIsAnalyzing(false);
        handleNext();
      }
    } catch (error) {
      console.error('Error analyzing condition:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 
        'Failed to analyze condition. Please try again later.';
      alert(errorMessage);
    } finally {
      setLoadingLlm(false);
    }
  };

  const handleFollowUpResponse = async () => {
    if (!userResponse.trim()) return;

    setLoadingLlm(true);
    try {
      const response = await axios.post('http://localhost:5002/api/analyze-condition/analyze', {
        condition: userResponse,
        medications: itemsData.map(item => ({
          name: item.BrandName || item.GenericName,
          description: item.Description || ''
        })),
        conversationHistory: conversationHistory
      });

      const newResponse = response.data;
      setLlmResponse(newResponse);
      
      // Add the new interaction to conversation history
      setConversationHistory(prev => [...prev, {
        user: userResponse,
        assistant: newResponse
      }]);

      if (newResponse.needsMoreInfo) {
        setFollowUpQuestion(newResponse.followUpQuestion);
      } else {
        setIsAnalyzing(false);
        handleNext();
      }
      setUserResponse(''); // Clear the response input
    } catch (error) {
      console.error('Error processing follow-up:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 
        'Failed to process your response. Please try again later.';
      alert(errorMessage);
    } finally {
      setLoadingLlm(false);
    }
  };

  const handleRecommendedMedClick = (medication) => {
    setSelectedRecommendedMed(medication);
    // Extract the generic name from the medication name (format: "brand name (generic name)")
    const genericName = medication.name.split('(')[1]?.replace(')', '').trim();
    setSearchTerm(genericName || medication.name);
    
    // Find the matching item in itemsData
    const matchingItem = itemsData.find(item => 
      item.GenericName === genericName || 
      item.BrandName === medication.name.split('(')[0].trim()
    );
    
    if (matchingItem) {
      setSelectedItem(matchingItem);
      setFilteredItems([]); // Clear the dropdown immediately
    }
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0: // Describe Condition
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Optional: Describe Your Condition
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              This step is optional. You can skip it if you already know which medication you need or prefer not to share your condition details.
            </Typography>

            {/* Only show initial condition input if no conversation has started */}
            {conversationHistory.length === 0 && (
              <>
                <CustomFormLabel htmlFor="condition">Describe your condition or symptoms</CustomFormLabel>
                <CustomTextField
                  id="condition"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={conditionDescription}
                  onChange={(e) => setConditionDescription(e.target.value)}
                  placeholder="Please describe your condition, symptoms, and any relevant medical history..."
                />
                <Box mt={2} display="flex" gap={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConditionSubmit}
                    disabled={!conditionDescription.trim() || loadingLlm}
                  >
                    {loadingLlm ? <CircularProgress size={24} /> : 'Analyze Condition'}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleNext}
                  >
                    Skip This Step
                  </Button>
                </Box>
              </>
            )}

            {/* Show conversation history if there is any */}
            {conversationHistory.length > 0 && (
              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Conversation History
                </Typography>
                {conversationHistory.map((exchange, index) => (
                  <Box key={index} mb={2}>
                    <Typography variant="subtitle2" color="primary">
                      Your description:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {exchange.user}
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      Analysis:
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {exchange.assistant.diagnosis}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}

            {/* Show follow-up question if there is one */}
            {followUpQuestion && (
              <Box mt={4}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  To provide better recommendations, please answer:
                </Typography>
                <Typography variant="body1" paragraph>
                  {followUpQuestion}
                </Typography>
                <CustomTextField
                  multiline
                  rows={2}
                  variant="outlined"
                  fullWidth
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Type your response here..."
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFollowUpResponse}
                    disabled={!userResponse.trim() || loadingLlm}
                  >
                    {loadingLlm ? <CircularProgress size={24} /> : 'Submit Response'}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        );

      case 1: // Medicine Info
        return (
          <Box>
            {llmResponse && (
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Analysis Results
                </Typography>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Your Condition:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {llmResponse.originalCondition}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Potential Diagnosis:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {llmResponse.diagnosis}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Recommended Medications:
                  </Typography>
                  <List>
                    {llmResponse.recommendedMedications.map((med, index) => (
                      <ListItem 
                        key={index}
                        button
                        onClick={() => handleRecommendedMedClick(med)}
                        selected={selectedRecommendedMed?.name === med.name}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          }
                        }}
                      >
                        <ListItemText
                          primary={med.name}
                          secondary={med.reason}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Important Considerations:
                  </Typography>
                  <Typography variant="body1">
                    {llmResponse.considerations}
                  </Typography>
                </Card>
              </Box>
            )}
            <CustomFormLabel htmlFor="medicine">Search for Medicine</CustomFormLabel>
            <CustomTextField
              id="medicine"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by generic or brand name..."
            />
            {filteredItems.length > 0 && (
              <List sx={{ mt: 2, maxHeight: 300, overflow: 'auto' }}>
                {filteredItems.map((item) => (
                  <ListItem
                    key={item.id}
                    button
                    onClick={() => handleSelectItem(item)}
                    selected={selectedItem?.id === item.id}
                  >
                    <ListItemText
                      primary={item.BrandName || item.GenericName}
                      secondary={item.GenericName !== item.BrandName ? item.GenericName : ''}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        );

      case 2: // Physician Info
        return (
          <Box>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500">Search for your physician/provider by first selecting the state and then typing in their last name.</Typography>
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
          </Box>
        );

      case 3: // Patient Info
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

      case 4: // Finish
        return (
          <Box pt={3}>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500">Terms and Conditions</Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography variant="primary" sx={{ mt: 1 }}>
                  By clicking "Finish" below, I hereby provide my express written consent authorizing AskYoutPrimary.com <u>to run a health insurance eligibility check and to request a prescription from my treating healthcare professional for the medicine or device I specificied</u>. I further am providing such consent for AskYoutPrimary.com to contact me at the telephone number I entered above concerning my request, including text messages and telephone calls from humans. I understand that I am not required to provide my consent as a condition to purchase any products or services and that this offer does not qualify me for any prize or reward. Message and data rates may apply. Message frequency varies. Click <a href="#">HERE</a> for our Privacy Policy. Click <a href="#">HERE</a> for our Terms and Conditions.
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
        return null;
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
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (index === 0) {
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
                {activeStep === 0 ? (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                  >
                    Skip This Step
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                )}
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