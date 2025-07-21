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
import { 
  IconPencil, 
  IconStar, 
  IconTrash, 
  IconDeviceFloppy, 
  IconUser, 
  IconCalendar, 
  IconClock, 
  IconHistory, 
  IconShield, 
  IconFileText, 
  IconMail, 
  IconPhone, 
  IconMapPin, 
  IconBuilding, 
  IconCreditCard,
  IconArchive,
  IconRotate,
  IconHeart,
  IconId,
  IconNotes,
} from '@tabler/icons';
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
  const patients = useSelector((state) => state.patientsReducer.patients);
  const patientId = useSelector((state) => state.patientsReducer.patientContent) || (patients.length > 0 ? patients[0].id : null);
  const patientDetail = patients.find((patient) => patient.id === patientId) || null;

  const editPatient = useSelector((state) => state.patientsReducer.editPatient);
  const dispatch = useDispatch();

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
      {/* Patient Detail Part */}
      {patientDetail && !patientDetail.deleted ? (
        <>
          {/* Header Part */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Patient Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={editPatient ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPatient ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Archive">
                <IconButton>
                  <IconArchive size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />
          {/* Patient Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPatient ? (
              <Box>
                <BlankCard sx={{ p: 0, height: '100%' }}>
                  <Scrollbar sx={{ height: '100%' }}>
                    <Box p={3}>
                      {/* Basic Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconUser size={20} style={{ marginRight: 8 }} />
                          Basic Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  First Name
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.first_name || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Last Name
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.last_name || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Middle Initial
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.middle_initial || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCalendar size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Date of Birth
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.dob ? format(parseISO(patientDetail.dob), 'MM/dd/yyyy') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconHeart size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Gender
                                </Typography>
                              </Box>
                              <Chip 
                                label={patientDetail.gender || 'N/A'} 
                                color="primary" 
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Contact Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconPhone size={20} style={{ marginRight: 8 }} />
                          Contact Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMail size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Email
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.email || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconPhone size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Phone
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.phone || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Address Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconMapPin size={20} style={{ marginRight: 8 }} />
                          Address Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Address
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.address || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBuilding size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Address Line 2
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.address2 || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  City
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.city || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  State
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.state || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Zip Code
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.zipcode || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Insurance Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconCreditCard size={20} style={{ marginRight: 8 }} />
                          Insurance Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCreditCard size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Primary Insurance
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.insurance1 || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Primary Insurance Member ID
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.insurance1_id || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCreditCard size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Secondary Insurance
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.insurance2 || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Secondary Insurance Member ID
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.insurance2_id || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Additional Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconNotes size={20} style={{ marginRight: 8 }} />
                          Additional Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconFileText size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Notes
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.notes || 'No notes available'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Administrative Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconShield size={20} style={{ marginRight: 8 }} />
                          Administrative Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCalendar size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Created On
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.created_on ? format(parseISO(patientDetail.created_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Created By
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.created_by || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconClock size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Last Updated
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.updated_on ? format(parseISO(patientDetail.updated_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Updated By
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {patientDetail.updated_by || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconShield size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Status
                                </Typography>
                              </Box>
                              <Chip 
                                label={patientDetail.status || 'Active'} 
                                color={patientDetail.status === 'Active' ? 'success' : 'default'}
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconHistory size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Version
                                </Typography>
                              </Box>
                              <Badge badgeContent={patientDetail.version || '1'} color="primary">
                                <Typography variant="body1" fontWeight={500}>
                                  Current Version
                                </Typography>
                              </Badge>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>
                    </Box>
                  </Scrollbar>
                </BlankCard>
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
                    color="warning"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(DeletePatient(patientDetail.id))}
                  >
                    Archive
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
          {/* If no Patient */}
          <Box>
            <Typography variant="h4">Please Select a Patient</Typography>
            <br />
            <img src={emailIcon} alt="Email Icon" width={'250px'} />
          </Box>
        </Box>
      )}

      {/* Requests Section - Separate from main card */}
      {patientDetail && !patientDetail.deleted && (
        <Box mt={3}>
          <BlankCard>
            <Box p={3}>
              <Typography variant="h6" color="primary" mb={2}>
                Patient Requests
              </Typography>
              <TableContainer>
                <Table
                  aria-label="requests table"
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
            </Box>
          </BlankCard>
        </Box>
      )}
    </>
  );
};

export default PatientDetails;
