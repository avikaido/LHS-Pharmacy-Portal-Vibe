import axios from '../../../utils/axios';
import { createSlice } from '@reduxjs/toolkit';

const API_URL = '/api/data/users/UsersData';

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
      const index = state.users.findIndex((user) => user.id === action.payload);
      state.users.splice(index, 1);
    },
    toggleStarredUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload ? { ...user, starred: !user.starred } : user,
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
  getUsers,
  SearchUser,
  isEdit,
  SelectUser,
  DeleteUser,
  toggleStarredUser,
  UpdateUser,
  addUser,
  setVisibilityFilter,
} = UserSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch(getUsers(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export default UserSlice.reducer;
