import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/patients/PatientsData';

const initialState = {
  patients: [],
  patientContent: 1,
  patientSearch: '',
  editPatient: false,
  currentFilter: 'show_all',
};

export const PatientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    getPatients: (state, action) => {
      state.patients = action.payload;
    },
    SearchPatient: (state, action) => {
      state.patientSearch = action.payload;
    },
    SelectPatient: (state, action) => {
      state.patientContent = action.payload;
    },
    DeletePatient: (state, action) => {
      const index = state.patients.findIndex((patient) => patient.id === action.payload);
      state.patients.splice(index, 1);
    },
    toggleStarredPatient: (state, action) => {
      state.patients = state.patients.map((patient) =>
        patient.id === action.payload ? { ...patient, starred: !patient.starred } : patient,
      );
    },
    isEdit: (state) => {
      state.editPatient = !state.editPatient;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdatePatient: {
      reducer: (state, action) => {
        state.patients = state.patients.map((patient) =>
          patient.id === action.payload.id
            ? { ...patient, [action.payload.field]: action.payload.value }
            : patient,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addPatient: {
      reducer: (state, action) => {
        state.patients.push(action.payload);
      },
      prepare: (
        id,
        firstname,
        lastname,
        middleInitial,
        image,
        phone,
        email,
        dob,
        gender,
        address,
        address2,
        city,
        state,
        zipcode,
        ecname,
        ecrelation,
        ecphone,
        notes,
        requests,
        insurance1,
        insurance2,
      ) => {
        return {
          payload: {
            id,
            firstname,
            lastname,
            middleInitial,
            image,
            phone,
            email,
            dob,
            gender,
            address,
            address2,
            city,
            state,
            zipcode,
            ecname,
            ecrelation,
            ecphone,
            notes,
            frequentlycontacted: false,
            starred: false,
            deleted: false,
            requests,
            insurance1,
            incurance2,
          },
        };
      },
    },
  },
});

export const {
  getPatients,
  SearchPatient,
  isEdit,
  SelectPatient,
  DeletePatient,
  toggleStarredPatient,
  UpdatePatient,
  addPatient,
  setVisibilityFilter,
} = PatientSlice.actions;

export const fetchPatients = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getPatients(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default PatientSlice.reducer;
