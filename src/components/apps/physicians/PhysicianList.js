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

  const getVisibleDoctors = (doctors, filter, doctorSearch) => {
    switch (filter) {
      case 'show_all':
        return doctors.filter(
          (c) => !c.deleted && c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      case 'frequent_physician':
        return doctors.filter(
          (c) =>
            !c.deleted &&
            c.frequently_contacted &&
            c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      case 'starred_physician':
        return doctors.filter(
          (c) => !c.deleted && c.starred && c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      case 'internal_medicine':
        return doctors.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Internal Medicine' &&
            c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      case 'pediatrics':
        return doctors.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Pediatrics' &&
            c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      case 'family_medicine':
        return doctors.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Family Medicine' &&
            c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      case 'cardiology':
        return doctors.filter(
          (c) =>
            !c.deleted &&
            c.specialty === 'Cardiology' &&
            c.first_name?.toLocaleLowerCase().includes(doctorSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  const doctors = useSelector((state) =>
    getVisibleDoctors(
      state.physicians.physicians,
      state.physicians.currentFilter,
      state.physicians.physicianSearch,
    ),
  );

  const active = useSelector((state) => state.physicians.physicianContent);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {doctors.map((doctor) => (
          <PhysicianListItem
            key={doctor.id}
            active={doctor.id === active}
            {...doctor}
            onPhysicianClick={() => {
              dispatch(SelectPhysician(doctor.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(deletePhysician(doctor.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default PhysicianList;
