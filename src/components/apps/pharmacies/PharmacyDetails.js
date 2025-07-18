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
  updatePharmacy,
  deletePharmacy,
  restorePharmacy,
} from 'src/store/apps/pharmacies/PharmacySlice';
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
  IconWorld,
  IconClock as IconTime,
  IconNotes,
  IconLink,
  IconQrcode,
} from '@tabler/icons';
import { format, isValid, parseISO } from 'date-fns';
import BlankCard from '../../shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';

const pharmacyTypes = [
  { value: 'retail', label: 'Retail Pharmacy' },
  { value: 'hospital', label: 'Hospital Pharmacy' },
  { value: 'compounding', label: 'Compounding Pharmacy' },
  { value: 'independent', label: 'Independent Pharmacy' },
  { value: 'mail_order', label: 'Mail Order Pharmacy' },
];

const PharmacyDetails = () => {
  const pharmacies = useSelector((state) => state.pharmaciesReducer.pharmacies);
  const pharmacyId = useSelector((state) => state.pharmaciesReducer.pharmacyContent) || (pharmacies.length > 0 ? pharmacies[0].id : null);
  const pharmacyDetail = pharmacies.find((pharmacy) => pharmacy.id === pharmacyId) || null;
  
  const editPharmacy = useSelector((state) => state.pharmaciesReducer.editPharmacy);
  const loading = useSelector((state) => state.pharmaciesReducer.loading);
  const error = useSelector((state) => state.pharmaciesReducer.error);
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
    if (editPharmacy && pharmacyDetail && !originalValues) {
      setOriginalValues({ ...pharmacyDetail });
    }
  }, [editPharmacy, pharmacyDetail, originalValues]);

  if (loading) return <div>Loading pharmacy details...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFieldChange = (field, value) => {
    dispatch(updatePharmacy({ id: pharmacyDetail.id, pharmacyData: { [field]: value } }));
  };

  const handleSave = async () => {
    try {
      // Create updates object with all current values
      const updates = {
        pharmacy_name: pharmacyDetail.pharmacy_name,
        pharmacy_type: pharmacyDetail.pharmacy_type,
        phone: pharmacyDetail.phone,
        fax: pharmacyDetail.fax,
        email: pharmacyDetail.email,
        website: pharmacyDetail.website,
        address: pharmacyDetail.address,
        address2: pharmacyDetail.address2,
        city: pharmacyDetail.city,
        state: pharmacyDetail.state,
        zipcode: pharmacyDetail.zipcode,
        business_hours: pharmacyDetail.business_hours,
        license_number: pharmacyDetail.license_number,
        license_expiration: pharmacyDetail.license_expiration,
        npi_number: pharmacyDetail.npi_number,
        insurance_accepted: pharmacyDetail.insurance_accepted,
        services_offered: pharmacyDetail.services_offered,
        chain_name: pharmacyDetail.chain_name,
        contact_person: pharmacyDetail.contact_person,
        notes: pharmacyDetail.notes,
      };
      
      await dispatch(updatePharmacy({ id: pharmacyDetail.id, pharmacyData: updates })).unwrap();
      dispatch(isEdit());
      setOriginalValues(null);
    } catch (error) {
      console.error('Failed to save pharmacy:', error);
    }
  };

  const handleCancel = () => {
    // Restore original values
    if (originalValues) {
      Object.keys(originalValues).forEach(field => {
        dispatch(updatePharmacy({ id: pharmacyDetail.id, pharmacyData: { [field]: originalValues[field] } }));
      });
    }
    dispatch(isEdit());
    setOriginalValues(null);
  };

  const handleArchive = () => {
    setConfirmDialog({
      open: true,
      title: 'Archive Pharmacy',
      message: `Are you sure you want to archive ${pharmacyDetail.pharmacy_name}? This will hide it from the active list but can be restored later.`,
      action: () => {
        dispatch(deletePharmacy(pharmacyDetail.id));
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleRestore = () => {
    setConfirmDialog({
      open: true,
      title: 'Restore Pharmacy',
      message: `Are you sure you want to restore ${pharmacyDetail.pharmacy_name}? This will make it active again.`,
      action: () => {
        dispatch(restorePharmacy(pharmacyDetail.id));
        setConfirmDialog({ open: false, title: '', message: '', action: null });
      },
    });
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialog({ open: false, title: '', message: '', action: null });
  };

  return (
    <>
      {/* Pharmacy Detail Part */}
      {pharmacyDetail ? (
        <>
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Pharmacy Details</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={editPharmacy ? 'Save' : 'Edit'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editPharmacy ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              {pharmacyDetail.deleted ? (
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
          {/* Pharmacy Details Table Part */}
          <Box sx={{ overflow: 'auto' }}>
            {!editPharmacy ? (
              <Box>
                <BlankCard sx={{ p: 0, height: '100%' }}>
                  <Scrollbar sx={{ height: '100%' }}>
                    <Box p={3}>
                      {/* Status Banner for Archived Pharmacies */}
                      {pharmacyDetail.deleted && (
                        <Box mb={3} p={2} bgcolor="warning.light" borderRadius={1}>
                          <Typography variant="body2" color="warning.dark" display="flex" alignItems="center">
                            <IconArchive size={16} style={{ marginRight: 8 }} />
                            This pharmacy is archived and not active in the system.
                          </Typography>
                        </Box>
                      )}

                      {/* Basic Information */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconBuilding size={20} style={{ marginRight: 8 }} />
                          Basic Information
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBuilding size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Pharmacy Name
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.pharmacy_name || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBriefcase size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Pharmacy Type
                                </Typography>
                              </Box>
                              <Chip 
                                label={pharmacyDetail.pharmacy_type || 'N/A'} 
                                color="primary" 
                                size="small"
                              />
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconBuilding size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Chain Name
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.chain_name || 'Independent'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconUser size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Contact Person
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.contact_person || 'N/A'}
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
                                {pharmacyDetail.email || 'N/A'}
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
                                {pharmacyDetail.phone || 'N/A'}
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
                                {pharmacyDetail.fax || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconWorld size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Website
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.website ? (
                                  <a href={pharmacyDetail.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {pharmacyDetail.website}
                                  </a>
                                ) : 'N/A'}
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
                                {pharmacyDetail.address || 'N/A'}
                                {pharmacyDetail.address2 && `, ${pharmacyDetail.address2}`}
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
                                {pharmacyDetail.city || 'N/A'}
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
                                {pharmacyDetail.state || 'N/A'}
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
                                {pharmacyDetail.zipcode || 'N/A'}
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
                                    {pharmacyDetail.license_number || 'N/A'}
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
                                    {pharmacyDetail.license_expiration ? (() => {
                                      try {
                                        return format(parseISO(pharmacyDetail.license_expiration), 'MM/dd/yyyy');
                                      } catch (error) {
                                        return pharmacyDetail.license_expiration || 'N/A';
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
                                    {pharmacyDetail.npi_number || 'N/A'}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Stack>
                        </Paper>
                      </Box>

                      {/* Services & Insurance */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconShield size={20} style={{ marginRight: 8 }} />
                          Services & Insurance
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconCreditCard size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Insurance Accepted
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.insurance_accepted || 'N/A'}
                              </Typography>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconStethoscope size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Services Offered
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.services_offered || 'N/A'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* Business Hours */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconTime size={20} style={{ marginRight: 8 }} />
                          Business Hours
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconTime size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Operating Hours
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.business_hours || 'N/A'}
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
                            <Grid item lg={12} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconNotes size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Notes
                                </Typography>
                              </Box>
                              <Typography variant="body1" fontWeight={500}>
                                {pharmacyDetail.notes || 'No notes available'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Box>

                      {/* QR Code Section */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                          <IconQrcode size={20} style={{ marginRight: 8 }} />
                          QR Code & Quick Access
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={3}>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconQrcode size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  QR Code
                                </Typography>
                              </Box>
                              <Box p={2} border={1} borderColor="divider" borderRadius={1} display="flex" justifyContent="center">
                                <Typography variant="body2" color="text.secondary">
                                  QR Code will be generated here
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item lg={6} xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconLink size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  Quick Links
                                </Typography>
                              </Box>
                              <Stack spacing={1}>
                                <Button variant="outlined" size="small" startIcon={<IconFileText size={16} />}>
                                  View Requests
                                </Button>
                                <Button variant="outlined" size="small" startIcon={<IconUser size={16} />}>
                                  View Pharmacists
                                </Button>
                              </Stack>
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
                                {pharmacyDetail.created_on ? (() => {
                                  try {
                                    return format(parseISO(pharmacyDetail.created_on), 'MM/dd/yyyy hh:mm a');
                                  } catch (error) {
                                    return pharmacyDetail.created_on || 'N/A';
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
                                {pharmacyDetail.created_by || 'N/A'}
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
                                {pharmacyDetail.updated_on ? (() => {
                                  try {
                                    return format(parseISO(pharmacyDetail.updated_on), 'MM/dd/yyyy hh:mm a');
                                  } catch (error) {
                                    return pharmacyDetail.updated_on || 'N/A';
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
                                {pharmacyDetail.updated_by || 'N/A'}
                              </Typography>
                            </Grid>
                            {pharmacyDetail.deleted && (
                              <>
                                <Grid item lg={6} xs={12}>
                                  <Box display="flex" alignItems="center" mb={1}>
                                    <IconArchive size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                      Archived On
                                    </Typography>
                                  </Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {pharmacyDetail.deleted_on ? (() => {
                                      try {
                                        return format(parseISO(pharmacyDetail.deleted_on), 'MM/dd/yyyy hh:mm a');
                                      } catch (error) {
                                        return pharmacyDetail.deleted_on || 'N/A';
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
                                    {pharmacyDetail.deleted_by || 'N/A'}
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
                                label={pharmacyDetail.deleted ? 'Archived' : (pharmacyDetail.status || 'Active')} 
                                color={pharmacyDetail.deleted ? 'warning' : (pharmacyDetail.status === 'active' ? 'success' : 'default')}
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
                              <Badge badgeContent={pharmacyDetail.version || '1'} color="primary">
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
                  {!pharmacyDetail.deleted && (
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
                  {pharmacyDetail.deleted && (
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
                      <Grid container spacing={3}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Pharmacy Name"
                            fullWidth
                            value={pharmacyDetail.pharmacy_name || ''}
                            onChange={(e) => handleFieldChange('pharmacy_name', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <CustomSelect
                            label="Pharmacy Type"
                            value={pharmacyDetail.pharmacy_type || ''}
                            onChange={(e) => handleFieldChange('pharmacy_type', e.target.value)}
                            fullWidth
                          >
                            {pharmacyTypes.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </CustomSelect>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Chain Name"
                            fullWidth
                            value={pharmacyDetail.chain_name || ''}
                            onChange={(e) => handleFieldChange('chain_name', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Contact Person"
                            fullWidth
                            value={pharmacyDetail.contact_person || ''}
                            onChange={(e) => handleFieldChange('contact_person', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Contact Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Contact Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={pharmacyDetail.email || ''}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Phone"
                            fullWidth
                            value={pharmacyDetail.phone || ''}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Fax"
                            fullWidth
                            value={pharmacyDetail.fax || ''}
                            onChange={(e) => handleFieldChange('fax', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Website"
                            fullWidth
                            value={pharmacyDetail.website || ''}
                            onChange={(e) => handleFieldChange('website', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Address Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Address Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            label="Address"
                            fullWidth
                            value={pharmacyDetail.address || ''}
                            onChange={(e) => handleFieldChange('address', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            label="Address Line 2"
                            fullWidth
                            value={pharmacyDetail.address2 || ''}
                            onChange={(e) => handleFieldChange('address2', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                          <TextField
                            label="City"
                            fullWidth
                            value={pharmacyDetail.city || ''}
                            onChange={(e) => handleFieldChange('city', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                          <TextField
                            label="State"
                            fullWidth
                            value={pharmacyDetail.state || ''}
                            onChange={(e) => handleFieldChange('state', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={4} xs={12}>
                          <TextField
                            label="Zip Code"
                            fullWidth
                            value={pharmacyDetail.zipcode || ''}
                            onChange={(e) => handleFieldChange('zipcode', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* License & Certification */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        License & Certification
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="License Number"
                            fullWidth
                            value={pharmacyDetail.license_number || ''}
                            onChange={(e) => handleFieldChange('license_number', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="License Expiration"
                            type="date"
                            fullWidth
                            value={pharmacyDetail.license_expiration || ''}
                            onChange={(e) => handleFieldChange('license_expiration', e.target.value)}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            label="NPI Number"
                            fullWidth
                            value={pharmacyDetail.npi_number || ''}
                            onChange={(e) => handleFieldChange('npi_number', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Services & Insurance */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Services & Insurance
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Insurance Accepted"
                            fullWidth
                            multiline
                            rows={3}
                            value={pharmacyDetail.insurance_accepted || ''}
                            onChange={(e) => handleFieldChange('insurance_accepted', e.target.value)}
                          />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                          <TextField
                            label="Services Offered"
                            fullWidth
                            multiline
                            rows={3}
                            value={pharmacyDetail.services_offered || ''}
                            onChange={(e) => handleFieldChange('services_offered', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Business Hours */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Business Hours
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            label="Operating Hours"
                            fullWidth
                            multiline
                            rows={2}
                            value={pharmacyDetail.business_hours || ''}
                            onChange={(e) => handleFieldChange('business_hours', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Additional Information */}
                    <Box mb={4}>
                      <Typography variant="h6" color="primary" mb={2}>
                        Additional Information
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item lg={12} xs={12}>
                          <TextField
                            label="Notes"
                            fullWidth
                            multiline
                            rows={4}
                            value={pharmacyDetail.notes || ''}
                            onChange={(e) => handleFieldChange('notes', e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Box>

                    {/* Action Buttons */}
                    <Box p={3} gap={1} display="flex">
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        onClick={handleCancel}
                      >
                        Cancel
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
              Please Select a Pharmacy
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose a pharmacy from the list to view its details
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
          <Button onClick={confirmDialog.action} color="primary" variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PharmacyDetails;



