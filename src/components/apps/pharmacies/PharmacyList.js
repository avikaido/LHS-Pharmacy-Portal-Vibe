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

      case 'engineering_department':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Engineering' &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'support_department':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Support' &&
            c.pharmacyName.toLocaleLowerCase().includes(pharmacySearch),
        );

      case 'sales_department':
        return pharmacies.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Sales' &&
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
