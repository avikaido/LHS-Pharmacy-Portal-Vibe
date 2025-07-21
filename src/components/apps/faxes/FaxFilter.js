import { Box, Grid, Typography, styled, TextField, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/faxes/FaxSlice';
import React from 'react';

const BoxStyled = styled(Box)(() => ({
  padding: '30px',
  transition: '0.1s ease-in',
  cursor: 'pointer',
  color: 'inherit',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

// Define the color coding for different Status
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
      case 'failed':
        return 'error'; // Red color for failed
      case 'timeout':
        return 'warning'; // Amber/Yellow for timeout
      case 'successful':
        return 'success'; // Green for successful
      case 'pending':
        return 'info'; // Blue for pending
      default:
        return 'default'; // Default color if no match
    }
};

const FaxFilter = () => {
  const dispatch = useDispatch();
  const faxes = useSelector((state) => state.faxReducer.faxes);
  const loading = useSelector((state) => state.faxReducer.loading);
  const error = useSelector((state) => state.faxReducer.error);
  const pharmacies = useSelector((state) => state.pharmaciesReducer.pharmacies);
  const physicians = useSelector((state) => state.physicians.physicians);
  const [pharmacyFilter, setPharmacyFilter] = React.useState('');
  const [doctorFilter, setDoctorFilter] = React.useState('');

  // Filter faxes by status type (only non-deleted faxes)
  const activeFaxes = faxes.filter(fax => !fax.deleted);
  const statusCounts = {
    failed: activeFaxes.filter((t) => t.status === 'failed').length,
    timeout: activeFaxes.filter((t) => t.status === 'timeout').length,
    successful: activeFaxes.filter((t) => t.status === 'successful').length,
    pending: activeFaxes.filter((t) => t.status === 'pending').length,
  };

  if (loading) {
    return (
      <Grid container spacing={3} textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h6">Loading fax statistics...</Typography>
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container spacing={3} textAlign="center">
        <Grid item xs={12}>
          <Typography variant="h6" color="error">
            Error loading fax statistics: {error}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3} textAlign="center">
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('total_faxes'))}
          sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
        >
          <Typography variant="h3">{activeFaxes.length}</Typography>
          <Typography variant="h6">Total Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Failed'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('failed')].light }}
        >
          <Typography variant="h3">{statusCounts.failed}</Typography>
          <Typography variant="h6">Failed Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Timeout'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('timeout')].light }}
        >
          <Typography variant="h3">{statusCounts.timeout}</Typography>
          <Typography variant="h6">Timed Out Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Successful'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('successful')].light }}
        >
          <Typography variant="h3">{statusCounts.successful}</Typography>
          <Typography variant="h6">Successful Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Pending'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('pending')].light }}
        >
          <Typography variant="h3">{statusCounts.pending}</Typography>
          <Typography variant="h6">Pending Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <TextField
          select
          label="Pharmacy"
          value={pharmacyFilter}
          onChange={(e) => setPharmacyFilter(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All Pharmacies</MenuItem>
          {pharmacies.map((pharmacy) => (
            <MenuItem key={pharmacy.id} value={pharmacy.business_name}>{pharmacy.business_name}</MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <TextField
          select
          label="Doctor"
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All Doctors</MenuItem>
          {(physicians || []).map((physician) => (
            <MenuItem key={physician.npi} value={`${physician.first_name} ${physician.last_name}`}>{physician.first_name} {physician.last_name}</MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default FaxFilter;
