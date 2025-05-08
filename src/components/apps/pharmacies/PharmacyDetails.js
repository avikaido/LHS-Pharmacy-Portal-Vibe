import React, {useEffect, useRef} from 'react';
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
  UpdatePharmacy,
  DeletePharmacy,
  toggleStarredPharmacy,
} from 'src/store/apps/pharmacies/PharmacySlice';
import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { format, isValid, parseISO } from 'date-fns';

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

const PharmacyDetails = () => {
  const pharmacyDetail = useSelector(
    (state) => state.pharmaciesReducer.pharmacies[state.pharmaciesReducer.pharmacyContent - 1],
  );
  const editPharmacy = useSelector((state) => state.pharmaciesReducer.editPharmacy);
  const dispatch = useDispatch();

  // Create a ref for the QR Code image element
  const qrCodeRef = useRef(null);

  // When pharmacyDetail is available and we’re in view (non-edit) mode,
  // generate the QR code. The encoded data is the URL for the request wizard.
  useEffect(() => {
    if (
      pharmacyDetail &&
      !editPharmacy &&
      qrCodeRef.current &&
      window.quickresponse &&
      window.toGif
    ) {
      // Build the URL to be encoded; replace pharmacyDetail.id in the URL
      const url = `/request-wizard?pharmacyID=${pharmacyDetail.id}`;
      // Generate the QR code GIF using the library functions.
      // The second parameter (6) is a scaling factor.
      qrCodeRef.current.src = window.toGif(window.quickresponse(url), 6);
    }
  }, [pharmacyDetail, editPharmacy]);

  // Build the URL to be encoded; replace pharmacyDetail.id in the URL
      //const urlQR = `/request-wizard?pharmacyID=${pharmacyDetail.id}`;

  // Build the URL to be encoded; replace pharmacyDetail.id in the URL
      const urlReq = `/apps/request/detail/`;    

  const tableData = [
    { id: 1, title: 'Pharmacy Name', alias: 'pharmacyName', gdata: pharmacyDetail?.pharmacyName || '', type: 'text' },
    { id: 2, title: 'Pharmacy Type', alias: 'pharmacyType', gdata: pharmacyDetail?.pharmacyType || '', type: 'text' },
    { id: 3, title: 'Phone', alias: 'phone', gdata: pharmacyDetail?.phone || '', type: 'text' },
    { id: 4, title: 'Fax', alias: 'fax', gdata: pharmacyDetail?.fax || '', type: 'text' },
    { id: 5, title: 'Email', alias: 'email', gdata: pharmacyDetail?.email || '', type: 'text' },
    { id: 6, title: 'Website', alias: 'website', gdata: pharmacyDetail?.website || '', type: 'text' },
    { id: 7, title: 'Address', alias: 'address', gdata: pharmacyDetail?.address || '', type: 'text' },
    { id: 8, title: 'Business Hours', alias: 'businessHours', gdata: pharmacyDetail?.businessHours || '', type: 'text' },
    { id: 9, title: 'License Number', alias: 'licenseNumber', gdata: pharmacyDetail?.licenseNumber || '', type: 'text' },
    { id: 10, title: 'License Expiration', alias: 'licenseExpiration', gdata: pharmacyDetail?.licenseExpiration || '', type: 'date' },
    { id: 11, title: 'NPI Number', alias: 'npiNumber', gdata: pharmacyDetail?.npiNumber || '', type: 'text' },
    { id: 12, title: 'Insurance Accepted', alias: 'insuranceAccepted', gdata: pharmacyDetail?.insuranceAccepted?.join(', ') || '', type: 'array' },
    { id: 13, title: 'Services Offered', alias: 'servicesOffered', gdata: pharmacyDetail?.servicesOffered?.join(', ') || '', type: 'array' },
    { id: 14, title: 'Pharmacy Chain', alias: 'pharmacyChain', gdata: pharmacyDetail?.pharmacyChain || '', type: 'text' },
    { id: 15, title: 'Manager Name', alias: 'managerName', gdata: pharmacyDetail?.managerName || '', type: 'text' },
    { id: 16, title: 'Frequently Contacted', alias: 'frequentlycontacted', gdata: pharmacyDetail?.frequentlycontacted ? 'Yes' : 'No', type: 'boolean' },
    { id: 17, title: 'Starred', alias: 'starred', gdata: pharmacyDetail?.starred ? 'Yes' : 'No', type: 'boolean' },
    { id: 18, title: 'Deleted', alias: 'deleted', gdata: pharmacyDetail?.deleted ? 'Yes' : 'No', type: 'boolean' },
    { id: 19, title: 'Pharmacists', alias: 'pharmacists', gdata: pharmacyDetail?.pharmacists?.join(', ') || '', type: 'array' },
    { id: 20, title: 'Requests', alias: 'requests', gdata: pharmacyDetail?.requests?.join(', ') || '', type: 'array' },
  ];

  const orderDate = requestsTableData.orderDate
    ? isValid(parseISO(requestsTableData.orderDate))
      ? format(parseISO(requestsTableData.orderDate), 'MM/dd/yyyy hh:mm')
      : 'Invalid Date'
    : format(new Date(), 'MM/dd/yyyy hh:mm');

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Pharmacy Detail Part */}
      {/* ------------------------------------------- */}
      {pharmacyDetail && !pharmacyDetail.deleted ? (
        <>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Pharmacy Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              {/* ------------------------------------------- */}
                {/* Disabled - Favorites - V1.0 */}
                {/* <Tooltip title={pharmacyDetail.starred ? 'Unstar' : 'Star'}>
                <IconButton onClick={() => dispatch(toggleStarredPharmacy(pharmacyDetail.id))}>
                  <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: pharmacyDetail.starred ? '#FFC107' : '',
                      stroke: pharmacyDetail.starred ? '#FFC107' : '',
                    }}
                  />
                </IconButton>
              </Tooltip>*/}
              {/* ------------------------------------------- */}
              <Tooltip title={editPharmacy ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPharmacy ? (
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
          {/* Pharmacy Table Part */}
          {/* ------------------------------------------- */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPharmacy ? (
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
                        {pharmacyDetail.pharmacyName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pharmacyDetail.address}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Pharmacy Chain
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.pharmacyChain}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Pharmacy Type
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.pharmacyType}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.phone}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Fax
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.fax}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.email}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Website
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.website}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Manager Name
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.managerName}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Business Hours
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.businessHours}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        License Number
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.licenseNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        License Expiration
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.licenseExpiration}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        NPI Number
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.npiNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Insurance Accepted
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.insuranceAccepted.join(', ')}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Services Offered
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.servicesOffered.join(', ')}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        QR Code and Link
                      </Typography>
                    {/* --- New QR Code Display Section --- */}
                      {!editPharmacy && (
                        <Box p={2}>
                          
                          {/* The image source will be set by the useEffect calling the barcode.js functions */}
                          <img id="qr-code" ref={qrCodeRef} alt="QR Code" />
                          <Typography variant="subtitle1">Download QR Code</Typography>
                          <Typography variant="subtitle1">
                            <Link to={urlReq}>
                              Download Link
                            </Link>
                          </Typography>
                        </Box>
                      )}
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
                    onClick={() => dispatch(DeletePharmacy(pharmacyDetail.id))}
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
                      {/* Editable fields */}
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Pharmacy Chain
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.pharmacyChain}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'pharmacyChain', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Pharmacy Type
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.pharmacyType}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'pharmacyType', e.target.value))
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
                          type="text"
                          value={pharmacyDetail.phone}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'phone', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Fax
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.fax}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'fax', e.target.value))
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
                          type="email"
                          value={pharmacyDetail.email}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'email', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Website
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.website}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'website', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Manager Name
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.managerName}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'managerName', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Business Hours
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.businessHours}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'businessHours', e.target.value))
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
                          type="text"
                          value={pharmacyDetail.licenseNumber}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'licenseNumber', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          License Expiration
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.licenseExpiration}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'licenseExpiration', e.target.value))
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
                          type="text"
                          value={pharmacyDetail.npiNumber}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'npiNumber', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Insurance Accepted
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.insuranceAccepted.join(', ')}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'insuranceAccepted', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Services Offered
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.servicesOffered.join(', ')}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'servicesOffered', e.target.value))
                          }
                        />
                      </Box>
                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Pharmacists
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.pharmacists.join(', ')}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'pharmacists', e.target.value))
                          }
                        />
                      </Box>

                      <Box px={3} py={1.5}>
                        <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                          Requests
                        </Typography>
                        <TextField
                          size="small"
                          fullWidth
                          type="text"
                          value={pharmacyDetail.requests.join(', ')}
                          onChange={(e) =>
                            dispatch(UpdatePharmacy(pharmacyDetail.id, 'requests', e.target.value))
                          }
                        />
                      </Box>
                      <Box p={3}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => dispatch(isEdit())}
                        >
                          Save Pharmacy
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
          <Box>
            <Typography variant="h4">Please Select a Pharmacy</Typography>
            <br />
            <img src={emailIcon} alt={emailIcon} width={'250px'} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PharmacyDetails;



