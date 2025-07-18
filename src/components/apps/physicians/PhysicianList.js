import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPhysician,
  fetchPhysicians,
  deletePhysician,
} from '../../../store/apps/physicians/PhysicianSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import PhysicianListItem from './PhysicianListItem';

const PhysicianList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPhysicians());
  }, [dispatch]);

  const getVisiblePhysicians = (physicians, filter, physicianSearch) => {
    switch (filter) {
      case 'show_all':
        return physicians.filter(
          (c) => !c.deleted && c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'frequent_physician':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.frequently_contacted &&
            c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'starred_physician':
        return physicians.filter(
          (c) => !c.deleted && c.starred && c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'internal_medicine':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Internal Medicine' &&
            c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'pediatrics':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Pediatrics' &&
            c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'family_medicine':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Family Medicine' &&
            c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'cardiology':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Cardiology' &&
            c.first_name?.toLocaleLowerCase().includes(physicianSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const physicians = useSelector((state) =>
    getVisiblePhysicians(
      state.physicians.physicians,
      state.physicians.currentFilter,
      state.physicians.physicianSearch,
    ),
  );

  const active = useSelector((state) => state.physicians.physicianContent);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {physicians.map((physician) => (
          <PhysicianListItem
            key={physician.id}
            active={physician.id === active}
            {...physician}
            onPhysicianClick={() => {
              dispatch(SelectPhysician(physician.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(deletePhysician(physician.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default PhysicianList;
