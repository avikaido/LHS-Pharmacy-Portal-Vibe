import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPhysician,
  fetchPhysicians,
  DeletePhysician,
  toggleStarredPhysician,
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
          (c) => !c.deleted && c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'frequent_physician':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.frequentlycontacted &&
            c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'starred_physician':
        return physicians.filter(
          (c) => !c.deleted && c.starred && c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'retail_pharmacy':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Retail Pharmacy' &&
            c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'compounding_pharmacy':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Compounding Pharmacy' &&
            c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'clinical_pharmacy':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Clinical Pharmacy' &&
            c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      case 'hospital_pharmacy':
        return physicians.filter(
          (c) =>
            !c.deleted &&
            c.department === 'Hospital Pharmacy' &&
            c.firstname.toLocaleLowerCase().includes(physicianSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const physicians = useSelector((state) =>
    getVisiblePhysicians(
      state.physiciansReducer.physicians,
      state.physiciansReducer.currentFilter,
      state.physiciansReducer.physicianSearch,
    ),
  );

  const active = useSelector((state) => state.physiciansReducer.physicianContent);

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
            onDeleteClick={() => dispatch(DeletePhysician(physician.id))}
            onStarredClick={() => dispatch(toggleStarredPhysician(physician.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default PhysicianList;
