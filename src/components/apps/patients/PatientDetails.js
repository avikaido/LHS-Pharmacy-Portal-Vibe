import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Chip,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Stack,
  Grid,
  Tooltip,
  Badge,
  MenuItem,
} from '@mui/material';
import {
  isEdit,
  updatePatient,
  DeletePatient,
  toggleStarredPatient,
} from 'src/store/apps/patients/PatientSlice';

import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy, IconUser, IconCalendar, IconClock, IconHistory, IconShield, IconFileText, IconMail, IconPhone, IconMapPin, IconBuilding, IconCreditCard } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { format, isValid, parseISO } from 'date-fns';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

const genders = [
  {
    value: 'female',
    label: 'Female',
  },
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const states = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
];

const PatientDetails = () => {
  //const patientDetail = useSelector(
  //  (state) => state.patientsReducer.patients[state.patientsReducer.patientContent - 1],
  //);
  const patients = useSelector((state) => state.patientsReducer.patients);
  const patientId = useSelector((state) => state.patientsReducer.patientContent) || (patients.length > 0 ? patients[0].id : null);
  const patientDetail = patients.find((patient) => patient.id === patientId) || null;


  const editPatient = useSelector((state) => state.patientsReducer.editPatient);
  const dispatch = useDispatch();

  const tableData = [
    { id: 1, title: 'First Name', alias: 'first_name', gdata: patientDetail?.first_name || '', type: 'text' },
    { id: 2, title: 'Middle Initial', alias: 'middle_initial', gdata: patientDetail?.middle_initial || '', type: 'text' },
    { id: 3, title: 'Last Name', alias: 'last_name', gdata: patientDetail?.last_name || '', type: 'text' },
    { id: 4, title: 'Date of Birth', alias: 'dob', gdata: patientDetail?.dob || '', type: 'date' },
    { id: 5, title: 'Gender', alias: 'gender', gdata: patientDetail?.gender || '', type: 'text' },
    { id: 6, title: 'Email', alias: 'email', gdata: patientDetail?.email || '', type: 'email' },
    { id: 7, title: 'Phone', alias: 'phone', gdata: patientDetail?.phone || '', type: 'phone' },
    { id: 8, title: 'Address', alias: 'address', gdata: patientDetail?.address || '', type: 'text' },
    { id: 9, title: 'Address Line 2', alias: 'address2', gdata: patientDetail?.address2 || '', type: 'text' },
    { id: 10, title: 'City', alias: 'city', gdata: patientDetail?.city || '', type: 'text' },
    { id: 11, title: 'State', alias: 'state', gdata: patientDetail?.state || '', type: 'text' },
    { id: 12, title: 'Zip Code', alias: 'zipcode', gdata: patientDetail?.zipcode || '', type: 'text' },
    { id: 13, title: 'Primary Insurance', alias: 'insurance1', gdata: patientDetail?.insurance1 || '', type: 'text' },
    { id: 14, title: 'Primary Insurance Member ID', alias: 'insurance1_id', gdata: patientDetail?.insurance1_id || '', type: 'text' },
    { id: 15, title: 'Secondary Insurance', alias: 'insurance2', gdata: patientDetail?.insurance2 || '', type: 'text' },
    { id: 16, title: 'Secondary Insurance Member ID', alias: 'insurance2_id', gdata: patientDetail?.insurance2_id || '', type: 'text' },
    { id: 17, title: 'Notes', alias: 'notes', gdata: patientDetail?.notes || '', type: 'text' },
    //{ id: 18, title: 'Requests', alias: 'requests', gdata: patientDetail?.requests?.join(', ') || '', type: 'text' },
    { id: 18, title: 'Requests', alias: 'requests', gdata: patientDetail?.requests || '', type: 'text' },

    // New fields from SQL table
    { id: 19, title: 'UUID', alias: 'uuid', gdata: patientDetail?.uuid || '', type: 'text' },
    { id: 20, title: 'Slug', alias: 'slug', gdata: patientDetail?.slug || '', type: 'text' },
    { id: 21, title: 'Created On', alias: 'created_on', gdata: patientDetail?.created_on || '', type: 'datetime' },
    { id: 22, title: 'Created By', alias: 'created_by', gdata: patientDetail?.created_by || '', type: 'text' },
    { id: 23, title: 'Updated On', alias: 'updated_on', gdata: patientDetail?.updated_on || '', type: 'datetime' },
    { id: 24, title: 'Updated By', alias: 'updated_by', gdata: patientDetail?.updated_by || '', type: 'text' },
    { id: 25, title: 'Deleted', alias: 'deleted', gdata: patientDetail?.deleted ? 'Yes' : 'No', type: 'boolean' },
    { id: 26, title: 'Deleted On', alias: 'deleted_on', gdata: patientDetail?.deleted_on || '', type: 'datetime' },
    { id: 27, title: 'Deleted By', alias: 'deleted_by', gdata: patientDetail?.deleted_by || '', type: 'text' },
    { id: 28, title: 'Visibility', alias: 'visibility', gdata: patientDetail?.visibility || '', type: 'text' },
    { id: 29, title: 'Version', alias: 'version', gdata: patientDetail?.version || '', type: 'number' },
    { id: 30, title: 'Previous Version ID', alias: 'previous_id', gdata: patientDetail?.previous_id || '', type: 'number' },
    { id: 31, title: 'Change Log', alias: 'change_log', gdata: patientDetail?.change_log || '', type: 'text' },
    { id: 32, title: 'Status', alias: 'status', gdata: patientDetail?.status || '', type: 'text' },
    { id: 33, title: 'User Manager ID', alias: 'users', gdata: patientDetail?.users || '', type: 'number' },
    { id: 34, title: 'Associated Faxes', alias: 'faxes', gdata: patientDetail?.faxes?.join(', ') || '', type: 'text' },
];


  const requestsTableData = [
  {
    id: 101,
    pharmacyname: 'CVS Pharmacy #123',
    doctorname: 'Andrew Albright',
    orderitem: 'Dapagliflozin',
    orderDate: new Date(),
    status: 'Processing',
  },
  {
    id: 102,
    pharmacyname: 'Walgreens #456',
    doctorname: 'David Patel',
    orderitem: 'Lisinopril',
    orderDate: new Date(),
    status: 'Complete',
  },
];

const requests = requestsTableData;

const orderDate = requestsTableData.orderDate
    ? isValid(parseISO(requestsTableData.orderDate))
      ? format(parseISO(requestsTableData.orderDate), 'MM/dd/yyyy hh:mm')
      : 'Invalid Date'
    : format(new Date(), 'MM/dd/yyyy hh:mm');

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Patient Detail Part */}
      {/* ------------------------------------------- */}
      {patientDetail && !patientDetail.deleted ? (
        <>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Patient Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              {/* ------------------------------------------- */}
              {/* Disabled - Favorites - V1.0 */}
              {/* <Tooltip title={patientDetail.starred ? 'Unstar' : 'Star'}>
                <IconButton onClick={() => dispatch(toggleStarredPatient(patientDetail.id))}>
                  <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: patientDetail.starred ? '#FFC107' : '',
                      stroke: patientDetail.starred ? '#FFC107' : '',
                    }}
                  />
                </IconButton>
              </Tooltip>*/}
              {/* ------------------------------------------- */}
              <Tooltip title={editPatient ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPatient ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />
          {/* ------------------------------------------- */}
          {/* Patient Table Part */}
          {/* ------------------------------------------- */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPatient ? (
              <Box>
                <Box p={3}>
                  <Box display="flex" alignItems="center">
                   {/* ------------------------------------------- */}
                    {/* Disabled - Avatar - V1.0 */}
                    {/*<Avatar
                      alt={pharmacyDetail.image}
                      src={pharmacyDetail.image}
                      sx={{ width: '72px', height: '72px' }}
                    />*/}
                    {/* ------------------------------------------- */}
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" mb={0.5}>
                        {patientDetail.first_name} {patientDetail.middle_initial} {patientDetail.last_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {patientDetail.dob ? format(parseISO(patientDetail.dob), 'MM/dd/yyyy') : ''}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {patientDetail.gender}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container>
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Contact Information
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconMail size={18} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {patientDetail.email}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconPhone size={18} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {patientDetail.phone}
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconMapPin size={18} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {patientDetail.address}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconBuilding size={18} />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {patientDetail.address2}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item lg={4} xs={12} mt={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {patientDetail.city}
                      </Typography>
                    </Grid>
                    <Grid item lg={4} xs={12} mt={2}>
                      {editPatient ? (
                        <CustomSelect
                          fullWidth
                          label="State"
                          value={patientDetail.state}
                          onChange={(e) => dispatch(updatePatient(patientDetail.id, 'state', e.target.value))}
                        >
                          {states.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      ) : (
                        <Typography variant="subtitle1" fontWeight={600}>
                          {patientDetail.state}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item lg={4} xs={12} mt={2}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {patientDetail.zipcode}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Insurance Information
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} mt={2}>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Stack spacing={2}>
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <IconCreditCard size={18} />
                              <Typography variant="subtitle1" fontWeight={600}>
                                Primary Insurance
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} mt={1}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                      Provider:
                                    </Typography>
                                    <Typography variant="body1">
                                      {patientDetail.insurance1}
                                    </Typography>
                                  </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                      Member ID:
                                    </Typography>
                                    <Typography variant="body1">
                                      {patientDetail.insurance1_id}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Stack>
                          </Box>
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <IconCreditCard size={18} />
                              <Typography variant="subtitle1" fontWeight={600}>
                                Secondary Insurance
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} mt={1}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                      Provider:
                                    </Typography>
                                    <Typography variant="body1">
                                      {patientDetail.insurance2}
                                    </Typography>
                                  </Stack>
                                </Grid>
                                <Grid item xs={6}>
                                  <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                      Member ID:
                                    </Typography>
                                    <Typography variant="body1">
                                      {patientDetail.insurance2_id}
                                    </Typography>
                                  </Stack>
                                </Grid>
                              </Grid>
                            </Stack>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>

                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Notes
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconFileText size={18} />
                          <Typography variant="body1">
                            {patientDetail.notes || 'No notes available'}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>

                    {/* Administrative Information Section */}
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Administrative Information
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconCalendar size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Created On
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {patientDetail.created_on ? format(parseISO(patientDetail.created_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconUser size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Created By
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {patientDetail.created_by || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconClock size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Last Updated
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {patientDetail.updated_on ? format(parseISO(patientDetail.updated_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconUser size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Updated By
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {patientDetail.updated_by || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconShield size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Status
                        </Typography>
                      </Stack>
                      <Chip 
                        label={patientDetail.status || 'Active'} 
                        color={patientDetail.status === 'Active' ? 'success' : 'default'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Grid>
                    <Grid item lg={6} xs={12} mt={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconHistory size={18} />
                        <Typography variant="body2" color="text.secondary">
                          Version
                        </Typography>
                      </Stack>
                      <Badge badgeContent={patientDetail.version || '1'} color="primary" sx={{ mt: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Current Version
                        </Typography>
                      </Badge>
                    </Grid>
                    {patientDetail.deleted && (
                      <>
                        <Grid item lg={6} xs={12} mt={2}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <IconCalendar size={18} />
                            <Typography variant="body2" color="text.secondary">
                              Deleted On
                            </Typography>
                          </Stack>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            {patientDetail.deleted_on ? format(parseISO(patientDetail.deleted_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                          </Typography>
                        </Grid>
                        <Grid item lg={6} xs={12} mt={2}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <IconUser size={18} />
                            <Typography variant="body2" color="text.secondary">
                              Deleted By
                            </Typography>
                          </Stack>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            {patientDetail.deleted_by || 'N/A'}
                          </Typography>
                        </Grid>
                      </>
                    )}

                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Requests
                      </Typography>

                      <Paper variant="outlined">
                      <TableContainer >
                      <Table
                        aria-label="simple table"
                        sx={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <Typography variant="h6">ID</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Date/Time</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Item</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Pharmacy</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Physician</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Status</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {requests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <Typography variant="h6" fontWeight="600">
                                  {request.id}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip size="small" color="secondary" variant="outlined" label={orderDate}></Chip>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{request.orderitem}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">
                                  {request.pharmacyname}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{request.doctorname}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">
                                  {request.status === 'Processing' ? (
                                    <Chip color="primary" label={request.status} size="small" />
                                  ) : request.status === 'Complete' ? (
                                    <Chip color="success" label={request.status} size="small" />
                                  ) : request.status === 'Created' ? (
                                    <Chip color="warning" label={request.status} size="small" />
                                  ) : (
                                    ''
                                  )}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </Paper>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box p={3} gap={1} display="flex">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(isEdit())}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(DeletePatient(patientDetail.id))}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <BlankCard sx={{ p: 0, height: '100%' }}>
                  <Scrollbar sx={{ height: '100%' }}>
                    <Box p={3}>
                      {/* Basic Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Basic Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="First Name"
                              value={patientDetail?.first_name || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'first_name', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="Middle Initial"
                              value={patientDetail?.middle_initial || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'middle_initial', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="Last Name"
                              value={patientDetail?.last_name || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'last_name', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              type="date"
                              label="Date of Birth"
                              value={patientDetail?.dob ? patientDetail.dob.split('T')[0] : ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'dob', e.target.value))}
                              InputLabelProps={{ shrink: true }}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <CustomSelect
                              fullWidth
                              label="Gender"
                              value={patientDetail?.gender || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'gender', e.target.value))}
                            >
                              {genders.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Contact Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Contact Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              type="email"
                              label="Email"
                              value={patientDetail?.email || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'email', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Phone"
                              value={patientDetail?.phone || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'phone', e.target.value))}
                            />
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Address Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Address Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Address"
                              value={patientDetail?.address || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'address', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Address Line 2"
                              value={patientDetail?.address2 || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'address2', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="City"
                              value={patientDetail?.city || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'city', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            {editPatient ? (
                              <CustomSelect
                                fullWidth
                                label="State"
                                value={patientDetail?.state || ''}
                                onChange={(e) => dispatch(updatePatient(patientDetail.id, 'state', e.target.value))}
                              >
                                {states.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </CustomSelect>
                            ) : (
                              <Typography variant="subtitle1" fontWeight={600}>
                                {patientDetail?.state || ''}
                              </Typography>
                            )}
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="Zip Code"
                              value={patientDetail?.zipcode || ''}
                              onChange={(e) => dispatch(updatePatient(patientDetail.id, 'zipcode', e.target.value))}
                            />
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Insurance Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Insurance Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Stack spacing={3}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                Primary Insurance
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Provider"
                                    value={patientDetail?.insurance1 || ''}
                                    onChange={(e) => dispatch(updatePatient(patientDetail.id, 'insurance1', e.target.value))}
                                  />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Member ID"
                                    value={patientDetail?.insurance1_id || ''}
                                    onChange={(e) => dispatch(updatePatient(patientDetail.id, 'insurance1_id', e.target.value))}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                                Secondary Insurance
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Provider"
                                    value={patientDetail?.insurance2 || ''}
                                    onChange={(e) => dispatch(updatePatient(patientDetail.id, 'insurance2', e.target.value))}
                                  />
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="Member ID"
                                    value={patientDetail?.insurance2_id || ''}
                                    onChange={(e) => dispatch(updatePatient(patientDetail.id, 'insurance2_id', e.target.value))}
                                  />
                                </Grid>
                              </Grid>
                            </Box>
                          </Stack>
                        </Paper>
                      </Box>

                      {/* Notes */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Notes
                        </Typography>
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Notes"
                          value={patientDetail?.notes || ''}
                          onChange={(e) => dispatch(updatePatient(patientDetail.id, 'notes', e.target.value))}
                        />
                      </Box>

                      {/* Administrative Information (Read-only) */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Administrative Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Created On
                              </Typography>
                              <Typography variant="body1">
                                {patientDetail.created_on ? format(parseISO(patientDetail.created_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Created By
                              </Typography>
                              <Typography variant="body1">
                                {patientDetail.created_by || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Last Updated
                              </Typography>
                              <Typography variant="body1">
                                {patientDetail.updated_on ? format(parseISO(patientDetail.updated_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Updated By
                              </Typography>
                              <Typography variant="body1">
                                {patientDetail.updated_by || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Status
                              </Typography>
                              <Chip 
                                label={patientDetail.status || 'Active'} 
                                color={patientDetail.status === 'Active' ? 'success' : 'default'}
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Version
                              </Typography>
                              <Badge badgeContent={patientDetail.version || '1'} color="primary">
                                <Typography variant="body1">
                                  Current Version
                                </Typography>
                              </Badge>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => dispatch(isEdit())}
                        >
                          Save Patient
                        </Button>
                      </Box>
                    </Box>
                  </Scrollbar>
                </BlankCard>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
          {/* ------------------------------------------- */}
          {/* If no Patient  */}
          {/* ------------------------------------------- */}
          <Box>
            <Typography variant="h4">Please Select a Patient</Typography>
            <br />
            <img src={emailIcon} alt="Email Icon" width={'250px'} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PatientDetails;
