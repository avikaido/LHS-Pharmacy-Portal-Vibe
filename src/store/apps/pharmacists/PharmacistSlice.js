import axios from '../../../utils/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/pharmacists';

const initialState = {
  pharmacists: [],
  pharmacistContent: null,
  pharmacistSearch: '',
  editPharmacist: false,
  currentFilter: 'show_all',
  loading: false,
  error: null,
};

// Utility to map backend pharmacist to frontend shape
const mapPharmacist = (p) => {
  const mapped = {
    id: p.id,
    firstname: p.first_name,
    lastname: p.last_name,
    phone: p.phone,
    email: p.email,
    notes: p.notes,
    department: p.type === 'clinical' ? 'Clinical Pharmacy' :
      p.type === 'hospital' ? 'Hospital Pharmacy' :
      p.type === 'compounding' ? 'Compounding Pharmacy' : 'Staff',
    deaNumber: p.dea_number,
    licenseNumber: p.license_number,
    licenseExpiration: p.license_expiration,
    npiNumber: p.npi_number,
    yearsOfExperience: p.years_experience,
    languagesSpoken: p.languages_spoken ? p.languages_spoken.split(',').map(s => s.trim()) : [],
    frequentlycontacted: false, // Not in DB yet
    starred: false, // Not in DB yet
    deleted: p.deleted,
    pharmacies: [], // Not in DB yet
    // Administrative fields
    created_on: p.created_on,
    created_by: p.created_by,
    updated_on: p.updated_on,
    updated_by: p.updated_by,
    deleted_on: p.deleted_on,
    deleted_by: p.deleted_by,
    status: p.status,
    version: p.version,
    visibility: p.visibility,
    change_log: p.change_log,
  };
  return mapped;
};

export const fetchPharmacists = createAsyncThunk(
  'pharmacists/fetchPharmacists',
  async (includeArchived = false, { rejectWithValue }) => {
    try {
      const url = includeArchived ? `${API_URL}?include_archived=true` : `${API_URL}`;
      const response = await axios.get(url);
      return response.data.map(mapPharmacist);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const fetchArchivedPharmacists = createAsyncThunk(
  'pharmacists/fetchArchivedPharmacists',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching archived pharmacists...');
      const response = await axios.get(`${API_URL}/archived`);
      console.log('Archived pharmacists response:', response.data);
      return response.data.map(mapPharmacist);
    } catch (err) {
      console.error('Error fetching archived pharmacists:', err);
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const addPharmacist = createAsyncThunk(
  'pharmacists/addPharmacist',
  async (pharmacist, { rejectWithValue }) => {
    try {
      const payload = {
        first_name: pharmacist.firstname,
        last_name: pharmacist.lastname,
        phone: pharmacist.phone,
        email: pharmacist.email,
        notes: pharmacist.notes,
        type: pharmacist.department?.toLowerCase().includes('clinical') ? 'clinical' :
              pharmacist.department?.toLowerCase().includes('hospital') ? 'hospital' :
              pharmacist.department?.toLowerCase().includes('compounding') ? 'compounding' : 'staff',
        dea_number: pharmacist.deaNumber,
        license_number: pharmacist.licenseNumber,
        license_expiration: pharmacist.licenseExpiration,
        npi_number: pharmacist.npiNumber,
        years_experience: pharmacist.yearsOfExperience,
        languages_spoken: Array.isArray(pharmacist.languagesSpoken) ? pharmacist.languagesSpoken.join(', ') : pharmacist.languagesSpoken,
      };
      const response = await axios.post(`${API_URL}`, payload);
      return mapPharmacist(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const updatePharmacist = createAsyncThunk(
  'pharmacists/updatePharmacist',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const payload = { ...updates };
      if (payload.firstname) payload.first_name = payload.firstname;
      if (payload.lastname) payload.last_name = payload.lastname;
      if (payload.department) payload.type = payload.department?.toLowerCase().includes('clinical') ? 'clinical' :
        payload.department?.toLowerCase().includes('hospital') ? 'hospital' :
        payload.department?.toLowerCase().includes('compounding') ? 'compounding' : 'staff';
      if (payload.deaNumber) payload.dea_number = payload.deaNumber;
      if (payload.licenseNumber) payload.license_number = payload.licenseNumber;
      if (payload.licenseExpiration) payload.license_expiration = payload.licenseExpiration;
      if (payload.npiNumber) payload.npi_number = payload.npiNumber;
      if (payload.yearsOfExperience) payload.years_experience = payload.yearsOfExperience;
      if (payload.languagesSpoken) payload.languages_spoken = Array.isArray(payload.languagesSpoken) ? payload.languagesSpoken.join(', ') : payload.languagesSpoken;
      // Remove camelCase
      delete payload.firstname; delete payload.lastname; delete payload.department; delete payload.deaNumber; delete payload.licenseNumber; delete payload.licenseExpiration; delete payload.npiNumber; delete payload.yearsOfExperience; delete payload.languagesSpoken;
      const response = await axios.put(`${API_URL}/${id}`, payload);
      return mapPharmacist(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deletePharmacist = createAsyncThunk(
  'pharmacists/deletePharmacist',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const restorePharmacist = createAsyncThunk(
  'pharmacists/restorePharmacist',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/restore`);
      return mapPharmacist(response.data);
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Async action for per-field update
export const updatePharmacistField = (id, field, value) => async (dispatch) => {
  try {
    // Map frontend field names to backend field names
    let backendField = field;
    let backendValue = value === null || value === undefined ? '' : value;
    
    // Map frontend field names to backend field names
    switch (field) {
      case 'firstname':
        backendField = 'first_name';
        break;
      case 'lastname':
        backendField = 'last_name';
        break;
      case 'department':
        backendField = 'type';
        backendValue = value?.toLowerCase().includes('clinical') ? 'clinical' :
                      value?.toLowerCase().includes('hospital') ? 'hospital' :
                      value?.toLowerCase().includes('compounding') ? 'compounding' : 'staff';
        break;
      case 'deaNumber':
        backendField = 'dea_number';
        break;
      case 'licenseNumber':
        backendField = 'license_number';
        break;
      case 'licenseExpiration':
        backendField = 'license_expiration';
        break;
      case 'npiNumber':
        backendField = 'npi_number';
        break;
      case 'yearsOfExperience':
        backendField = 'years_experience';
        break;
      case 'languagesSpoken':
        backendField = 'languages_spoken';
        backendValue = Array.isArray(value) ? value.join(', ') : value;
        break;
      default:
        // For fields that don't need mapping (email, phone, notes)
        backendField = field;
    }
    
    const response = await axios.put(`${API_URL}/${id}`, { [backendField]: backendValue });
    if (response.data) {
      // Update the local state with the frontend field name
      dispatch(UpdatePharmacist({ id, field, value }));
      return response.data;
    }
  } catch (err) {
    // Optionally handle error
    throw err;
  }
};

export const PharmacistSlice = createSlice({
  name: 'pharmacists',
  initialState,
  reducers: {
    SearchPharmacist: (state, action) => {
      state.pharmacistSearch = action.payload;
    },
    SelectPharmacist: (state, action) => {
      state.pharmacistContent = action.payload;
    },
    isEdit: (state) => {
      state.editPharmacist = !state.editPharmacist;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdatePharmacist: (state, action) => {
      const { id, field, value } = action.payload;
      state.pharmacists = state.pharmacists.map((pharmacist) =>
        pharmacist.id === id ? { ...pharmacist, [field]: value === null ? '' : value } : pharmacist
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPharmacists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacists.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacists = action.payload;
        // Auto-select first pharmacist if none is selected
        if (!state.pharmacistContent && action.payload.length > 0) {
          state.pharmacistContent = action.payload[0].id;
        }
      })
      .addCase(fetchPharmacists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchArchivedPharmacists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArchivedPharmacists.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacists = action.payload;
        // Auto-select first pharmacist if none is selected
        if (!state.pharmacistContent && action.payload.length > 0) {
          state.pharmacistContent = action.payload[0].id;
        }
      })
      .addCase(fetchArchivedPharmacists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPharmacist.fulfilled, (state, action) => {
        state.pharmacists.push(action.payload);
      })
      .addCase(updatePharmacist.fulfilled, (state, action) => {
        state.pharmacists = state.pharmacists.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(deletePharmacist.fulfilled, (state, action) => {
        state.pharmacists = state.pharmacists.map((p) =>
          p.id === action.payload ? { ...p, deleted: true } : p
        );
      })
      .addCase(restorePharmacist.fulfilled, (state, action) => {
        state.pharmacists = state.pharmacists.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      });
  },
});

export const {
  SearchPharmacist,
  isEdit,
  SelectPharmacist,
  setVisibilityFilter,
  UpdatePharmacist,
} = PharmacistSlice.actions;

export default PharmacistSlice.reducer;
