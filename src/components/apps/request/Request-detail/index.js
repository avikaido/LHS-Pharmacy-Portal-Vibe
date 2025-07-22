import React, { useContext, useEffect, useState } from 'react';
import { RequestContext } from 'src/context/RequestContext/index';
import { useLocation, useParams } from 'react-router-dom';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Chip,
  Divider,
  Grid,
} from '@mui/material';
import { format, isValid, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, pdf } from '@react-pdf/renderer';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  refNumber: {
    position: 'absolute',
    top: 40,
    left: 40,
    fontSize: 11,
  },
  pharmacyInfo: {
    position: 'absolute',
    top: 40,
    right: 40,
    textAlign: 'right',
    fontSize: 11,
  },
  confidentialBox: {
    border: '1pt solid black',
    padding: 8,
    marginTop: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  confidentialText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsSection: {
    marginBottom: 20,
  },
  dateSection: {
    marginBottom: 20,
    borderBottom: '1pt solid black',
    paddingBottom: 15,
  },
  contactGrid: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
  },
  contactColumn: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  messageSection: {
    marginBottom: 20,
  },
  disclaimerBox: {
    border: '1pt solid black',
    padding: 8,
    marginTop: 'auto',
    textAlign: 'left',
  },
  // Prescription page styles
  prescriptionPage: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  prescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'navy',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'navy',
    marginBottom: 10,
  },
  formField: {
    marginBottom: 8,
    flexDirection: 'row',
  },
  fieldLabel: {
    width: '30%',
    fontWeight: 'bold',
  },
  fieldValue: {
    width: '70%',
  },
  orderDetailBox: {
    border: '1pt solid black',
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  orderDetailHeader: {
    backgroundColor: 'black',
    color: 'white',
    padding: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  responseSection: {
    marginTop: 20,
    borderTop: '1pt solid black',
    padding: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1pt solid black',
    marginRight: 8,
  },
  reasonField: {
    marginTop: 10,
    border: '1pt solid black',
    padding: 8,
    minHeight: 60,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  signatureLine: {
    borderTop: '1pt solid black',
    width: 200,
    marginBottom: 5,
  },
});

const PrescriptionDocument = ({ request }) => {
  const currentDate = format(new Date(), 'EEEE, MMMM dd, yyyy');
  
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Text style={styles.refNumber}>REF ID: RX-{request.id}</Text>
        <View style={styles.pharmacyInfo}>
          <Text>Lincoln Health Supply</Text>
          <Text>301 E Las Olas Blvd</Text>
          <Text>Fort Lauderdale, FL 33301</Text>
        </View>

        <View style={styles.confidentialBox}>
          <Text style={styles.confidentialText}>CONFIDENTIAL FAX</Text>
        </View>

        <View style={styles.instructionsSection}>
          <Text style={styles.label}>Return Instructions:</Text>
          <Text>(1) Requested documents submitted by fax must include this cover sheet in order to be processed;</Text>
          <Text>(2) Documents may be sent by email to: support@lincolnhealthsupply.com. Please include "RX-{request.id}" in the email's subject to ensure prompt review.</Text>
        </View>

        <View style={styles.dateSection}>
          <Text><Text style={styles.label}>DATE:</Text> {currentDate}</Text>
          <Text><Text style={styles.label}>RE:</Text> {request.patient_first_name} {request.patient_middle_initial} {request.patient_last_name}</Text>
        </View>

        <View style={styles.contactGrid}>
          <View style={styles.contactColumn}>
            <Text><Text style={styles.label}>TO:</Text> {request.doctor_first_name} {request.doctor_middle_initial} {request.doctor_last_name}</Text>
            <Text><Text style={styles.label}>FAX:</Text> {request.doctorfax}</Text>
            <Text><Text style={styles.label}>PHONE:</Text> {request.doctorphone}</Text>
          </View>
          <View style={styles.contactColumn}>
            <Text><Text style={styles.label}>FROM:</Text> {request.pharmacy_name}</Text>
            <Text><Text style={styles.label}>FAX:</Text> {request.pharmacyfax}</Text>
            <Text><Text style={styles.label}>PHONE:</Text> {request.pharmacyphone}</Text>
          </View>
        </View>

        <View style={styles.messageSection}>
          <Text style={styles.label}>MESSAGE:</Text>
          <Text>Please review and confirm the information below for {request.patient_first_name} {request.patient_last_name}'s prescription request. Please return with your signature and any additional notes.</Text>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={[styles.label, { marginBottom: 5 }]}>- DISCLAIMER -</Text>
          <Text style={{ fontSize: 9 }}>
            The information contained in this facsimile message is intended for the sole confidential use of the designated recipients and may contain confidential information. If you have received this information in error, any review, dissemination, distribution or copying of this information is strictly prohibited. If you have received this communication in error, please notify us immediately by telephone and return the original message to us by mail or electronic means.
          </Text>
        </View>
      </Page>

      {/* Prescription Page */}
      <Page size="A4" style={styles.prescriptionPage}>
        <Text style={styles.prescriptionTitle}>Standard Written Order (SWO)</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Information</Text>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Patient Name:</Text>
            <Text>{request.patient_first_name} {request.patient_middle_initial} {request.patient_last_name}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Date of Birth:</Text>
            <Text>{request.patientdob}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Phone:</Text>
            <Text>{request.patientphone}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Address:</Text>
            <Text>{request.patientaddress} {request.patientaddress2}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}></Text>
            <Text>{request.patientcity}, {request.patientstate} {request.patientzipcode}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Primary Insurance:</Text>
            <Text>{request.patientinsurance1}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Member ID:</Text>
            <Text>{request.patientinsurance1ID}</Text>
          </View>
        </View>

        <View style={styles.orderDetailBox}>
          <Text style={styles.orderDetailHeader}>DISPENSE AS WRITTEN</Text>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Item:</Text>
            <Text>{request.item_generic_name} {request.item_brand_name}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Dosage:</Text>
            <Text>{request.orderdosage}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Quantity:</Text>
            <Text>{request.orderquantity}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Usage:</Text>
            <Text>{request.orderusage}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Physician Information</Text>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Physician Name:</Text>
            <Text>{request.doctor_first_name} {request.doctor_middle_initial} {request.doctor_last_name}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>NPI:</Text>
            <Text>{request.doctorNPI}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Phone:</Text>
            <Text>{request.doctorphone}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Fax:</Text>
            <Text>{request.doctorfax}</Text>
          </View>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Address:</Text>
            <Text>{request.doctoraddress}</Text>
          </View>
        </View>

        <View style={styles.responseSection}>
          <Text style={styles.sectionTitle}>Physician Response</Text>
          
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text>Approved</Text>
          </View>
          
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text>Rejected</Text>
          </View>
          
          <View style={styles.checkboxRow}>
            <View style={styles.checkbox} />
            <Text>Change Requested</Text>
          </View>

          <Text style={{ marginTop: 10 }}>Reason (if rejected or change requested):</Text>
          <View style={styles.reasonField} />

          <View style={styles.signatureSection}>
            <View>
              <View style={styles.signatureLine} />
              <Text>Physician Signature</Text>
            </View>
            <View>
              <View style={styles.signatureLine} />
              <Text>Date</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const RequestDetail = () => {
  const { requests } = useContext(RequestContext);
  // Use requests.data as the array, fallback to []
  const requestsArray = Array.isArray(requests?.data) ? requests.data : [];
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [patient, setPatient] = useState(null);
  const [physician, setPhysician] = useState(null);
  const [pharmacy, setPharmacy] = useState(null);
  const [item, setItem] = useState(null);
  const [sending, setSending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    if (id && requestsArray.length > 0) {
      const request = requestsArray.find((r) => String(r.id) === String(id));
      if (request) setSelectedRequest(request);
    }
  }, [id, requestsArray]);

  useEffect(() => {
    if (selectedRequest) {
      // Fetch patient
      if (selectedRequest.patient_id) {
        axios.get(`/api/patients/${selectedRequest.patient_id}`).then(res => setPatient(res.data)).catch(() => setPatient(null));
      }
      // Fetch physician
      if (selectedRequest.physician_id) {
        axios.get(`/api/physicians/${selectedRequest.physician_id}`).then(res => setPhysician(res.data.data || res.data)).catch(() => setPhysician(null));
      }
      // Fetch pharmacy
      if (selectedRequest.pharmacy_id) {
        axios.get(`/api/pharmacies/${selectedRequest.pharmacy_id}`).then(res => setPharmacy(res.data.data || res.data)).catch(() => setPharmacy(null));
      }
      // Fetch item
      if (selectedRequest.item_id) {
        axios.get(`/api/items/${selectedRequest.item_id}`).then(res => setItem(res.data)).catch(() => setItem(null));
      }
    }
  }, [selectedRequest]);

  if (!selectedRequest) {
    return <div>Loading...</div>;
  }

  const orderDate = selectedRequest.orderDate
    ? isValid(parseISO(selectedRequest.orderDate))
      ? format(parseISO(selectedRequest.orderDate), 'EEEE, MMMM dd, yyyy')
      : 'Invalid Date'
    : format(new Date(), 'EEEE, MMMM dd, yyyy');

  const handleSendFax = async () => {
    try {
      setSending(true);

      // Generate PDF
      const pdfDoc = <PrescriptionDocument request={selectedRequest} />;
      const pdfBlob = await pdf(pdfDoc).toBlob();
      
      // Create form data with proper file handling
      const formData = new FormData();
      const pdfFile = new File([pdfBlob], 'prescription.pdf', { type: 'application/pdf' });
      formData.append('faxFile', pdfFile);
      formData.append('requestId', selectedRequest.id);
      formData.append('faxNumber', selectedRequest.doctorfax);
      formData.append('userId', '1'); // TODO: Get actual user ID from auth context

      // Send fax
      const response = await axios.post('/api/faxes/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [(data) => data], // Prevent axios from transforming the form data
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      enqueueSnackbar('Fax queued for sending!', { variant: 'success' });

      // Start polling for status updates
      pollFaxStatus(response.data.faxId);

    } catch (error) {
      console.error('Error sending fax:', error);
      
      // Log the full error response for debugging
      if (error.response?.data) {
        console.error('Error response:', {
          error: error.response.data.error,
          details: error.response.data.details
        });
      }
      
      // Extract error message from response
      let errorMessage = 'Failed to send fax. Please try again.';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.details) {
        // If we have detailed errors, format them nicely
        const details = error.response.data.details;
        if (Array.isArray(details)) {
          errorMessage = details.map(d => `${d.field || 'Error'}: ${d.message || 'Unknown error'}`).join('\n');
        }
      }
      
      // Show error message in snackbar
      enqueueSnackbar(errorMessage, { 
        variant: 'error',
        autoHideDuration: 6000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
    } finally {
      setSending(false);
    }
  };

  const pollFaxStatus = async (faxId) => {
    try {
      const response = await axios.get(`/api/faxes/${faxId}/status`);
      const status = response.data.status;

      if (status === 'failed') {
        enqueueSnackbar('Fax failed to send. Please try again.', { variant: 'error' });
      } else if (status === 'sent') {
        enqueueSnackbar('Fax delivered successfully!', { variant: 'success' });
      } else if (status === 'pending') {
        // Poll again after 5 seconds
        setTimeout(() => pollFaxStatus(faxId), 5000);
      }
    } catch (error) {
      console.error('Error checking fax status:', error);
    }
  };

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box
          sx={{
            textAlign: {
              xs: 'center',
              sm: 'left',
            },
          }}
        >
          <Typography variant="h5"># {selectedRequest.id}</Typography>
          <Box mt={1}>
            <Chip size="small" color="secondary" variant="outlined" label={orderDate}></Chip>
          </Box>
        </Box>
        <Box textAlign="center">
        <Typography variant="h6">{selectedRequest.pharmacy_name}</Typography>
        <Typography variant="body2">{selectedRequest.pharmacyaddress}</Typography>
        </Box>
        <Box textAlign="right">
          {selectedRequest.status === 'Processing' ? (
            <Chip size="small" color="primary" label={selectedRequest.status} />
          ) : selectedRequest.status === 'Complete' ? (
            <Chip size="small" color="success" label={selectedRequest.status} />
          ) : selectedRequest.status === 'Created' ? (
            <Chip size="small" color="warning" label={selectedRequest.status} />
          ) : (
            ''
          )}
        </Box>
      </Stack>
      <Divider></Divider>

      <Grid container spacing={3} mt={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                Patient Information
              </Typography>
              <Typography variant="body2" color="text.secondary">Name</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.first_name} {patient?.middle_initial} {patient?.last_name}</Typography>
              <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.dob}</Typography>
              <Typography variant="body2" color="text.secondary">Gender</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.gender}</Typography>
              <Typography variant="body2" color="text.secondary">Phone</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.phone}</Typography>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.email}</Typography>
              <Typography variant="body2" color="text.secondary">Address</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.address} {patient?.address2} {patient?.city} {patient?.state}, {patient?.zipcode}</Typography>
              <Typography variant="body2" color="text.secondary">Primary Insurance</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.insurance1}</Typography>
              <Typography variant="body2" color="text.secondary">Primary Insurance Member ID</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.insurance1_id}</Typography>
              <Typography variant="body2" color="text.secondary">Secondary Insurance</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.insurance2}</Typography>
              <Typography variant="body2" color="text.secondary">Secondary Insurance Member ID</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.insurance2_id}</Typography>
              <Typography variant="body2" color="text.secondary">Notes</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{patient?.notes}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                Physician Information
              </Typography>
              <Typography variant="body2" color="text.secondary">Name</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.first_name} {physician?.middle_initial} {physician?.last_name}</Typography>
              <Typography variant="body2" color="text.secondary">Specialty</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.specialty}</Typography>
              <Typography variant="body2" color="text.secondary">Practice Name</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.practice_name}</Typography>
              <Typography variant="body2" color="text.secondary">Phone</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.phone}</Typography>
              <Typography variant="body2" color="text.secondary">Fax</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.fax}</Typography>
              <Typography variant="body2" color="text.secondary">Email</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.email}</Typography>
              <Typography variant="body2" color="text.secondary">Address</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.address} {physician?.address2} {physician?.city} {physician?.state}, {physician?.zipcode}</Typography>
              <Typography variant="body2" color="text.secondary">NPI Number</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.npi_number}</Typography>
              <Typography variant="body2" color="text.secondary">DEA Number</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.dea_number}</Typography>
              <Typography variant="body2" color="text.secondary">Notes</Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{physician?.notes}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper variant="outlined">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Item
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Dosage
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Quantity
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Usage
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">{item?.generic_name} {item?.brand_name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{selectedRequest.orderdosage}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{selectedRequest.orderquantity}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{selectedRequest.orderusage}</Typography>
                  </TableCell>
                </TableRow>
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box p={3} bgcolor="primary.light" mt={3}>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            I certify that I am the physician identified in the "Physician Information" section above and hereby attest that the medical necessity information is true, accurate, and complete to the best of my knowledge. I understand that any falsification, omission, or concealment of material fact may subject me to administrative, civil, or criminal liability. The patient/caregiver is capable and has successfully completed or will be trained on the proper use of the products prescribed on this order.
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="end" gap={3} mb={3}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={`/apps/request/edit/${selectedRequest.billFrom}`}
        >
          Edit Request
        </Button>
        <PDFDownloadLink
          document={<PrescriptionDocument request={selectedRequest} />}
          fileName={`prescription_${selectedRequest.id}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button variant="contained" color="primary" disabled>
                Loading PDF...
              </Button>
            ) : (
              <Button variant="contained" color="primary">
                Download Prescription
              </Button>
            )
          }
        </PDFDownloadLink>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendFax}
          disabled={sending}
        >
          {sending ? 'Sending Fax...' : 'Send Fax to Doctor'}
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/apps/request/list">
          Back to Request List
        </Button>
      </Box>
    </>
  );
};

export default RequestDetail;