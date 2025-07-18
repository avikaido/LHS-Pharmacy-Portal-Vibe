import axios from '../../../utils/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/pharmacies';

// Async thunks for API calls
export const fetchPharmacies = createAsyncThunk(
  'pharmacies/fetchPharmacies',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch pharmacies');
    }
  }
);

export const fetchPharmacyById = createAsyncThunk(
  'pharmacies/fetchPharmacyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch pharmacy');
    }
  }
);

export const createPharmacy = createAsyncThunk(
  'pharmacies/createPharmacy',
  async (pharmacyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, pharmacyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create pharmacy');
    }
  }
);

export const updatePharmacy = createAsyncThunk(
  'pharmacies/updatePharmacy',
  async ({ id, pharmacyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, pharmacyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update pharmacy');
    }
  }
);

export const deletePharmacy = createAsyncThunk(
  'pharmacies/deletePharmacy',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete pharmacy');
    }
  }
);

export const restorePharmacy = createAsyncThunk(
  'pharmacies/restorePharmacy',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/restore`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to restore pharmacy');
    }
  }
);

export const fetchPharmacyTypes = createAsyncThunk(
  'pharmacies/fetchPharmacyTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/types/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch pharmacy types');
    }
  }
);

export const fetchFrequentlyContactedPharmacies = createAsyncThunk(
  'pharmacies/fetchFrequentlyContactedPharmacies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/frequently-contacted/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch frequently contacted pharmacies');
    }
  }
);

export const fetchStarredPharmacies = createAsyncThunk(
  'pharmacies/fetchStarredPharmacies',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/starred/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch starred pharmacies');
    }
  }
);

const initialState = {
  pharmacies: [],
  pharmacyContent: null,
  pharmacySearch: '',
  editPharmacy: false,
  currentFilter: 'show_all',
  loading: false,
  error: null,
  pharmacyTypes: [],
  frequentlyContactedPharmacies: [],
  starredPharmacies: [],
  pagination: {
    total: 0,
    limit: 50,
    offset: 0,
    hasMore: false
  }
};

export const PharmacySlice = createSlice({
  name: 'pharmacies',
  initialState,
  reducers: {
    SearchPharmacy: (state, action) => {
      state.pharmacySearch = action.payload;
    },
    SelectPharmacy: (state, action) => {
      state.pharmacyContent = action.payload;
    },
    isEdit: (state) => {
      state.editPharmacy = !state.editPharmacy;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPharmacies: (state) => {
      state.pharmacies = [];
      state.pagination = {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      };
    }
  },
  extraReducers: (builder) => {
    // Fetch pharmacies
    builder
      .addCase(fetchPharmacies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacies.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacies = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPharmacies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch pharmacy by ID
    builder
      .addCase(fetchPharmacyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPharmacyById.fulfilled, (state, action) => {
        state.loading = false;
        // Update the pharmacy in the list or add it if not present
        const index = state.pharmacies.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.pharmacies[index] = action.payload.data;
        } else {
          state.pharmacies.push(action.payload.data);
        }
      })
      .addCase(fetchPharmacyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create pharmacy
    builder
      .addCase(createPharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPharmacy.fulfilled, (state, action) => {
        state.loading = false;
        state.pharmacies.push(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(createPharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update pharmacy
    builder
      .addCase(updatePharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePharmacy.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pharmacies.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.pharmacies[index] = action.payload.data;
        }
      })
      .addCase(updatePharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete pharmacy
    builder
      .addCase(deletePharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePharmacy.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pharmacies.findIndex(p => p.id === action.payload);
        if (index !== -1) {
          state.pharmacies[index].deleted = true;
        }
        state.pagination.total -= 1;
      })
      .addCase(deletePharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Restore pharmacy
    builder
      .addCase(restorePharmacy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restorePharmacy.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pharmacies.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.pharmacies[index] = action.payload.data;
        }
        state.pagination.total += 1;
      })
      .addCase(restorePharmacy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch pharmacy types
    builder
      .addCase(fetchPharmacyTypes.fulfilled, (state, action) => {
        state.pharmacyTypes = action.payload.data;
      });

    // Fetch frequently contacted pharmacies
    builder
      .addCase(fetchFrequentlyContactedPharmacies.fulfilled, (state, action) => {
        state.frequentlyContactedPharmacies = action.payload.data;
      });

    // Fetch starred pharmacies
    builder
      .addCase(fetchStarredPharmacies.fulfilled, (state, action) => {
        state.starredPharmacies = action.payload.data;
      });
  },
});

export const {
  SearchPharmacy,
  isEdit,
  SelectPharmacy,
  setVisibilityFilter,
  clearError,
  clearPharmacies,
} = PharmacySlice.actions;

export default PharmacySlice.reducer;
