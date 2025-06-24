import React from 'react';
import {
  ListItemText,
  Box,
  Avatar,
  ListItemButton,
  Typography,
  Stack,
  ListItemAvatar,
  Chip,
} from '@mui/material';

import { IconStar, IconTrash, IconArchive } from '@tabler/icons';

const PharmacistListItem = ({
  onPharmacistClick,
  onStarredClick,
  onDeleteClick,
  id,
  firstname,
  lastname,
  image,
  department,
  starred,
  active,
  deleted,
}) => {

  return (
    <ListItemButton 
      sx={{ 
        mb: 1,
        opacity: deleted ? 0.7 : 1,
        backgroundColor: deleted ? 'warning.light' : 'transparent',
        '&:hover': {
          backgroundColor: deleted ? 'warning.light' : undefined,
        }
      }} 
      selected={active} 
      onClick={onPharmacistClick}
    >
      {/* ------------------------------------------- */}
      {/* Disabled - Avatars - V1.0 */}
      {/* <ListItemAvatar>
        <Avatar alt={image} src={image} />
      </ListItemAvatar>*/}
      {/* ------------------------------------------- */}
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto">
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography 
                variant="subtitle1" 
                noWrap 
                fontWeight={600} 
                sx={{ 
                  maxWidth: '150px',
                  textDecoration: deleted ? 'line-through' : 'none',
                  color: deleted ? 'text.secondary' : 'text.primary'
                }}
              >
                {firstname} {lastname}
              </Typography>
              {deleted && (
                <Chip 
                  label="Archived" 
                  size="small" 
                  color="warning" 
                  icon={<IconArchive size={12} />}
                />
              )}
            </Stack>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              noWrap
              sx={{
                textDecoration: deleted ? 'line-through' : 'none',
              }}
            >
              {department}
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
          <IconTrash 
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick();
            }} 
            size="16" 
            stroke={1.5} 
            color={deleted ? 'warning.main' : 'error.main'}
          />
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};

export default PharmacistListItem;