import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/pharmacies/PharmaciesData';

const initialState = {
  pharmacies: [],
  pharmacyContent: 1,
  pharmacySearch: '',
  editPharmacy: false,
  currentFilter: 'show_all',
};

export const PharmacySlice = createSlice({
  name: 'pharmacies',
  initialState,
  reducers: {
    getPharmacies: (state, action) => {
      state.pharmacies = action.payload;
    },
    SearchPharmacy: (state, action) => {
      state.pharmacySearch = action.payload;
    },
    SelectPharmacy: (state, action) => {
      state.pharmacyContent = action.payload;
    },
    DeletePharmacy: (state, action) => {
      const index = state.pharmacies.findIndex((pharmacy) => pharmacy.id === action.payload);
      state.pharmacies.splice(index, 1);
    },
    toggleStarredPharmacy: (state, action) => {
      state.pharmacies = state.pharmacies.map((pharmacy) =>
        pharmacy.id === action.payload ? { ...pharmacy, starred: !pharmacy.starred } : pharmacy,
      );
    },
    isEdit: (state) => {
      state.editPharmacy = !state.editPharmacy;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdatePharmacy: {
      reducer: (state, action) => {
        state.pharmacies = state.pharmacies.map((pharmacy) =>
          pharmacy.id === action.payload.id
            ? { ...pharmacy, [action.payload.field]: action.payload.value }
            : pharmacy,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addPharmacy: {
      reducer: (state, action) => {
        state.pharmacies.push(action.payload);
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
  getPharmacies,
  SearchPharmacy,
  isEdit,
  SelectPharmacy,
  DeletePharmacy,
  toggleStarredPharmacy,
  UpdatePharmacy,
  addPharmacy,
  setVisibilityFilter,
} = PharmacySlice.actions;

export const fetchPharmacies = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPharmacies(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default PharmacySlice.reducer;
