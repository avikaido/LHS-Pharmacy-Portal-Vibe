import React, { useContext, useState, useEffect } from 'react';
import { RequestContext } from 'src/context/RequestContext/index';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  IconButton,
  Tooltip,
  Box,
  Stack,
  Divider,
  Grid,
} from '@mui/material';
import { format, isValid } from 'date-fns';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import CustomSelect from 'src/components/forms/theme-elements/CustomSelect';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import { IconSquareRoundedPlus, IconTrash } from '@tabler/icons';

const EditRequestPage = () => {
  const { requests, updateRequest } = useContext(RequestContext);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedRequest, setEditedRequest] = useState(null);

  const title = useLocation();
  const getTitle = title.pathname.split('/').pop();

  useEffect(() => {
    if (requests.length > 0) {
      if (getTitle) {
        const request = requests.find((req) => req.billFrom === getTitle);
        if (request) {
          setSelectedRequest(request);
          setEditedRequest({ ...request });
          setEditing(true);
        } else {
          setSelectedRequest(requests[0]);
          setEditedRequest({ ...requests[0] });
          setEditing(true);
        }
      } else {
        setSelectedRequest(requests[0]);
        setEditedRequest({ ...requests[0] });
        setEditing(true);
      }
    }
  }, [getTitle, requests]);

  const router = useNavigate();

  const handleSave = async () => {
    try {
      await updateRequest(editedRequest);
      setSelectedRequest({ ...editedRequest });
      setEditing(false);
      setShowAlert(true);

      router('/apps/request/list');
    } catch (error) {
      console.error('Error updating request:', error);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...editedRequest.orders];
    updatedOrders[index][field] = value;

    if (field === 'unitPrice' || field === 'units') {
      updatedOrders[index].unitTotalPrice =
        updatedOrders[index].unitPrice * updatedOrders[index].units;
    }

    const updatedRequest = {
      ...editedRequest,
      orders: updatedOrders,
      totalCost: calculateTotalCost(updatedOrders),
      vat: calculateVAT(updatedOrders),
      grandTotal: calculateGrandTotal(
        calculateTotalCost(updatedOrders),
        calculateVAT(updatedOrders),
      ),
    };

    setEditedRequest(updatedRequest);
  };

  const handleAddItem = () => {
    const newItem = {
      itemName: '',
      unitPrice: 0,
      units: 0,
      unitTotalPrice: 0,
      vat: 0,
    };
    const updatedOrders = [...editedRequest.orders, newItem];

    const updatedRequest = {
      ...editedRequest,
      orders: updatedOrders,
      totalCost: calculateTotalCost(updatedOrders),
      vat: calculateVAT(updatedOrders),
      grandTotal: calculateGrandTotal(
        calculateTotalCost(updatedOrders),
        calculateVAT(updatedOrders),
      ),
    };
    setEditedRequest(updatedRequest);
  };

  const handleDeleteItem = (index) => {
    const updatedOrders = editedRequest.orders.filter((_, i) => i !== index);

    const updatedRequest = {
      ...editedRequest,
      orders: updatedOrders,
      totalCost: calculateTotalCost(updatedOrders),
      vat: calculateVAT(updatedOrders),
      grandTotal: calculateGrandTotal(
        calculateTotalCost(updatedOrders),
        calculateVAT(updatedOrders),
      ),
    };
    setEditedRequest(updatedRequest);
  };

  const calculateTotalCost = (orders) => {
    return orders.reduce((total, order) => total + order.unitTotalPrice, 0);
  };

  const calculateVAT = (orders) => {
    return orders.reduce((totalVAT, order) => totalVAT + order.units, 0);
  };

  const calculateGrandTotal = (totalCost, vat) => {
    return (totalCost += (totalCost * vat) / 100);
  };

  if (!selectedRequest) {
    return <div>Please select a request.</div>;
  }

  const orderDate = selectedRequest.orderDate;
  const parsedDate = isValid(new Date(orderDate)) ? new Date(orderDate) : new Date();
  const formattedOrderDate = format(parsedDate, 'EEEE, MMMM dd, yyyy');

  return (
    <Box>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5"># {editedRequest.id}</Typography>
        <Box display="flex" gap={1}>
          {editing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="info" onClick={() => setEditing(true)}>
              Edit Request
            </Button>
          )}
        </Box>
      </Stack>
      <Divider></Divider>

      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <CustomFormLabel htmlFor="demo-simple-select">Order Status</CustomFormLabel>
          <CustomSelect
            value={editedRequest.status}
            onChange={(e) => setEditedRequest({ ...editedRequest, status: e.target.value })}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
          </CustomSelect>
        </Box>
        <Box textAlign="right">
          <CustomFormLabel htmlFor="demo-simple-select">Order Date</CustomFormLabel>
          <Typography variant="body1"> {formattedOrderDate}</Typography>
        </Box>
      </Stack>
      <Divider></Divider>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel>Bill From</CustomFormLabel>
          <CustomTextField
            value={editedRequest.billFrom}
            onChange={(e) => setEditedRequest({ ...editedRequest, billFrom: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel
            sx={{
              mt: {
                xs: 0,
                sm: 3,
              },
            }}
          >
            Bill To
          </CustomFormLabel>
          <CustomTextField
            value={editedRequest.billTo}
            onChange={(e) => setEditedRequest({ ...editedRequest, billTo: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
          >
            From Address
          </CustomFormLabel>
          <CustomTextField
            value={editedRequest.billFromAddress}
            onChange={(e) =>
              setEditedRequest({
                ...editedRequest,
                billFromAddress: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
          >
            Bill To Address
          </CustomFormLabel>
          <CustomTextField
            value={editedRequest.billToAddress}
            onChange={(e) =>
              setEditedRequest({
                ...editedRequest,
                billToAddress: e.target.value,
              })
            }
            fullWidth
          />
        </Grid>
      </Grid>

      <Paper variant="outlined">
        <TableContainer sx={{ whiteSpace: { xs: 'nowrap', md: 'unset' } }}>
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
                    Units
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Total Cost
                                      </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editedRequest.orders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <CustomTextField
                      type="text"
                      value={order.itemName}
                      onChange={(e) => handleOrderChange(index, 'itemName', e.target.value)}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <CustomTextField
                      type="number"
                      value={order.unitPrice}
                      onChange={(e) =>
                        handleOrderChange(index, 'unitPrice', parseFloat(e.target.value))
                      }
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <CustomTextField
                      type="number"
                      value={order.units}
                      onChange={(e) => handleOrderChange(index, 'units', parseInt(e.target.value))}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.unitTotalPrice}</Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Add Item">
                      <IconButton onClick={handleAddItem} color="primary">
                        <IconSquareRoundedPlus width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Item">
                      <IconButton color="error" onClick={() => handleDeleteItem(index)}>
                        <IconTrash width={22} />
                      </IconButton>
                    </Tooltip>
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
            {editedRequest.totalCost}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" gap={3} mb={3}>
          <Typography variant="body1" fontWeight={600}>
            VAT:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {editedRequest.vat}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end" gap={3}>
          <Typography variant="body1" fontWeight={600}>
            Grand Total:
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {editedRequest.grandTotal}
          </Typography>
        </Box>
      </Box>

      {showAlert && (
        <Alert severity="success" sx={{ position: 'fixed', top: 16, right: 16 }}>
          Request data updated successfully.
        </Alert>
      )}
    </Box>
  );
};

export default EditRequestPage;