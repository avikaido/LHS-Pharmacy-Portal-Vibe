import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/item/ItemData';

const initialState = {
  items: [],
  currentFilter: 'total_items',
  itemSearch: '',
};

export const ItemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    getItems: (state, action) => {
      state.items = action.payload;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SearchItem: (state, action) => {
      state.itemSearch = action.payload;
    },
    DeleteItem: (state, action) => {
      const index = state.items.findIndex((item) => item.Id === action.payload);
      state.items.splice(index, 1);
    },
  },
});

export const { getItems, setVisibilityFilter, SearchItem, DeleteItem } = ItemSlice.actions;

export const fetchItems = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getItems(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default ItemSlice.reducer;

