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
import { setVisibilityFilter } from '../../../store/apps/physicians/PhysicianSlice';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { IconMail, IconSend, IconBucket, IconFolder } from '@tabler/icons';
import PhysicianAdd from './PhysicianAdd';

const PhysicianFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.physiciansReducer.currentFilter);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;

  const filterData = [
    {
      id: 2,
      name: 'All',
      sort: 'show_all',
      icon: IconMail,
    },
    {
      id: 3,
      name: 'Frequent',
      sort: 'frequent_physician',
      icon: IconSend,
    },
    {
      id: 4,
      name: 'Starred',
      sort: 'starred_physician',
      icon: IconBucket,
    },
    {
      id: 6,
      devider: true,
    },
    {
      id: 5,
      filterbyTitle: 'Department',
    },

    {
      id: 7,
      name: 'Retail Pharmacy',
      sort: 'retail_pharmacy',
      icon: IconFolder,
      color: 'primary.main',
    },
    {
      id: 8,
      name: 'Compounding Pharmacy',
      sort: 'compounding_pharmacy',
      icon: IconFolder,
      color: 'error.main',
    },
    {
      id: 9,
      name: 'Clinical Pharmacy',
      sort: 'clinical_pharmacy',
      icon: IconFolder,
      color: 'success.main',
    },
    {
      id: 10,
      name: 'Hospital Pharmacy',
      sort: 'hospital_pharmacy',
      icon: IconFolder,
      color: 'success.main',
    },
  ];

  return (
    <>
      <PhysicianAdd />
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

export default PhysicianFilter;