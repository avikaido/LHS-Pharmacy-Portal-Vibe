import React, { useEffect, useState } from 'react';
import { List, Box, Switch, FormControlLabel, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPharmacist,
  fetchPharmacists,
  fetchArchivedPharmacists,
  deletePharmacist,
} from '../../../store/apps/pharmacists/PharmacistSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import PharmacistListItem from './PharmacistListItem';

const PharmacistList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    if (showArchived) {
      dispatch(fetchArchivedPharmacists());
    } else {
      dispatch(fetchPharmacists());
    }
  }, [dispatch, showArchived]);

  const getVisiblePharmacists = (pharmacists, filter, pharmacistSearch) => {
    // If showing archived, only show archived pharmacists and ignore department filters
    if (showArchived) {
      return pharmacists.filter(
        (c) => c.deleted && c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
      );
    }

    switch (filter) {
      case 'show_all':
        return pharmacists.filter(
          (c) => !c.deleted && c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      case 'frequent_pharmacist':
        return pharmacists.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      case 'starred_pharmacist':
        return pharmacists.filter(
          (c) => !c.deleted && c.starred && c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      case 'retail_pharmacy':
        return pharmacists.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Retail Pharmacy' &&
            c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      case 'compounding_pharmacy':
        return pharmacists.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Compounding Pharmacy' &&
            c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      case 'clinical_pharmacy':
        return pharmacists.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Clinical Pharmacy' &&
            c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      case 'hospital_pharmacy':
        return pharmacists.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Hospital Pharmacy' &&
            c.firstname.toLowerCase().includes(pharmacistSearch.toLowerCase()),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const pharmacists = useSelector((state) =>
    getVisiblePharmacists(
      state.pharmacistsReducer.pharmacists,
      state.pharmacistsReducer.currentFilter,
      state.pharmacistsReducer.pharmacistSearch,
    ),
  );

  const active = useSelector((state) => state.pharmacistsReducer.pharmacistContent);
  const loading = useSelector((state) => state.pharmacistsReducer.loading);
  const error = useSelector((state) => state.pharmacistsReducer.error);

  // Debug logging
  console.log('PharmacistList Debug:', {
    showArchived,
    totalPharmacists: pharmacists.length,
    pharmacists: pharmacists.map(p => ({ id: p.id, name: `${p.firstname} ${p.lastname}`, deleted: p.deleted })),
    loading,
    error
  });

  if (loading) return <div>Loading pharmacists...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Box p={2} borderBottom={1} borderColor="divider">
        <FormControlLabel
          control={
            <Switch
              checked={showArchived}
              onChange={(e) => setShowArchived(e.target.checked)}
              color="warning"
            />
          }
          label={
            <Typography variant="body2" color={showArchived ? "warning.main" : "text.secondary"}>
              {showArchived ? "Showing Archived Pharmacists" : "Show Archived Pharmacists"}
            </Typography>
          }
        />
      </Box>
      <List>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
          {pharmacists.map((pharmacist) => (
            <PharmacistListItem
              key={pharmacist.id}
              active={pharmacist.id === active}
              {...pharmacist}
              onPharmacistClick={() => {
                dispatch(SelectPharmacist(pharmacist.id));
                showrightSidebar();
              }}
              onDeleteClick={() => dispatch(deletePharmacist(pharmacist.id))}
            />
          ))}
        </Scrollbar>
      </List>
    </>
  );
};

export default PharmacistList;
