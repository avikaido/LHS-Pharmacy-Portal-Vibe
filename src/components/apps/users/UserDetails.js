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
} from '@mui/material';
import {
  isEdit,
  UpdateUser,
  DeleteUser,
  toggleStarredUser,
} from 'src/store/apps/users/UserSlice';

import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { format, isValid, parseISO } from 'date-fns';

const UserDetails = () => {
  const userDetail = useSelector(
    (state) => state.usersReducer.users[state.usersReducer.userContent - 1],
  );
  const editUser = useSelector((state) => state.usersReducer.editUser);
  const dispatch = useDispatch();

  const tableData = [
    { id: 1, title: 'First Name', alias: 'firstname', gdata: userDetail?.firstname || '', type: 'text' },
    { id: 2, title: 'Middle Initial', alias: 'middleInitial', gdata: userDetail?.middleInitial || '', type: 'text' },
    { id: 3, title: 'Last Name', alias: 'lastname', gdata: userDetail?.lastname || '', type: 'text' },
    { id: 4, title: 'Date of Birth', alias: 'dob', gdata: userDetail?.dob || '', type: 'text' },
    { id: 5, title: 'Gender', alias: 'gender', gdata: userDetail?.gender || '', type: 'text' },
    { id: 6, title: 'Email', alias: 'email', gdata: userDetail?.email || '', type: 'email' },
    { id: 7, title: 'Phone', alias: 'phone', gdata: userDetail?.phone || '', type: 'phone' },
    { id: 8, title: 'Address', alias: 'address', gdata: userDetail?.address || '', type: 'text' },
    { id: 9, title: 'Address Line 2', alias: 'address2', gdata: userDetail?.address2 || '', type: 'text' },
    { id: 10, title: 'City', alias: 'city', gdata: userDetail?.city || '', type: 'text' },
    { id: 11, title: 'State', alias: 'state', gdata: userDetail?.state || '', type: 'text' },
    { id: 12, title: 'Zip Code', alias: 'zipcode', gdata: userDetail?.zipcode || '', type: 'text' },
    { id: 13, title: 'Primary Insurance', alias: 'insurance1', gdata: userDetail?.insurance1 || '', type: 'text' },
    { id: 14, title: 'Primary Insurance Member ID', alias: 'insurance1id', gdata: userDetail?.insurance1id || '', type: 'text' },
    { id: 15, title: 'Secondary Insurance', alias: 'insurance2', gdata: userDetail?.insurance2 || '', type: 'text' },
    { id: 16, title: 'Secondary Insurance Member ID', alias: 'insurance2id', gdata: userDetail?.insurance2id || '', type: 'text' },
    { id: 17, title: 'Notes', alias: 'notes', gdata: userDetail?.notes || '', type: 'text' },
    { id: 18, title: 'Requests', alias: 'requests', gdata: userDetail?.requests.join(', ') || '', type: 'text' },
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
      {/* User Detail Part */}
      {/* ------------------------------------------- */}
      {userDetail && !userDetail.deleted ? (
        <>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">User Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              {/* ------------------------------------------- */}
              {/* Disabled - Favorites - V1.0 */}
              {/* <Tooltip title={userDetail.starred ? 'Unstar' : 'Star'}>
                <IconButton onClick={() => dispatch(toggleStarredUser(userDetail.id))}>
                  <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: userDetail.starred ? '#FFC107' : '',
                      stroke: userDetail.starred ? '#FFC107' : '',
                    }}
                  />
                </IconButton>
              </Tooltip>*/}
              {/* ------------------------------------------- */}
              <Tooltip title={editUser ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editUser ? (
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
          {/* User Table Part */}
          {/* ------------------------------------------- */}
          <Box sx={{ overflow: 'auto' }}>
            {!editUser ? (
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
                        {userDetail.firstname} {userDetail.middleInitial} {userDetail.lastname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {userDetail.dob}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {userDetail.gender}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {userDetail.phone}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.email}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.address}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Address 2
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.address2}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        City
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.city}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        State
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.state}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Zipcode
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.zipcode}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Primary Insurance
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.insurance1}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Primary Insurance Member ID
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.insurance1id}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Secondary Insurance
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.insurance2}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Secondary Insurance Member ID
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.insurance2id}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {userDetail.notes}
                      </Typography>
                    </Grid>
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
                    onClick={() => dispatch(DeleteUser(userDetail.id))}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <BlankCard sx={{ p: 0 }}>
                  <Scrollbar sx={{ height: { lg: 'calc(100vh - 360px)', md: '100vh' } }}>
                    <Box pt={1}>
                      {tableData.map((data) => (
                        <Box key={data.id} px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            {data.title}
                          </Typography>
                          <TextField
                            id={data.alias}
                            size="small"
                            fullWidth
                            type={data.type}
                            value={data.gdata}
                            onChange={(e) =>
                              dispatch(UpdateUser(userDetail.id, data.alias, e.target.value))
                            }
                          />
                        </Box>
                      ))}
                      <Box p={3}>
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
          {/* ------------------------------------------- */}
          {/* If no User  */}
          {/* ------------------------------------------- */}
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
