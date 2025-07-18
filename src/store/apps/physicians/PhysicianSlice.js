import axios from '../../../utils/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/physicians';

// Async thunks for API calls
export const fetchPhysicians = createAsyncThunk(
  'physicians/fetchPhysicians',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch physicians');
    }
  }
);

export const fetchPhysicianById = createAsyncThunk(
  'physicians/fetchPhysicianById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch physician');
    }
  }
);

export const createPhysician = createAsyncThunk(
  'physicians/createPhysician',
  async (physicianData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, physicianData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create physician');
    }
  }
);

export const updatePhysician = createAsyncThunk(
  'physicians/updatePhysician',
  async ({ id, physicianData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, physicianData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update physician');
    }
  }
);

export const deletePhysician = createAsyncThunk(
  'physicians/deletePhysician',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete physician');
    }
  }
);

export const restorePhysician = createAsyncThunk(
  'physicians/restorePhysician',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/restore`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to restore physician');
    }
  }
);

export const fetchPhysicianSpecialties = createAsyncThunk(
  'physicians/fetchPhysicianSpecialties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/specialties/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch physician specialties');
    }
  }
);

export const fetchFrequentlyContactedPhysicians = createAsyncThunk(
  'physicians/fetchFrequentlyContactedPhysicians',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/frequently-contacted/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch frequently contacted physicians');
    }
  }
);

export const fetchStarredPhysicians = createAsyncThunk(
  'physicians/fetchStarredPhysicians',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/starred/list`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch starred physicians');
    }
  }
);

const initialState = {
  physicians: [],
  physicianContent: null,
  physicianSearch: '',
  editPhysician: false,
  currentFilter: 'show_all',
  loading: false,
  error: null,
  physicianSpecialties: [],
  frequentlyContactedPhysicians: [],
  starredPhysicians: [],
  pagination: {
    total: 0,
    limit: 50,
    offset: 0,
    hasMore: false
  }
};

export const PhysicianSlice = createSlice({
  name: 'physicians',
  initialState,
  reducers: {
    SearchPhysician: (state, action) => {
      state.physicianSearch = action.payload;
    },
    SelectPhysician: (state, action) => {
      state.physicianContent = action.payload;
    },
    isEdit: (state) => {
      state.editPhysician = !state.editPhysician;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearPhysicians: (state) => {
      state.physicians = [];
      state.pagination = {
        total: 0,
        limit: 50,
        offset: 0,
        hasMore: false
      };
    }
  },
  extraReducers: (builder) => {
    // Fetch physicians
    builder
      .addCase(fetchPhysicians.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhysicians.fulfilled, (state, action) => {
        state.loading = false;
        state.physicians = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPhysicians.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch physician by ID
    builder
      .addCase(fetchPhysicianById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhysicianById.fulfilled, (state, action) => {
        state.loading = false;
        // Update the physician in the list or add it if not present
        const index = state.physicians.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.physicians[index] = action.payload.data;
        } else {
          state.physicians.push(action.payload.data);
        }
      })
      .addCase(fetchPhysicianById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create physician
    builder
      .addCase(createPhysician.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPhysician.fulfilled, (state, action) => {
        state.loading = false;
        state.physicians.push(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(createPhysician.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update physician
    builder
      .addCase(updatePhysician.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePhysician.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.physicians.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.physicians[index] = action.payload.data;
        }
      })
      .addCase(updatePhysician.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete physician
    builder
      .addCase(deletePhysician.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePhysician.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.physicians.findIndex(p => p.id === action.payload);
        if (index !== -1) {
          state.physicians[index].deleted = true;
        }
        state.pagination.total -= 1;
      })
      .addCase(deletePhysician.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Restore physician
    builder
      .addCase(restorePhysician.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restorePhysician.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.physicians.findIndex(p => p.id === action.payload.data.id);
        if (index !== -1) {
          state.physicians[index] = action.payload.data;
        }
        state.pagination.total += 1;
      })
      .addCase(restorePhysician.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch physician specialties
    builder
      .addCase(fetchPhysicianSpecialties.fulfilled, (state, action) => {
        state.physicianSpecialties = action.payload.data;
      });

    // Fetch frequently contacted physicians
    builder
      .addCase(fetchFrequentlyContactedPhysicians.fulfilled, (state, action) => {
        state.frequentlyContactedPhysicians = action.payload.data;
      });

    // Fetch starred physicians
    builder
      .addCase(fetchStarredPhysicians.fulfilled, (state, action) => {
        state.starredPhysicians = action.payload.data;
      });
  },
});

export const {
  SearchPhysician,
  isEdit,
  SelectPhysician,
  setVisibilityFilter,
  clearError,
  clearPhysicians,
} = PhysicianSlice.actions;

export default PhysicianSlice.reducer;
