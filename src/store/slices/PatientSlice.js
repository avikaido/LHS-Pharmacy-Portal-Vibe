export const fetchPatients = createAsyncThunk(
    'patients/fetchPatients',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosServices.get('/api/patients');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updatePatient = createAsyncThunk(
    'patients/updatePatient',
    async ({ id, field, value }, { rejectWithValue }) => {
        try {
            // Send empty string instead of null
            const updateValue = value === null ? '' : value;
            
            const response = await axiosServices.put(`/api/patients/${id}`, {
                [field]: updateValue
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
); 