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
import { fetchFaxes, DeleteFax, SearchFax } from '../../../store/apps/faxes/FaxSlice';
import { IconTrash } from '@tabler/icons';

const FaxListing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFaxes());
  }, [dispatch]);

  // Define the color coding for different Status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'failed':
        return 'error'; // Red color for failed
      case 'timeout':
        return 'warning'; // Amber/Yellow for timeout
      case 'successful':
        return 'success'; // Green for successful
      default:
        return 'default'; // Default color if no match
    }
  };

  const getVisibleFaxes = (faxes, filter, faxSearch) => {
    switch (filter) {
      case 'total_faxes':
        return faxes.filter(
          (c) => !c.deleted && c.fax.includes(faxSearch),
        );
      case 'Failed':
        return faxes.filter(
          (c) =>
            !c.deleted &&
            c.status === 'failed' &&
            c.fax.includes(faxSearch),
        );
      case 'Timeout':
        return faxes.filter(
          (c) =>
            !c.deleted &&
            c.status === 'timeout' &&
            c.fax.includes(faxSearch),
        );
      case 'Successful':
        return faxes.filter(
          (c) =>
            !c.deleted &&
            c.status === 'successful' &&
            c.fax.includes(faxSearch),
        );
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const faxes = useSelector((state) =>
    getVisibleFaxes(
      state.faxReducer.faxes,
      state.faxReducer.currentFilter,
      state.faxReducer.faxSearch,
    ),
  );

  return (
    <Box mt={4}>
      <Box sx={{ maxWidth: '260px', ml: 'auto' }} mb={3}>
        <TextField
          size="small"
          label="Search"
          fullWidth
          onChange={(e) => dispatch(SearchFax(e.target.value))}
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
                <Typography variant="h6">Fax Number</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Type</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Document</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Request</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Patient</Typography>
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
            {faxes.map((fax) => (
              <TableRow key={fax.id} hover>
                <TableCell>{fax.id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" fontWeight="500" noWrap>
                      {fax.fax}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" noWrap>
                    {fax.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                  sx={{
                    backgroundColor: (theme) => {
                      const color = theme.palette[getStatusColor(fax.status)];
                      return color ? color.light : theme.palette.grey[300]; // Fallback to grey if color is undefined
                    },
                  }}
                  size="small"
                  label={fax.status}
                />
                </TableCell>
                <TableCell>
                  <Typography>{fax.code}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{fax.doc_link}</Typography>
                </TableCell>
               
                <TableCell>
                  <Typography>{fax.requests}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{fax.patients}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{fax.created_on}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Fax">
                    <IconButton onClick={() => dispatch(DeleteFax(fax.id))}>
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

export default FaxListing;
