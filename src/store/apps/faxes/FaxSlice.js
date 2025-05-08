import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/fax/FaxData';

const initialState = {
  faxes: [],
  currentFilter: 'total_faxes',
  faxSearch: '',
};

export const FaxSlice = createSlice({
  name: 'fax',
  initialState,
  reducers: {
    getFaxes: (state, action) => {
      state.faxes = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchFax: (state, action) => {
      state.faxSearch = action.payload;
    },
    DeleteFax: (state, action) => {
      const index = state.faxes.findIndex((fax) => fax.Id === action.payload);
      state.faxes.splice(index, 1);
    },
  },
});

export const { getFaxes, setVisibilityFilter, SearchFax, DeleteFax } = FaxSlice.actions;

export const fetchFaxes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getFaxes(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default FaxSlice.reducer;

