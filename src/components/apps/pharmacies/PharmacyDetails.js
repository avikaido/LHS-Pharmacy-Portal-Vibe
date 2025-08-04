import React, { useState, useEffect } from 'react';
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
  ButtonGroup,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link as MuiLink,
} from '@mui/material';
import {
  isEdit,
  updatePharmacy,
  deletePharmacy,
  restorePharmacy,
} from 'src/store/apps/pharmacies/PharmacySlice';
import { fetchPharmacists } from 'src/store/apps/pharmacists/PharmacistSlice';
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
  IconBrandWhatsapp,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconMessage,
  IconPrinter,
  IconMaximize,
  IconWallet,
  IconBrandGoogle,
} from '@tabler/icons';
import { format, isValid, parseISO } from 'date-fns';
import BlankCard from '../../shared/BlankCard';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import axios from 'src/utils/axios';
import { wrapQrWithBranding } from 'src/utils/qrBranding';
import { downloadQrAsSvg, downloadQrAsPng, downloadQrAsPdf, downloadQrAsGif } from 'src/utils/qrDownload';
import { copyQrImageToClipboard, copyQrLinkToClipboard, copyQrEmbedCodeToClipboard } from 'src/utils/qrClipboard';
import { shareQrByEmail, shareQrBySms, shareQrByWhatsApp, shareQrByFacebook, shareQrByTwitter, shareQrByLinkedIn } from 'src/utils/qrShare';
import { printQrSvg } from 'src/utils/qrPrint';
import { showQrFullscreen } from 'src/utils/qrFullscreen';
import { downloadPharmacyVCard } from 'src/utils/qrVCard';
import { downloadAppleWalletPass, showGoogleWalletInfo } from 'src/utils/qrWallet';
import JSZip from 'jszip';
import { showQrInfoModal } from 'src/utils/qrInfoModal';
import { showQrEmbedModal } from 'src/utils/qrEmbedModal';

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

  const [qrSvg, setQrSvg] = useState(null);
  const [qrSize, setQrSize] = React.useState(256); // Default to Medium
  const sizeOptions = [
    { label: 'Small', value: 128 },
    { label: 'Medium', value: 256 },
    { label: 'Large', value: 512 },
  ];

  // Dynamic requests table state
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);

  // Pharmacists state
  const [pharmacists, setPharmacists] = useState([]);
  const [pharmacistsLoading, setPharmacistsLoading] = useState(false);

  // Initialize original values when entering edit mode
  React.useEffect(() => {
    if (editPharmacy && pharmacyDetail && !originalValues) {
      setOriginalValues({ ...pharmacyDetail });
    }
  }, [editPharmacy, pharmacyDetail, originalValues]);

  const API_BASE = process.env.NODE_ENV === 'production'
    ? 'https://app.askyourprimary.com/api/barcode/generate'
    : 'http://localhost:5002/api/barcode/generate';

  useEffect(() => {
    if (pharmacyDetail && pharmacyDetail.uuid) {
      const qrUrl = `https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`;
      axios.get(`${API_BASE}?type=qr&text=${encodeURIComponent(qrUrl)}&format=svg&size=128`)
        .then(res => setQrSvg(res.data))
        .catch(() => setQrSvg(null));
    }
  }, [pharmacyDetail]);

  // Fetch requests for this pharmacy (first 10 only, no pagination yet)
  useEffect(() => {
    if (!pharmacyDetail?.id) return;
    setRequestsLoading(true);
    axios.get(`/api/requests?pharmacy_id=${pharmacyDetail.id}&limit=10&offset=0`)
      .then(res => {
        setRequests(res.data.data || []);
        setRequestsLoading(false);
      })
      .catch(() => {
        setRequests([]);
        setRequestsLoading(false);
      });
  }, [pharmacyDetail?.id]);

  // Fetch pharmacists for this pharmacy
  useEffect(() => {
    if (!pharmacyDetail?.id) return;
    setPharmacistsLoading(true);
    // For now, fetch all pharmacists. Later we can filter by pharmacy_id when the API supports it
    dispatch(fetchPharmacists())
      .then((result) => {
        if (result.payload) {
          setPharmacists(result.payload);
        }
        setPharmacistsLoading(false);
      })
      .catch(() => {
        setPharmacists([]);
        setPharmacistsLoading(false);
      });
  }, [pharmacyDetail?.id, dispatch]);

  // Debug: log the SVG string
  console.log('qrSvg:', qrSvg);
  // Combine with branded wrapper if available
  const brandedQrSvg = typeof qrSvg === 'string' && qrSvg.trim().startsWith('<svg')
    ? wrapQrWithBranding(qrSvg)
    : null;

  if (loading) return <div>Loading location details...</div>;
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
      title: 'Archive Location',
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
      title: 'Restore Location',
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

  // Remove requests table and related hooks for now

  return (
    <>
              {/* Location Detail Part */}
      {pharmacyDetail ? (
        <>
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Location Details</Typography>
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
          
          {/* Location Details Table Part */}
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
                            This location is archived and not active in the system.
                          </Typography>
                        </Box>
                      )}
                      {/* Quick Links section at the very top */}
                      <Box mb={4}>
                        <Typography variant="h6" color="primary" mb={2} display="flex" alignItems="center">
                            <IconLink size={20} style={{ marginRight: 8 }} />
                            Quick Links
                          </Typography>
                          <Paper variant="outlined" sx={{ p: 2 }}>
                            <Grid container spacing={3}>
                              <Grid item lg={6} xs={12}>
                                {/* Quick Links Buttons Go Here */}
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
                                  <Button variant="contained" color="primary" size="medium" startIcon={<IconFileText size={16} />} sx={{ minWidth: 180, whiteSpace: 'nowrap' }}>
                                    View Requests
                                  </Button>
                                  <Button variant="contained" color="primary" size="medium" startIcon={<IconUser size={16} />} sx={{ minWidth: 180, whiteSpace: 'nowrap' }}>
                                    View Pharmacists
                                  </Button>
                                </Stack>
                              </Grid>
                            </Grid>
                        </Paper>
                      </Box>
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
                                  Location Name
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
                                  Location Type
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
                            <Grid item xs={12}>
                              <Box display="flex" alignItems="center" mb={1}>
                                <IconQrcode size={16} style={{ marginRight: 8, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  QR Code
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  paddingTop: '20px',
                                  paddingBottom: '20px',
                                  px: 2, // keep horizontal padding as before
                                  border: 1,
                                  borderColor: 'divider',
                                  borderRadius: 1,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                tabIndex={0}
                                aria-label="Pharmacy QR code section"
                              >
                                {brandedQrSvg ? (
                                  <span
                                    style={{ width: 500, height: 500, display: 'inline-block' }}
                                    dangerouslySetInnerHTML={{ __html: brandedQrSvg }}
                                    aria-label={`QR code for ${pharmacyDetail?.pharmacy_name || 'pharmacy'}`}
                                    role="img"
                                  />
                                ) : qrSvg ? (
                                  // Fallback: show SVG as preformatted text for debugging
                                  <pre style={{ maxWidth: 300, overflow: 'auto', background: '#eee', color: '#333', fontSize: 10 }}>{qrSvg}</pre>
                                ) : (
                                  <Typography variant="body2" color="text.secondary">
                                    QR Code will be generated here
                                  </Typography>
                                )}
                                {/* QR Code Size Selector */}
                                <Box mb={0.5} display="flex" alignItems="center" justifyContent="center">
                                  <Typography variant="body2" sx={{ mr: 2 }}>
                                    QR Code Size:
                                  </Typography>
                                  <ButtonGroup variant="outlined" size="small" aria-label="QR code size selector">
                                    {sizeOptions.map(opt => (
                                      <Tooltip key={opt.value} title={`${opt.label} (${opt.value}x${opt.value})`}>
                                        <Button
                                          onClick={() => setQrSize(opt.value)}
                                          variant={qrSize === opt.value ? 'contained' : 'outlined'}
                                          aria-label={`Set QR code size to ${opt.label}`}
                                        >
                                          {opt.label}
                                        </Button>
                                      </Tooltip>
                                    ))}
                                  </ButtonGroup>
                                </Box>
                                {/* QR Code Action Buttons */}
                                <Stack direction="row" spacing={2} mt={2}>
                                  <Tooltip title="Download as PNG">
                                    <Button variant="outlined" size="small" onClick={() => brandedQrSvg && downloadQrAsPng(brandedQrSvg, 'pharmacy-qr.png', qrSize)} aria-label="Download QR code as PNG">
                                      PNG
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Download as SVG">
                                    <Button variant="outlined" size="small" onClick={() => brandedQrSvg && downloadQrAsSvg(brandedQrSvg, 'pharmacy-qr.svg', qrSize)} aria-label="Download QR code as SVG">
                                      SVG
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Download as PDF">
                                    <Button variant="outlined" size="small" onClick={() => brandedQrSvg && downloadQrAsPdf(brandedQrSvg, 'pharmacy-qr.pdf', qrSize)} aria-label="Download QR code as PDF">
                                      PDF
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Download as GIF">
                                    <Button variant="outlined" size="small" onClick={() => brandedQrSvg && downloadQrAsGif(brandedQrSvg, 'pharmacy-qr.gif', qrSize)} aria-label="Download QR code as GIF">
                                      GIF
                                    </Button>
                                  </Tooltip>
                                </Stack>
                                {/* Copy/Embed Buttons */}
                                <Stack direction="row" spacing={2} mt={1}>
                                  <Tooltip title="Copy Image to Clipboard">
                                    <Button variant="outlined" size="small" onClick={() => brandedQrSvg && copyQrImageToClipboard(brandedQrSvg)} aria-label="Copy QR code image to clipboard">
                                      Copy Image
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Copy QR Link to Clipboard">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && copyQrLinkToClipboard(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Copy QR code link to clipboard">
                                      Copy Link
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Copy Embed Code (SVG)">
                                    <Button variant="outlined" size="small" onClick={() => brandedQrSvg && copyQrEmbedCodeToClipboard(brandedQrSvg, 'svg')} aria-label="Copy QR code embed code">
                                      Copy Embed
                                    </Button>
                                  </Tooltip>
                                </Stack>
                                {/* Social Share Buttons */}
                                <Stack direction="row" spacing={2} mt={1}>
                                  <Tooltip title="Share via Email">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && shareQrByEmail(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Share QR code via Email">
                                      <IconMail size={16} />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Share via SMS">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && shareQrBySms(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Share QR code via SMS">
                                      <IconMessage size={16} />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Share via WhatsApp">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && shareQrByWhatsApp(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Share QR code via WhatsApp">
                                      <IconBrandWhatsapp size={16} />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Share via Facebook">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && shareQrByFacebook(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Share QR code via Facebook">
                                      <IconBrandFacebook size={16} />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Share via Twitter/X">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && shareQrByTwitter(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Share QR code via Twitter/X">
                                      <IconBrandTwitter size={16} />
                                    </Button>
                                  </Tooltip>
                                  <Tooltip title="Share via LinkedIn">
                                    <Button variant="outlined" size="small" onClick={() => pharmacyDetail && pharmacyDetail.uuid && shareQrByLinkedIn(`https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`)} aria-label="Share QR code via LinkedIn">
                                      <IconBrandLinkedin size={16} />
                                    </Button>
                                  </Tooltip>
                                </Stack>
                                {/* Print & Fullscreen Buttons Row */}
                                <Stack direction="row" spacing={2} mt={1}>
                                  {brandedQrSvg && (
                                    <Tooltip title="Print QR Code">
                                      <Button variant="outlined" size="small" onClick={() => printQrSvg(brandedQrSvg, 'Pharmacy QR Code')} aria-label="Print QR code"> 
                                        <IconPrinter size={16} />
                                      </Button>
                                    </Tooltip>
                                  )}
                                  {brandedQrSvg && (
                                    <Tooltip title="Show Fullscreen">
                                      <Button variant="outlined" size="small" onClick={() => showQrFullscreen(brandedQrSvg, 'Pharmacy QR Code')} aria-label="Show QR code fullscreen"> 
                                        <IconMaximize size={16} />
                                      </Button>
                                    </Tooltip>
                                  )}
                                  {pharmacyDetail && pharmacyDetail.uuid && (
                                    <Tooltip title="Download vCard">
                                      <Button variant="outlined" size="small" onClick={() => downloadPharmacyVCard(pharmacyDetail, `https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}`, 'pharmacy.vcf')} aria-label="Download vCard">
                                        <IconId size={16} />
                                      </Button>
                                    </Tooltip>
                                  )}
                                  {brandedQrSvg && pharmacyDetail && (
                                    <Tooltip title="Show QR Info">
                                      <Button variant="outlined" size="small" onClick={() => showQrInfoModal(brandedQrSvg, pharmacyDetail, pharmacyDetail.uuid ? `https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}` : '', 'Pharmacy QR Code & Info')} aria-label="Show QR code info">
                                        Show QR Info
                                      </Button>
                                    </Tooltip>
                                  )}
                                  {brandedQrSvg && pharmacyDetail && (
                                    <Tooltip title="Custom Embed Options">
                                      <Button variant="outlined" size="small" onClick={() => showQrEmbedModal(brandedQrSvg, pharmacyDetail, pharmacyDetail.uuid ? `https://app.askyourprimary.com/request-wizard?pharmacyID=${encodeURIComponent(pharmacyDetail.uuid)}` : '', 'Custom Embed QR Code', qrSize)} aria-label="Custom embed QR code">
                                        Custom Embed
                                      </Button>
                                    </Tooltip>
                                  )}
                                </Stack>
                              </Box>
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
          {/* Dynamic Requests Table Section */}
          <Box mt={6}>
            <BlankCard sx={{ p: 0, borderRadius: 3, boxShadow: 0, border: '1px solid', borderColor: 'divider', background: 'background.paper' }}>
              <Box p={3}>
                <Typography variant="h6" color="primary" mb={2}>
                  Requests
                </Typography>
                <TableContainer>
                  <Table size="small" aria-label="requests table" sx={{ borderRadius: 2, overflow: 'hidden', background: 'background.paper' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell><Typography variant="h6">ID</Typography></TableCell>
                        <TableCell><Typography variant="h6">Date/Time</Typography></TableCell>
                        <TableCell><Typography variant="h6">Patient</Typography></TableCell>
                        <TableCell><Typography variant="h6">Item</Typography></TableCell>
                        <TableCell><Typography variant="h6">Doctor</Typography></TableCell>
                        <TableCell><Typography variant="h6">Status</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requestsLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">Loading...</TableCell>
                        </TableRow>
                      ) : requests.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ color: 'text.secondary' }}>
                            No requests found for this pharmacy.
                          </TableCell>
                        </TableRow>
                      ) : (
                        requests.map((row) => {
                          let chipColor = 'default';
                          if (row.status) {
                            const status = row.status.toLowerCase();
                            if (status === 'processing') chipColor = 'primary';
                            else if (status === 'complete') chipColor = 'success';
                            else if (status === 'created') chipColor = 'warning';
                            else if (status === 'pending') chipColor = 'info';
                            else if (status === 'cancelled') chipColor = 'error';
                          }
                          return (
                            <TableRow key={row.id} hover>
                              <TableCell>
                                <MuiLink href={`/apps/request/detail/${row.id}`} underline="hover" color="primary" fontWeight={600}>
                                  {row.id}
                                </MuiLink>
                              </TableCell>
                              <TableCell>
                                <Chip label={row.created_on ? new Date(row.created_on).toLocaleString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : ''} sx={{ borderRadius: 2, fontWeight: 500, fontSize: 11, background: '#e3f2fd', color: '#039be5' }} />
                              </TableCell>
                              <TableCell>
                                {row.patient_id ? (
                                  <MuiLink href={`/apps/patients/detail/${row.patient_id}`} underline="hover" color="primary" fontWeight={600}>
                                    {row.patient_first_name} {row.patient_last_name}
                                  </MuiLink>
                                ) : (
                                  <span>{row.patient_first_name} {row.patient_last_name}</span>
                                )}
                              </TableCell>
                              <TableCell>{row.item_generic_name}</TableCell>
                              <TableCell>
                                {row.physician_id ? (
                                  <MuiLink href={`/apps/doctors/detail/${row.physician_id}`} underline="hover" color="primary" fontWeight={600}>
                                    {row.doctor_first_name} {row.doctor_last_name}
                                  </MuiLink>
                                ) : (
                                  <span>{row.doctor_first_name} {row.doctor_last_name}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <Chip label={row.status?.charAt(0).toUpperCase() + row.status?.slice(1)} color={chipColor} size="small" sx={{ borderRadius: 2, fontWeight: 500, fontSize: 11 }} />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </BlankCard>
          </Box>

          {/* Associated Pharmacists Table Section */}
          <Box mt={6}>
            <BlankCard sx={{ p: 0, borderRadius: 3, boxShadow: 0, border: '1px solid', borderColor: 'divider', background: 'background.paper' }}>
              <Box p={3}>
                <Typography variant="h6" color="primary" mb={2}>
                  Associated Pharmacists
                </Typography>
                <TableContainer>
                  <Table size="small" aria-label="pharmacists table" sx={{ borderRadius: 2, overflow: 'hidden', background: 'background.paper' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell><Typography variant="h6">Name</Typography></TableCell>
                        <TableCell><Typography variant="h6">Email</Typography></TableCell>
                        <TableCell><Typography variant="h6">Phone</Typography></TableCell>
                        <TableCell><Typography variant="h6">Department</Typography></TableCell>
                        <TableCell><Typography variant="h6">License</Typography></TableCell>
                        <TableCell><Typography variant="h6">Status</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pharmacistsLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">Loading...</TableCell>
                        </TableRow>
                      ) : pharmacists.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ color: 'text.secondary' }}>
                            No pharmacists associated with this location.
                          </TableCell>
                        </TableRow>
                      ) : (
                        pharmacists.map((pharmacist) => {
                          let chipColor = 'default';
                          if (pharmacist.status) {
                            const status = pharmacist.status.toLowerCase();
                            if (status === 'active') chipColor = 'success';
                            else if (status === 'inactive') chipColor = 'error';
                            else if (status === 'pending') chipColor = 'warning';
                          }
                          return (
                            <TableRow key={pharmacist.id} hover>
                              <TableCell>
                                <MuiLink href={`/apps/pharmacists/detail/${pharmacist.id}`} underline="hover" color="primary" fontWeight={600}>
                                  {pharmacist.firstname} {pharmacist.lastname}
                                </MuiLink>
                              </TableCell>
                              <TableCell>{pharmacist.email}</TableCell>
                              <TableCell>{pharmacist.phone}</TableCell>
                              <TableCell>{pharmacist.department}</TableCell>
                              <TableCell>
                                <Chip 
                                  label={pharmacist.licenseNumber || 'N/A'} 
                                  size="small" 
                                  sx={{ borderRadius: 2, fontWeight: 500, fontSize: 11, background: '#f5f5f5', color: '#666' }} 
                                />
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={pharmacist.status?.charAt(0).toUpperCase() + pharmacist.status?.slice(1) || 'Active'} 
                                  color={chipColor} 
                                  size="small" 
                                  sx={{ borderRadius: 2, fontWeight: 500, fontSize: 11 }} 
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </BlankCard>
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



