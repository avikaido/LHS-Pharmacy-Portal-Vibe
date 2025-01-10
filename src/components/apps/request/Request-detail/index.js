import React, { useContext, useEffect, useState } from 'react';
import { RequestContext } from 'src/context/RequestContext/index';
import { useLocation } from 'react-router-dom';
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

const RequestDetail = () => {
  const { requests } = useContext(RequestContext);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Set the first request as the default selected request initially
    if (requests.length > 0) {
      setSelectedRequest(requests[0]);
    }
  }, [requests]);

  // Get the last part of the URL path as the billFrom parameter
  const title = useLocation();
  const getTitle = title.pathname.split('/').pop();

  // Find the request that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const request = requests.find((p) => p.billFrom === getTitle);
      if (request) {
        setSelectedRequest(request);
      }
    }
  }, [getTitle, requests]);

  if (!selectedRequest) {
    return <div>Loading...</div>;
  }

  const orderDate = selectedRequest.orderDate
    ? isValid(parseISO(selectedRequest.orderDate))
      ? format(parseISO(selectedRequest.orderDate), 'EEEE, MMMM dd, yyyy')
      : 'Invalid Date'
    : format(new Date(), 'EEEE, MMMM dd, yyyy');

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
        <Typography variant="h6">{selectedRequest.pharmacyname}</Typography>
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
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientfirstname} {selectedRequest.patientmiddleInitial} {selectedRequest.patientlastname}</Typography>
              <Typography variant="body2" color="text.secondary">
                Date of Birth
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientdob}</Typography>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientphone}</Typography>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientemail}</Typography>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientaddress} {selectedRequest.patientaddress2} {selectedRequest.patientcity} {selectedRequest.patientstate}, {selectedRequest.patientzipcode}</Typography>
              <Typography variant="body2" color="text.secondary">
                Primary Insurance
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientinsurance1}</Typography>
              <Typography variant="body2" color="text.secondary">
                Primary Insurance Member ID
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientinsurance1ID}</Typography>
              <Typography variant="body2" color="text.secondary">
                Secondary Insurance
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientinsurance2}</Typography>
              <Typography variant="body2" color="text.secondary">
                Secondary Insurance Member ID
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientinsurance2ID}</Typography>
              <Typography variant="body2" color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.patientnotes}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                Physician Information
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorname}</Typography>
              <Typography variant="body2" color="text.secondary">
                Practice
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorpractice}</Typography>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorphone}</Typography>
              <Typography variant="body2" color="text.secondary">
                Fax
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorfax}</Typography>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctoraddress}</Typography>
              <Typography variant="body2" color="text.secondary">
                NPI Number
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorNPI}</Typography>
              <Typography variant="body2" color="text.secondary">
                DEA Number
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorDEA}</Typography>
              <Typography variant="body2" color="text.secondary">
                Office Contact
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctorofficecontact}</Typography>
              <Typography variant="body2" color="text.secondary">
                Notes
              </Typography>
              <Typography variant="body1" mb={0.5} fontWeight={600}>{selectedRequest.doctornotes}</Typography>
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
                    <Typography variant="body1">{selectedRequest.orderitem}</Typography>
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
            I certify that I am the physician identified in the “Physician Information”section below and hereby attest that the medical necessity information is true, accurate, and complete
to the best of my knowledge. I understand that any falsification, omission, or concealment of material fact may subject me to administrative, civil, or criminal liability. The
patient/caregiver is capable and has successfully completed or will be trained on the proper use of the products prescribed on this order.
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={1} mt={3} justifyContent="end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to={`/apps/request/edit/${selectedRequest.billFrom}`}
        >
          Edit Request
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/apps/request/list">
          Back to Request List
        </Button>
      </Box>
    </>
  );
};

export default RequestDetail;