
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

const PhysicianListItem = ({
  onPhysicianClick,
  onDeleteClick,
  id,
  first_name,
  middle_initial,
  last_name,
  image,
  specialty,
  practice_name,
  starred,
  active,
}) => {

  return (
    <ListItemButton sx={{ mb: 1 }} selected={active}>
      {/* ------------------------------------------- */}
      {/* Disabled - Avatars - V1.0 */}
      {/* <ListItemAvatar>
        <Avatar alt={image} src={image} />
      </ListItemAvatar>*/}
      {/* ------------------------------------------- */}
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto" onClick={onPhysicianClick}>
            <Typography variant="subtitle1" noWrap fontWeight={600} sx={{ maxWidth: '150px' }}>
              {first_name} {middle_initial} {last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {specialty} - {practice_name}
            </Typography>
          </Box>
          {/* ------------------------------------------- */}
          {/* Disabled - Favorites - V1.0 */}
          {/* <IconStar
            onClick={onStarredClick}
            size="16"
            stroke={1.5}
            style={{ fill: starred ? '#FFC107' : '', stroke: starred ? '#FFC107' : '' }}
          />*/}
          {/* ------------------------------------------- */}
          <IconTrash onClick={onDeleteClick} size="16" stroke={1.5} />
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};

export default PhysicianListItem;