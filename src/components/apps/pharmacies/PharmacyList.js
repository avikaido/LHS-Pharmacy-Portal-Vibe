import React, { useEffect } from 'react';
import { List, CircularProgress, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPharmacy,
  fetchPharmacies,
  deletePharmacy,
  updatePharmacy,
  SearchPharmacy,
} from '../../../store/apps/pharmacies/PharmacySlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import PharmacyListItem from './PharmacyListItem';

const PharmacyList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  const { pharmacies, loading, error, currentFilter, pharmacySearch } = useSelector((state) => state.pharmaciesReducer);

  useEffect(() => {
    dispatch(fetchPharmacies());
  }, [dispatch]);

  const getVisibleLocations = (locations, filter, locationSearch) => {
    if (!locations || locations.length === 0) return [];

    const searchTerm = locationSearch.toLowerCase();
    
    switch (filter) {
      case 'show_all':
        return locations.filter(
          (c) => !c.deleted && c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'frequent_pharmacy':
        return locations.filter(
          (c) =>
            !c.deleted &&
            c.frequently_contacted &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'starred_pharmacy':
        return locations.filter(
          (c) => !c.deleted && c.starred && c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'retail_pharmacy':
        return locations.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Retail' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'compounding_pharmacy':
        return locations.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Compounding' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'independent_pharmacy':
        return locations.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Independent' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'hospital_pharmacy':
        return locations.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Hospital Pharmacy' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );  

      default:
        return locations.filter(
          (c) => !c.deleted && c.pharmacy_name.toLowerCase().includes(searchTerm),
        );
    }
  };

  const visibleLocations = getVisibleLocations(pharmacies, currentFilter, pharmacySearch);
  const active = useSelector((state) => state.pharmaciesReducer.pharmacyContent);

  const handleLocationClick = (location) => {
    dispatch(SelectPharmacy(location.id));
    showrightSidebar();
  };

  const handleDeleteClick = (locationId) => {
    dispatch(deletePharmacy(locationId));
  };

  const handleStarredClick = (location) => {
    dispatch(updatePharmacy({
      id: location.id,
      pharmacyData: { starred: !location.starred }
    }));
  };

  if (loading) {
    return (
      <List>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      </List>
    );
  }

  if (error) {
    return (
      <List>
        <Alert severity="error" sx={{ margin: 2 }}>
          {error}
        </Alert>
      </List>
    );
  }

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {visibleLocations.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
            No locations found
          </div>
        ) : (
          visibleLocations.map((location) => (
            <PharmacyListItem
              key={location.id}
              active={location.id === active}
              {...location}
              onPharmacyClick={() => handleLocationClick(location)}
              onDeleteClick={() => handleDeleteClick(location.id)}
              onStarredClick={() => handleStarredClick(location)}
            />
          ))
        )}
      </Scrollbar>
    </List>
  );
};

export default PharmacyList;
