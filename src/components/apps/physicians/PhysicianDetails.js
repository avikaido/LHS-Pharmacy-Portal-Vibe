import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  isEdit,
  UpdatePhysician,
  DeletePhysician,
  toggleStarredPhysician,
} from 'src/store/apps/physicians/PhysicianSlice';
import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { format, isValid, parseISO } from 'date-fns';

const pharmaciesTableData = [
  {
    id: 1,
    pharmacyName: 'CVS Pharmacy #123',
    pharmacyType: 'Retail',
    address: '19214 110th Rd, Saint Albans, NY, 11412',
    licenseNumber: 'PH87654',
    licenseExpiration: '2026-03-15',
    npiNumber: '1234567890',
    pharmacyChain: 'CVS Health',
  },
  {
    id: 2,
    pharmacyName: 'Walgreens #456',
    pharmacyType: 'Retail',
    address: '76 Hamilton Ave, Yonkers, NY, 10705',
    licenseNumber: 'PH54321',
    licenseExpiration: '2025-07-11',
    npiNumber: '0987654321',
    pharmacyChain: 'Walgreens',
  },
];

const pharmacies = pharmaciesTableData;

const pharmacistsTableData = [
  {
    id: '1',
    name: 'John Doe',
    department: 'Clinical Pharmacy',
    licensenumber: 'PH12345',
    licenseexpdate: '2025-06-30',
    npinumber: '1234567890',
    deanumber: 'AB1234567',
  },
  {
    id: '2',
    name: 'Jane Smith',
    department: 'Retail Pharmacy',
    licensenumber: 'PH67890',
    licenseexpdate: '2026-03-15',
    npinumber: '9876543210',
    deanumber: 'AC9876543',
  },
];

const pharmacists = pharmacistsTableData;

const requestsTableData = [
  {
    id: 101,
    patientfirstname: 'Georgeanna',
    patientmiddleInitial: 'A',
    patientlastname: 'Ramero',
    doctorname: 'Andrew Albright',
    orderitem: 'Dapagliflozin',
    orderDate: new Date(),
    status: 'Processing',
  },
  {
    id: 102,
    patientfirstname: 'Alexandra',
    patientmiddleInitial: 'B',
    patientlastname: 'Johnson',
    doctorname: 'David Patel',
    orderitem: 'Lisinopril',
    orderDate: new Date(),
    status: 'Complete',
  },
];

const requests = requestsTableData;

// Build the URL to be encoded; replace pharmacyDetail.id in the URL
const urlReq = `/apps/request/detail/`;   

const PhysicianDetails = () => {
  const physicianDetail = useSelector(
    (state) => state.physiciansReducer.physicians[state.physiciansReducer.physicianContent - 1],
  );
  const editPhysician = useSelector((state) => state.physiciansReducer.editPhysician);
  const dispatch = useDispatch();

  const tableData = [
    { id: 1, title: 'First Name', alias: 'firstname', gdata: physicianDetail?.firstname || '', type: 'text' },
    { id: 2, title: 'Middle Initial', alias: 'middle_initial', gdata: physicianDetail?.middle_initial || '', type: 'text' },
    { id: 3, title: 'Last Name', alias: 'lastname', gdata: physicianDetail?.lastname || '', type: 'text' },
    { id: 4, title: 'Image', alias: 'image', gdata: physicianDetail?.image || '', type: 'image' },
    { id: 5, title: 'Type', alias: 'type', gdata: physicianDetail?.type || '', type: 'text' },
    { id: 6, title: 'Business Name', alias: 'business_name', gdata: physicianDetail?.business_name || '', type: 'text' },
    { id: 7, title: 'Phone', alias: 'phone', gdata: physicianDetail?.phone || '', type: 'text' },
    { id: 8, title: 'Email', alias: 'email', gdata: physicianDetail?.email || '', type: 'text' },
    { id: 9, title: 'Address', alias: 'address', gdata: physicianDetail?.address || '', type: 'text' },
    { id: 10, title: 'Address 2', alias: 'address2', gdata: physicianDetail?.address2 || '', type: 'text' },
    { id: 11, title: 'City', alias: 'city', gdata: physicianDetail?.city || '', type: 'text' },
    { id: 12, title: 'State', alias: 'state', gdata: physicianDetail?.state || '', type: 'text' },
    { id: 13, title: 'Zip Code', alias: 'zipcode', gdata: physicianDetail?.zipcode || '', type: 'text' },
    { id: 14, title: 'Notes', alias: 'notes', gdata: physicianDetail?.notes || '', type: 'text' },
    { id: 15, title: 'Fax', alias: 'fax', gdata: physicianDetail?.fax || '', type: 'text' },
    { id: 16, title: 'License Number', alias: 'licenseNumber', gdata: physicianDetail?.licenseNumber || '', type: 'text' },
    { id: 17, title: 'License Expiration', alias: 'licenseExpiration', gdata: physicianDetail?.licenseExpiration || '', type: 'date' },
    { id: 18, title: 'NPI Number', alias: 'npiNumber', gdata: physicianDetail?.npiNumber || '', type: 'text' },
    { id: 19, title: 'Business Contact', alias: 'business_contact', gdata: physicianDetail?.business_contact || '', type: 'number' },
    { id: 20, title: 'Frequently Contacted', alias: 'frequentlycontacted', gdata: physicianDetail?.frequentlycontacted ? 'Yes' : 'No', type: 'boolean' },
    { id: 21, title: 'Starred', alias: 'starred', gdata: physicianDetail?.starred ? 'Yes' : 'No', type: 'boolean' },
    { id: 22, title: 'Deleted', alias: 'deleted', gdata: physicianDetail?.deleted ? 'Yes' : 'No', type: 'boolean' },
    { id: 23, title: 'Pharmacies', alias: 'pharmacies', gdata: physicianDetail?.pharmacies?.join(', ') || '', type: 'array' },
    { id: 24, title: 'Users', alias: 'users', gdata: physicianDetail?.users || '', type: 'number' },
    { id: 25, title: 'Patients', alias: 'patients', gdata: physicianDetail?.patients || '', type: 'number' },
    { id: 26, title: 'Requests', alias: 'requests', gdata: physicianDetail?.requests || '', type: 'number' },
    { id: 27, title: 'Faxes', alias: 'faxes', gdata: physicianDetail?.faxes?.join(', ') || '', type: 'array' },
  ];

  const orderDate = requestsTableData.orderDate
    ? isValid(parseISO(requestsTableData.orderDate))
      ? format(parseISO(requestsTableData.orderDate), 'MM/dd/yyyy hh:mm')
      : 'Invalid Date'
    : format(new Date(), 'MM/dd/yyyy hh:mm');

  return (
    <>
      {/* Physician Detail Part */}
      {physicianDetail && !physicianDetail.deleted ? (
        <>
          {/* Header Part */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Physician Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
                {/* ------------------------------------------- */}
                {/* Disabled - Favorites - V1.0 */}
                {/* <Tooltip title={physicianDetail.starred ? 'Unstar' : 'Star'}>
                <IconButton onClick={() => dispatch(toggleStarredPhysician(physicianDetail.id))}>
                <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: physicianDetail.starred ? '#FFC107' : '',
                      stroke: physicianDetail.starred ? '#FFC107' : '',
                    }}
                  />
                </IconButton>
              </Tooltip>*/}
              {/* ------------------------------------------- */}
              <Tooltip title={editPhysician ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPhysician ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => dispatch(DeletePhysician(physicianDetail.id))}>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />
          {/* Physician Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPhysician ? (
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
                        {physicianDetail.firstname} {physicianDetail.middle_initial} {physicianDetail.lastname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {physicianDetail.type}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2} mt={4}>
                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.phone}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Fax Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.fax}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.email}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Practice Name
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.business_name}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Business Contact
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.business_contact}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.address}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Address 2
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.address2}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        City
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.city}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        State
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.state}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Zipcode
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.zipcode}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        License Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.licenseNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        License Expiration Date
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.licenseExpiration}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        NPI Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.npiNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" mb={1} color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {physicianDetail.notes}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Pharmacists
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
                              <Typography variant="h6">Name/Department</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">License Number</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">License Exp Date</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">NPI Number</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">DEA Number</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pharmacists.map((pharmacist) => (
                            <TableRow key={pharmacist.id}>
                              <TableCell>
                                <Stack direction="row" spacing={2}>
                                  <Box>
                                    <Typography variant="h6" fontWeight="600">
                                      {pharmacist.name}
                                    </Typography>
                                    <Typography color="textSecondary" variant="subtitle2">
                                      {pharmacist.department}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">
                                  {pharmacist.licensenumber}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacist.licenseexpdate}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacist.npinumber}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacist.deanumber}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </Paper>
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
                              <Typography variant="h6">Patient</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Item</Typography>
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
                                  <Link to={urlReq+request.id}>
                                    {request.id}
                                  </Link>  
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip size="small" color="secondary" variant="outlined" label={orderDate}></Chip>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">
                                  {request.patientfirstname} {request.patientmiddleInitial} {request.patientlastname}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{request.orderitem}</Typography>
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


                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" mb={1} color="text.secondary">
                        Pharmacies
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
                              <Typography variant="h6">Name/Address</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Type</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">Chain</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">License Number</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">License Exp Date</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="h6">NPI Number</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pharmacies.map((pharmacy) => (
                            <TableRow key={pharmacy.id}>
                              <TableCell>
                                <Stack direction="row" spacing={2}>
                                  <Box>
                                    <Typography variant="h6" fontWeight="600">
                                      {pharmacy.pharmacyName}
                                    </Typography>
                                    <Typography color="textSecondary" variant="subtitle2">
                                      {pharmacy.address}
                                    </Typography>
                                  </Box>
                                </Stack>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">
                                  {pharmacy.pharmacyType}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacy.pharmacyChain}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacy.licenseNumber}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacy.licenseExpiration}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography color="textSecondary" variant="subtitle2">{pharmacy.npiNumber}</Typography>
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
                    onClick={() => dispatch(DeletePhysician(physicianDetail.id))}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ) : (
              // Editing Section
              <>
                <BlankCard sx={{ p: 0 }}>
                  <Scrollbar sx={{ height: { lg: 'calc(100vh - 360px)', md: '100vh' } }}>
                    <Box pt={1}>
                      {/* Edit form structure can be added here for each field */}
                      {/* Example of editable fields */}
                      <Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        First Name
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.firstname}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'firstname', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Last Name
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.lastname}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'lastname', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Department
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.department}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'department', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Phone
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.phone}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'phone', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Email
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.email}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'email', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Address
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.address}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'address', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Notes
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.notes}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'notes', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        DEA Number
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.deaNumber}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'deaNumber', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        License Number
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.licenseNumber}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'licenseNumber', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        License Expiration
    </Typography>
    <TextField
        type="date"
        size="small"
        fullWidth
        value={physicianDetail.licenseExpiration}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'licenseExpiration', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        NPI Number
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.npiNumber}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'npiNumber', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Years of Experience
    </Typography>
    <TextField
        type="number"
        size="small"
        fullWidth
        value={physicianDetail.yearsOfExperience}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'yearsOfExperience', e.target.value))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Languages Spoken
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.languagesSpoken?.join(', ')}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'languagesSpoken', e.target.value.split(', ')))
        }
    />
</Box>

<Box px={3} py={1.5}>
    <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
        Pharmacies
    </Typography>
    <TextField
        size="small"
        fullWidth
        value={physicianDetail.pharmacies?.join(', ')}
        onChange={(e) =>
            dispatch(UpdatePhysician(physicianDetail.id, 'pharmacies', e.target.value.split(', ').map(Number)))
        }
    />
</Box>

                      {/* Add additional editable fields as needed */}
                      <Box p={3}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => dispatch(isEdit())}
                        >
                          Save Physician
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
          {/* If no Physician Selected */}
          <Box>
            <Typography variant="h4">Please Select a Physician</Typography>
            <br />
            <img src={emailIcon} alt={emailIcon} width={'250px'} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PhysicianDetails;

