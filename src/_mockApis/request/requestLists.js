import mock from '../mock';

export const requestLists = [
  {
    id: 101,
    billFrom: 'PineappleInc.',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'Redq Inc.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date(),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Shipped',
    completed: false,
    isSelected: false,
  },
  {
    id: 102,
    billFrom: 'Pineapple.',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'ME Inc.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date(),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Delivered',
    completed: false,
    isSelected: false,
  },
  {
    id: 103,
    billFrom: 'Incorporation.',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'Redirwed.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date(),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Pending',
    completed: false,
    isSelected: false,
  },
  {
    id: 104,
    billFrom: 'PineappleTimes.',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'RFc.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date(),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Shipped',
    completed: false,
    isSelected: false,
  },
  {
    id: 105,
    billFrom: 'FortuneCreation',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'Soft solution.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date('2020-10-15'),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Delivered',
    completed: false,
    isSelected: false,
  },
  {
    id: 106,
    billFrom: 'PineappleTimes.',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'RFc.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date(),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Shipped',
    completed: false,
    isSelected: false,
  },
  {
    id: 107,
    billFrom: 'FortuneCreation',
    billFromEmail: 'first@xabz.com',
    billFromAddress: 'Ganesh glory,Godrej garden city,Ahmedabad.',
    billFromPhone: 979796786,
    billFromFax: 13,
    billTo: 'Soft solution.',
    billToEmail: 'toFirst@agth.com',
    billToAddress: 'Godrej garden city,Ahmedabad.',
    billToPhone: 757575233,
    billToFax: 76,
    orders: [
      {
        itemName: 'Courge',
        unitPrice: 10,
        units: 9,
        unitTotalPrice: 90,
      },
    ],
    orderDate: new Date('2020-10-15'),
    totalCost: 90,
    vat: 9,
    grandTotal: 99,
    status: 'Delivered',
    completed: false,
    isSelected: false,
  },
];

mock.onGet('/api/data/requestdata').reply(() => {
  return [200, requestLists];
});

mock.onDelete('/api/data/requestdata/deleterequest').reply((config) => {
  const { requestId } = JSON.parse(config.data);
  const requestIndex = requestLists.findIndex((request) => request.id === requestId);
  if (requestIndex !== -1) {
    requestLists.splice(requestIndex, 1);
    return [200, requestLists];
  } else {
    return [404, { message: 'Request not found' }];
  }
});
// Function to find the next available ID
const getNextId = () => {
  const maxId = Math.max(...requestLists.map((request) => request.id));
  return maxId + 1;
};
// New endpoint to add a request
mock.onPost('/api/data/requestdata/addrequest').reply((config) => {
  const newRequest = JSON.parse(config.data);
  newRequest.id = getNextId();
  requestLists.push(newRequest);
  return [201, newRequest];
});

// Mock API endpoint to update a request
mock.onPut('/api/data/requestdata/updaterequest').reply((config) => {
  const updatedRequest = JSON.parse(config.data);
  const requestIndex = requestLists.findIndex((request) => request.id === updatedRequest.id);

  if (requestIndex !== -1) {
    requestLists[requestIndex] = { ...updatedRequest };
    return [200, requestLists[requestIndex]];
  } else {
    return [404, { message: 'Request not found' }];
  }
});

