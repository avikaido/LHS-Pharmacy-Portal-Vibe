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

const PharmacyDetails = () => {
  const pharmacyDetail = useSelector(
    (state) => state.pharmaciesReducer.pharmacies[state.pharmaciesReducer.pharmacyContent - 1],
  );
  const editPharmacy = useSelector((state) => state.pharmaciesReducer.editPharmacy);
  const dispatch = useDispatch();

  return (
    <>
      {pharmacyDetail && !pharmacyDetail.deleted ? (
        <>
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Pharmacy Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={pharmacyDetail.starred ? 'Unstar' : 'Star'}>
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
              </Tooltip>
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
          <Box sx={{ overflow: 'auto' }}>
            {!editPharmacy ? (
              <Box>
                <Box p={3}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={pharmacyDetail.image}
                      src={pharmacyDetail.image}
                      sx={{ width: '72px', height: '72px' }}
                    />
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
                        Pharmacists
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {pharmacyDetail.pharmacists.join(', ')}
                      </Typography>
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



