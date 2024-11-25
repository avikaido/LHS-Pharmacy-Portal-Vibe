import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/pharmacists/PharmacistsData';

const initialState = {
  pharmacists: [],
  pharmacistContent: 1,
  pharmacistSearch: '',
  editPharmacist: false,
  currentFilter: 'show_all',
};

export const PharmacistSlice = createSlice({
  name: 'pharmacists',
  initialState,
  reducers: {
    getPharmacists: (state, action) => {
      state.pharmacists = action.payload;
    },
    SearchPharmacist: (state, action) => {
      state.pharmacistSearch = action.payload;
    },
    SelectPharmacist: (state, action) => {
      state.pharmacistContent = action.payload;
    },
    DeletePharmacist: (state, action) => {
      const index = state.pharmacists.findIndex((pharmacist) => pharmacist.id === action.payload);
      state.pharmacists.splice(index, 1);
    },
    toggleStarredPharmacist: (state, action) => {
      state.pharmacists = state.pharmacists.map((pharmacist) =>
        pharmacist.id === action.payload ? { ...pharmacist, starred: !pharmacist.starred } : pharmacist,
      );
    },
    isEdit: (state) => {
      state.editPharmacist = !state.editPharmacist;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdatePharmacist: {
      reducer: (state, action) => {
        state.pharmacists = state.pharmacists.map((pharmacist) =>
          pharmacist.id === action.payload.id
            ? { ...pharmacist, [action.payload.field]: action.payload.value }
            : pharmacist,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addPharmacist: {
      reducer: (state, action) => {
        state.pharmacists.push(action.payload);
      },
      prepare: (
        id,
        firstname,
        lastname,
        image,
        department,
        company,
        phone,
        email,
        address,
        notes,
      ) => {
        return {
          payload: {
            id,
            firstname,
            lastname,
            image,
            department,
            company,
            phone,
            email,
            address,
            notes,
            frequentlycontacted: false,
            starred: false,
            deleted: false,
          },
        };
      },
    },
  },
});

export const {
  getPharmacists,
  SearchPharmacist,
  isEdit,
  SelectPharmacist,
  DeletePharmacist,
  toggleStarredPharmacist,
  UpdatePharmacist,
  addPharmacist,
  setVisibilityFilter,
} = PharmacistSlice.actions;

export const fetchPharmacists = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPharmacists(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default PharmacistSlice.reducer;
