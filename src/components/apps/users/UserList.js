import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectUser,
  fetchUsers,
  DeleteUser,
  toggleStarredUser,
} from '../../../store/apps/users/UserSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import UserListItem from './UserListItem';

const UserList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const getVisibleUsers = (users, filter, userSearch) => {
    switch (filter) {
      case 'show_all':
        return users.filter(
          (p) => !p.deleted && (p.first_name || '').toLowerCase().includes(userSearch)
        );

      case 'frequent_user':
        return users.filter(
          (p) =>
            !p.deleted &&
            p.frequently_contacted &&
            (p.first_name || '').toLowerCase().includes(userSearch)
        );

      case 'starred_user':
        return users.filter(
          (p) => !p.deleted && p.starred && (p.first_name || '').toLowerCase().includes(userSearch)
        );

      case 'new_user':
        return users.filter(
          (p) =>
            !p.deleted &&
            p.ecname &&
            (p.first_name || '').toLowerCase().includes(userSearch)
        );

      case 'repeat_user':
        return users.filter(
          (p) =>
            !p.deleted &&
            p.requests && p.requests.length > 0 &&
            (p.first_name || '').toLowerCase().includes(userSearch)
        );

      case 'older_user':
        return users.filter(
          (p) =>
            !p.deleted &&
            p.requests && p.requests.length > 0 &&
            (p.first_name || '').toLowerCase().includes(userSearch)
        );  

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  
  const users = useSelector((state) =>
    getVisibleUsers(
      state.usersReducer.users,
      state.usersReducer.currentFilter,
      state.usersReducer.userSearch,
    ),
  );

  const active = useSelector((state) => state.usersReducer.userContent);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {users.map((user) => (
          <UserListItem
            key={user.id}
            id={user.id}
            first_name={user.first_name}
            last_name={user.last_name}
            middle_initial={user.middle_initial}
            email={user.email}
            dob={user.dob}
            image={user.image}
            starred={user.starred}
            active={user.id === active}
            onUserClick={() => {
              dispatch(SelectUser(user.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(DeleteUser(user.id))}
            onStarredClick={() => dispatch(toggleStarredUser(user.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default UserList;
