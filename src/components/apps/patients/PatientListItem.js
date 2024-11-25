import React from 'react';
import {
  ListItemText,
  Box,
  Avatar,
  ListItemButton,
  Typography,
  Stack,
  ListItemAvatar,
} from '@mui/material';

import { IconStar, IconTrash } from '@tabler/icons';

const PatientListItem = ({
  onPatientClick,
  onStarredClick,
  onDeleteClick,
  id,
  firstname,
  lastname,
  middleinitial,
  email,
  dob,
  image,
  starred,
  active,
}) => {
  return (
    <ListItemButton sx={{ mb: 1 }} selected={active} onClick={onPatientClick}>
      <ListItemAvatar>
        <Avatar alt={image} src={image} />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto">
            <Typography variant="subtitle1" noWrap fontWeight={600} sx={{ maxWidth: '150px' }}>
              {firstname} {middleinitial} {lastname}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {dob}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {email}
            </Typography>
          </Box>
          <IconStar
            onClick={(e) => {
              e.stopPropagation();
              onStarredClick();
            }}
            size="16"
            stroke={1.5}
            style={{ fill: starred ? '#FFC107' : '', stroke: starred ? '#FFC107' : '' }}
          />
          <IconTrash
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }}
            size="16"
            stroke={1.5}
          />
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};

export default PatientListItem;
