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

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

const PatientListItem = ({
  onPatientClick,
  onStarredClick,
  onDeleteClick,
  id,
  first_name,
  last_name,
  middle_initial,
  email,
  dob,
  image,
  starred,
  active,
}) => {
  return (
    <ListItemButton sx={{ mb: 1 }} selected={active} onClick={onPatientClick}>
      {/* ------------------------------------------- */}
      {/* Disabled - Avatars - V1.0 */}
      {/* <ListItemAvatar>
        <Avatar alt={image} src={image} />
      </ListItemAvatar>*/}
      {/* ------------------------------------------- */}
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto">
            <Typography variant="subtitle1" noWrap fontWeight={600} sx={{ maxWidth: '150px' }}>
              {first_name} {middle_initial} {last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {formatDate(dob)}
            </Typography>
          </Box>
          {/* ------------------------------------------- */}
          {/* Disabled - Favorites - V1.0 */}
          {/* <IconStar
            onClick={(e) => {
              e.stopPropagation();
              onStarredClick();
            }}
            size="16"
            stroke={1.5}
            style={{ fill: starred ? '#FFC107' : '', stroke: starred ? '#FFC107' : '' }}
          />*/}
          {/* ------------------------------------------- */}
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
