import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/items';

const initialState = {
  items: [],
  currentFilter: 'total_items',
  itemSearch: '',
  loading: false,
  error: null,
};

export const ItemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    getItems: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchItem: (state, action) => {
      state.itemSearch = action.payload;
    },
    DeleteItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
  },
});

export const { getItems, setLoading, setError, setVisibilityFilter, SearchItem, DeleteItem } = ItemSlice.actions;

export const fetchItems = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}`);
    dispatch(getItems(response.data));
  } catch (err) {
    console.error('Error fetching items:', err);
    dispatch(setError(err.message || 'Failed to fetch items'));
  }
};

export default ItemSlice.reducer;

