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

const steps = ['Search Medication', 'Physician Info', 'Patient Info', 'Finish'];

// Mapping of conditions to commonly prescribed medications
const conditionToMedications = {
  'allergies': [
    { name: 'Allegra (Fexofenadine)', description: 'Antihistamine for seasonal allergies' },
    { name: 'Zyrtec (Cetirizine)', description: 'Antihistamine for allergic rhinitis' },
    { name: 'Singulair (Montelukast)', description: 'Leukotriene receptor antagonist for asthma and allergies' }
  ],
  'anxiety': [
    { name: 'Xanax (Alprazolam)', description: 'Benzodiazepine for anxiety disorders' },
    { name: 'Lexapro (Escitalopram)', description: 'SSRI for anxiety and depression' },
    { name: 'Buspar (Buspirone)', description: 'Anti-anxiety medication' }
  ],
  'arthritis': [
    { name: 'Celebrex (Celecoxib)', description: 'NSAID for arthritis pain' },
    { name: 'Methotrexate', description: 'DMARD for rheumatoid arthritis' },
    { name: 'Humira (Adalimumab)', description: 'Biologic for rheumatoid arthritis' }
  ],
  'asthma': [
    { name: 'Advair (Fluticasone/Salmeterol)', description: 'Combination inhaler for asthma' },
    { name: 'Symbicort (Budesonide/Formoterol)', description: 'Combination inhaler for asthma' },
    { name: 'Singulair (Montelukast)', description: 'Leukotriene receptor antagonist' }
  ],
  'back_pain': [
    { name: 'Flexeril (Cyclobenzaprine)', description: 'Muscle relaxant' },
    { name: 'Robaxin (Methocarbamol)', description: 'Muscle relaxant' },
    { name: 'Tramadol', description: 'Pain medication' }
  ],
  'depression': [
    { name: 'Zoloft (Sertraline)', description: 'SSRI for depression' },
    { name: 'Prozac (Fluoxetine)', description: 'SSRI for depression' },
    { name: 'Wellbutrin (Bupropion)', description: 'Atypical antidepressant' }
  ],
  'diabetes': [
    { name: 'Metformin', description: 'Oral diabetes medication' },
    { name: 'Glipizide', description: 'Sulfonylurea for diabetes' },
    { name: 'Januvia (Sitagliptin)', description: 'DPP-4 inhibitor for diabetes' }
  ],
  'high_blood_pressure': [
    { name: 'Lisinopril', description: 'ACE inhibitor' },
    { name: 'Amlodipine', description: 'Calcium channel blocker' },
    { name: 'Metoprolol', description: 'Beta blocker' }
  ],
  'high_cholesterol': [
    { name: 'Lipitor (Atorvastatin)', description: 'Statin for cholesterol' },
    { name: 'Crestor (Rosuvastatin)', description: 'Statin for cholesterol' },
    { name: 'Zetia (Ezetimibe)', description: 'Cholesterol absorption inhibitor' }
  ],
  'migraine': [
    { name: 'Imitrex (Sumatriptan)', description: 'Triptan for migraine' },
    { name: 'Maxalt (Rizatriptan)', description: 'Triptan for migraine' },
    { name: 'Topamax (Topiramate)', description: 'Preventive medication for migraines' }
  ]
};

const commonConditions = [
  { value: 'allergies', label: 'Allergies' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'arthritis', label: 'Arthritis' },
  { value: 'asthma', label: 'Asthma' },
  { value: 'back_pain', label: 'Back Pain' },
  { value: 'depression', label: 'Depression' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'high_blood_pressure', label: 'High Blood Pressure' },
  { value: 'high_cholesterol', label: 'High Cholesterol' },
  { value: 'migraine', label: 'Migraine' }
];

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

// Utility to format medication as Brand (Generic)
const formatMedName = (item) => `${item.BrandName} (${item.GenericName})`;

// Utility to deduplicate medications by Brand+Generic (order-insensitive)
const dedupeMeds = (meds) => {
  const seen = new Set();
  return meds.filter(med => {
    const generic = med.name?.split('(')[1]?.replace(')', '').trim().toLowerCase() || med.GenericName?.toLowerCase();
    const brand = med.name?.split('(')[0]?.trim().toLowerCase() || med.BrandName?.toLowerCase();
    // Create a key that is order-insensitive
    const key = [brand, generic].sort().join('|');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

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
  const [pharmacyDetails, setPharmacyDetails] = useState({
    id: '',
    name: '',
    address: ''
  });
  const [selectedCondition, setSelectedCondition] = useState('');
  const [conditionSearchTerm, setConditionSearchTerm] = useState('');
  const [filteredConditions, setFilteredConditions] = useState([]);
  const [showConditions, setShowConditions] = useState(false);
  const [recommendedMedications, setRecommendedMedications] = useState([]);
  const [searchTermPhysicianFirst, setSearchTermPhysicianFirst] = useState('');
  const [physicianForm, setPhysicianForm] = useState({
    lastName: '',
    firstName: '',
    fax: '',
    phone: '',
    npi: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    specialty: '',
  });
  const [llmPhysicianData, setLlmPhysicianData] = useState(null);
  const [llmLoadingPhysician, setLlmLoadingPhysician] = useState(false);
  const [llmPhysicianMessage, setLlmPhysicianMessage] = useState('');
  const [llmPhysicianDataUsed, setLlmPhysicianDataUsed] = useState(false);
  const [values, setValues] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    insurance1: '',
    insurance1id: '',
    insurance2: '',
    insurance2id: '',
    notes: '',
  });
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pharmacyID = urlParams.get('pharmacyID');
    const pharmacyName = urlParams.get('pharmacyName');
    const pharmacyAddress = urlParams.get('pharmacyAddress');

    if (pharmacyID && pharmacyName && pharmacyAddress) {
      setPharmacyDetails({
        id: pharmacyID,
        name: pharmacyName,
        address: pharmacyAddress
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = itemsData.filter(item => {
        const genericName = item.GenericName ? item.GenericName.toLowerCase() : '';
        const brandName = item.BrandName ? item.BrandName.toLowerCase() : '';
        const use = item.Use ? item.Use.toLowerCase() : '';
        const searchTermLower = searchTerm.toLowerCase();
        
        return (
          genericName.includes(searchTermLower) ||
          brandName.includes(searchTermLower) ||
          use.includes(searchTermLower)
        );
      });
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, itemsData]);

  useEffect(() => {
    if (conditionSearchTerm) {
      const results = commonConditions.filter(condition =>
        condition.label.toLowerCase().includes(conditionSearchTerm.toLowerCase())
      );
      setFilteredConditions(results);
    } else {
      setFilteredConditions(commonConditions);
    }
  }, [conditionSearchTerm]);

  useEffect(() => {
    const fetchPhysicianSuggestions = async () => {
      if (searchTermPhysician.length < 2) {
        setPhysicianSuggestions([]);
        return;
      }
      setLoadingPhysician(true);
      try {
        const response = await axios.get('/api/nhs/', {
          params: {
            version: '2.1',
            last_name: searchTermPhysician,
            first_name: searchTermPhysicianFirst,
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
  }, [searchTermPhysician, searchTermPhysicianFirst, physicianState]);

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
    // Store current state before going back
    const currentState = {
      selectedItem,
      selectedRecommendedMed,
      conversationHistory,
      llmResponse,
      followUpQuestion,
      isAnalyzing,
      conditionDescription,
      searchTerm
    };
    
    // Go back to previous step
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    // Restore state after going back
    setTimeout(() => {
      setSelectedItem(currentState.selectedItem);
      setSelectedRecommendedMed(currentState.selectedRecommendedMed);
      setConversationHistory(currentState.conversationHistory);
      setLlmResponse(currentState.llmResponse);
      setFollowUpQuestion(currentState.followUpQuestion);
      setIsAnalyzing(currentState.isAnalyzing);
      setConditionDescription(currentState.conditionDescription);
      setSearchTerm(currentState.searchTerm);
    }, 0);
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
    setFilteredItems([]);
    
    // Create a response object with the selected medication
    const directResponse = {
      diagnosis: `Based on your selection of ${item.BrandName} (${item.GenericName}), which is used for: ${item.Use}`,
      recommendedMedications: [{
        name: `${item.BrandName} (${item.GenericName})`,
        reason: item.Use
      }],
      considerations: 'Please consult with your healthcare provider to determine if this medication is appropriate for your specific situation.',
      needsMoreInfo: false
    };
    
    setLlmResponse(directResponse);
    setIsAnalyzing(false);
  };

  const handleSelectPhysician = (physician) => {
    setSelectedPhysician(physician);
    setSearchTermPhysician(physician.basic.last_name);
    setSearchTermPhysicianFirst(physician.basic.first_name);
    setPhysicianSuggestions([]);
    const newForm = {
      lastName: physician.basic.last_name || '',
      firstName: physician.basic.first_name || '',
      fax: (physician.addresses[0]?.fax_number || ''),
      phone: (physician.addresses[0]?.telephone_number || ''),
      npi: physician.number || '',
      address: (physician.addresses[0]?.address_1 || ''),
      city: (physician.addresses[0]?.city || ''),
      state: (physician.addresses[0]?.state || ''),
      zip: (physician.addresses[0]?.postal_code || ''),
      specialty: (physician.taxonomies[0]?.desc || ''),
    };
    setPhysicianForm(newForm);
    // Call LLM for more recent data
    fetchLlmPhysicianData({
      lastName: newForm.lastName,
      firstName: newForm.firstName,
      city: newForm.city,
      state: newForm.state,
      npi: newForm.npi,
    });
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition.value);
    setConditionSearchTerm(condition.label);
    setConditionDescription(condition.label);
    setShowConditions(false);
    
    // Set recommended medications based on the condition
    const medications = conditionToMedications[condition.value] || [];
    setRecommendedMedications(medications);
    
    // Create a response object similar to LLM response but with direct recommendations
    const directResponse = {
      diagnosis: `Based on your selection of ${condition.label}, here are the commonly prescribed medications:`,
      recommendedMedications: medications.map(med => ({
        name: med.name,
        reason: med.description
      })),
      considerations: 'Please consult with your healthcare provider to determine the most appropriate medication for your specific situation.',
      needsMoreInfo: false
    };
    
    setLlmResponse(directResponse);
    setIsAnalyzing(false);
    handleNext(); // Automatically proceed to the next step
  };

  const handleConditionSubmit = async () => {
    if (!conditionDescription.trim()) {
      return;
    }

    // Only use LLM if no direct item was selected
    if (!selectedItem) {
      setLoadingLlm(true);
      setIsAnalyzing(true);
      try {
        // First, find all relevant medications from our database
        const relevantMeds = itemsData.filter(item => {
          const searchTerms = conditionDescription.toLowerCase().split(' ');
          const itemText = `${item.GenericName} ${item.BrandName} ${item.Use}`.toLowerCase();
          return searchTerms.some(term => itemText.includes(term));
        });

        const response = await axios.post('/api/analyze-condition/analyze', {
          condition: conditionDescription,
          medications: relevantMeds.map(item => ({
            GenericName: item.GenericName,
            BrandName: item.BrandName,
            Use: item.Use,
            Class: item.Class,
            Schedule: item.Schedule
          })),
          conversationHistory: conversationHistory
        });

        const newResponse = response.data;
        console.log('LLM Response:', newResponse); // Debug log
        
        // Ensure we include all relevant medications from our database
        if (newResponse.recommendedMedications) {
          const allMeds = [...new Set([
            ...newResponse.recommendedMedications,
            ...relevantMeds.map(item => ({
              name: `${item.GenericName} (${item.BrandName})`,
              reason: item.Use
            }))
          ])];
          newResponse.recommendedMedications = allMeds;
        }
        
        setLlmResponse(newResponse);
        setConversationHistory(prev => [...prev, {
          user: conditionDescription,
          assistant: newResponse
        }]);

        // Always show the response first
        setIsAnalyzing(false);
        
        // Only proceed to next step if explicitly needed
        if (newResponse.needsMoreInfo) {
          setFollowUpQuestion(newResponse.followUpQuestion);
        } else if (newResponse.recommendedMedications && newResponse.recommendedMedications.length > 0) {
          // If we have recommendations, show them but don't auto-navigate
          setFollowUpQuestion('');
        }
      } catch (error) {
        console.error('Error analyzing condition:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || 
          'Failed to analyze condition. Please try again later.';
        alert(errorMessage);
        setIsAnalyzing(false);
      } finally {
        setLoadingLlm(false);
      }
    } else {
      // If we have direct recommendations, just proceed to next step
      handleNext();
    }
  };

  const handleFollowUpResponse = async () => {
    if (!userResponse.trim()) return;

    setLoadingLlm(true);
    try {
      const response = await axios.post('/api/analyze-condition/analyze', {
        condition: userResponse,
        medications: itemsData.map(item => ({
          GenericName: item.GenericName,
          BrandName: item.BrandName,
          Use: item.Use,
          Class: item.Class,
          Schedule: item.Schedule
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
    
    // Find the matching item in itemsData
    const genericName = medication.name.split('(')[1]?.replace(')', '').trim();
    const brandName = medication.name.split('(')[0].trim();
    
    const matchingItem = itemsData.find(item => 
      item.GenericName === genericName || 
      item.BrandName === brandName
    );
    
    if (matchingItem) {
      setSelectedItem(matchingItem);
      setFilteredItems([]); // Clear the dropdown immediately
    }
  };

  const handleResetMedication = () => {
    setSelectedItem(null);
    setSelectedRecommendedMed(null);
    setSearchTerm('');
    setLlmResponse(null);
    setConversationHistory([]);
    setFollowUpQuestion('');
    setConditionDescription('');
    setUserResponse('');
    setIsAnalyzing(false);
  };

  const renderPharmacyDetails = () => (
    <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
      <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
        Selected Pharmacy
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
        {pharmacyDetails.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
        {pharmacyDetails.address}
      </Typography>
    </Box>
  );

  const handleSteps = (step) => {
    switch (step) {
      case 0: // Search Medication
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Search by medication name (brand or generic) or by condition/symptom.
            </Typography>

            {/* Search Medication section - only show if no medication is selected */}
            {!selectedItem && !selectedRecommendedMed && (
              <Box mb={4}>
                <CustomFormLabel htmlFor="search">Search Medication or Condition</CustomFormLabel>
                <CustomTextField
                  id="search"
                  variant="outlined"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by medication name or condition..."
                />
                {filteredItems.length > 0 && (
                  <List 
                    sx={{ 
                      mt: 1, 
                      maxHeight: 300, 
                      overflow: 'auto', 
                      border: '1px solid #e0e0e0', 
                      borderRadius: 1,
                      position: 'relative',
                      zIndex: 1,
                      bgcolor: 'background.paper'
                    }}
                  >
                    {filteredItems.map((item) => (
                      <ListItem
                        key={item.Id}
                        button
                        onClick={() => handleSelectItem(item)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                            '& .MuiListItemText-primary': {
                              color: 'primary.main',
                            },
                            '& .MuiListItemText-secondary': {
                              color: 'primary.main',
                            }
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        <ListItemText
                          primary={`${item.BrandName} (${item.GenericName})`}
                          secondary={item.Use}
                          primaryTypographyProps={{
                            sx: { transition: 'color 0.2s ease-in-out' }
                          }}
                          secondaryTypographyProps={{
                            sx: { transition: 'color 0.2s ease-in-out' }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            )}

            {/* Selected Medication Display - shown for both direct selection and LLM selection */}
            {(selectedItem || selectedRecommendedMed) && (
              <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                  Selected Medication
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {selectedItem
                    ? formatMedName(selectedItem)
                    : selectedRecommendedMed.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
                  {selectedItem
                    ? selectedItem.Use
                    : (() => {
                        const genericName = selectedRecommendedMed.name.split('(')[1]?.replace(')', '').trim();
                        const brandName = selectedRecommendedMed.name.split('(')[0].trim();
                        const matchingItem = itemsData.find(item =>
                          item.GenericName === genericName ||
                          item.BrandName === brandName
                        );
                        return matchingItem ? matchingItem.Use : selectedRecommendedMed.reason;
                      })()}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleResetMedication}
                  sx={{ mt: 2 }}
                >
                  Start Over
                </Button>
              </Box>
            )}

            {/* Only show the condition input if no medication is selected */}
            {!selectedItem && !selectedRecommendedMed && (
              <>
                {/* Or Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                  <Typography sx={{ mx: 2, color: 'text.secondary' }}>
                    OR describe your condition in detail for a more thorough analysis
                  </Typography>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                </Box>

                {/* Condition input and conversation history */}
                {conversationHistory.length === 0 ? (
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
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleConditionSubmit}
                        disabled={!conditionDescription.trim() || loadingLlm}
                      >
                        {loadingLlm ? (
                          <Box display="flex" alignItems="center" gap={1}>
                            <CircularProgress size={20} color="inherit" />
                            <Typography>Analyzing...</Typography>
                          </Box>
                        ) : (
                          'Analyze Condition'
                        )}
                      </Button>
                    </Box>
                  </>
                ) : (
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
                        {dedupeMeds(exchange.assistant.recommendedMedications).map((med, idx) => {
                          // Find matching item in database to get the Use description
                          const genericName = med.name.split('(')[1]?.replace(')', '').trim();
                          const brandName = med.name.split('(')[0].trim();
                          const matchingItem = itemsData.find(item =>
                            item.GenericName === genericName ||
                            item.BrandName === brandName
                          );
                          return (
                            <ListItem
                              key={idx}
                              button
                              onClick={() => handleRecommendedMedClick(med)}
                              selected={selectedRecommendedMed?.name === med.name}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                  '& .MuiListItemText-primary': {
                                    color: 'primary.main',
                                  },
                                  '& .MuiListItemText-secondary': {
                                    color: 'primary.main',
                                  }
                                },
                                '&.Mui-selected': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                  '& .MuiListItemText-primary': {
                                    color: 'primary.main',
                                    fontWeight: 500,
                                  },
                                  '& .MuiListItemText-secondary': {
                                    color: 'primary.main',
                                  }
                                },
                                transition: 'all 0.2s ease-in-out',
                              }}
                            >
                              <ListItemText
                                primary={med.name}
                                secondary={matchingItem ? matchingItem.Use : med.reason}
                                primaryTypographyProps={{
                                  sx: { transition: 'color 0.2s ease-in-out' }
                                }}
                                secondaryTypographyProps={{
                                  sx: { transition: 'color 0.2s ease-in-out' }
                                }}
                              />
                            </ListItem>
                          );
                        })}
                      </Box>
                    ))}
                  </Box>
                )}
              </>
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
            {renderPharmacyDetails()}
          </Box>
        );

      case 1: // Physician Info
        return (
          <Box>
            <Grid spacing={3} container>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" fontWeight="500">
                  Search for your physician/provider by first selecting the state and then typing in their last and first name.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Fields marked with <Typography component="span" color="error" fontWeight={700}>*</Typography> are required.
                </Typography>
              </Grid>
              <Grid item xs={12} lg={4}>
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
              <Grid item xs={12} lg={4}>
                <CustomFormLabel htmlFor="physician-last">Physician Last Name</CustomFormLabel>
                <CustomTextField
                  id="physician-last"
                  variant="outlined"
                  fullWidth
                  value={searchTermPhysician}
                  onChange={(e) => setSearchTermPhysician(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <CustomFormLabel htmlFor="physician-first">Physician First Name</CustomFormLabel>
                <CustomTextField
                  id="physician-first"
                  variant="outlined"
                  fullWidth
                  value={searchTermPhysicianFirst}
                  onChange={(e) => setSearchTermPhysicianFirst(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={12}> 
                {loadingPhysician && <CircularProgress />}
                <List>
                  {physicianSuggestions.map((physician) => (
                    <ListItem
                      button
                      key={physician.number}
                      onClick={() => handleSelectPhysician(physician)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          '& .MuiListItemText-primary': {
                            color: 'primary.main',
                            fontWeight: 700,
                          },
                          '& .MuiListItemText-secondary': {
                            color: 'primary.main',
                          }
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                    >
                      <ListItemText
                        primary={`${physician.basic.last_name}, ${physician.basic.first_name} (${physician.addresses[0]?.city || ''})`}
                        secondary={physician.taxonomies[0]?.desc || ''}
                        primaryTypographyProps={{ sx: { fontWeight: 700, transition: 'color 0.2s' } }}
                        secondaryTypographyProps={{ sx: { transition: 'color 0.2s' } }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid> 
            </Grid>
            {/* Manual Physician Data Entry Form */}
            <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                Physician Information
              </Typography>
              {/* Show LLM message and button if better data is available */}
              {(() => {
                const changedFields = getLlmChangedFields(llmPhysicianData, physicianForm);
                if (llmLoadingPhysician) {
                  return <Typography color="primary" sx={{ mb: 2 }}>Checking for more recent data...</Typography>;
                }
                if (llmPhysicianDataUsed) {
                  return <Typography color="success.main" sx={{ mb: 2 }}>Physician information updated with more recent data.</Typography>;
                }
                if (llmPhysicianData) {
                  if (changedFields.length > 0) {
                    return (
                      <Box sx={{ mb: 2 }}>
                        <Typography color="primary" sx={{ mb: 1 }}>
                          More recent or additional data may be available for:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {changedFields.map(f => (
                            <li key={f.key}>
                              <Typography variant="body2">
                                <b>{f.label}:</b> <span style={{ textDecoration: 'line-through', color: '#888' }}>{physicianForm[f.key]}</span> → <span style={{ color: '#1976d2' }}>{llmPhysicianData[f.key]}</span>
                              </Typography>
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleUseLlmPhysicianData}
                          sx={{ mt: 1 }}
                        >
                          Use More Recent Data
                        </Button>
                      </Box>
                    );
                  } else {
                    return (
                      <Typography color="primary" sx={{ mb: 2 }}>
                        No new or more recent data found for this physician.
                      </Typography>
                    );
                  }
                }
                return null;
              })()}
              <Grid container spacing={1.5}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="physician-lastname">
                    Last Name <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    id="physician-lastname"
                    variant="outlined"
                    fullWidth
                    required
                    value={physicianForm.lastName}
                    onChange={e => setPhysicianForm({ ...physicianForm, lastName: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="physician-firstname">
                    First Name <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    id="physician-firstname"
                    variant="outlined"
                    fullWidth
                    required
                    value={physicianForm.firstName}
                    onChange={e => setPhysicianForm({ ...physicianForm, firstName: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="physician-fax">
                    Fax Number <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    id="physician-fax"
                    variant="outlined"
                    fullWidth
                    required
                    value={physicianForm.fax}
                    onChange={e => setPhysicianForm({ ...physicianForm, fax: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="physician-phone">Phone Number</CustomFormLabel>
                  <CustomTextField
                    id="physician-phone"
                    variant="outlined"
                    fullWidth
                    value={physicianForm.phone}
                    onChange={e => setPhysicianForm({ ...physicianForm, phone: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="physician-npi">NPI Number</CustomFormLabel>
                  <CustomTextField
                    id="physician-npi"
                    variant="outlined"
                    fullWidth
                    value={physicianForm.npi}
                    onChange={e => setPhysicianForm({ ...physicianForm, npi: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="physician-specialty">Specialty</CustomFormLabel>
                  <CustomTextField
                    id="physician-specialty"
                    variant="outlined"
                    fullWidth
                    value={physicianForm.specialty}
                    onChange={e => setPhysicianForm({ ...physicianForm, specialty: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={8}>
                  <CustomFormLabel htmlFor="physician-address">Address</CustomFormLabel>
                  <CustomTextField
                    id="physician-address"
                    variant="outlined"
                    fullWidth
                    value={physicianForm.address}
                    onChange={e => setPhysicianForm({ ...physicianForm, address: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="physician-city">City</CustomFormLabel>
                  <CustomTextField
                    id="physician-city"
                    variant="outlined"
                    fullWidth
                    value={physicianForm.city}
                    onChange={e => setPhysicianForm({ ...physicianForm, city: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="physician-state">State</CustomFormLabel>
                  <CustomSelect
                    value={physicianForm.state}
                    onChange={e => setPhysicianForm({ ...physicianForm, state: e.target.value })}
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
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="physician-zip">Zip Code</CustomFormLabel>
                  <CustomTextField
                    id="physician-zip"
                    variant="outlined"
                    fullWidth
                    value={physicianForm.zip}
                    onChange={e => setPhysicianForm({ ...physicianForm, zip: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleResetPhysician}
                    sx={{ mt: 2 }}
                  >
                    Start Over
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {renderPharmacyDetails()}
          </Box>
        );

      case 2: // Patient Info
        return (
          <Box mt={3}>
            <Box p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                Patient Information
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                Fields marked with <Typography component="span" color="error" fontWeight={700}>*</Typography> are required.
              </Typography>
              <Grid container spacing={1.5}>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel required htmlFor="firstname">
                    First Name <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="firstname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.firstname}
                    onChange={(e) => setValues({ ...values, firstname: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel htmlFor="middlename">Middle Name or Initial</CustomFormLabel>
                  <TextField
                    id="middlename"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.middlename}
                    onChange={(e) => setValues({ ...values, middlename: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel required htmlFor="lastname">
                    Last Name <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="lastname"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.lastname}
                    onChange={(e) => setValues({ ...values, lastname: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <TextField
                    id="email"
                    type="email"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="phone">
                    Phone <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="phone"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.phone}
                    onChange={(e) => setValues({ ...values, phone: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="dob">
                    Date of Birth <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="dob"
                    type="date"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.dob}
                    onChange={(e) => setValues({ ...values, dob: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="gender">
                    Gender <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
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
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="address">
                    Address <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="address"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.address}
                    onChange={(e) => setValues({ ...values, address: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="address2">Address 2</CustomFormLabel>
                  <TextField
                    id="address2"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.address2}
                    onChange={(e) => setValues({ ...values, address2: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel required htmlFor="city">
                    City <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="city"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.city}
                    onChange={(e) => setValues({ ...values, city: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <CustomFormLabel required htmlFor="state">
                    State <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
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
                <Grid item xs={12} md={4}>
                  <CustomFormLabel required htmlFor="zipcode">
                    Zip Code <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <TextField
                    id="zipcode"
                    size="small"
                    variant="outlined"
                    fullWidth
                    required
                    value={values.zipcode}
                    onChange={(e) => setValues({ ...values, zipcode: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="insurance1">Primary Insurance</CustomFormLabel>
                  <TextField
                    id="insurance1"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance1}
                    onChange={(e) => setValues({ ...values, insurance1: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="insurance1id">Primary Insurance Member ID</CustomFormLabel>
                  <TextField
                    id="insurance1id"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance1id}
                    onChange={(e) => setValues({ ...values, insurance1id: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="insurance2">Secondary Insurance</CustomFormLabel>
                  <TextField
                    id="insurance2"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance2}
                    onChange={(e) => setValues({ ...values, insurance2: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="insurance2id">Secondary Insurance Member ID</CustomFormLabel>
                  <TextField
                    id="insurance2id"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={values.insurance2id}
                    onChange={(e) => setValues({ ...values, insurance2id: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="notes">Notes</CustomFormLabel>
                  <TextField
                    id="notes"
                    size="small"
                    multiline
                    rows="4"
                    variant="outlined"
                    fullWidth
                    value={values.notes}
                    onChange={(e) => setValues({ ...values, notes: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
              </Grid>
            </Box>
            {renderPharmacyDetails()}
          </Box>
        );

      case 3: // Finish
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
                  control={<CustomCheckbox checked={termsChecked} onChange={e => setTermsChecked(e.target.checked)} />}
                  label="Agree with terms?"
                />
              </Grid>
            </Grid>     
            {renderPharmacyDetails()}
          </Box>
        );

      default:
        return null;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Add a useEffect to handle state restoration when going back
  useEffect(() => {
    if (activeStep === 0) {
      // When returning to step 1, ensure all state is properly restored
      if (selectedItem || selectedRecommendedMed) {
        const item = selectedItem || selectedRecommendedMed;
        setSearchTerm(item.GenericName || item.BrandName || item.name);
      }
    }
  }, [activeStep, selectedItem, selectedRecommendedMed]);

  // Add a function to reset all physician search and form fields
  const handleResetPhysician = () => {
    setSearchTermPhysician('');
    setSearchTermPhysicianFirst('');
    setPhysicianSuggestions([]);
    setSelectedPhysician(null);
    setPhysicianForm({
      lastName: '',
      firstName: '',
      fax: '',
      phone: '',
      npi: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      specialty: '',
    });
    setLlmPhysicianDataUsed(false);
  };

  // Utility to check if LLM data is more recent or different
  const isLlmDataBetter = (llmData, formData) => {
    if (!llmData) return false;
    // Prioritize fax, phone, address, npi, specialty
    return (
      (llmData.fax && llmData.fax !== formData.fax) ||
      (llmData.phone && llmData.phone !== formData.phone) ||
      (llmData.address && llmData.address !== formData.address) ||
      (llmData.npi && llmData.npi !== formData.npi) ||
      (llmData.specialty && llmData.specialty !== formData.specialty)
    );
  };

  // Utility to get changed fields between LLM and form data
  const getLlmChangedFields = (llmData, formData) => {
    if (!llmData) return [];
    const fields = [
      { key: 'fax', label: 'Fax Number' },
      { key: 'phone', label: 'Phone Number' },
      { key: 'npi', label: 'NPI Number' },
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'Zip Code' },
      { key: 'specialty', label: 'Specialty' },
    ];
    return fields.filter(f => llmData[f.key] && llmData[f.key] !== formData[f.key]);
  };

  // Function to call LLM for more recent physician data
  const fetchLlmPhysicianData = async (query) => {
    setLlmLoadingPhysician(true);
    setLlmPhysicianMessage('');
    setLlmPhysicianData(null);
    try {
      // Example: POST to /api/llm-physician-info with query object
      const response = await axios.post('/api/llm-physician-info', query);
      if (response.data && response.data.success && response.data.physician) {
        setLlmPhysicianData(response.data.physician);
        setLlmPhysicianMessage('More recent or additional data may be available.');
      } else {
        setLlmPhysicianMessage('No more recent data found.');
      }
    } catch (error) {
      setLlmPhysicianMessage('Could not retrieve more recent data.');
    } finally {
      setLlmLoadingPhysician(false);
    }
  };

  // Handler to use LLM data
  const handleUseLlmPhysicianData = () => {
    if (llmPhysicianData) {
      setPhysicianForm({
        lastName: llmPhysicianData.lastName || physicianForm.lastName,
        firstName: llmPhysicianData.firstName || physicianForm.firstName,
        fax: llmPhysicianData.fax || physicianForm.fax,
        phone: llmPhysicianData.phone || physicianForm.phone,
        npi: llmPhysicianData.npi || physicianForm.npi,
        address: llmPhysicianData.address || physicianForm.address,
        city: llmPhysicianData.city || physicianForm.city,
        state: llmPhysicianData.state || physicianForm.state,
        zip: llmPhysicianData.zip || physicianForm.zip,
        specialty: llmPhysicianData.specialty || physicianForm.specialty,
      });
      setLlmPhysicianDataUsed(true);
      setLlmPhysicianMessage('Physician information updated with more recent data.');
    }
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
              <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: 4, mt: 2 }}>
                <Logo />
              </Box>
              {/* End Added */}
              {/* ------------------------------------------- */}  
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
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
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color={activeStep === steps.length - 1 ? 'success' : 'secondary'}
                  disabled={
                    (activeStep === 1 && (!physicianForm.lastName.trim() || !physicianForm.firstName.trim() || !physicianForm.fax.trim())) ||
                    (activeStep === 2 && (!values.firstname.trim() || !values.lastname.trim() || !values.phone.trim() || !values.dob.trim() || !values.gender.trim() || !values.address.trim() || !values.city.trim() || !values.state.trim() || !values.zipcode.trim())) ||
                    (activeStep === 3 && !termsChecked) ||
                    (activeStep === 0 && !selectedItem && !selectedRecommendedMed)
                  }
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