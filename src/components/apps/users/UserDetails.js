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
  UpdateUser,
  DeleteUser,
  toggleStarredUser,
} from 'src/store/apps/users/UserSlice';

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
  IconId,
  IconNotes,
  IconBriefcase,
  IconUsers,
} from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { format, isValid, parseISO } from 'date-fns';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

const roles = [
  { value: 'admin', label: 'Administrator' },
  { value: 'pharmacist', label: 'Pharmacist' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'User' },
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

const UserDetails = () => {
  const users = useSelector((state) => state.usersReducer.users);
  const userId = useSelector((state) => state.usersReducer.userContent) || (users.length > 0 ? users[0].id : null);
  const userDetail = users.find((user) => user.id === userId) || null;

  const editUser = useSelector((state) => state.usersReducer.editUser);
  const dispatch = useDispatch();

  return (
    <>
      {/* User Detail Part */}
      {userDetail && !userDetail.deleted ? (
        <>
          {/* Header Part */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">User Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={editUser ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editUser ? (
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
          {/* User Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editUser ? (
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
                                {userDetail.first_name || 'N/A'}
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
                                {userDetail.last_name || 'N/A'}
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
                                {userDetail.middle_initial || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMail size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Email
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {userDetail.email || 'N/A'}
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
                                {userDetail.phone || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Role & Department Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconBriefcase size={20} style={{ marginRight: 8 }} />
                          Role & Department
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Role
                                </Typography>
                              </Box>
                              <Chip 
                                label={userDetail.role || 'N/A'} 
                                color="primary" 
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUsers size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Department
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {userDetail.department || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBriefcase size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Title
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {userDetail.title || 'N/A'}
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
                                label={userDetail.status || 'Active'} 
                                color={userDetail.status === 'active' ? 'success' : 'default'}
                                size="small"
                              />
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
                                {userDetail.address || 'N/A'}
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
                                {userDetail.address2 || 'N/A'}
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
                                {userDetail.city || 'N/A'}
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
                                {userDetail.state || 'N/A'}
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
                                {userDetail.zipcode || 'N/A'}
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
                                {userDetail.notes || 'No notes available'}
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
                                {userDetail.created_on ? format(parseISO(userDetail.created_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
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
                                {userDetail.created_by || 'N/A'}
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
                                {userDetail.updated_on ? format(parseISO(userDetail.updated_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
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
                                {userDetail.updated_by || 'N/A'}
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
                                label={userDetail.status || 'Active'} 
                                color={userDetail.status === 'active' ? 'success' : 'default'}
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
                              <Badge badgeContent={userDetail.version || '1'} color="primary">
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
                    onClick={() => dispatch(DeleteUser(userDetail.id))}
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
                              value={userDetail?.first_name || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'first_name', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="Middle Initial"
                              value={userDetail?.middle_initial || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'middle_initial', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="Last Name"
                              value={userDetail?.last_name || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'last_name', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              type="email"
                              label="Email"
                              value={userDetail?.email || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'email', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Phone"
                              value={userDetail?.phone || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'phone', e.target.value))}
                            />
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Role & Department Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2}>
                          Role & Department
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item lg={6} xs={12}>
                            <CustomSelect
                              fullWidth
                              label="Role"
                              value={userDetail?.role || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'role', e.target.value))}
                            >
                              {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Department"
                              value={userDetail?.department || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'department', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={12} xs={12}>
                            <TextField
                              fullWidth
                              label="Title"
                              value={userDetail?.title || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'title', e.target.value))}
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
                              value={userDetail?.address || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'address', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Address Line 2"
                              value={userDetail?.address2 || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'address2', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <TextField
                              fullWidth
                              label="City"
                              value={userDetail?.city || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'city', e.target.value))}
                            />
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <CustomSelect
                              fullWidth
                              label="State"
                              value={userDetail?.state || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'state', e.target.value))}
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
                              value={userDetail?.zipcode || ''}
                              onChange={(e) => dispatch(UpdateUser(userDetail.id, 'zipcode', e.target.value))}
                            />
                          </Grid>
                        </Grid>
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
                          value={userDetail?.notes || ''}
                          onChange={(e) => dispatch(UpdateUser(userDetail.id, 'notes', e.target.value))}
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
                                {userDetail.created_on ? format(parseISO(userDetail.created_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Created By
                              </Typography>
                              <Typography variant="body1">
                                {userDetail.created_by || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Last Updated
                              </Typography>
                              <Typography variant="body1">
                                {userDetail.updated_on ? format(parseISO(userDetail.updated_on), 'MM/dd/yyyy hh:mm a') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Updated By
                              </Typography>
                              <Typography variant="body1">
                                {userDetail.updated_by || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Status
                              </Typography>
                              <Chip 
                                label={userDetail.status || 'Active'} 
                                color={userDetail.status === 'active' ? 'success' : 'default'}
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Typography variant="body2" color="text.secondary">
                                Version
                              </Typography>
                              <Badge badgeContent={userDetail.version || '1'} color="primary">
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
                          Save User
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
          {/* If no User */}
          <Box>
            <Typography variant="h4">Please Select a User</Typography>
            <br />
            <img src={emailIcon} alt="Email Icon" width={'250px'} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserDetails;
