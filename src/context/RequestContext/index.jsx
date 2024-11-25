import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'src/utils/axios';

export const RequestContext = createContext(undefined);

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/data/requestdata');
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        // setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to delete a request
  const deleteRequest = async (id) => {
    try {
      await axios.delete('/api/data/requestdata/deleterequest', { data: { requestId: id } });
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const addRequest = async (newRequest) => {
    try {
      const response = await axios.post('/api/data/requestdata/addrequest', newRequest);
      const addedRequest = response.data;
      setRequests((prevRequests) => [...prevRequests, addedRequest]);
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  // Function to update a request
  const updateRequest = async (updatedRequest) => {
    try {
      const response = await axios.put('/api/data/requestdata/updaterequest', updatedRequest);
      const updated = response.data;
      setRequests((prevRequests) =>
        prevRequests.map((request) => (request.id === updated.id ? updated : request)),
      );
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <RequestContext.Provider
      value={{ requests, loading, error, deleteRequest, addRequest, updateRequest }}
    >
      {children}
    </RequestContext.Provider>
  );
};
