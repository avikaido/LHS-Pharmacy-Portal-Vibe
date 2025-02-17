import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Fab, TextField, InputAdornment } from '@mui/material';

import { SearchUser } from '../../../store/apps/users/UserSlice';
import { IconMenu2, IconSearch } from '@tabler/icons';

const UserSearch = ({ onClick }) => {
  const searchTerm = useSelector((state) => state.usersReducer.userSearch);
  const dispatch = useDispatch();

  return (
    <Box display="flex" sx={{ p: 2 }}>
      <Fab
        onClick={onClick}
        color="primary"
        size="small"
        sx={{ mr: 1, flexShrink: '0', display: { xs: 'block', lineHeight: '10px', lg: 'none' } }}
      >
        <IconMenu2 width="16" />
      </Fab>
      <TextField
        id="outlined-basic"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconSearch size={'16'} />
            </InputAdornment>
          ),
        }}
        fullWidth
        size="small"
        value={searchTerm}
        placeholder="Search Users"
        variant="outlined"
        onChange={(e) => dispatch(SearchUser(e.target.value))}
      />
    </Box>
  );
};

export default UserSearch;
