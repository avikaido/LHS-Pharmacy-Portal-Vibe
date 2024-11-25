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

        <Logo />
        <Box textAlign="right">
          {selectedRequest.status === 'Shipped' ? (
            <Chip size="small" color="primary" label={selectedRequest.status} />
          ) : selectedRequest.status === 'Delivered' ? (
            <Chip size="small" color="success" label={selectedRequest.status} />
          ) : selectedRequest.status === 'Pending' ? (
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
                From :
              </Typography>
              <Typography variant="body1">{selectedRequest.billFrom}</Typography>
              <Typography variant="body1">{selectedRequest.billFromEmail}</Typography>
              <Typography variant="body1">{selectedRequest.billFromAddress}</Typography>
              <Typography variant="body1">{selectedRequest.billFromPhone}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                To :
              </Typography>
              <Typography variant="body1">{selectedRequest.billTo}</Typography>
              <Typography variant="body1">{selectedRequest.billToEmail}</Typography>
              <Typography variant="body1">{selectedRequest.billToAddress}</Typography>
              <Typography variant="body1">{selectedRequest.billToPhone}</Typography>
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
                    Item Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Unit Price
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Unit
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6" fontSize="14px">
                    Total Cost
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRequest.orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="body1">{order.itemName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.unitPrice}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.units}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1">{order.unitTotalPrice}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box p={3} bgcolor="primary.light" mt={3}>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Sub Total:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedRequest.totalCost}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            Vat:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedRequest.vat}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" gap={3}>
          <Typography variant="body1" fontWeight={600}>
            Grand Total:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {selectedRequest.grandTotal}
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