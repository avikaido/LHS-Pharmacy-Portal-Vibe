import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPharmacy,
  fetchPharmacies,
  DeletePharmacy,
  toggleStarredPharmacy,
} from '../../../store/apps/pharmacies/PharmacySlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import PharmacyListItem from './PharmacyListItem';

const PharmacyList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPharmacies());
  }, [dispatch]);

  const getVisiblePharmacies = (pharmacies, filter, pharmacySearch) => {
    switch (filter) {
      case 'show_all':
        return pharmacies.filter(
          (c) => !c.deleted && c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'frequent_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'starred_pharmacy':
        return pharmacies.filter(
          (c) => !c.deleted && c.starred && c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'retail_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.pharmacyType === 'Retail' &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'compounding_pharmacy':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.pharmacyType === 'Compounding' &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'independent_pharmacy':
        return pharmacyType.filter(
          (c) =>
            !c.deleted &&
            c.pharmacyType === 'Independent' &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'hospital_pharmacy':
        return pharmacyType.filter(
          (c) =>
            !c.deleted &&
            c.pharmacyType === 'Hospital' &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );  

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const pharmacies = useSelector((state) =>
    getVisiblePharmacies(
      state.pharmaciesReducer.pharmacies,
      state.pharmaciesReducer.currentFilter,
      state.pharmaciesReducer.pharmacySearch,
    ),
  );

  const active = useSelector((state) => state.pharmaciesReducer.pharmacyContent);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {pharmacies.map((pharmacy) => (
          <PharmacyListItem
            key={pharmacy.id}
            active={pharmacy.id === active}
            {...pharmacy}
            onPharmacyClick={() => {
              dispatch(SelectPharmacy(pharmacy.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(DeletePharmacy(pharmacy.id))}
            onStarredClick={() => dispatch(toggleStarredPharmacy(pharmacy.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default PharmacyList;
