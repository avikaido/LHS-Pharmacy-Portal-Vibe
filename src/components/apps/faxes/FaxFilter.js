import { Box, Grid, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/faxes/FaxSlice';

const BoxStyled = styled(Box)(() => ({
  padding: '30px',
  transition: '0.1s ease-in',
  cursor: 'pointer',
  color: 'inherit',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

// Define the color coding for different Statuss
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
      case 'failed':
        return 'error'; // Red color for failed
      case 'timeout':
        return 'warning'; // Amber/Yellow for timeout
      case 'successful':
        return 'success'; // Green for successful
      default:
        return 'default'; // Default color if no match
    }
};

const FaxFilter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.faxReducer.faxes);

  // Filter faxes by status type
  const statusCounts = {
    failed: counter.filter((t) => t.Status === 'failed').length,
    timeout: counter.filter((t) => t.Status === 'timeout').length,
    successful: counter.filter((t) => t.Status === 'successful').length,
  };

  return (
    <Grid container spacing={3} textAlign="center">
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('total_faxes'))}
          sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
        >
          <Typography variant="h3">{counter.length}</Typography>
          <Typography variant="h6">Total Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('failed'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('failed')].light }}
        >
          <Typography variant="h3">{statusCounts.failed}</Typography>
          <Typography variant="h6">Failed Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('timeout'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('timeout')].light }}
        >
          <Typography variant="h3">{statusCounts.timeout}</Typography>
          <Typography variant="h6">Timed Out Faxes</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('successful'))}
          sx={{ backgroundColor: (theme) => theme.palette[getStatusColor('successful')].light }}
        >
          <Typography variant="h3">{statusCounts.successful}</Typography>
          <Typography variant="h6">Successful Faxes</Typography>
        </BoxStyled>
      </Grid>
    </Grid>
  );
};

export default FaxFilter;
