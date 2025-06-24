import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  IconButton,
  Stack,
  Grid,
  Tooltip,
  Paper,
  Chip,
  Badge,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  isEdit,
  updatePharmacist,
  updatePharmacistField,
  deletePharmacist,
  restorePharmacist,
} from 'src/store/apps/pharmacists/PharmacistSlice';
import { 
  IconPencil, 
  IconTrash, 
  IconDeviceFloppy,
  IconMail,
  IconPhone,
  IconFileText,
  IconUser,
  IconCalendar,
  IconClock,
  IconHistory,
  IconShield,
  IconBuilding,
  IconMapPin,
  IconCreditCard,
  IconStethoscope,
  IconId,
  IconLicense,
  IconLanguage,
  IconBriefcase,
  IconArchive,
  IconRotate,
} from '@tabler/icons';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';
import { format, isValid, parseISO } from 'date-fns';
import BlankCard from '../../shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

const departments = [
  { value: 'Clinical Pharmacy', label: 'Clinical Pharmacy' },
  { value: 'Hospital Pharmacy', label: 'Hospital Pharmacy' },
  { value: 'Compounding Pharmacy', label: 'Compounding Pharmacy' },
  { value: 'Staff', label: 'Staff' },
];

const PharmacistDetails = () => {
  const pharmacists = useSelector((state) => state.pharmacistsReducer.pharmacists);
  const pharmacistId = useSelector((state) => state.pharmacistsReducer.pharmacistContent) || (pharmacists.length > 0 ? pharmacists[0].id : null);
  const pharmacistDetail = pharmacists.find((pharmacist) => pharmacist.id === pharmacistId) || null;
  
  const editPharmacist = useSelector((state) => state.pharmacistsReducer.editPharmacist);
  const loading = useSelector((state) => state.pharmacistsReducer.loading);
  const error = useSelector((state) => state.pharmacistsReducer.error);
  const dispatch = useDispatch();

  // Store original values for cancel functionality
  const [originalValues, setOriginalValues] = useState(null);
  
  // Confirmation dialog states
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: '',
    message: '',
    action: null,
  });

  // Initialize original values when entering edit mode
  React.useEffect(() => {
    if (editPharmacist && pharmacistDetail && !originalValues) {
      setOriginalValues({ ...pharmacistDetail });
    }
  }, [editPharmacist, pharmacistDetail, originalValues]);

  if (loading) return <div>Loading pharmacist details...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFieldChange = (field, value) => {
    dispatch(updatePharmacistField(pharmacistDetail.id, field, value));
  };

  const handleSave = async () => {
    try {
      // Create updates object with all current values
      const updates = {
        firstname: pharmacistDetail.firstname,
        lastname: pharmacistDetail.lastname,
        phone: pharmacistDetail.phone,
        email: pharmacistDetail.email,
        notes: pharmacistDetail.notes,
        department: pharmacistDetail.department,
        deaNumber: pharmacistDetail.deaNumber,
        licenseNumber: pharmacistDetail.licenseNumber,
        licenseExpiration: pharmacistDetail.licenseExpiration,
        npiNumber: pharmacistDetail.npiNumber,
        yearsOfExperience: pharmacistDetail.yearsOfExperience,
        languagesSpoken: pharmacistDetail.languagesSpoken,
      };
      
      await dispatch(updatePharmacist({ id: pharmacistDetail.id, updates })).unwrap();
      dispatch(isEdit());
      setOriginalValues(null);
    } catch (error) {
      console.error('Failed to save pharmacist:', error);
    }
  };

  const handleCancel = () => {
    // Restore original values
    if (originalValues) {
      Object.keys(originalValues).forEach(field => {
        dispatch(updatePharmacistField(pharmacistDetail.id, field, originalValues[field]));
      });
    }
    dispatch(isEdit());
    setOriginalValues(null);
  };

  const handleArchive = () => {
    setConfirmDialog({
      open: true,
      title: 'Archive Pharmacist',
      message: `Are you sure you want to archive ${pharmacistDetail.firstname} ${pharmacistDetail.lastname}? This will hide them from the active list but can be restored later.`,
      action: () => {
        dispatch(deletePharmacist(pharmacistDetail.id));
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleRestore = () => {
    setConfirmDialog({
      open: true,
      title: 'Restore Pharmacist',
      message: `Are you sure you want to restore ${pharmacistDetail.firstname} ${pharmacistDetail.lastname}? This will make them active again.`,
      action: () => {
        dispatch(restorePharmacist(pharmacistDetail.id));
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialog({ open: false, title: '', message: '', action: null });
  };

  return (
    <>
      {/* Pharmacist Detail Part */}
      {pharmacistDetail ? (
        <>
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Pharmacist Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={editPharmacist ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPharmacist ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              {pharmacistDetail.deleted ? (
                <Tooltip title="Restore">
                  <IconButton onClick={handleRestore}>
                    <IconRotate size="18" stroke={1.3} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Archive">
                  <IconButton onClick={handleArchive}>
                    <IconArchive size="18" stroke={1.3} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>
          <Divider />
          {/* Pharmacist Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPharmacist ? (
              <Box>
                <BlankCard sx={{ p: 0, height: '100%' }}>
                  <Scrollbar sx={{ height: '100%' }}>
                    <Box p={3}>
                      {/* Status Banner for Archived Pharmacists */}
                      {pharmacistDetail.deleted && (
                        <Box mb={3} p={2} bgcolor="warning.light" borderRadius={1}>
                          <Typography variant="body2" color="warning.dark" display="flex" alignItems="center">
                            <IconArchive size={16} style={{ marginRight: 8 }} />
                            This pharmacist is archived and not active in the system.
                          </Typography>
                        </Box>
                      )}

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
                                {pharmacistDetail.firstname || 'N/A'}
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
                                {pharmacistDetail.lastname || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBriefcase size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Years of Experience
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacistDetail.yearsOfExperience || 'N/A'} years
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBuilding size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Department
                                </Typography>
                              </Box>
                              <Chip 
                                label={pharmacistDetail.department || 'N/A'} 
                                color="primary" 
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Contact Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconPhone size={20} style={{ marginRight: 8 }} />
                          Contact Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMail size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Email
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacistDetail.email || 'N/A'}
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
                                {pharmacistDetail.phone || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* License & Certification Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconLicense size={20} style={{ marginRight: 8 }} />
                          License & Certification Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Stack spacing={3}>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} mb={1} display="flex" alignItems="center">
                                <IconShield size={16} style={{ marginRight: 8 }} />
                                DEA Information
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item lg={12} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      DEA Number
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacistDetail.deaNumber || 'N/A'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} mb={1} display="flex" alignItems="center">
                                <IconLicense size={16} style={{ marginRight: 8 }} />
                                License Information
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item lg={6} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      License Number
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacistDetail.licenseNumber || 'N/A'}
                                  </Typography>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconCalendar size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      License Expiration
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacistDetail.licenseExpiration ? (() => {
                                      try {
                                        return format(parseISO(pharmacistDetail.licenseExpiration), 'MM/dd/yyyy');
                                      } catch (error) {
                                        return pharmacistDetail.licenseExpiration || 'N/A';
                                      }
                                    })() : 'N/A'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" fontWeight={600} mb={1} display="flex" alignItems="center">
                                <IconStethoscope size={16} style={{ marginRight: 8 }} />
                                NPI Information
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item lg={12} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      NPI Number
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacistDetail.npiNumber || 'N/A'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Stack>
                        </Paper>
                      </Box>

                      {/* Additional Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconFileText size={20} style={{ marginRight: 8 }} />
                          Additional Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconLanguage size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Languages Spoken
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {Array.isArray(pharmacistDetail.languagesSpoken) 
                                  ? pharmacistDetail.languagesSpoken.join(', ') 
                                  : pharmacistDetail.languagesSpoken || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconFileText size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Notes
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacistDetail.notes || 'No notes available'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Administrative Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconHistory size={20} style={{ marginRight: 8 }} />
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
                                {pharmacistDetail.created_on ? (() => {
                                  try {
                                    return format(parseISO(pharmacistDetail.created_on), 'MM/dd/yyyy hh:mm a');
                                  } catch (error) {
                                    return pharmacistDetail.created_on || 'N/A';
                                  }
                                })() : 'N/A'}
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
                                {pharmacistDetail.created_by || 'N/A'}
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
                                {pharmacistDetail.updated_on ? (() => {
                                  try {
                                    return format(parseISO(pharmacistDetail.updated_on), 'MM/dd/yyyy hh:mm a');
                                  } catch (error) {
                                    return pharmacistDetail.updated_on || 'N/A';
                                  }
                                })() : 'N/A'}
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
                                {pharmacistDetail.updated_by || 'N/A'}
                              </Typography>
                            </Grid>
                            {pharmacistDetail.deleted && (
                              <>
                                <Grid item lg={6} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconArchive size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      Archived On
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacistDetail.deleted_on ? (() => {
                                      try {
                                        return format(parseISO(pharmacistDetail.deleted_on), 'MM/dd/yyyy hh:mm a');
                                      } catch (error) {
                                        return pharmacistDetail.deleted_on || 'N/A';
                                      }
                                    })() : 'N/A'}
                                  </Typography>
                                </Grid>
                                <Grid item lg={6} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      Archived By
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacistDetail.deleted_by || 'N/A'}
                                  </Typography>
                                </Grid>
                              </>
                            )}
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconShield size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Status
                                </Typography>
                              </Box>
                              <Chip 
                                label={pharmacistDetail.deleted ? 'Archived' : (pharmacistDetail.status || 'Active')} 
                                color={pharmacistDetail.deleted ? 'warning' : (pharmacistDetail.status === 'active' ? 'success' : 'default')}
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
                              <Badge badgeContent={pharmacistDetail.version || '1'} color="primary">
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
                  {!pharmacistDetail.deleted && (
                    <>
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
                        onClick={handleArchive}
                      >
                        Archive
                      </Button>
                    </>
                  )}
                  {pharmacistDetail.deleted && (
                    <Button
                      color="success"
                      variant="contained"
                      size="small"
                      onClick={handleRestore}
                    >
                      Restore
                    </Button>
                  )}
                </Box>
              </Box>
            ) : (
              <BlankCard sx={{ p: 0, height: '100%' }}>
                <Scrollbar sx={{ height: '100%' }}>
                  <Box p={3}>
                    {/* Basic Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Basic Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            fullWidth
                            label="First Name"
                            value={pharmacistDetail?.firstname || ''}
                            onChange={(e) => handleFieldChange('firstname', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            value={pharmacistDetail?.lastname || ''}
                            onChange={(e) => handleFieldChange('lastname', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Years of Experience"
                            type="number"
                            value={pharmacistDetail?.yearsOfExperience || ''}
                            onChange={(e) => handleFieldChange('yearsOfExperience', parseInt(e.target.value) || 0)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <CustomSelect
                            fullWidth
                            label="Department"
                            value={pharmacistDetail?.department || ''}
                            onChange={(e) => handleFieldChange('department', e.target.value)}
                          >
                            {departments.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Contact Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Contact Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            value={pharmacistDetail?.email || ''}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            fullWidth
                            label="Phone"
                            value={pharmacistDetail?.phone || ''}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* License & Certification Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        License & Certification Information
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Stack spacing={3}>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                              DEA Information
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item lg={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="DEA Number"
                                  value={pharmacistDetail?.deaNumber || ''}
                                  onChange={(e) => handleFieldChange('deaNumber', e.target.value)}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                              License Information
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item lg={6} xs={12}>
                                <TextField
                                  fullWidth
                                  label="License Number"
                                  value={pharmacistDetail?.licenseNumber || ''}
                                  onChange={(e) => handleFieldChange('licenseNumber', e.target.value)}
                                />
                              </Grid>
                              <Grid item lg={6} xs={12}>
                                <TextField
                                  fullWidth
                                  type="date"
                                  label="License Expiration"
                                  value={pharmacistDetail?.licenseExpiration ? pharmacistDetail.licenseExpiration.split('T')[0] : ''}
                                  onChange={(e) => handleFieldChange('licenseExpiration', e.target.value)}
                                  InputLabelProps={{ shrink: true }}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>
                              NPI Information
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item lg={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="NPI Number"
                                  value={pharmacistDetail?.npiNumber || ''}
                                  onChange={(e) => handleFieldChange('npiNumber', e.target.value)}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        </Stack>
                      </Paper>
                    </Box>

                    {/* Additional Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Additional Information
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            fullWidth
                            label="Languages Spoken"
                            value={Array.isArray(pharmacistDetail?.languagesSpoken) ? pharmacistDetail.languagesSpoken.join(', ') : pharmacistDetail?.languagesSpoken || ''}
                            onChange={(e) => handleFieldChange('languagesSpoken', e.target.value)}
                            helperText="Separate languages with commas"
                          />
                        </Grid>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Notes"
                            value={pharmacistDetail?.notes || ''}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                          />
                        </Grid>
                      </Grid>
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
                              {pharmacistDetail.created_on ? (() => {
                                try {
                                  return format(parseISO(pharmacistDetail.created_on), 'MM/dd/yyyy hh:mm a');
                                } catch (error) {
                                  return pharmacistDetail.created_on || 'N/A';
                                }
                              })() : 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Created By
                            </Typography>
                            <Typography variant="body1">
                              {pharmacistDetail.created_by || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Last Updated
                            </Typography>
                            <Typography variant="body1">
                              {pharmacistDetail.updated_on ? (() => {
                                try {
                                  return format(parseISO(pharmacistDetail.updated_on), 'MM/dd/yyyy hh:mm a');
                                } catch (error) {
                                  return pharmacistDetail.updated_on || 'N/A';
                                }
                              })() : 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Updated By
                            </Typography>
                            <Typography variant="body1">
                              {pharmacistDetail.updated_by || 'N/A'}
                            </Typography>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Status
                            </Typography>
                            <Chip 
                              label={pharmacistDetail.status || 'Active'} 
                              color={pharmacistDetail.status === 'active' ? 'success' : 'default'}
                              size="small"
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <Typography variant="body2" color="text.secondary">
                              Version
                            </Typography>
                            <Badge badgeContent={pharmacistDetail.version || '1'} color="primary">
                              <Typography variant="body1">
                                Current Version
                              </Typography>
                            </Badge>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSave}
                      >
                        Save Pharmacist
                      </Button>
                    </Box>
                  </Box>
                </Scrollbar>
              </BlankCard>
            )}
          </Box>
        </>
      ) : (
        <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
          {/* If no Pharmacist Selected */}
          <Box>
            <Typography variant="h4">Please Select a Pharmacist</Typography>
            <br />
            <img src={emailIcon} alt="Email Icon" width={'250px'} />
          </Box>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleConfirmDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDialog.action} color="warning" variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PharmacistDetails;


