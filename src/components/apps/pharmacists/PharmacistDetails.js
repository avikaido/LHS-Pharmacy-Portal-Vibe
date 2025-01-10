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
  UpdatePharmacist,
  DeletePharmacist,
  toggleStarredPharmacist,
} from 'src/store/apps/pharmacists/PharmacistSlice';
import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';

const PharmacistDetails = () => {
  const pharmacistDetail = useSelector(
    (state) => state.pharmacistsReducer.pharmacists[state.pharmacistsReducer.pharmacistContent - 1],
  );
  const editPharmacist = useSelector((state) => state.pharmacistsReducer.editPharmacist);
  const dispatch = useDispatch();

  return (
    <>
      {/* Pharmacist Detail Part */}
      {pharmacistDetail && !pharmacistDetail.deleted ? (
        <>
          {/* Header Part */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Pharmacist Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={pharmacistDetail.starred ? 'Unstar' : 'Star'}>
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
              </Tooltip>
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
              <Box p={3}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    alt={pharmacistDetail.image}
                    src={pharmacistDetail.image}
                    sx={{ width: '72px', height: '72px' }}
                  />
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" mb={0.5}>
                      {pharmacistDetail.firstname} {pharmacistDetail.lastname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      {pharmacistDetail.department}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {pharmacistDetail.pharmacy}
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
                    <Typography variant="subtitle1" mb={0.5}>
                      {pharmacistDetail.notes}
                    </Typography>
                  </Grid>
                </Grid>
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

