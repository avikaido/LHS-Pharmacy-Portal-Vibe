import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/physicians/PhysiciansData';

const initialState = {
  physicians: [],
  physicianContent: 1,
  physicianSearch: '',
  editPhysician: false,
  currentFilter: 'show_all',
};

export const PhysicianSlice = createSlice({
  name: 'physicians',
  initialState,
  reducers: {
    getPhysicians: (state, action) => {
      state.physicians = action.payload;
    },
    SearchPhysician: (state, action) => {
      state.physicianSearch = action.payload;
    },
    SelectPhysician: (state, action) => {
      state.physicianContent = action.payload;
    },
    DeletePhysician: (state, action) => {
      const index = state.physicians.findIndex((physician) => physician.id === action.payload);
      state.physicians.splice(index, 1);
    },
    toggleStarredPhysician: (state, action) => {
      state.physicians = state.physicians.map((physician) =>
        physician.id === action.payload ? { ...physician, starred: !physician.starred } : physician,
      );
    },
    isEdit: (state) => {
      state.editPhysician = !state.editPhysician;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdatePhysician: {
      reducer: (state, action) => {
        state.physicians = state.physicians.map((physician) =>
          physician.id === action.payload.id
            ? { ...physician, [action.payload.field]: action.payload.value }
            : physician,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addPhysician: {
      reducer: (state, action) => {
        state.physicians.push(action.payload);
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
  getPhysicians,
  SearchPhysician,
  isEdit,
  SelectPhysician,
  DeletePhysician,
  toggleStarredPhysician,
  UpdatePhysician,
  addPhysician,
  setVisibilityFilter,
} = PhysicianSlice.actions;

export const fetchPhysicians = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPhysicians(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default PhysicianSlice.reducer;
