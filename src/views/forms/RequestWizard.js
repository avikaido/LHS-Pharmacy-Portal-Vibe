import React, {useEffect, useState, useRef } from 'react';
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
import axios from '../../utils/axios';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { useParams } from 'react-router-dom';

const steps = ['Start Request', 'Doctor Info', 'Patient Info', 'Finish'];

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
const formatMedName = (item) => `${item.brand_name} (${item.generic_name})`;

// Add this near the top of the file with other constants
const stateAbbreviationToFull = {
  'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
  'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
  'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho',
  'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas',
  'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
  'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
  'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada',
  'NH': 'New Hampshire', 'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York',
  'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma',
  'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
  'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah',
  'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia',
  'WI': 'Wisconsin', 'WY': 'Wyoming'
};

// Add reverse mapping
const stateFullToAbbreviation = Object.entries(stateAbbreviationToFull).reduce((acc, [abbr, full]) => {
  acc[full] = abbr;
  return acc;
}, {});

// Helper to get the state label from value or full name
function getStateLabel(value) {
  // Try abbreviation first
  const found = states.find(s => s.value === value);
  if (found) return found.label;
  // Try full name
  const foundByLabel = states.find(s => s.label === value);
  if (foundByLabel) return foundByLabel.label;
  // Try mapping abbreviation to label
  if (stateAbbreviationToFull[value]) return stateAbbreviationToFull[value];
  // Fallback
  return value || '';
}

// Add a utility for title case
function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

// Add a utility to clean prefixes
const clean = str => str.replace(/^(generic:|brand:)/i, '').trim();

const RequestWizard = () => {
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => state.itemReducer.items);
  const { uuid } = useParams(); // Get UUID from URL parameters

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [medicationNotes, setMedicationNotes] = React.useState({});
  const [isAddingMedication, setIsAddingMedication] = React.useState(false); // New state for tracking if adding more medications
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
  const [requestIds, setRequestIds] = useState([]); // Store the created request IDs for each item
  const [userInteractionData, setUserInteractionData] = useState({
    pageLoadTime: new Date().toISOString(),
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    referrer: document.referrer || 'direct',
    sessionStartTime: new Date().toISOString()
  });
  const [loadingPharmacy, setLoadingPharmacy] = useState(false); // Loading state for pharmacy details
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
  const [changedFields, setChangedFields] = useState([]);
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
  });
  const [termsChecked, setTermsChecked] = useState(false);
  const [physicianSearchLocked, setPhysicianSearchLocked] = useState(false);
  // Store mappedMedicareData in state when Medicare data is received
  const [medicareDataForUpdate, setMedicareDataForUpdate] = useState(null);
  const [llmSuggestionKey, setLlmSuggestionKey] = useState(0);
  // Add state for final physician data that will be used for database storage
  const [finalPhysicianData, setFinalPhysicianData] = useState(null);
  const lastNameInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    console.log('UUID from URL params:', uuid);
    // If UUID is provided in URL, fetch pharmacy details from backend
    if (uuid) {
      const fetchPharmacyDetails = async () => {
        try {
          setLoadingPharmacy(true);
          console.log('Fetching pharmacy details for UUID:', uuid);
          const response = await axios.get(`/api/pharmacies/uuid/${uuid}`);
          console.log('Pharmacy API response:', response.data);
          if (response.data.success && response.data.data) {
            const pharmacy = response.data.data;
            console.log('Setting pharmacy details:', pharmacy);
            const newPharmacyDetails = {
              id: pharmacy.id,
              name: pharmacy.pharmacy_name,
              address: pharmacy.address
            };
            console.log('Setting pharmacy details:', newPharmacyDetails);
            setPharmacyDetails(newPharmacyDetails);
          }
        } catch (error) {
          console.error('Error fetching pharmacy details:', error);
          // Fallback to query parameters if UUID fetch fails
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
        } finally {
          setLoadingPharmacy(false);
        }
      };
      
      fetchPharmacyDetails();
    } else {
      // Fallback to query parameters if no UUID
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
    }
  }, [uuid]);

  // Format LLM conversation data for storage
  const formatLLMConversation = (conversationHistory, llmResponse, conditionDescription, followUpQuestion, userResponse) => {
    if (!conversationHistory.length && !llmResponse) {
      return null; // No LLM interaction
    }
    
    return {
      conversation_history: conversationHistory,
      final_llm_response: llmResponse,
      condition_description: conditionDescription,
      follow_up_question: followUpQuestion,
      user_response: userResponse,
      conversation_timestamp: new Date().toISOString(),
      total_messages: conversationHistory.length + (llmResponse ? 1 : 0),
      conversation_summary: `LLM-assisted medication selection. Condition: ${conditionDescription || 'Not specified'}. ${conversationHistory.length} conversation turns.`
    };
  };

  // Generate a human-readable conversation transcript for doctors
  const generateConversationTranscript = (llmConversationData) => {
    if (!llmConversationData) {
      return null;
    }
    
    let transcript = `AI-ASSISTED MEDICATION SELECTION CONVERSATION\n`;
    transcript += `=============================================\n\n`;
    transcript += `Date: ${new Date(llmConversationData.conversation_timestamp).toLocaleString()}\n`;
    transcript += `Condition: ${llmConversationData.condition_description || 'Not specified'}\n`;
    transcript += `Total conversation turns: ${llmConversationData.total_messages}\n\n`;
    
    // Add conversation history
    if (llmConversationData.conversation_history && llmConversationData.conversation_history.length > 0) {
      transcript += `CONVERSATION HISTORY:\n`;
      transcript += `-------------------\n`;
      llmConversationData.conversation_history.forEach((message, index) => {
        transcript += `${index + 1}. ${message.role === 'user' ? 'Patient' : 'AI Assistant'}: ${message.content}\n\n`;
      });
    }
    
    // Add final LLM response if different from conversation history
    if (llmConversationData.final_llm_response && !llmConversationData.conversation_history.some(msg => msg.content === llmConversationData.final_llm_response)) {
      transcript += `FINAL AI RECOMMENDATION:\n`;
      transcript += `----------------------\n`;
      transcript += `${llmConversationData.final_llm_response}\n\n`;
    }
    
    // Add follow-up question and user response if present
    if (llmConversationData.follow_up_question) {
      transcript += `FOLLOW-UP QUESTION:\n`;
      transcript += `------------------\n`;
      transcript += `${llmConversationData.follow_up_question}\n\n`;
    }
    
    if (llmConversationData.user_response) {
      transcript += `PATIENT RESPONSE:\n`;
      transcript += `----------------\n`;
      transcript += `${llmConversationData.user_response}\n\n`;
    }
    
    transcript += `=============================================\n`;
    transcript += `This conversation was conducted through our AI-assisted medication selection system.\n`;
    transcript += `The patient selected the recommended medication based on this conversation.\n`;
    
    return transcript;
  };

  // Delete orphaned requests (requests for items that were removed)
  const cleanupOrphanedRequests = async (currentRequestIds, currentSelectedItems) => {
    // If we have more request IDs than selected items, some requests are orphaned
    if (currentRequestIds.length > currentSelectedItems.length) {
      const orphanedRequestIds = currentRequestIds.slice(currentSelectedItems.length);
      console.log('Cleaning up orphaned requests:', orphanedRequestIds);
      
      for (const requestId of orphanedRequestIds) {
        try {
          await axios.delete(`/api/requests/${requestId}`);
          console.log(`Deleted orphaned request: ${requestId}`);
        } catch (error) {
          console.error(`Error deleting orphaned request ${requestId}:`, error);
        }
      }
    }
  };

  // Create separate requests for each selected item when user moves to next step
  const createRequests = async () => {
    if (pharmacyDetails.id && selectedItems.length > 0) {
      try {
        console.log('Creating requests for pharmacy ID:', pharmacyDetails.id);
        console.log('Current requestIds:', requestIds);
        console.log('Current selectedItems:', selectedItems);
        
        const newRequestIds = [];
        
        // Create requests for all selected items that don't already have requests
        for (let i = 0; i < selectedItems.length; i++) {
          // Check if this item already has a request
          if (requestIds[i]) {
            console.log(`Item ${i} (${selectedItems[i].brand_name}) already has request ID: ${requestIds[i]}`);
            newRequestIds.push(requestIds[i]); // Keep the existing request ID
            continue;
          }
          
          const item = selectedItems[i];
          const itemNote = medicationNotes[i] || ''; // Get item-specific notes
          
          // Check if this item was selected through LLM assistance
          const wasLLMSelected = conversationHistory.length > 0 || llmResponse;
          const llmConversationData = wasLLMSelected ? 
            formatLLMConversation(conversationHistory, llmResponse, conditionDescription, followUpQuestion, userResponse) : 
            null;
          
          const requestData = {
            pharmacy_id: pharmacyDetails.id,
            patient_id: null, // Will be updated when patient info is provided
            physician_id: null, // Will be updated when physician info is provided
            item_id: item.id, // Reference the item ID from items table
            status: 'draft',
            notes: itemNote || `Request for ${item.brand_name} (${item.generic_name})`,
            // Additional administrative data
            visibility: 'public',
            version: 1,
            requested_date: new Date().toISOString(),
            llm_conversation: llmConversationData,
            change_log: `Request created via wizard for item: ${item.brand_name} (${item.generic_name}). ${wasLLMSelected ? 'LLM-assisted selection.' : 'Direct selection.'} Source: UUID-based QR code link. User agent: ${userInteractionData.userAgent}. Screen: ${userInteractionData.screenResolution}. Timezone: ${userInteractionData.timezone}. Language: ${userInteractionData.language}. Referrer: ${userInteractionData.referrer}. Session start: ${userInteractionData.sessionStartTime}. Timestamp: ${new Date().toISOString()}`
          };
          
          console.log(`Creating request for item ${i + 1} (${item.brand_name}):`, requestData);
          const response = await axios.post('/api/requests', requestData);
          
          if (response.data && response.data.id) {
            newRequestIds.push(response.data.id);
            console.log(`Created request with ID: ${response.data.id} for ${item.brand_name}`);
          }
        }
        
        setRequestIds(newRequestIds);
        console.log('All requests (existing + new):', newRequestIds);
        
      } catch (error) {
        console.error('Error creating requests:', error);
      }
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const results = itemsData.filter(item => {
        // First check if this medication is already selected
        const isAlreadySelected = selectedItems.some(selectedItem => 
          selectedItem.generic_name === item.generic_name || 
          selectedItem.brand_name === item.brand_name
        );
        if (isAlreadySelected) return false;

        const genericName = item.generic_name ? item.generic_name.toLowerCase() : '';
        const brandName = item.brand_name ? item.brand_name.toLowerCase() : '';
        const use = item.use_description ? item.use_description.toLowerCase() : '';
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
  }, [searchTerm, itemsData, selectedItems]); // Added selectedItems to dependencies

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
    if (physicianSearchLocked) return;
    if (searchTermPhysician.length < 2) {
      setPhysicianSuggestions([]);
      return;
    }

    const debounceFetch = setTimeout(async () => {
      setLoadingPhysician(true);
      try {
        // Important: use absolute URL so it goes through Vite proxy (`/api/nhs`) on the same origin
        const url = `${window.location.origin}/api/nhs/`;
        const response = await axios.get(url, {
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
        setPhysicianSuggestions([]);
      } finally {
        setLoadingPhysician(false);
      }
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchTermPhysician, searchTermPhysicianFirst, physicianState, physicianSearchLocked]);

  const handleChange2 = (event) => {
    setValues({ ...values, gender: event.target.value });
  };

   const handleChange3 = (event) => {
    setValues({ ...values, state: event.target.value });
  };

  const isStepOptional = (step) => step === 3;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // If moving from step 0 (item selection) to step 1 (doctor info), validate and create requests
    if (activeStep === 0) {
      if (selectedItems.length === 0) {
        alert('Please select at least one medication or DME device before proceeding.');
        return;
      }
      await createRequests();
    }
    // If moving away from step 1 (doctor info), persist physician selection across all requests
    if (activeStep === 1) {
      await savePhysicianSelectionIfPresent();
    }
    // If moving away from step 2 (patient info), persist patient info across all requests
    if (activeStep === 2) {
      await savePatientInfoIfPresent();
    }

    // Additional validation: if we're on any step and have no items, go back to step 0
    if (selectedItems.length === 0 && activeStep > 0) {
      alert('No medications selected. Returning to medication selection.');
      setActiveStep(0);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = async () => {
    // Store current state before going back
    const currentState = {
      selectedItems,
      conversationHistory,
      llmResponse,
      followUpQuestion,
      isAnalyzing,
      conditionDescription,
      searchTerm
    };
    // If leaving doctor step backwards, persist selection as well
    if (activeStep === 1) {
      await savePhysicianSelectionIfPresent();
    }
    // If leaving patient step backwards, persist patient as well
    if (activeStep === 2) {
      await savePatientInfoIfPresent();
    }

    // Go back to previous step
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    // Restore state after going back
    setTimeout(() => {
      setSelectedItems(currentState.selectedItems);
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
    setSelectedItems(prev => [...prev, item]);
    setFilteredItems([]);
    setSearchTerm('');
    setIsAddingMedication(false);
    setLlmResponse(null);
    setConversationHistory([]);
    setFollowUpQuestion('');
    setConditionDescription('');
    setUserResponse('');
    setIsAnalyzing(false);
    
    // Initialize empty notes for the new item
    const newItemIndex = selectedItems.length;
    setMedicationNotes(prev => ({
      ...prev,
      [newItemIndex]: ''
    }));
  };

  const handleSelectPhysician = async (physician) => {
    setSelectedPhysician(null);
    setPhysicianSuggestions([]);
    setPhysicianSearchLocked(true);
    setSearchTermPhysician(physician.basic.last_name);
    setSearchTermPhysicianFirst(physician.basic.first_name);
    
    // Create initial form from NPI data
    const initialForm = {
      lastName: toTitleCase(physician.basic.last_name || ''),
      firstName: toTitleCase(physician.basic.first_name || ''),
      fax: (physician.addresses[0]?.fax_number || ''),
      phone: (physician.addresses[0]?.telephone_number || ''),
      npi: physician.number || '',
      address: (physician.addresses[0]?.address_1 || ''),
      city: toTitleCase(physician.addresses[0]?.city || ''),
      state: stateAbbreviationToFull[physician.addresses[0]?.state] || physician.addresses[0]?.state || '',
      zip: (physician.addresses[0]?.postal_code || ''),
      specialty: (physician.taxonomies[0]?.desc || ''),
    };
    
    setPhysicianForm(initialForm);
    
    // Try to fetch Medicare data and automatically use it if available
    try {
      const medicareData = await fetchMedicareDataForPhysician(physician.number);
      if (medicareData && hasValidMedicareData(medicareData)) {
        // Merge Medicare data with NPI data, prioritizing Medicare
        const mergedData = mergePhysicianData(initialForm, medicareData);
        setPhysicianForm(mergedData);
        
        // Prepare final data for database storage
        const finalData = preparePhysicianDataForDatabase(mergedData, medicareData);
        setFinalPhysicianData(finalData);
      } else {
        // Use NPI data only
        const finalData = preparePhysicianDataForDatabase(initialForm, null);
        setFinalPhysicianData(finalData);
      }
    } catch (error) {
      console.error('Error fetching Medicare data:', error);
      // Fallback to NPI data only
      const finalData = preparePhysicianDataForDatabase(initialForm, null);
      setFinalPhysicianData(finalData);
    }
  };

  // Normalize ZIP to either 5 or 9-digit with optional dash (##### or #####-####)
  const normalizeZip = (zip) => {
    if (!zip) return undefined;
    const digits = String(zip).replace(/\D/g, '');
    if (digits.length >= 9) return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
    if (digits.length >= 5) return digits.slice(0, 5);
    return undefined;
  };

  // Map form/final physician data to backend payload (snake_case)
  const mapPhysicianToPayload = (data) => {
    if (!data) return null;
    const lastName = toTitleCase(data.lastName || data.last_name || '');
    const firstName = toTitleCase(data.firstName || data.first_name || '');
    const city = toTitleCase(data.city || '');
    const stateAbbr = stateFullToAbbreviation[data.state] || (data.state ? data.state.toUpperCase() : '');
    return {
      first_name: firstName || undefined,
      last_name: lastName || undefined,
      phone: data.phone || undefined,
      fax: data.fax || undefined,
      email: data.email || undefined,
      website: data.website || undefined,
      address: data.address || undefined,
      address2: data.address2 || undefined,
      city: city || undefined,
      state: stateAbbr || undefined,
      zipcode: normalizeZip(data.zip || data.zipcode),
      country: data.country || undefined,
      npi_number: data.npi || data.npi_number || undefined,
      dea_number: data.dea_number || undefined,
      license_number: data.license_number || undefined,
      specialty: data.specialty || undefined,
      practice_name: data.practice_name || undefined,
      practice_phone: data.practice_phone || undefined,
      practice_fax: data.practice_fax || undefined,
      notes: data.notes || undefined,
    };
  };

  // Normalize patient zip as well
  const normalizePatientZip = (zip) => {
    if (!zip) return undefined;
    const digits = String(zip).replace(/\D/g, '');
    if (digits.length >= 9) return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
    if (digits.length >= 5) return digits.slice(0, 5);
    return undefined;
  };

  // Create or find patient by email; return id
  const upsertPatientAndGetId = async () => {
    const email = (values.email || '').trim();
    const firstName = values.firstname?.trim();
    const lastName = values.lastname?.trim();
    if (!email || !firstName || !lastName) return null; // require minimal fields

    // 1) Try existing by email
    try {
      const res = await axios.get(`/api/patients/by-email/${encodeURIComponent(email)}`);
      if (res?.data?.data?.id) return res.data.data.id;
    } catch (_) {
      // not found is fine
    }

    // 2) Create new patient record
    try {
      const safeMiddleInitial = (values.middlename || '').trim().charAt(0) || null;
      const safePhone = (values.phone || '').trim() || 'unknown';
      const safeAddress = (values.address || '').trim() || 'Unknown';
      const safeCity = (values.city || '').trim() || 'Unknown';
      const safeState = stateFullToAbbreviation[values.state] || (values.state ? values.state : 'NA');
      const safeZip = normalizePatientZip(values.zipcode) || '00000';
      const safeDob = values.dob || '1970-01-01';
      const safeGender = values.gender || 'other';
      const safeIns1 = values.insurance1 || 'unknown';
      const safeIns1Id = values.insurance1id || 'unknown';
      const payload = {
        first_name: firstName,
        middle_initial: safeMiddleInitial,
        last_name: lastName,
        phone: safePhone,
        email,
        address: safeAddress,
        address2: values.address2?.trim() || null,
        city: safeCity,
        state: safeState,
        zipcode: safeZip,
        notes: null,
        dob: safeDob,
        gender: safeGender,
        insurance1: safeIns1,
        insurance1_id: safeIns1Id,
        insurance2: values.insurance2 || null,
        insurance2_id: values.insurance2id || null,
      };
      const createRes = await axios.post('/api/patients', payload);
      return createRes?.data?.id || null;
    } catch (err) {
      console.error('Error creating patient:', err);
      return null;
    }
  };

  // Persist patient selection across all requests when leaving patient step (step 2)
  const savePatientInfoIfPresent = async () => {
    if (!requestIds?.length) return;
    const patientId = await upsertPatientAndGetId();
    if (!patientId) return;
    const changeLog = `Patient attached via wizard: ${values.lastname}, ${values.firstname}. Timestamp: ${new Date().toISOString()}`;
    try {
      await Promise.all(
        requestIds.map((id) =>
          axios.put(`/api/requests/${id}`, {
            patient_id: patientId,
            change_log: changeLog,
          })
        )
      );
    } catch (err) {
      console.error('Error updating requests with patient:', err);
    }
  };

  // Try to find existing physician by NPI or by name/city/state
  const findExistingPhysicianId = async (payload) => {
    try {
      const query = payload?.npi_number || `${payload?.last_name || ''} ${payload?.first_name || ''} ${payload?.city || ''} ${payload?.state || ''}`.trim();
      if (!query) return null;
      const res = await axios.get('/api/physicians', { params: { search: query, limit: 10, offset: 0 } });
      const list = res?.data?.data || [];
      if (payload?.npi_number) {
        const byNpi = list.find((p) => p.npi_number === payload.npi_number);
        if (byNpi?.id) return byNpi.id;
      }
      const match = list.find((p) =>
        p.last_name?.toLowerCase() === (payload?.last_name || '').toLowerCase() &&
        p.first_name?.toLowerCase() === (payload?.first_name || '').toLowerCase() &&
        (!payload?.city || p.city?.toLowerCase() === (payload.city || '').toLowerCase()) &&
        (!payload?.state || p.state === payload.state)
      );
      return match?.id || null;
    } catch (err) {
      console.error('Error searching physicians:', err);
      return null;
    }
  };

  // Determine request/physician statuses based on data completeness
  const determineStatuses = (data) => {
    const hasFax = !!(data?.fax && String(data.fax).trim());
    const hasNpi = !!(data?.npi || data?.npi_number);
    const requestStatus = hasFax ? 'doctor_selected' : (hasNpi ? 'doctor_missing_fax' : 'doctor_missing_info');
    const physicianStatus = hasFax ? 'active' : (hasNpi ? 'needs_fax' : 'missing_info');
    return { requestStatus, physicianStatus };
  };

  // Create or reuse physician and return id
  const upsertPhysicianAndGetId = async (sourceData) => {
    const payload = mapPhysicianToPayload(sourceData);
    if (!payload?.first_name || !payload?.last_name) return null;
    const { physicianStatus } = determineStatuses(sourceData);
    const existingId = await findExistingPhysicianId(payload);
    if (existingId) return existingId;
    try {
      const res = await axios.post('/api/physicians', { ...payload, status: physicianStatus });
      return res?.data?.data?.id || res?.data?.id || null;
    } catch (err) {
      console.error('Error creating physician:', err);
      return null;
    }
  };

  // Save physician selection across all requests when navigating away from step 1
  const savePhysicianSelectionIfPresent = async () => {
    // Prefer enriched finalPhysicianData; fall back to manual form
    const data = finalPhysicianData || physicianForm;
    const hasMinimum = !!(data?.lastName && data?.firstName);
    if (!hasMinimum || !requestIds?.length) return; // nothing to save

    const physicianId = await upsertPhysicianAndGetId(data);
    if (!physicianId) return;

    const { requestStatus } = determineStatuses(data);
    const changeLog = `Physician set via wizard: ${toTitleCase(data.lastName)}, ${toTitleCase(data.firstName)}${data.npi ? ` (NPI ${data.npi})` : ''}. Status: ${requestStatus}. Timestamp: ${new Date().toISOString()}`;

    try {
      await Promise.all(
        requestIds.map((id) =>
          axios.put(`/api/requests/${id}`, {
            physician_id: physicianId,
            status: requestStatus,
            change_log: changeLog,
          })
        )
      );
      // Optionally: future event for physician attached can be emitted server-side when we update status
    } catch (err) {
      console.error('Error updating requests with physician:', err);
    }
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

    // If in add medication mode, always run LLM
    if (!isAddingMedication && selectedItems.length) {
      // If not adding, and already have a medication, just proceed
      handleNext();
      return;
    }

    setLoadingLlm(true);
    setIsAnalyzing(true);
    try {
      // First, find all relevant medications from our database
      const relevantMeds = itemsData.filter(item => {
        // Check if this medication is already selected
        const isAlreadySelected = selectedItems.some(selectedItem => 
          selectedItem.generic_name === item.generic_name || 
          selectedItem.brand_name === item.brand_name
        );
        if (isAlreadySelected) return false;

        const searchTerms = conditionDescription.toLowerCase().split(' ');
        const itemText = `${item.generic_name} ${item.brand_name} ${item.use_description}`.toLowerCase();
        return searchTerms.some(term => itemText.includes(term));
      });

      const response = await axios.post('/api/analyze-condition/analyze', {
        condition: conditionDescription,
        medications: relevantMeds.map(item => ({
          GenericName: item.generic_name,
          BrandName: item.brand_name,
          Use: item.use_description,
          Class: item.class,
          Schedule: item.schedule
        })),
        conversationHistory: conversationHistory
      });

      const newResponse = response.data;
      console.log('LLM Response:', newResponse); // Debug log
      
      // Ensure we include all relevant medications from our database
      if (newResponse.recommendedMedications) {
        // Filter out any medications that are already selected
        const allMeds = [...new Set([
          ...newResponse.recommendedMedications.filter(med => {
            const medGeneric = med.name?.split('(')[1]?.replace(')', '').trim().toLowerCase();
            const medBrand = med.name?.split('(')[0]?.trim().toLowerCase();
            return !selectedItems.some(selectedItem => 
                      selectedItem.generic_name?.toLowerCase() === medGeneric ||
        selectedItem.brand_name?.toLowerCase() === medBrand
            );
          }),
          ...relevantMeds.map(item => ({
            name: `${item.generic_name} (${item.brand_name})`,
            reason: item.use_description
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
  };

  const handleFollowUpResponse = async () => {
    if (!userResponse.trim()) return;

    setLoadingLlm(true);
    try {
      const response = await axios.post('/api/analyze-condition/analyze', {
        condition: userResponse,
        medications: itemsData.map(item => ({
          GenericName: item.generic_name,
          BrandName: item.brand_name,
          Use: item.use_description,
          Class: item.class,
          Schedule: item.schedule
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
    const medName = medication.name || medication.medication;
    console.log('LLM Clicked:', medName, medication);
    if (!medName || typeof medName !== 'string' || !medName.includes('(')) return;
    const [first, second] = medName.split('(');
    const part1 = clean(first?.trim().toLowerCase());
    const part2 = clean(second?.replace(')', '').trim().toLowerCase());
    const matchingItem = itemsData.find(item => {
              const brand = item.brand_name?.trim().toLowerCase();
        const generic = item.generic_name?.trim().toLowerCase();
        return (
          (brand === part1 && generic === part2) ||
          (brand === part2 && generic === part1)
        );
    });
    console.log('Matching item:', matchingItem);
    if (matchingItem) {
      setSelectedItems(prev => [...prev, matchingItem]);
      setLlmSuggestionKey(prev => prev + 1); // force re-render of suggestions
    }
    // Only reset LLM state if NOT in add medication mode
    if (!isAddingMedication) {
      setLlmResponse(null);
      setConversationHistory([]);
      setFollowUpQuestion('');
      setConditionDescription('');
      setUserResponse('');
      setIsAnalyzing(false);
    }
  };

  const handleResetMedication = () => {
    setSelectedItems([]);
    setMedicationNotes({});
    setSearchTerm('');
    setLlmResponse(null);
    setConversationHistory([]);
    setFollowUpQuestion('');
    setConditionDescription('');
    setUserResponse('');
    setIsAnalyzing(false);
    setIsAddingMedication(false);
  };

  const handleAddMedication = () => {
    setIsAddingMedication(true);
    setSearchTerm('');
    setFilteredItems([]);
    setLlmResponse(null);
    setConversationHistory([]);
    setFollowUpQuestion('');
    setConditionDescription('');
    setUserResponse('');
    setIsAnalyzing(false);
  };

  const handleRemoveMedication = (index) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    
    // Reindex the notes after removing an item
    setMedicationNotes(prev => {
      const newNotes = {};
      let newIndex = 0;
      for (let i = 0; i < selectedItems.length; i++) {
        if (i !== index) {
          newNotes[newIndex] = prev[i] || '';
          newIndex++;
        }
      }
      return newNotes;
    });
    
    // If we have requests and we're removing an item, we need to handle the request IDs
    if (requestIds.length > 0) {
      const removedRequestId = requestIds[index];
      
      // Remove the request ID for the removed item
      setRequestIds(prev => prev.filter((_, i) => i !== index));
      
      // Delete the request from the database
      if (removedRequestId) {
        const deleteRequest = async () => {
          try {
            await axios.delete(`/api/requests/${removedRequestId}`);
            console.log(`Deleted request ${removedRequestId} for removed item`);
          } catch (error) {
            console.error(`Error deleting request ${removedRequestId}:`, error);
          }
        };
        deleteRequest();
      }
      
      // If we're on step 1 or later and now have no items, we should go back to step 0
      if (activeStep > 0 && selectedItems.length === 1) { // 1 because we haven't updated selectedItems yet
        setActiveStep(0);
      }
    }
  };

  const handleMedicationNoteChange = (index, note) => {
    setMedicationNotes(prev => ({
      ...prev,
      [index]: note
    }));
    
    // If this item already has a request, update it with the new note
    if (requestIds[index]) {
      const updateRequest = async () => {
        try {
          const item = selectedItems[index];
          await axios.put(`/api/requests/${requestIds[index]}`, {
            notes: note || `Request for ${item.brand_name} (${item.generic_name})`,
            change_log: `Notes updated via wizard for ${item.brand_name} (${item.generic_name})`
          });
        } catch (error) {
          console.error('Error updating request notes:', error);
        }
      };
      updateRequest();
    }
  };

  const renderPharmacyDetails = () => (
    <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
      <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
        Selected Location
      </Typography>
      {loadingPharmacy ? (
        <Box display="flex" alignItems="center" gap={1}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Loading pharmacy details...
          </Typography>
        </Box>
      ) : (
        <>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
            {pharmacyDetails.name || 'No pharmacy selected'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0 }}>
            {pharmacyDetails.address || 'Please select a pharmacy'}
          </Typography>
        </>
      )}
    </Box>
  );

  const handleSteps = (step) => {
    switch (step) {
      case 0: // Search Medication
        return (
          <Box>
            <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography sx={{ color: 'text.secondary' }}>
                    Already know what you need? Just type the name of your medication, condition, or DME device in the search box below:
            </Typography>
            </Box>
            {/* Show both forms if adding medication or if no medications selected */}
            {(!selectedItems.length || isAddingMedication) && (
              <>
                {/* Filterable Search Form */}
                <Box mb={4}>
                  <CustomFormLabel htmlFor="search">Search by Medication, Condition, or DME</CustomFormLabel>
                  <CustomTextField
                    id="search"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Example: 'Nexium', 'Acetaminophen', 'Wheelchair'"
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
                            primary={`${item.brand_name} (${item.generic_name})`}
                            secondary={item.use_description}
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

                {/* OR Divider restored */}
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                  <Typography sx={{ mx: 2, color: 'text.secondary' }}>
                    OR
                  </Typography>
                  <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                </Box>
                <Box sx={{ textAlign: 'left', mb: 3 }}>
                  <Typography sx={{ color: 'text.secondary' }}>
                    If you're not sure which product you need, our smart AI tool can assist. Just describe your condition or need in the search bar below:
                  </Typography>
                </Box>

                {/* LLM Condition/Symptom Form */}
                <Box mb={4}>
                  <CustomFormLabel htmlFor="condition">Describe your condition or symptoms</CustomFormLabel>
                  <CustomTextField
                    id="condition"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={conditionDescription}
                    onChange={(e) => setConditionDescription(e.target.value)}
                    placeholder="Example: 'I have a pain in my lower back', 'My chest is tight', 'I have a rash on my skin'"
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
                </Box>

                {/* LLM Conversation History and Suggestions */}
                {conversationHistory.length > 0 && (
                  <Box mt={4} key={llmSuggestionKey}>
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
                          // Defensive: support both med.name and med.medication
                          const medName = med.name || med.medication;
                          if (!medName || typeof medName !== 'string' || !medName.includes('(')) return null;
                          // Find matching item in database to get the Use description
                          const genericName = medName.split('(')[1]?.replace(')', '').trim();
                          const brandName = medName.split('(')[0].trim();
                          const matchingItem = itemsData.find(item =>
                            item.generic_name === genericName ||
                            item.brand_name === brandName
                          );
                          return (
                            <ListItem
                              key={idx}
                              button
                              onClick={() => handleRecommendedMedClick({ ...med, name: medName })}
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
                                primary={medName}
                                secondary={matchingItem ? matchingItem.use_description : med.reason}
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
              </>
            )}

            {/* Selected Medications Display */}
            {selectedItems.length > 0 && (
              <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                  Selected Medications
                </Typography>
                {selectedItems.map((item, index) => (
                  <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formatMedName(item)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.use_description}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRemoveMedication(index)}
                sx={{ ml: 2, flexShrink: 0 }}
              >
                Remove
              </Button>
            </Box>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Specify strength or manufacturer"
              value={medicationNotes[index] || ''}
              onChange={(e) => handleMedicationNoteChange(index, e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                }
              }}
            />
                  </Box>
                ))}
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddMedication}
                  >
                    Add Medication
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleResetMedication}
                  >
                    Start Over
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
                  Search for your doctor/provider by first selecting the state and then typing in their last and first name.
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
                <CustomFormLabel htmlFor="physician-last">Doctor Last Name</CustomFormLabel>
                <CustomTextField
                  id="physician-last"
                  variant="outlined"
                  fullWidth
                  value={searchTermPhysician}
                  onChange={(e) => {
                    setPhysicianSearchLocked(false);
                    setSearchTermPhysician(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <CustomFormLabel htmlFor="physician-first">Doctor First Name</CustomFormLabel>
                <CustomTextField
                  id="physician-first"
                  variant="outlined"
                  fullWidth
                  value={searchTermPhysicianFirst}
                  onChange={(e) => {
                    setPhysicianSearchLocked(false);
                    setSearchTermPhysicianFirst(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}> 
                {loadingPhysician && <CircularProgress />}
                {physicianSuggestions.length > 0 && (
                  <List>
                    {/* Can't Find My Physician option */}
                    <ListItem
                      key="cant-find-doctor"
                      button
                      onClick={handleCantFindPhysician}
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
                        primary={<span style={{ fontWeight: 700 }}>Can't Find My Doctor</span>}
                        secondary={<span>I will enter my doctor manually</span>}
                        primaryTypographyProps={{ sx: { fontWeight: 700, transition: 'color 0.2s' } }}
                        secondaryTypographyProps={{ sx: { transition: 'color 0.2s' } }}
                      />
                    </ListItem>
                    {/* Actual search results */}
                    {physicianSuggestions.map((physician, idx) => (
                      <ListItem
                        button
                        key={physician.number || `${physician.basic?.last_name}-${physician.basic?.first_name}-${idx}`}
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
                )}
              </Grid> 
            </Grid>
            {/* Manual Physician Data Entry Form - Only show first name, last name, city, state */}
            <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                Doctor Information
              </Typography>
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
                    inputRef={lastNameInputRef}
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
                  <CustomFormLabel required htmlFor="physician-city">
                    City <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <CustomTextField
                    id="physician-city"
                    variant="outlined"
                    fullWidth
                    required
                    value={physicianForm.city}
                    onChange={e => setPhysicianForm({ ...physicianForm, city: e.target.value })}
                    sx={{ mb: 0 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel required htmlFor="physician-state">
                    State <Typography component="span" color="error" fontWeight={700}>*</Typography>
                  </CustomFormLabel>
                  <CustomSelect
                    id="physician-state"
                    value={stateFullToAbbreviation[physicianForm.state] || ''}
                    onChange={e => {
                      const abbr = e.target.value;
                      const fullName = stateAbbreviationToFull[abbr] || abbr;
                      setPhysicianForm({ ...physicianForm, state: fullName });
                    }}
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
              </Grid>
            </Box>
            {renderSelectedMedications()}
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

              </Grid>
            </Box>
            {renderSelectedMedications()}
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
    // Reset all state variables to their initial values
    setActiveStep(0);
    setSkipped(new Set());
    setSearchTerm('');
    setFilteredItems([]);
    setSelectedItems([]);
    setMedicationNotes({});
    setIsAddingMedication(false);
    setSearchTermPhysician('');
    setSelectedPhysician(null);
    setPhysicianSuggestions([]);
    setLoadingPhysician(false);
    setPhysicianState('');
    setConditionDescription('');
    setLlmResponse(null);
    setLoadingLlm(false);
    setSelectedRecommendedMed(null);
    setConversationHistory([]);
    setFollowUpQuestion('');
    setIsAnalyzing(false);
    setUserResponse('');
    setSelectedCondition('');
    setConditionSearchTerm('');
    setFilteredConditions([]);
    setShowConditions(false);
    setRecommendedMedications([]);
    setSearchTermPhysicianFirst('');
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
    setLlmPhysicianData(null);
    setLlmLoadingPhysician(false);
    setLlmPhysicianMessage('');
    setLlmPhysicianDataUsed(false);
    setChangedFields([]);
    setValues({
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
    });
    setTermsChecked(false);
    setPhysicianSearchLocked(false);
    setMedicareDataForUpdate(null);
    setLlmSuggestionKey(0);
    setFinalPhysicianData(null);
  };

  // Add a useEffect to handle state restoration when going back
  useEffect(() => {
    if (activeStep === 0) {
      // When returning to step 1, ensure all state is properly restored
      if (selectedItems.length) {
        const items = selectedItems;
        setSearchTerm(items[0].generic_name || items[0].brand_name || items[0].name);
      }
    }
  }, [activeStep, selectedItems]);

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
      { key: 'address', label: 'Address' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'Zip Code' },
      { key: 'specialty', label: 'Specialty' },
    ];
    return fields.filter(f => {
      // Only show fields that have data and meet minimum confidence threshold
      const confidence = llmData.dataQuality?.fieldConfidence?.[f.key] || 0;
      return llmData[f.key] && llmData[f.key] !== formData[f.key] && confidence >= 70;
    });
  };

  // Function to call LLM for more recent physician data
  const fetchLlmPhysicianData = async (query, currentForm = physicianForm) => {
    setLlmLoadingPhysician(true);
    setLlmPhysicianMessage('Searching the Medicare Database for updated contact information...');
    setLlmPhysicianData(null);
    setChangedFields([]);
    try {
      console.log('🔍 Fetching physician data for:', query);
      const response = await axios.post('/api/physician-info', { npi: query.npi });
      console.log('📥 Received response:', response.data);
      
      if (response.data && response.data.success && response.data.physician) {
        // Defensive logging for debugging
        console.log('Full API response:', response);
        console.log('response.data:', response.data);
        console.log('response.data.physician:', response.data.physician);
        
        // Handle possible nested structure
        let medicareData = response.data.physician;
        if (medicareData && medicareData.data) {
          medicareData = medicareData.data;
          console.log('Using nested medicareData:', medicareData);
        } else {
          console.log('Using flat medicareData:', medicareData);
        }
        // Map backend Medicare data fields to frontend keys (use camelCase keys as returned by backend)
        const mappedMedicareData = {
          fax: medicareData.fax || '',
          phone: medicareData.phone || '',
          address: medicareData.address || '',
          city: medicareData.city || '',
          state: medicareData.state || '',
          zip: medicareData.zip || '',
          specialty: medicareData.specialty || ''
        };
        console.log('Mapped Medicare data:', mappedMedicareData);

        // Compare Medicare data with current form data using mapped keys
        const fields = [
          { key: 'fax', label: 'Fax Number', medicareValue: mappedMedicareData.fax },
          { key: 'phone', label: 'Phone Number', medicareValue: mappedMedicareData.phone },
          { key: 'address', label: 'Address', medicareValue: mappedMedicareData.address },
          { key: 'city', label: 'City', medicareValue: mappedMedicareData.city },
          { key: 'state', label: 'State', medicareValue: mappedMedicareData.state },
          { key: 'zip', label: 'Zip Code', medicareValue: mappedMedicareData.zip },
          { key: 'specialty', label: 'Specialty', medicareValue: mappedMedicareData.specialty }
        ];

        // Check if we have any non-empty Medicare data
        const hasMedicareData = fields.some(field => {
          const value = field.medicareValue;
          return value && value.trim() !== '' && value !== null && value !== undefined;
        });

        if (!hasMedicareData) {
          setLlmPhysicianMessage('Most recent contact information available.');
          return;
        }

        // Compare each field and only add to changedFields if there's a meaningful difference
        const newChangedFields = [];
        fields.forEach(field => {
          let medicareValue = field.medicareValue?.trim() || '';
          let currentValue = (currentForm[field.key] || '').trim();
          
          // Debug log for comparison
          console.log(`Comparing field: ${field.key}, medicareValue: "${medicareValue}", currentValue: "${currentValue}"`);
          
          // Skip if both values are empty
          if (!medicareValue && !currentValue) {
            return;
          }

          // Special handling for state field
          if (field.key === 'state') {
            const medicareLabel = getStateLabel(medicareValue);
            const currentLabel = getStateLabel(currentValue);

            if (medicareLabel && currentLabel && medicareLabel !== currentLabel) {
              newChangedFields.push({
                key: field.key,
                label: field.label,
                currentValue: currentLabel || '(empty)',
                medicareValue: medicareLabel
              });
            } else if (medicareLabel && !currentLabel) {
              newChangedFields.push({
                key: field.key,
                label: field.label,
                currentValue: '(empty)',
                medicareValue: medicareLabel
              });
            }
            return;
          }
          
          // For phone numbers, normalize the format
          if (field.key === 'phone') {
            const normalizePhone = (phone) => {
              return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            };
            medicareValue = normalizePhone(medicareValue);
            currentValue = normalizePhone(currentValue);
          }
          
          // For zip codes, ensure consistent format
          if (field.key === 'zip') {
            medicareValue = medicareValue.replace(/\D/g, '');
            currentValue = currentValue.replace(/\D/g, '');
          }
          
          // Only show update if Medicare has a non-empty value and it's different from the form
          if (medicareValue && medicareValue !== currentValue) {
            newChangedFields.push({
              key: field.key,
              label: field.label,
              currentValue: currentValue || '(empty)',
              medicareValue: medicareValue
            });
          }
        });

        console.log('Changed fields:', newChangedFields);
        setChangedFields(newChangedFields);

        if (newChangedFields.length > 0) {
          // Format the Medicare data for display
          const formattedMedicareData = {
            ...medicareData,
            fax: medicareData.fax || '',
            phone: medicareData.phone || '',
            address: medicareData.address || '',
            zip: medicareData.zip || '',
            specialty: medicareData.specialty || '',
            dataQuality: {
              overallConfidence: 100,
              sources: ['Medicare Physician Compare'],
              lastVerified: new Date().toISOString().split('T')[0],
              fieldConfidence: {
                fax: medicareData.fax ? 100 : 0,
                phone: medicareData.phone ? 100 : 0,
                address: medicareData.address ? 100 : 0,
                npi: 100,
                specialty: medicareData.specialty ? 100 : 0
              }
            }
          };

          setLlmPhysicianData(formattedMedicareData);
          setLlmPhysicianMessage('Updated Medicare data available for this physician.');
          setMedicareDataForUpdate(mappedMedicareData); // <-- FIXED: use mappedMedicareData
        } else {
          setLlmPhysicianMessage('Most recent contact information available.');
        }
      } else {
        setLlmPhysicianMessage('Most recent contact information available.');
      }
    } catch (error) {
      console.error('❌ Error fetching physician data:', error);
      setLlmPhysicianMessage('Most recent contact information available.');
    } finally {
      setLlmLoadingPhysician(false);
    }
  };

  // Handler to use LLM data
  const handleUseLlmPhysicianData = () => {
    if (medicareDataForUpdate) {
      const updatedForm = { ...physicianForm };
      console.log('changedFields:', changedFields);
      changedFields.forEach(field => {
        const formKey = field.key;
        const medicareValue = medicareDataForUpdate[formKey];
        console.log('Field key:', formKey, 'Medicare value:', medicareValue);
        if (formKey && typeof medicareValue !== 'undefined' && medicareValue !== null && medicareValue !== '') {
          if (formKey === 'state') {
            updatedForm[formKey] = stateAbbreviationToFull[medicareValue] || medicareValue;
          } else {
            updatedForm[formKey] = medicareValue;
          }
          console.log('Updating field:', formKey, 'with value:', medicareValue);
        }
      });
      setPhysicianForm({ ...updatedForm });
      setLlmPhysicianDataUsed(true);
      setLlmPhysicianMessage('Physician information updated with verified data.');
      setChangedFields([]);
    }
  };

  // Update dedupeMeds to use clean()
  const dedupeMeds = (meds) => {
    const seen = new Set();
    return meds.filter(med => {
      const medName = med.name || med.medication;
      if (!medName || typeof medName !== 'string' || !medName.includes('(')) return false;
      const [first, second] = medName.split('(');
      const part1 = clean(first?.trim().toLowerCase());
      const part2 = clean(second?.replace(')', '').trim().toLowerCase());
      // Check if this medication is already selected (either direction)
      const isAlreadySelected = selectedItems.some(selectedItem => {
        const brand = selectedItem.brand_name?.trim().toLowerCase();
        const generic = selectedItem.generic_name?.trim().toLowerCase();
        return (
          (brand === part1 && generic === part2) ||
          (brand === part2 && generic === part1)
        );
      });
      if (isAlreadySelected) return false;
      // Deduplicate by name
      const key = [part1, part2].sort().join('|');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  // Move this block so it appears above renderPharmacyDetails in steps 1 and 2 as well
  const renderSelectedMedications = () => (
    selectedItems.length > 0 && (
      <Box mt={4} p={2} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1 }}>
        <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
          Selected Medications
        </Typography>
        {selectedItems.map((item, index) => (
          <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {formatMedName(item)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.use_description}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRemoveMedication(index)}
                sx={{ ml: 2, flexShrink: 0 }}
              >
                Remove
              </Button>
            </Box>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Specify strength or manufacturer"
              value={medicationNotes[index] || ''}
              onChange={(e) => handleMedicationNoteChange(index, e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                }
              }}
            />
          </Box>
        ))}
      </Box>
    )
  );

  // Helper function to fetch Medicare data for a physician
  const fetchMedicareDataForPhysician = async (npi) => {
    try {
      const response = await axios.post('/api/physician-info', { npi });
      if (response.data && response.data.success && response.data.physician) {
        let medicareData = response.data.physician;
        if (medicareData && medicareData.data) {
          medicareData = medicareData.data;
        }
        return medicareData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Medicare data:', error);
      return null;
    }
  };

  // Helper function to check if Medicare data is valid and has useful information
  const hasValidMedicareData = (medicareData) => {
    if (!medicareData) return false;
    
    // Check if we have any non-empty fields that would be useful
    const usefulFields = ['fax', 'phone', 'address', 'city', 'state', 'zip', 'specialty'];
    return usefulFields.some(field => {
      const value = medicareData[field];
      return value && value.trim() !== '' && value !== null && value !== undefined;
    });
  };

  // Helper function to merge NPI data with Medicare data, prioritizing Medicare
  const mergePhysicianData = (npiData, medicareData) => {
    if (!medicareData) return npiData;
    
    const merged = { ...npiData };
    
    // Map Medicare fields to form fields and merge
    const fieldMappings = [
      { medicare: 'fax', form: 'fax' },
      { medicare: 'phone', form: 'phone' },
      { medicare: 'address', form: 'address' },
      { medicare: 'city', form: 'city' },
      { medicare: 'state', form: 'state' },
      { medicare: 'zip', form: 'zip' },
      { medicare: 'specialty', form: 'specialty' }
    ];
    
    fieldMappings.forEach(mapping => {
      const medicareValue = medicareData[mapping.medicare];
      if (medicareValue && medicareValue.trim() !== '') {
        if (mapping.form === 'state') {
          // Convert state abbreviation to full name if needed
          merged[mapping.form] = stateAbbreviationToFull[medicareValue] || medicareValue;
        } else {
          merged[mapping.form] = medicareValue.trim();
        }
      }
    });
    
    return merged;
  };

  // Helper function to prepare physician data for database storage
  const preparePhysicianDataForDatabase = (formData, medicareData) => {
    const databaseData = {
      // Basic information
      npi: formData.npi,
      lastName: formData.lastName,
      firstName: formData.firstName,
      
      // Contact information
      fax: formData.fax,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      specialty: formData.specialty,
      
      // Data source tracking
      dataSource: medicareData ? 'medicare_enhanced' : 'npi_only',
      medicareDataAvailable: !!medicareData,
      lastUpdated: new Date().toISOString(),
      
      // Medicare-specific data if available
      medicareData: medicareData ? {
        originalMedicareData: medicareData,
        dataQuality: {
          overallConfidence: 100,
          sources: ['Medicare Physician Compare'],
          lastVerified: new Date().toISOString().split('T')[0],
          fieldConfidence: {
            fax: medicareData.fax ? 100 : 0,
            phone: medicareData.phone ? 100 : 0,
            address: medicareData.address ? 100 : 0,
            npi: 100,
            specialty: medicareData.specialty ? 100 : 0
          }
        }
      } : null
    };
    
    return databaseData;
  };

  // Function to get the final physician data for database submission
  const getFinalPhysicianData = () => {
    return finalPhysicianData;
  };

  // Function to get all form data ready for database submission
  const getFormDataForSubmission = () => {
    return {
      medications: selectedItems.map((item, index) => ({
        genericName: item.generic_name,
        brandName: item.brand_name,
        use: item.use_description,
        class: item.class,
        schedule: item.schedule,
        notes: medicationNotes[index] || ''
      })),
      physician: finalPhysicianData,
      patient: values,
      pharmacy: pharmacyDetails,
      submissionDate: new Date().toISOString(),
      formVersion: '1.0'
    };
  };

  const handleCantFindPhysician = () => {
    setPhysicianSuggestions([]); // Hide dropdown
    setTimeout(() => {
      if (lastNameInputRef.current) {
        lastNameInputRef.current.focus();
      }
    }, 100);
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
          <Stepper 
            activeStep={activeStep} 
            sx={{ 
              mb: 4,
              '& .MuiStepIcon-root': {
                color: '#90caf9', // More visible light blue for incomplete steps
                '&.Mui-active': {
                  color: '#4caf50', // Green for current step
                },
                '&.Mui-completed': {
                  color: '#4caf50', // Green for completed steps
                },
              },
            }}
          >
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
                    (activeStep === 1 && (!physicianForm.lastName.trim() || !physicianForm.firstName.trim() || !physicianForm.city.trim() || !physicianForm.state.trim())) ||
                    (activeStep === 2 && (!values.firstname.trim() || !values.lastname.trim() || !values.phone.trim() || !values.dob.trim() || !values.gender.trim() || !values.address.trim() || !values.city.trim() || !values.state.trim() || !values.zipcode.trim())) ||
                    (activeStep === 3 && !termsChecked) ||
                    (activeStep === 0 && !selectedItems.length)
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