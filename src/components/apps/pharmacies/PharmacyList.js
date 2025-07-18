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

  const getVisiblePharmacies = (pharmacies, filter, pharmacySearch) => {
    if (!pharmacies || pharmacies.length === 0) return [];

    const searchTerm = pharmacySearch.toLowerCase();
    
    switch (filter) {
      case 'show_all':
        return pharmacies.filter(
          (c) => !c.deleted && c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'frequent_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.frequently_contacted &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'starred_pharmacy':
        return pharmacies.filter(
          (c) => !c.deleted && c.starred && c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'retail_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Retail' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'compounding_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Compounding' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'independent_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Independent' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );

      case 'hospital_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.pharmacy_type === 'Hospital Pharmacy' &&
            c.pharmacy_name.toLowerCase().includes(searchTerm),
        );  

      default:
        return pharmacies.filter(
          (c) => !c.deleted && c.pharmacy_name.toLowerCase().includes(searchTerm),
        );
    }
  };

  const visiblePharmacies = getVisiblePharmacies(pharmacies, currentFilter, pharmacySearch);
  const active = useSelector((state) => state.pharmaciesReducer.pharmacyContent);

  const handlePharmacyClick = (pharmacy) => {
    dispatch(SelectPharmacy(pharmacy.id));
    showrightSidebar();
  };

  const handleDeleteClick = (pharmacyId) => {
    dispatch(deletePharmacy(pharmacyId));
  };

  const handleStarredClick = (pharmacy) => {
    dispatch(updatePharmacy({
      id: pharmacy.id,
      pharmacyData: { starred: !pharmacy.starred }
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
        {visiblePharmacies.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'gray' }}>
            No pharmacies found
          </div>
        ) : (
          visiblePharmacies.map((pharmacy) => (
            <PharmacyListItem
              key={pharmacy.id}
              active={pharmacy.id === active}
              {...pharmacy}
              onPharmacyClick={() => handlePharmacyClick(pharmacy)}
              onDeleteClick={() => handleDeleteClick(pharmacy.id)}
              onStarredClick={() => handleStarredClick(pharmacy)}
            />
          ))
        )}
      </Scrollbar>
    </List>
  );
};

export default PharmacyList;
