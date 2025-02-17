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
  UpdatePharmacist,
  DeletePharmacist,
  toggleStarredPharmacist,
} from 'src/store/apps/pharmacists/PharmacistSlice';
import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';

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

const PharmacistDetails = () => {
  const pharmacistDetail = useSelector(
    (state) => state.pharmacistsReducer.pharmacists[state.pharmacistsReducer.pharmacistContent - 1],
  );
  const editPharmacist = useSelector((state) => state.pharmacistsReducer.editPharmacist);
  const dispatch = useDispatch();

  const tableData = [
    { id: 1, title: 'First Name', alias: 'firstname', gdata: pharmacistDetail?.firstname || '', type: 'text' },
    { id: 2, title: 'Last Name', alias: 'lastname', gdata: pharmacistDetail?.lastname || '', type: 'text' },
    { id: 3, title: 'Image', alias: 'image', gdata: pharmacistDetail?.image || '', type: 'image' },
    { id: 4, title: 'Department', alias: 'department', gdata: pharmacistDetail?.department || '', type: 'text' },
    { id: 5, title: 'Phone', alias: 'phone', gdata: pharmacistDetail?.phone || '', type: 'text' },
    { id: 6, title: 'Email', alias: 'email', gdata: pharmacistDetail?.email || '', type: 'text' },
    { id: 7, title: 'Address', alias: 'address', gdata: pharmacistDetail?.address || '', type: 'text' },
    { id: 8, title: 'Notes', alias: 'notes', gdata: pharmacistDetail?.notes || '', type: 'text' },
    { id: 9, title: 'DEA Number', alias: 'deaNumber', gdata: pharmacistDetail?.deaNumber || '', type: 'text' },
    { id: 10, title: 'License Number', alias: 'licenseNumber', gdata: pharmacistDetail?.licenseNumber || '', type: 'text' },
    { id: 11, title: 'License Expiration', alias: 'licenseExpiration', gdata: pharmacistDetail?.licenseExpiration || '', type: 'date' },
    { id: 12, title: 'NPI Number', alias: 'npiNumber', gdata: pharmacistDetail?.npiNumber || '', type: 'text' },
    { id: 13, title: 'Years of Experience', alias: 'yearsOfExperience', gdata: pharmacistDetail?.yearsOfExperience || '', type: 'number' },
    { id: 14, title: 'Languages Spoken', alias: 'languagesSpoken', gdata: pharmacistDetail?.languagesSpoken?.join(', ') || '', type: 'array' },
    { id: 15, title: 'Frequently Contacted', alias: 'frequentlycontacted', gdata: pharmacistDetail?.frequentlycontacted ? 'Yes' : 'No', type: 'boolean' },
    { id: 16, title: 'Starred', alias: 'starred', gdata: pharmacistDetail?.starred ? 'Yes' : 'No', type: 'boolean' },
    { id: 17, title: 'Deleted', alias: 'deleted', gdata: pharmacistDetail?.deleted ? 'Yes' : 'No', type: 'boolean' },
    { id: 18, title: 'Pharmacies', alias: 'pharmacies', gdata: pharmacistDetail?.pharmacies?.join(', ') || '', type: 'array' },
  ];

  return (
    <>
      {/* Pharmacist Detail Part */}
      {pharmacistDetail && !pharmacistDetail.deleted ? (
        <>
          {/* Header Part */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Pharmacist Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
                {/* ------------------------------------------- */}
                {/* Disabled - Favorites - V1.0 */}
                {/* <Tooltip title={pharmacistDetail.starred ? 'Unstar' : 'Star'}>
                <IconButton onClick={() => dispatch(toggleStarredPharmacist(pharmacistDetail.id))}>
                <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: pharmacistDetail.starred ? '#FFC107' : '',
                      stroke: pharmacistDetail.starred ? '#FFC107' : '',
                    }}
                  />
                </IconButton>
              </Tooltip>*/}
              {/* ------------------------------------------- */}
              <Tooltip title={editPharmacist ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPharmacist ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => dispatch(DeletePharmacist(pharmacistDetail.id))}>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />
          {/* Pharmacist Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPharmacist ? (
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
                        {pharmacistDetail.firstname} {pharmacistDetail.lastname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {pharmacistDetail.department}
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2} mt={4}>
                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Phone Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.phone}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.email}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Address
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.address}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        DEA Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.deaNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        License Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.licenseNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        License Expiration Date
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.licenseExpiration}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        NPI Number
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.npiNumber}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Years of Experience
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.yearsOfExperience}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Languages Spoken
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.languagesSpoken.join(', ')}
                      </Typography>
                    </Grid>

                    <Grid item lg={12} xs={12}>
                      <Typography variant="body2" mb={1} color="text.secondary">
                        Notes
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {pharmacistDetail.notes}
                      </Typography>
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
                    onClick={() => dispatch(DeletePharmacist(pharmacistDetail.id))}
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
        value={pharmacistDetail.firstname}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'firstname', e.target.value))
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
        value={pharmacistDetail.lastname}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'lastname', e.target.value))
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
        value={pharmacistDetail.department}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'department', e.target.value))
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
        value={pharmacistDetail.phone}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'phone', e.target.value))
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
        value={pharmacistDetail.email}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'email', e.target.value))
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
        value={pharmacistDetail.address}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'address', e.target.value))
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
        value={pharmacistDetail.notes}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'notes', e.target.value))
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
        value={pharmacistDetail.deaNumber}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'deaNumber', e.target.value))
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
        value={pharmacistDetail.licenseNumber}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'licenseNumber', e.target.value))
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
        value={pharmacistDetail.licenseExpiration}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'licenseExpiration', e.target.value))
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
        value={pharmacistDetail.npiNumber}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'npiNumber', e.target.value))
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
        value={pharmacistDetail.yearsOfExperience}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'yearsOfExperience', e.target.value))
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
        value={pharmacistDetail.languagesSpoken?.join(', ')}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'languagesSpoken', e.target.value.split(', ')))
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
        value={pharmacistDetail.pharmacies?.join(', ')}
        onChange={(e) =>
            dispatch(UpdatePharmacist(pharmacistDetail.id, 'pharmacies', e.target.value.split(', ').map(Number)))
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
                          Save Pharmacist
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
          {/* If no Pharmacist Selected */}
          <Box>
            <Typography variant="h4">Please Select a Pharmacist</Typography>
            <br />
            <img src={emailIcon} alt={emailIcon} width={'250px'} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PharmacistDetails;

