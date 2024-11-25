import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Tooltip,
  TextField,
  Pagination,
  TableContainer,
} from '@mui/material';
import { fetchItems, DeleteItem, SearchItem } from '../../../store/apps/items/ItemSlice';
import { IconTrash } from '@tabler/icons';

const ItemListing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Define the color coding for different Schedules
  const getScheduleColor = (schedule) => {
    switch (schedule.toLowerCase()) {
      case 'schedule ii':
        return 'error'; // Red color for Schedule II
      case 'schedule iii':
        return 'warning'; // Amber/Yellow for Schedule III
      case 'schedule iv':
        return 'primary'; // Blue for Schedule IV
      case 'schedule v':
        return 'info'; // Light blue for Schedule V
      case 'otc':
        return 'success'; // Green for Over-The-Counter drugs
      case 'rx':
        return 'secondary'; // Gray for Prescription drugs
      default:
        return 'default'; // Default color if no match
    }
  };

  const getVisibleItems = (items, filter, itemSearch) => {
    switch (filter) {
      case 'total_items':
        return items.filter(
          (c) => !c.deleted && c.GenericName.toLocaleLowerCase().includes(itemSearch),
        );
      case 'Pending':
        return items.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Pending' &&
            c.GenericName.toLocaleLowerCase().includes(itemSearch),
        );
      case 'Closed':
        return items.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Closed' &&
            c.GenericName.toLocaleLowerCase().includes(itemSearch),
        );
      case 'Open':
        return items.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Open' &&
            c.GenericName.toLocaleLowerCase().includes(itemSearch),
        );
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const items = useSelector((state) =>
    getVisibleItems(
      state.itemReducer.items,
      state.itemReducer.currentFilter,
      state.itemReducer.itemSearch,
    ),
  );

  return (
    <Box mt={4}>
      <Box sx={{ maxWidth: '260px', ml: 'auto' }} mb={3}>
        <TextField
          size="small"
          label="Search"
          fullWidth
          onChange={(e) => dispatch(SearchItem(e.target.value))}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Generic Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Brand Name</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Class</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Use</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Schedule</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Dosage</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Side Effects</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Pregnancy Category</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.Id} hover>
                <TableCell>{item.Id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {item.GenericName}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" noWrap>
                    {item.BrandName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.Class}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.Use}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                  sx={{
                    backgroundColor: (theme) => {
                      const color = theme.palette[getScheduleColor(item.Schedule)];
                      return color ? color.light : theme.palette.grey[300]; // Fallback to grey if color is undefined
                    },
                  }}
                  size="small"
                  label={item.Schedule}
                />
                </TableCell>
                <TableCell>
                  <Typography>{item.Dosage}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.SideEffects}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.PregnancyCategory}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.Date}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Item">
                    <IconButton onClick={() => dispatch(DeleteItem(item.Id))}>
                      <IconTrash size="18" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box my={3} display="flex" justifyContent={'center'}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default ItemListing;
