import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { setVisibilityFilter } from '../../../store/apps/pharmacies/PharmacySlice';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { IconMail, IconSend, IconBucket, IconFolder } from '@tabler/icons';
import PharmacyAdd from './PharmacyAdd';

const PharmacyFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.pharmaciesReducer.currentFilter);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const filterData = [
    {
      id: 2,
      name: 'All Locations',
      sort: 'show_all',
      icon: IconMail,
    },
    {
      id: 3,
      name: 'Frequent',
      sort: 'frequent_pharmacy',
      icon: IconSend,
    },
    {
      id: 4,
      name: 'Starred',
      sort: 'starred_pharmacy',
      icon: IconBucket,
    },
    {
      id: 6,
      devider: true,
    },
    {
      id: 5,
      filterbyTitle: 'Pharmacy Type',
    },

    {
      id: 7,
      name: 'Retail',
      sort: 'retail_pharmacy',
      icon: IconFolder,
      color: 'primary.main',
    },
    {
      id: 8,
      name: 'Compounding',
      sort: 'compounding_pharmacy',
      icon: IconFolder,
      color: 'error.main',
    },
    {
      id: 9,
      name: 'Independent',
      sort: 'independent_pharmacy',
      icon: IconFolder,
      color: 'success.main',
    },
    {
      id: 10,
      name: 'Hospital',
      sort: 'hospital_pharmacy',
      icon: IconFolder,
      color: 'success.main',
    },
  ];

  return (
    <>
      <PharmacyAdd />
      <List>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
          {filterData.map((filter) => {
            if (filter.filterbyTitle) {
              return (
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  pl={5.1}
                  mt={1}
                  pb={2}
                  key={filter.id}
                >
                  {filter.filterbyTitle}
                </Typography>
              );
            } else if (filter.devider) {
              return <Divider key={filter.id} sx={{ mb: 3 }} />;
            }

            return (
              <ListItemButton
                sx={{ mb: 1, mx: 3, borderRadius: br }}
                selected={active === `${filter.sort}`}
                onClick={() => dispatch(setVisibilityFilter(`${filter.sort}`))}
                key={filter.id}
              >
                <ListItemIcon sx={{ minWidth: '30px', color: filter.color }}>
                  <filter.icon stroke="1.5" size={19} />
                </ListItemIcon>
                <ListItemText>{filter.name}</ListItemText>
              </ListItemButton>
            );
          })}
        </Scrollbar>
      </List>
    </>
  );
};

export default PharmacyFilter;
