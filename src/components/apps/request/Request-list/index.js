import React, { useContext, useState } from 'react';
import { RequestContext } from '../../../../context/RequestContext/index';
import {
  Table,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Grid,
  Stack,
  InputAdornment,
  Chip,
} from '@mui/material';
import { format, isValid, parseISO } from 'date-fns';
import {
  IconEdit,
  IconEye,
  IconListDetails,
  IconSearch,
  IconShoppingBag,
  IconSortAscending,
  IconTrash,
  IconTruck,
} from "@tabler/icons";
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import { Link } from 'react-router-dom';

const RequestList = () => {
  const { requests, deleteRequest } = useContext(RequestContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const tabItem = ['All', 'Processing', 'Complete', 'Created'];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle status filter change
  const handleClick = (status) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tabItem.length);
    setActiveTab(status);
  };

  // Filter requests based on search term
  const filteredRequests = requests.filter((request) => {
    return (
      ((request.patient_first_name + ' ' + (request.patient_middle_initial || '') + ' ' + request.patient_last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.doctor_first_name + ' ' + (request.doctor_middle_initial || '') + ' ' + request.doctor_last_name).toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeTab === 'All' || request.status === activeTab)
    );
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Calculate the counts for different statuses
  const Processing = requests.filter((t) => t.status === 'Processing').length;
  const Complete = requests.filter((t) => t.status === 'Complete').length;
  const Created = requests.filter((t) => t.status === 'Created').length;

  // Toggle all checkboxes
  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedRequests(requests.map((request) => request.id));
    } else {
      setSelectedRequests([]);
    }
  };

  // Toggle individual request selection
  const toggleSelectRequest = (requestId) => {
    const index = selectedRequests.indexOf(requestId);
    if (index === -1) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests.filter((id) => id !== requestId));
    }
  };

  // Handle opening delete confirmation dialog
  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  // Handle confirming deletion of selected requests
  const handleConfirmDelete = async () => {
    for (const requestId of selectedRequests) {
      await deleteRequest(requestId);
    }
    setSelectedRequests([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
  };

  // Handle closing delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const orderDate = selectedRequests.orderDate
    ? isValid(parseISO(selectedRequests.orderDate))
      ? format(parseISO(selectedRequests.orderDate), 'MM/dd/yyyy hh:mm')
      : 'Invalid Date'
    : format(new Date(), 'MM/dd/yyyy hh:mm');

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="primary.light" p={3} onClick={() => handleClick("All")} sx={{ cursor: "pointer" }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconListDetails width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Total</Typography>
                <Typography fontWeight={500}>{requests.length} Requests</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="secondary.light" p={3} onClick={() => handleClick("Processing")} sx={{ cursor: "pointer" }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="secondary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconShoppingBag width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Processing</Typography>
                <Typography fontWeight={500}>{Processing} Requests</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="success.light" p={3} onClick={() => handleClick("Complete")} sx={{ cursor: "pointer" }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="success.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconTruck width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Complete</Typography>
                <Typography fontWeight={500}>{Complete} Requests</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box bgcolor="warning.light" p={3} onClick={() => handleClick("Created")} sx={{ cursor: "pointer" }}>
            <Stack direction="row" gap={2} alignItems="center">
              <Box
                width={38}
                height={38}
                bgcolor="warning.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  color="primary.contrastText"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IconSortAscending width={22} />
                </Typography>
              </Box>
              <Box>
                <Typography>Created</Typography>
                <Typography fontWeight={500}>{Created} Requests</Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Stack
        mt={3}
        justifyContent="space-between"
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <TextField
          id="search"
          type="text"
          size="small"
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" gap={1}>
          {selectAll && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              startIcon={<IconTrash width={18} />}
            >
              Delete All
            </Button>
          )}
          <Button variant="contained" color="primary" component={Link} to="/apps/request/create">
            New Request
          </Button>
        </Box>
      </Stack>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ whiteSpace: { xs: 'nowrap', md: 'unset' } }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <CustomCheckbox checked={selectAll} onChange={toggleSelectAll} />
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Id
                </Typography>
              </TableCell>
               <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Date/Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Patient
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Item
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Pharmacy
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Doctor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontSize="14px">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    checked={selectedRequests.includes(request.id)}
                    onChange={() => toggleSelectRequest(request.id)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {request.id}
                  </Typography>
                </TableCell>
                 <TableCell>
                  
                 <Chip size="small" color="secondary" variant="outlined" label={orderDate}></Chip>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {request.patient_first_name} {request.patient_middle_initial} {request.patient_last_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="14px">{request.item_generic_name}{request.item_brand_name ? ` (${request.item_brand_name})` : ''}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="14px">{request.pharmacy_name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize="14px">{request.doctor_first_name} {request.doctor_middle_initial} {request.doctor_last_name}</Typography>
                </TableCell>
                <TableCell>
                  {request.status === 'Processing' ? (
                    <Chip color="primary" label={request.status} size="small" />
                  ) : request.status === 'Complete' ? (
                    <Chip color="success" label={request.status} size="small" />
                  ) : request.status === 'Created' ? (
                    <Chip color="warning" label={request.status} size="small" />
                  ) : request.status === 'Pending' ? (
                    <Chip color="info" label={request.status} size="small" />
                  ) : request.status === 'Cancelled' ? (
                    <Chip color="error" label={request.status} size="small" />
                  ) : (
                    <Chip color="default" label={request.status} size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Request">
                    <IconButton
                      color="success"
                      component={Link}
                      to={`/apps/request/edit/${request.id}`}
                    >
                      <IconEdit width={22} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Request">
                    <IconButton
                      color="primary"
                      component={Link}
                      to={`/apps/request/detail/${request.id}`}
                    >
                      <IconEye width={22} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Request">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedRequests([request.id]);
                        handleDelete();
                      }}
                    >
                      <IconTrash width={22} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete selected requests?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RequestList;
