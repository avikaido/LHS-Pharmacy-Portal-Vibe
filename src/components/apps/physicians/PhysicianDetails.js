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
  updatePhysician,
  deletePhysician,
  restorePhysician,
} from 'src/store/apps/physicians/PhysicianSlice';
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
  IconGlobe,
  IconWorld,
} from '@tabler/icons';
import { format, isValid, parseISO } from 'date-fns';
import BlankCard from '../../shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

const specialties = [
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Dermatology', label: 'Dermatology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Orthopedics', label: 'Orthopedics' },
  { value: 'Pediatrics', label: 'Pediatrics' },
  { value: 'Psychiatry', label: 'Psychiatry' },
  { value: 'Internal Medicine', label: 'Internal Medicine' },
  { value: 'Emergency Medicine', label: 'Emergency Medicine' },
  { value: 'Surgery', label: 'Surgery' },
  { value: 'Family Medicine', label: 'Family Medicine' },
];

const departments = [
  { value: 'Emergency Medicine', label: 'Emergency Medicine' },
  { value: 'Internal Medicine', label: 'Internal Medicine' },
  { value: 'Surgery', label: 'Surgery' },
  { value: 'Cardiology', label: 'Cardiology' },
  { value: 'Neurology', label: 'Neurology' },
  { value: 'Pediatrics', label: 'Pediatrics' },
];

const PhysicianDetails = () => {
  const physicians = useSelector((state) => state.physicians.physicians);
  const physicianId = useSelector((state) => state.physicians.physicianContent) || (physicians.length > 0 ? physicians[0].id : null);
  const physicianDetail = physicians.find((physician) => physician.id === physicianId) || null;
  
  const editPhysician = useSelector((state) => state.physicians.editPhysician);
  const loading = useSelector((state) => state.physicians.loading);
  const error = useSelector((state) => state.physicians.error);
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
    if (editPhysician && physicianDetail && !originalValues) {
      setOriginalValues({ ...physicianDetail });
    }
  }, [editPhysician, physicianDetail, originalValues]);

  if (loading) return <div>Loading doctor details...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFieldChange = (field, value) => {
    // This would need to be implemented in the slice
    console.log('Field change:', field, value);
  };

  const handleSave = async () => {
    try {
      // Create updates object with all current values
      const updates = {
        first_name: physicianDetail.first_name,
        middle_initial: physicianDetail.middle_initial,
        last_name: physicianDetail.last_name,
        suffix: physicianDetail.suffix,
        title: physicianDetail.title,
        specialty: physicianDetail.specialty,
        sub_specialty: physicianDetail.sub_specialty,
        practice_type: physicianDetail.practice_type,
        phone: physicianDetail.phone,
        fax: physicianDetail.fax,
        email: physicianDetail.email,
        website: physicianDetail.website,
        address: physicianDetail.address,
        address2: physicianDetail.address2,
        city: physicianDetail.city,
        state: physicianDetail.state,
        zip_code: physicianDetail.zip_code,
        country: physicianDetail.country,
        npi_number: physicianDetail.npi_number,
        dea_number: physicianDetail.dea_number,
        license_number: physicianDetail.license_number,
        license_expiration: physicianDetail.license_expiration,
        years_of_experience: physicianDetail.years_of_experience,
        practice_name: physicianDetail.practice_name,
        department: physicianDetail.department,
        languages_spoken: physicianDetail.languages_spoken,
        notes: physicianDetail.notes,
      };
      
      await dispatch(updatePhysician({ id: physicianDetail.id, updates })).unwrap();
      dispatch(isEdit());
      setOriginalValues(null);
    } catch (error) {
      console.error('Failed to save physician:', error);
    }
  };

  const handleCancel = () => {
    // Restore original values
    if (originalValues) {
      Object.keys(originalValues).forEach(field => {
        handleFieldChange(field, originalValues[field]);
      });
    }
    dispatch(isEdit());
    setOriginalValues(null);
  };

  const handleArchive = () => {
    setConfirmDialog({
      open: true,
      title: 'Archive Doctor',
      message: `Are you sure you want to archive ${physicianDetail.first_name} ${physicianDetail.last_name}? This will hide them from the active list but can be restored later.`,
      action: () => {
        dispatch(deletePhysician(physicianDetail.id));
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleRestore = () => {
    setConfirmDialog({
      open: true,
      title: 'Restore Doctor',
      message: `Are you sure you want to restore ${physicianDetail.first_name} ${physicianDetail.last_name}? This will make them active again.`,
      action: () => {
        dispatch(restorePhysician(physicianDetail.id));
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialog({ open: false, title: '', message: '', action: null });
  };

  return (
    <>
              {/* Doctor Detail Part */}
      {physicianDetail ? (
        <>
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Doctor Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              {!editPhysician && (
                <>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => dispatch(isEdit())}>
                      <IconPencil size="18" stroke={1.3} />
                    </IconButton>
                  </Tooltip>
                  {physicianDetail.deleted ? (
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
                </>
              )}
            </Stack>
          </Box>
          <Divider />
          {/* Doctor Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPhysician ? (
              <Box>
                <BlankCard sx={{ p: 0, height: '100%' }}>
                  <Scrollbar sx={{ height: '100%' }}>
                    <Box p={3}>
                      {/* Status Banner for Archived Doctors */}
                      {physicianDetail.deleted && (
                        <Box mb={3} p={2} bgcolor="warning.light" borderRadius={1}>
                          <Typography variant="body2" color="warning.dark" display="flex" alignItems="center">
                            <IconArchive size={16} style={{ marginRight: 8 }} />
                            This doctor is archived and not active in the system.
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
                                {physicianDetail.first_name || 'N/A'}
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
                                {physicianDetail.last_name || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Middle Initial
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.middle_initial || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Suffix
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.suffix || 'N/A'}
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
                                {physicianDetail.years_of_experience || 'N/A'} years
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconStethoscope size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Specialty
                                </Typography>
                              </Box>
                              <Chip 
                                label={physicianDetail.specialty || 'N/A'} 
                                color="primary" 
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBuilding size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Department
                                </Typography>
                              </Box>
                              <Chip 
                                label={physicianDetail.department || 'N/A'} 
                                color="secondary" 
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBuilding size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Practice Name
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.practice_name || 'N/A'}
                              </Typography>
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
                                {physicianDetail.email || 'N/A'}
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
                                {physicianDetail.phone || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconPhone size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Fax
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.fax || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconGlobe size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Website
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.website || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Address Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconMapPin size={20} style={{ marginRight: 8 }} />
                          Address Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Address
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.address || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Address 2
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.address2 || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  City
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.city || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  State
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.state || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={4} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconMapPin size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Zip Code
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.zip_code || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconWorld size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Country
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.country || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* License & Credentials */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconLicense size={20} style={{ marginRight: 8 }} />
                          License & Credentials
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  License Number
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.license_number || 'N/A'}
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
                                {physicianDetail.license_expiration || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  NPI Number
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.npi_number || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconId size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  DEA Number
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.dea_number || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
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
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconLanguage size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Languages Spoken
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.languages_spoken || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBriefcase size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Practice Type
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.practice_type || 'N/A'}
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
                                {physicianDetail.notes || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Status Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconShield size={20} style={{ marginRight: 8 }} />
                          Status Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconClock size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Created Date
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.created_at ? 
                                  format(new Date(physicianDetail.created_at), 'MM/dd/yyyy') : 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconHistory size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Last Updated
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {physicianDetail.updated_at ? 
                                  format(new Date(physicianDetail.updated_at), 'MM/dd/yyyy') : 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                                             </Box>
                     </Box>
                   </Scrollbar>
                 </BlankCard>
                 <Divider />
                 <Box p={3} gap={1} display="flex">
                   {!physicianDetail.deleted && (
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
                   {physicianDetail.deleted && (
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
              // Edit Mode - Modern Form Design
              <BlankCard sx={{ p: 0 }}>
                <Scrollbar sx={{ height: { lg: 'calc(100vh - 360px)', md: '100vh' } }}>
                  <Box p={3}>
                    <Typography variant="h6" color="primary" mb={3}>
                      Edit Physician Information
                    </Typography>
                    
                    {/* Basic Information Form */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                        <IconUser size={20} style={{ marginRight: 8 }} />
                        Basic Information
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Grid container spacing={3}>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="First Name"
                              fullWidth
                              size="small"
                              value={physicianDetail.first_name || ''}
                              onChange={(e) => handleFieldChange('first_name', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Last Name"
                              fullWidth
                              size="small"
                              value={physicianDetail.last_name || ''}
                              onChange={(e) => handleFieldChange('last_name', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Middle Initial"
                              fullWidth
                              size="small"
                              value={physicianDetail.middle_initial || ''}
                              onChange={(e) => handleFieldChange('middle_initial', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Suffix"
                              fullWidth
                              size="small"
                              value={physicianDetail.suffix || ''}
                              onChange={(e) => handleFieldChange('suffix', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <CustomSelect
                              label="Specialty"
                              value={physicianDetail.specialty || ''}
                              onChange={(e) => handleFieldChange('specialty', e.target.value)}
                              fullWidth
                              size="small"
                            >
                              {specialties.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <CustomSelect
                              label="Department"
                              value={physicianDetail.department || ''}
                              onChange={(e) => handleFieldChange('department', e.target.value)}
                              fullWidth
                              size="small"
                            >
                              {departments.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </CustomSelect>
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Years of Experience"
                              type="number"
                              fullWidth
                              size="small"
                              value={physicianDetail.years_of_experience || ''}
                              onChange={(e) => handleFieldChange('years_of_experience', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Practice Name"
                              fullWidth
                              size="small"
                              value={physicianDetail.practice_name || ''}
                              onChange={(e) => handleFieldChange('practice_name', e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>

                    {/* Contact Information Form */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                        <IconPhone size={20} style={{ marginRight: 8 }} />
                        Contact Information
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Grid container spacing={3}>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Email"
                              type="email"
                              fullWidth
                              size="small"
                              value={physicianDetail.email || ''}
                              onChange={(e) => handleFieldChange('email', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Phone"
                              fullWidth
                              size="small"
                              value={physicianDetail.phone || ''}
                              onChange={(e) => handleFieldChange('phone', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Fax"
                              fullWidth
                              size="small"
                              value={physicianDetail.fax || ''}
                              onChange={(e) => handleFieldChange('fax', e.target.value)}
                            />
                          </Grid>
                          <Grid item lg={6} xs={12}>
                            <TextField
                              label="Website"
                              fullWidth
                              size="small"
                              value={physicianDetail.website || ''}
                              onChange={(e) => handleFieldChange('website', e.target.value)}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>

                    {/* Action Buttons */}
                    <Box display="flex" gap={2} justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        color="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleSave}
                        color="primary"
                      >
                        Save Changes
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
          <Box textAlign="center">
            <Typography variant="h4" color="text.secondary" mb={2}>
              Please Select a Physician
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose a physician from the list to view their details
            </Typography>
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
          <Button onClick={confirmDialog.action} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PhysicianDetails;

