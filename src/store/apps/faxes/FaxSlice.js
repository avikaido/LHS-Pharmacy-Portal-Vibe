import axios from '../../../utils/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = '/api/faxes';

const initialState = {
  faxes: [],
  currentFilter: 'total_faxes',
  faxSearch: '',
  loading: false,
  error: null,
};

// Utility to map backend fax to frontend shape
const mapFax = (f) => {
  return {
    id: f.id,
    created_on: f.created_on,
    status: f.status || 'unknown',
    fax: f.fax || f.fax_number || 'N/A', // Use fax field directly from database
    type: f.type || (f.sent_by ? 'outgoing' : 'incoming'), // Use type from database or determine from sent_by
    code: f.code || f.status || 'unknown', // Use code from database or fallback to status
    doc_link: f.doc_link || f.document_url || null,
    users: f.users || f.sent_by || null,
    patients: f.patients || f.patient_id || null,
    requests: f.requests || f.request_id || null,
    deleted: f.deleted || false,
    // Additional fields from database
    request_id: f.requests || f.request_id,
    sent_to: f.fax || f.fax_number,
    sent_by: f.users || f.sent_by,
    telnyx_fax_id: f.telnyx_fax_id,
    document_url: f.doc_link || f.document_url,
    patient_id: f.patients || f.patient_id,
    // Administrative fields
    created_by: f.created_by,
    updated_on: f.updated_on,
    updated_by: f.updated_by,
    deleted_on: f.deleted_on,
    deleted_by: f.deleted_by,
    visibility: f.visibility,
    version: f.version,
    change_log: f.change_log,
  };
};

export const fetchFaxes = createAsyncThunk(
  'faxes/fetchFaxes',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching faxes from API...');
      const response = await axios.get(`${API_URL}`);
      console.log('Raw faxes data:', response.data);
      const mappedFaxes = response.data.map(mapFax);
      console.log('Mapped faxes:', mappedFaxes);
      return mappedFaxes;
    } catch (err) {
      console.error('Error fetching faxes:', err);
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const sendFax = createAsyncThunk(
  'faxes/sendFax',
  async (faxData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('faxFile', faxData.file);
      formData.append('requestId', faxData.requestId);
      formData.append('faxNumber', faxData.faxNumber);
      formData.append('userId', faxData.userId);

      const response = await axios.post(`${API_URL}/send`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteFax = createAsyncThunk(
  'faxes/deleteFax',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const FaxSlice = createSlice({
  name: 'fax',
  initialState,
  reducers: {
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchFax: (state, action) => {
      state.faxSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaxes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaxes.fulfilled, (state, action) => {
        state.loading = false;
        state.faxes = action.payload;
      })
      .addCase(fetchFaxes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendFax.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFax.fulfilled, (state, action) => {
        state.loading = false;
        // Refresh faxes after sending
        // You might want to add the new fax to the list here
      })
      .addCase(sendFax.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFax.fulfilled, (state, action) => {
        state.faxes = state.faxes.filter(fax => fax.id !== action.payload);
      });
  },
});

export const { setVisibilityFilter, SearchFax } = FaxSlice.actions;

export default FaxSlice.reducer;

