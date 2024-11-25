import { Box, Grid, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/items/ItemSlice';

const BoxStyled = styled(Box)(() => ({
  padding: '30px',
  transition: '0.1s ease-in',
  cursor: 'pointer',
  color: 'inherit',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

// Define the color coding for different Schedules
const getScheduleColor = (schedule) => {
  switch (schedule.toLowerCase()) {
    case 'schedule ii':
      return 'error'; // Red color for Schedule II
    case 'schedule iii':
      return 'warning'; // Amber/Yellow for Schedule III
    case 'schedule iv':
      return 'primary'; // Blue for Schedule IV
    case 'schedule v':
      return 'info'; // Light blue for Schedule V
    case 'otc':
      return 'success'; // Green for Over-The-Counter drugs
    case 'rx':
      return 'secondary'; // Gray for Prescription drugs
    default:
      return 'default'; // Default color if no match
  }
};

const ItemFilter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.itemReducer.items);

  // Filter items by schedule type
  const scheduleCounts = {
    scheduleII: counter.filter((t) => t.Schedule.toLowerCase() === 'schedule ii').length,
    scheduleIII: counter.filter((t) => t.Schedule.toLowerCase() === 'schedule iii').length,
    scheduleIV: counter.filter((t) => t.Schedule.toLowerCase() === 'schedule iv').length,
    scheduleV: counter.filter((t) => t.Schedule.toLowerCase() === 'schedule v').length,
    otc: counter.filter((t) => t.Schedule.toLowerCase() === 'otc').length,
    rx: counter.filter((t) => t.Schedule.toLowerCase() === 'rx').length,
  };

  return (
    <Grid container spacing={3} textAlign="center">
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('total_items'))}
          sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
        >
          <Typography variant="h3">{counter.length}</Typography>
          <Typography variant="h6">Total Items</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('schedule_ii'))}
          sx={{ backgroundColor: (theme) => theme.palette[getScheduleColor('schedule ii')].light }}
        >
          <Typography variant="h3">{scheduleCounts.scheduleII}</Typography>
          <Typography variant="h6">Schedule II Items</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('schedule_iii'))}
          sx={{ backgroundColor: (theme) => theme.palette[getScheduleColor('schedule iii')].light }}
        >
          <Typography variant="h3">{scheduleCounts.scheduleIII}</Typography>
          <Typography variant="h6">Schedule III Items</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('schedule_iv'))}
          sx={{ backgroundColor: (theme) => theme.palette[getScheduleColor('schedule iv')].light }}
        >
          <Typography variant="h3">{scheduleCounts.scheduleIV}</Typography>
          <Typography variant="h6">Schedule IV Items</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('schedule_v'))}
          sx={{ backgroundColor: (theme) => theme.palette[getScheduleColor('schedule v')].light }}
        >
          <Typography variant="h3">{scheduleCounts.scheduleV}</Typography>
          <Typography variant="h6">Schedule V Items</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('otc'))}
          sx={{ backgroundColor: (theme) => theme.palette[getScheduleColor('otc')].light }}
        >
          <Typography variant="h3">{scheduleCounts.otc}</Typography>
          <Typography variant="h6">OTC Items</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={2}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('rx'))}
          sx={{ backgroundColor: (theme) => theme.palette[getScheduleColor('rx')].light }}
        >
          <Typography variant="h3">{scheduleCounts.rx}</Typography>
          <Typography variant="h6">Rx Items</Typography>
        </BoxStyled>
      </Grid>
    </Grid>
  );
};

export default ItemFilter;
