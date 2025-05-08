import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

// Remove hardcoded port and use configured axios instance
const API_URL = '/api/patients';

const initialState = {
  patients: [],
  archivedPatients: [],
  patientContent: 1,
  patientSearch: '',
  editPatient: false,
  currentFilter: 'show_all',
  loading: false,
  error: null
};

export const PatientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getPatients: (state, action) => {
      state.patients = action.payload;
      state.loading = false;
      state.error = null;
    },
    getArchivedPatients: (state, action) => {
      state.archivedPatients = action.payload;
      state.loading = false;
      state.error = null;
    },
    SearchPatient: (state, action) => {
      state.patientSearch = action.payload;
    },
    SelectPatient: (state, action) => {
      state.patientContent = action.payload;
    },
    DeletePatient: (state, action) => {
      state.patients = state.patients.filter((patient) => patient.id !== action.payload);
    },
    ArchivePatient: (state, action) => {
      const patient = state.patients.find(p => p.id === action.payload);
      if (patient) {
        state.patients = state.patients.filter(p => p.id !== action.payload);
        state.archivedPatients.unshift({ ...patient, deleted: true });
      }
    },
    RestorePatient: (state, action) => {
      const patient = state.archivedPatients.find(p => p.id === action.payload);
      if (patient) {
        state.archivedPatients = state.archivedPatients.filter(p => p.id !== action.payload);
        state.patients.unshift({ ...patient, deleted: false });
      }
    },
    toggleStarredPatient: (state, action) => {
      state.patients = state.patients.map((patient) =>
        patient.id === action.payload ? { ...patient, starred: !patient.starred } : patient
      );
    },
    isEdit: (state) => {
      state.editPatient = !state.editPatient;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdatePatient: (state, action) => {
      const { id, field, value } = action.payload;
      state.patients = state.patients.map((patient) =>
        patient.id === id ? { ...patient, [field]: value === null ? '' : value } : patient
      );
    },
    addPatient: (state, action) => {
      state.patients.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  getPatients,
  getArchivedPatients,
  SearchPatient,
  SelectPatient,
  DeletePatient,
  ArchivePatient,
  RestorePatient,
  toggleStarredPatient,
  isEdit,
  setVisibilityFilter,
  UpdatePatient,
  addPatient,
} = PatientSlice.actions;

// Async Actions

// Fetch active patients
export const fetchPatients = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}`);

    if (!Array.isArray(response.data)) {
      console.error("Unexpected API response format:", response.data);
      throw new Error("API did not return an array.");
    }

    const patientsData = response.data.map((patient) => ({
      id: patient.id,
      uuid: patient.uuid,
      slug: patient.slug,
      created_on: patient.created_on,
      created_by: patient.created_by,
      updated_on: patient.updated_on,
      updated_by: patient.updated_by,
      deleted: patient.deleted || false,
      deleted_on: patient.deleted_on || null,
      deleted_by: patient.deleted_by || null,
      visibility: patient.visibility,
      version: patient.version,
      previous_id: patient.previous_id || null,
      change_log: patient.change_log || '',
      status: patient.status,

      // Patient Details
      first_name: patient.first_name,
      middle_initial: patient.middle_initial,
      last_name: patient.last_name,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
      address2: patient.address2 || '',
      city: patient.city,
      state: patient.state,
      zipcode: patient.zipcode,
      notes: patient.notes || '',
      dob: patient.dob,
      gender: patient.gender,

      // Insurance
      insurance1: patient.insurance1,
      insurance1_id: patient.insurance1_id,
      insurance2: patient.insurance2 || null,
      insurance2_id: patient.insurance2_id || null,

      // Foreign Key References
      users: patient.users || null,
      requests: patient.requests || null,
      faxes: patient.faxes || null,

      frequentlycontacted: false,
      starred: false,
    }));

    dispatch(getPatients(patientsData));
  } catch (err) {
    console.error("Error fetching patients:", err);
    dispatch(setError(err.message));
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

// Fetch archived patients
export const fetchArchivedPatients = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(`${API_URL}/archived`);
    dispatch(getArchivedPatients(response.data));
  } catch (err) {
    console.error("Error fetching archived patients:", err);
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Update patient
export const updatePatient = (id, field, value) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    // Send empty string instead of null to the backend
    const valueToSend = value === null || value === undefined ? '' : value;
    const response = await axios.put(`${API_URL}/${id}`, { [field]: valueToSend });
    
    if (response.data) {
      // Update the UI with the same value we sent
      dispatch(UpdatePatient({ id, field, value: valueToSend }));
      return response.data;
    }
  } catch (err) {
    console.error("Error updating patient:", err.response?.data || err);
    dispatch(setError(err.response?.data?.error || err.message));
    throw new Error(err.response?.data?.error || "Failed to update patient");
  } finally {
    dispatch(setLoading(false));
  }
};

// Archive patient
export const archivePatient = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`${API_URL}/${id}`);
    dispatch(ArchivePatient(id));
  } catch (err) {
    console.error("Error archiving patient:", err);
    dispatch(setError(err.response?.data?.error || err.message));
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

// Restore patient
export const restorePatient = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.post(`${API_URL}/${id}/restore`);
    dispatch(RestorePatient(id));
  } catch (err) {
    console.error("Error restoring patient:", err);
    dispatch(setError(err.response?.data?.error || err.message));
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

// Create patient
export const createPatient = (patientData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post(API_URL, patientData);
    dispatch(addPatient(response.data));
    return response.data;
  } catch (err) {
    console.error("Error creating patient:", err);
    dispatch(setError(err.response?.data?.error || err.message));
    throw err;
  } finally {
    dispatch(setLoading(false));
  }
};

export default PatientSlice.reducer;
