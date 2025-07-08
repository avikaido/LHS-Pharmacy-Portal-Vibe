import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  FormControlLabel,
  TextField,
  Chip,
  Alert,
  CircularProgress,
  Switch,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { fetchFaxes, SearchFax } from '../../../store/apps/faxes/FaxSlice';
import { IconFilter } from '@tabler/icons';
import { format, parseISO } from 'date-fns';

// Sorting functions
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Table head cells configuration
const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'created_on',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'fax',
    numeric: false,
    disablePadding: false,
    label: 'Fax Number',
  },
  {
    id: 'pharmacy_name',
    numeric: false,
    disablePadding: false,
    label: 'Pharmacy',
  },
  {
    id: 'physician_name',
    numeric: false,
    disablePadding: false,
    label: 'Doctor',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'doc_link',
    numeric: false,
    disablePadding: false,
    label: 'Document',
  },
  {
    id: 'requests',
    numeric: true,
    disablePadding: false,
    label: 'Request',
  },
  {
    id: 'patients',
    numeric: true,
    disablePadding: false,
    label: 'Patient',
  },
];

// Enhanced Table Head Component
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle1" fontWeight="500">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Enhanced Table Toolbar Component
const EnhancedTableToolbar = (props) => {
  const { searchValue, onSearchChange } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        Faxes
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          size="small"
          label="Search Faxes"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter width={18} />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

const FaxListing = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('desc'); // Default to newest first
  const [orderBy, setOrderBy] = useState('created_on');
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [pharmacyFilter, setPharmacyFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('');

  useEffect(() => {
    dispatch(fetchFaxes());
  }, [dispatch]);

  // Format phone number to 555-789-0123 format
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'N/A';
    
    // Remove all non-digit characters
    const digits = phoneNumber.replace(/\D/g, '');
    
    // Format as 555-789-0123
    if (digits.length === 10) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    
    return phoneNumber; // Return original if can't format
  };

  // Format date to MM/DD/YYYY HH:MM AM/PM
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = parseISO(dateString);
      return format(date, 'MM/dd/yyyy hh:mm a');
    } catch (error) {
      return dateString; // Return original if can't parse
    }
  };

  // Define the color coding for different Status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'failed':
        return 'error'; // Red color for failed
      case 'timeout':
        return 'warning'; // Amber/Yellow for timeout
      case 'successful':
        return 'success'; // Green for successful
      case 'pending':
        return 'info'; // Blue for pending
      default:
        return 'default'; // Default color if no match
    }
  };

  // Define colors for fax type
  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'incoming':
        return 'success'; // Green for incoming
      case 'outgoing':
        return 'primary'; // Blue for outgoing
      default:
        return 'default';
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(0); // Reset to first page when searching
    dispatch(SearchFax(value));
  };

  // Get faxes from Redux state
  const allFaxes = useSelector((state) => state.faxReducer.faxes);
  const loading = useSelector((state) => state.faxReducer.loading);
  const error = useSelector((state) => state.faxReducer.error);

  // Filter faxes based on search
  const filteredFaxes = allFaxes.filter(fax => 
    !fax.deleted && 
    (fax.fax || '').toLowerCase().includes(searchValue.toLowerCase())
  );

  // Sort and paginate faxes
  const sortedFaxes = stableSort(filteredFaxes, getComparator(order, orderBy));
  const paginatedFaxes = sortedFaxes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredFaxes.length) : 0;

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
        <Alert severity="error">
          Error loading faxes: {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Paper variant="outlined">
        <EnhancedTableToolbar 
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredFaxes.length}
            />
            <TableBody>
              {paginatedFaxes.map((fax, index) => {
                const labelId = `enhanced-table-fax-${index}`;
                const physicianName = (fax.physician_first_name || fax.physician_last_name)
                  ? `${fax.physician_first_name || ''} ${fax.physician_last_name || ''}`.trim()
                  : '';

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={fax.id}
                  >
                    <TableCell align="right">
                      <Typography variant="body2">
                        {fax.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(fax.created_on)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight="500" noWrap>
                        {formatPhoneNumber(fax.fax)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {fax.pharmacy_name || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {physicianName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={fax.type}
                        size="small"
                        color={getTypeColor(fax.type)}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        sx={{
                          backgroundColor: (theme) => {
                            const color = theme.palette[getStatusColor(fax.status)];
                            return color ? color.light : theme.palette.grey[300];
                          },
                        }}
                        size="small"
                        label={fax.status}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {fax.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" noWrap>
                        {fax.doc_link || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {fax.requests || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {fax.patients || 'N/A'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredFaxes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Box p={2}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default FaxListing;
