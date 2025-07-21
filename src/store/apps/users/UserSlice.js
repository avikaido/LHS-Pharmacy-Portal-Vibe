import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/users';

const initialState = {
  users: [],
  userContent: 1,
  userSearch: '',
  editUser: false,
  currentFilter: 'show_all',
};

export const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    SearchUser: (state, action) => {
      state.userSearch = action.payload;
    },
    SelectUser: (state, action) => {
      state.userContent = action.payload;
    },
    DeleteUser: (state, action) => {
      // Soft delete - mark as deleted instead of removing
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, deleted: true, deleted_on: new Date().toISOString() } : user,
      );
    },
    RestoreUser: (state, action) => {
      // Restore deleted user
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, deleted: false, deleted_on: null, deleted_by: null } : user,
      );
    },
    toggleStarredUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, starred: !user.starred } : user,
      );
    },
    toggleFrequentlyContactedUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, frequently_contacted: !user.frequently_contacted } : user,
      );
    },
    isEdit: (state) => {
      state.editUser = !state.editUser;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    UpdateUser: {
      reducer: (state, action) => {
        state.users = state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, [action.payload.field]: action.payload.value }
            : user,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addUser: {
      reducer: (state, action) => {
        state.users.push(action.payload);
      },
      prepare: (
        id,
        first_name,
        middle_initial,
        last_name,
        email,
        phone,
        role,
        department,
        title,
        address,
        address2,
        city,
        state,
        zipcode,
        country,
        notes,
        permissions,
        status
      ) => {
        return {
          payload: {
            id,
            first_name,
            middle_initial,
            last_name,
            email,
            phone,
            role,
            department,
            title,
            address,
            address2,
            city,
            state,
            zipcode,
            country,
            notes,
            permissions,
            status,
            frequently_contacted: false,
            starred: false,
            deleted: false,
            created_on: new Date().toISOString(),
            updated_on: new Date().toISOString(),
            created_by: 1,
            updated_by: 1,
            version: 1,
            visibility: 'public'
          },
        };
      },
    },
  },
});

export const {
  getUsers,
  SearchUser,
  isEdit,
  SelectUser,
  DeleteUser,
  RestoreUser,
  toggleStarredUser,
  toggleFrequentlyContactedUser,
  UpdateUser,
  addUser,
  setVisibilityFilter,
} = UserSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    if (response.data.success) {
      dispatch(getUsers(response.data.data));
    } else {
      console.error('Failed to fetch users:', response.data.error);
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    throw new Error(err);
  }
};

export const createUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    if (response.data.success) {
      dispatch(addUser(
        response.data.data.id,
        response.data.data.first_name,
        response.data.data.middle_initial,
        response.data.data.last_name,
        response.data.data.email,
        response.data.data.phone,
        response.data.data.role,
        response.data.data.department,
        response.data.data.title,
        response.data.data.address,
        response.data.data.address2,
        response.data.data.city,
        response.data.data.state,
        response.data.data.zipcode,
        response.data.data.country,
        response.data.data.notes,
        response.data.data.permissions,
        response.data.data.status
      ));
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

export const updateUser = (id, userData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    if (response.data.success) {
      // Update the user in the store
      Object.keys(userData).forEach(key => {
        dispatch(UpdateUser(id, key, userData[key]));
      });
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    console.error('Error updating user:', err);
    throw err;
  }
};

export const archiveUser = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    if (response.data.success) {
      dispatch(DeleteUser(id));
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    console.error('Error archiving user:', err);
    throw err;
  }
};

export const restoreUser = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/${id}/restore`);
    if (response.data.success) {
      dispatch(RestoreUser(id));
      return response.data;
    } else {
      throw new Error(response.data.error);
    }
  } catch (err) {
    console.error('Error restoring user:', err);
    throw err;
  }
};

export default UserSlice.reducer;
