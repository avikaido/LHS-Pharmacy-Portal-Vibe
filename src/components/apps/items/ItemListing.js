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
  CircularProgress,
  Alert,
} from '@mui/material';
import { fetchItems, DeleteItem, SearchItem } from '../../../store/apps/items/ItemSlice';
import { IconTrash } from '@tabler/icons';

const ItemListing = () => {
  const dispatch = useDispatch();
  const { items, loading, error, currentFilter, itemSearch } = useSelector((state) => state.itemReducer);

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
    const searchTerm = itemSearch.toLowerCase();
    
    switch (filter) {
      case 'total_items':
        return items.filter(
          (item) => !item.deleted && 
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      case 'schedule_ii':
        return items.filter(
          (item) => !item.deleted && 
          item.schedule?.toLowerCase() === 'schedule ii' &&
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      case 'schedule_iii':
        return items.filter(
          (item) => !item.deleted && 
          item.schedule?.toLowerCase() === 'schedule iii' &&
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      case 'schedule_iv':
        return items.filter(
          (item) => !item.deleted && 
          item.schedule?.toLowerCase() === 'schedule iv' &&
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      case 'schedule_v':
        return items.filter(
          (item) => !item.deleted && 
          item.schedule?.toLowerCase() === 'schedule v' &&
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      case 'otc':
        return items.filter(
          (item) => !item.deleted && 
          item.schedule?.toLowerCase() === 'otc' &&
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      case 'rx':
        return items.filter(
          (item) => !item.deleted && 
          item.schedule?.toLowerCase() === 'rx' &&
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
      default:
        return items.filter(
          (item) => !item.deleted && 
          (item.generic_name?.toLowerCase().includes(searchTerm) ||
           item.brand_name?.toLowerCase().includes(searchTerm) ||
           item.class?.toLowerCase().includes(searchTerm))
        );
    }
  };

  const visibleItems = getVisibleItems(items, currentFilter, itemSearch);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
                <Typography variant="h6">Date Added</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleItems.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {item.generic_name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" noWrap>
                    {item.brand_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.class}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.use_description}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor: (theme) => {
                        const color = theme.palette[getScheduleColor(item.schedule)];
                        return color ? color.light : theme.palette.grey[300]; // Fallback to grey if color is undefined
                      },
                    }}
                    size="small"
                    label={item.schedule}
                  />
                </TableCell>
                <TableCell>
                  <Typography>{item.dosage}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.side_effects}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.pregnancy_category}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{item.date_added}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Item">
                    <IconButton onClick={() => dispatch(DeleteItem(item.id))}>
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
