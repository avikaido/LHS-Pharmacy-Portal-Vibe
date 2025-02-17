import React, { useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectPatient,
  fetchPatients,
  DeletePatient,
  toggleStarredPatient,
} from '../../../store/apps/patients/PatientSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import PatientListItem from './PatientListItem';

const PatientList = ({ showrightSidebar }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const getVisiblePatients = (patients, filter, patientSearch) => {
    switch (filter) {
      case 'show_all':
        return patients.filter(
          (p) => !p.deleted && p.firstname.toLowerCase().includes(patientSearch),
        );

      case 'frequent_patient':
        return patients.filter(
          (p) =>
            !p.deleted &&
            p.frequentlycontacted &&
            p.firstname.toLowerCase().includes(patientSearch),
        );

      case 'starred_patient':
        return patients.filter(
          (p) => !p.deleted && p.starred && p.firstname.toLowerCase().includes(patientSearch),
        );

      case 'new_patient':
        return patients.filter(
          (p) =>
            !p.deleted &&
            p.ecname &&
            p.firstname.toLowerCase().includes(patientSearch),
        );

      case 'repeat_patient':
        return patients.filter(
          (p) =>
            !p.deleted &&
            p.requests && p.requests.length > 0 &&
            p.firstname.toLowerCase().includes(patientSearch),
        );

      case 'older_patient':
        return patients.filter(
          (p) =>
            !p.deleted &&
            p.requests && p.requests.length > 0 &&
            p.firstname.toLowerCase().includes(patientSearch),
        );  

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };
  
  const patients = useSelector((state) =>
    getVisiblePatients(
      state.patientsReducer.patients,
      state.patientsReducer.currentFilter,
      state.patientsReducer.patientSearch,
    ),
  );

  const active = useSelector((state) => state.patientsReducer.patientContent);

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '800px' }}>
        {patients.map((patient) => (
          <PatientListItem
            key={patient.id}
            active={patient.id === active}
            {...patient}
            onPatientClick={() => {
              dispatch(SelectPatient(patient.id));
              showrightSidebar();
            }}
            onDeleteClick={() => dispatch(DeletePatient(patient.id))}
            onStarredClick={() => dispatch(toggleStarredPatient(patient.id))}
          />
        ))}
      </Scrollbar>
    </List>
  );
};

export default PatientList;
